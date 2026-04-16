'use client';
import { useState } from 'react';
import { trackEvent, trackSupabase, GA_EVENTS } from '@/lib/analytics';

export default function EnquiryForm({ productName = '', compact = false }) {
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '',
    product: productName, message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed');
      setStatus('success');
      trackEvent(GA_EVENTS.ENQUIRY_SUBMIT, { product: form.product });
      trackSupabase('enquiry_submit', { product: form.product });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please call us directly.');
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success">
        <span>✅</span>
        <p>Thank you! We&apos;ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form className={`enquiry-form ${compact ? 'compact' : ''}`} onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          name="name" type="text" placeholder="Your Name *" required
          value={form.name} onChange={handleChange}
        />
        <input
          name="phone" type="tel" placeholder="Phone Number *" required
          value={form.phone} onChange={handleChange}
        />
      </div>
      {!compact && (
        <div className="form-row">
          <input
            name="company" type="text" placeholder="Company Name"
            value={form.company} onChange={handleChange}
          />
          <input
            name="email" type="email" placeholder="Email Address"
            value={form.email} onChange={handleChange}
          />
        </div>
      )}
      <input
        name="product" type="text" placeholder="Product(s) of Interest"
        value={form.product} onChange={handleChange}
      />
      {!compact && (
        <textarea
          name="message" rows={3} placeholder="Your message or specific requirements"
          value={form.message} onChange={handleChange}
        />
      )}
      {status === 'error' && <p className="form-error">{errorMsg}</p>}
      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  );
}
