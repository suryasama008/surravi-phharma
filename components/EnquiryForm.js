'use client';
import { useState } from 'react';
import { trackEvent, GA_EVENTS } from '@/lib/analytics';

export default function EnquiryForm({ productName = '', productDescription = '', compact = false }) {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: productName,
    productDescription,
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState("Thank you! We'll get back to you shortly.");
  const [fieldErrors, setFieldErrors] = useState({}); // Track individual field errors

  // ========== CLIENT-SIDE VALIDATION ==========
  function validateForm() {
    const errors = {};

    // Name validation
    if (!form.name || form.name.trim().length < 2) {
      errors.name = 'Name is required (minimum 2 characters)';
    } else if (!/^[a-zA-Z\s\-']{2,100}$/.test(form.name)) {
      errors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Phone validation (Indian: 10 digits)
    const cleanPhone = form.phone.replace(/\D/g, '');
    if (!form.phone || cleanPhone.length < 10) {
      errors.phone = 'Phone number is required (minimum 10 digits)';
    } else if (cleanPhone.length > 15) {
      errors.phone = 'Phone number is too long';
    }

    // Email validation (required)
    if (!form.email || form.email.trim().length === 0) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Email format is invalid';
    } else if (form.email.length > 254) {
      errors.email = 'Email is too long';
    }

    // Company name validation
    if (form.company && form.company.length > 200) {
      errors.company = 'Company name is too long';
    }

    // Product validation
    if (form.product && form.product.length > 200) {
      errors.product = 'Product name is too long';
    }

    // Product description validation
    if (form.productDescription && form.productDescription.length > 1000) {
      errors.productDescription = 'Product details are too long';
    }

    // Message validation
    if (form.message && form.message.length > 500) {
      errors.message = 'Message is too long (max 500 characters)';
    }

    return errors;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    setFieldErrors({});

    // ===== CLIENT-SIDE VALIDATION =====
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('idle');
      setErrorMsg('Please fix the errors below');
      return;
    }

    try {
      // ===== SUBMIT TO API =====
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      // ===== CHECK RESPONSE =====
      if (!res.ok) {
        // Handle rate limiting
        if (res.status === 429) {
          throw new Error('Too many requests. Please wait a minute before trying again.');
        }
        // Handle CORS error
        if (res.status === 403) {
          throw new Error('Security validation failed. Please refresh and try again.');
        }
        // Handle validation errors
        throw new Error(data.error || 'Failed to submit');
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit');
      }

      // ===== SUCCESS =====
      setStatus('success');
      setSuccessMsg(
        data.adminEmailSent
          ? "Thank you! We'll get back to you shortly."
          : 'Your enquiry was saved, but email delivery is not active yet. Please call us directly if urgent.'
      );
      setForm({
        name: '',
        company: '',
        phone: '',
        email: '',
        product: productName,
        productDescription,
        message: '',
      });
      
      // Track analytics
      trackEvent(GA_EVENTS.ENQUIRY_SUBMIT, { product: form.product });

    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please call us directly.');
      console.error('Form submission error:', err);
    }
  }

  // ===== SUCCESS MESSAGE =====
  if (status === 'success') {
    return (
      <div className="form-success">
        <span>✅</span>
        <p>{successMsg}</p>
        <button 
          className="btn btn-secondary"
          onClick={() => setStatus('idle')}
          style={{ marginTop: '1rem' }}
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  // ===== FORM RENDER =====
  return (
    <form className={`enquiry-form ${compact ? 'compact' : ''}`} onSubmit={handleSubmit}>
      {/* ===== ERROR MESSAGE ===== */}
      {status === 'error' && (
        <div className="form-error" style={{ color: '#d32f2f', marginBottom: '1rem' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* ===== NAME & PHONE (Two columns on desktop) ===== */}
      <div className="form-row">
        <div style={{ flex: 1 }}>
          <input
            name="name"
            type="text"
            placeholder="Your Name *"
            required
            value={form.name}
            onChange={handleChange}
            disabled={status === 'loading'}
            aria-label="Your name"
            maxLength="100"
            className={fieldErrors.name ? 'input-error' : ''}
          />
          {fieldErrors.name && (
            <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number *"
            required
            value={form.phone}
            onChange={handleChange}
            disabled={status === 'loading'}
            aria-label="Phone number"
            maxLength="20"
            className={fieldErrors.phone ? 'input-error' : ''}
          />
          {fieldErrors.phone && (
            <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
              {fieldErrors.phone}
            </span>
          )}
        </div>
      </div>

      {/* ===== COMPANY & EMAIL (Hidden in compact mode) ===== */}
      {!compact && (
        <div className="form-row">
          <div style={{ flex: 1 }}>
            <input
              name="company"
              type="text"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              disabled={status === 'loading'}
              aria-label="Company name"
              maxLength="200"
              className={fieldErrors.company ? 'input-error' : ''}
            />
            {fieldErrors.company && (
              <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
                {fieldErrors.company}
              </span>
            )}
          </div>

          <div style={{ flex: 1 }}>
            <input
              name="email"
              type="email"
              placeholder="Email Address *"
              required
              value={form.email}
              onChange={handleChange}
              disabled={status === 'loading'}
              aria-label="Email address"
              maxLength="254"
              className={fieldErrors.email ? 'input-error' : ''}
            />
            {fieldErrors.email && (
              <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
                {fieldErrors.email}
              </span>
            )}
          </div>
        </div>
      )}

      {/* ===== PRODUCT ===== */}
      <div>
        <input
          name="product"
          type="text"
          placeholder="Product(s) of Interest"
          value={form.product}
          onChange={handleChange}
          disabled={status === 'loading'}
          aria-label="Product of interest"
          maxLength="200"
          className={fieldErrors.product ? 'input-error' : ''}
        />
        {fieldErrors.product && (
          <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
            {fieldErrors.product}
          </span>
        )}
      </div>




      {/* ===== MESSAGE (Hidden in compact mode) ===== */}
      {!compact && (
        <div>
          <textarea
            name="message"
            rows={3}
            placeholder="Your message or specific requirements (optional)"
            value={form.message}
            onChange={handleChange}
            disabled={status === 'loading'}
            aria-label="Message"
            maxLength="500"
            className={fieldErrors.message ? 'input-error' : ''}
            style={{
              resize: 'vertical',
              minHeight: '80px',
              fontFamily: 'inherit',
            }}
          />
          {fieldErrors.message && (
            <span style={{ color: '#d32f2f', fontSize: '0.85rem' }}>
              {fieldErrors.message}
            </span>
          )}
          <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.25rem' }}>
            {form.message.length}/500 characters
          </div>
        </div>
      )}

      {/* ===== SUBMIT BUTTON ===== */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'loading' || Object.keys(fieldErrors).length > 0}
        style={{
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? (
          <>
            <span style={{ marginRight: '0.5rem' }}>⏳</span>
            Sending…
          </>
        ) : (
          'Send Enquiry'
        )}
      </button>

      {/* ===== HELP TEXT ===== */}
      <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '1rem', textAlign: 'center' }}>
        We&apos;ll get back to you within 24 hours. Or call directly at <strong>+91 9059202576</strong>
      </p>
    </form>
  );
}
