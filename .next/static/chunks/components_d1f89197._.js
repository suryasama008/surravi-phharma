(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/EnquiryForm.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>EnquiryForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function EnquiryForm(param) {
    let { productName = '', compact = false } = param;
    _s();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        company: '',
        phone: '',
        email: '',
        product: productName,
        message: ''
    });
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    function handleChange(e) {
        setForm((prev)=>({
                ...prev,
                [e.target.name]: e.target.value
            }));
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const res = await fetch('/api/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error || 'Failed');
            setStatus('success');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackEvent"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GA_EVENTS"].ENQUIRY_SUBMIT, {
                product: form.product
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackSupabase"])('enquiry_submit', {
                product: form.product
            });
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message || 'Something went wrong. Please call us directly.');
        }
    }
    if (status === 'success') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "form-success",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "✅"
                }, void 0, false, {
                    fileName: "[project]/components/EnquiryForm.js",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "Thank you! We'll get back to you shortly."
                }, void 0, false, {
                    fileName: "[project]/components/EnquiryForm.js",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/EnquiryForm.js",
            lineNumber: 40,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        className: "enquiry-form ".concat(compact ? 'compact' : ''),
        onSubmit: handleSubmit,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "name",
                        type: "text",
                        placeholder: "Your Name *",
                        required: true,
                        value: form.name,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EnquiryForm.js",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "phone",
                        type: "tel",
                        placeholder: "Phone Number *",
                        required: true,
                        value: form.phone,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EnquiryForm.js",
                        lineNumber: 54,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EnquiryForm.js",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "form-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "company",
                        type: "text",
                        placeholder: "Company Name",
                        value: form.company,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EnquiryForm.js",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        name: "email",
                        type: "email",
                        placeholder: "Email Address",
                        value: form.email,
                        onChange: handleChange
                    }, void 0, false, {
                        fileName: "[project]/components/EnquiryForm.js",
                        lineNumber: 65,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/EnquiryForm.js",
                lineNumber: 60,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                name: "product",
                type: "text",
                placeholder: "Product(s) of Interest",
                value: form.product,
                onChange: handleChange
            }, void 0, false, {
                fileName: "[project]/components/EnquiryForm.js",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            !compact && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                name: "message",
                rows: 3,
                placeholder: "Your message or specific requirements",
                value: form.message,
                onChange: handleChange
            }, void 0, false, {
                fileName: "[project]/components/EnquiryForm.js",
                lineNumber: 76,
                columnNumber: 9
            }, this),
            status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "form-error",
                children: errorMsg
            }, void 0, false, {
                fileName: "[project]/components/EnquiryForm.js",
                lineNumber: 81,
                columnNumber: 30
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "submit",
                className: "btn btn-primary",
                disabled: status === 'loading',
                children: status === 'loading' ? 'Sending…' : 'Send Enquiry'
            }, void 0, false, {
                fileName: "[project]/components/EnquiryForm.js",
                lineNumber: 82,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/EnquiryForm.js",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(EnquiryForm, "6Av/o26L6Db0aTBDdacgyioK3H4=");
_c = EnquiryForm;
var _c;
__turbopack_context__.k.register(_c, "EnquiryForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/PageTracker.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PageTracker
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/analytics.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function PageTracker(param) {
    let { page, product } = param;
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PageTracker.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$analytics$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trackPageView"])(page, product);
        }
    }["PageTracker.useEffect"], [
        page,
        product
    ]);
    return null;
}
_s(PageTracker, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = PageTracker;
var _c;
__turbopack_context__.k.register(_c, "PageTracker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_d1f89197._.js.map