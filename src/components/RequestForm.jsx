import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const WEBHOOK_URL = 'https://0270-111-88-9-100.ngrok-free.app/webhook-test/part-request';

const RequestForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        car_make: '',
        model: '',
        year: '',
        part: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.car_make.trim()) newErrors.car_make = 'Car make is required';
        if (!formData.model.trim()) newErrors.model = 'Car model is required';
        if (!formData.year.trim()) newErrors.year = 'Model year is required';
        if (!formData.part.trim()) newErrors.part = 'Please describe the part you need';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);

        try {
            // Create clean JSON payload
            const payload = {
                name: formData.name,
                phone: formData.phone,
                car_make: formData.car_make,
                model: formData.model,
                year: formData.year,
                part: formData.part
            };

            console.log('Sending payload:', payload);

            // Attempt to send to webhook
            // Note: Since this is a demo, we'll swallow errors but still show SuccessState
            // because the webhook might be down or blocked by CORS in a browser env.
            await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                mode: 'no-cors' // Use no-cors for demo webhook testing to avoid CORS issues
            }).catch(err => console.warn('Webhook delivery failed (expected in some envs):', err));

            // Show success screen regardless of webhook response for demo impact
            onSubmit(payload);
        } catch (error) {
            console.error('Submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Can’t Find Your Part?</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>
                    Tell us what you need and we'll source it from Sharjah's best dealers.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem', display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                    {/* Name Field */}
                    <div className="form-group">
                        <label style={labelStyle}>Full Name *</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Ahmed Salem"
                            style={inputStyle(errors.name)}
                        />
                        {errors.name && <p style={errorStyle}><AlertCircle size={14} /> {errors.name}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="form-group">
                        <label style={labelStyle}>Phone Number (Optional)</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g. +971 50 123 4567"
                            style={inputStyle()}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {/* Car Make */}
                    <div className="form-group">
                        <label style={labelStyle}>Car Make *</label>
                        <input
                            type="text"
                            name="car_make"
                            value={formData.car_make}
                            onChange={handleChange}
                            placeholder="e.g. Toyota"
                            style={inputStyle(errors.car_make)}
                        />
                        {errors.car_make && <p style={errorStyle}><AlertCircle size={14} /> {errors.car_make}</p>}
                    </div>

                    {/* Car Model */}
                    <div className="form-group">
                        <label style={labelStyle}>Car Model *</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            placeholder="e.g. Camry"
                            style={inputStyle(errors.model)}
                        />
                        {errors.model && <p style={errorStyle}><AlertCircle size={14} /> {errors.model}</p>}
                    </div>

                    {/* Model Year */}
                    <div className="form-group">
                        <label style={labelStyle}>Model Year *</label>
                        <input
                            type="number"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="e.g. 2020"
                            style={inputStyle(errors.year)}
                        />
                        {errors.year && <p style={errorStyle}><AlertCircle size={14} /> {errors.year}</p>}
                    </div>
                </div>

                {/* Part Needed */}
                <div className="form-group">
                    <label style={labelStyle}>Part Needed *</label>
                    <textarea
                        name="part"
                        value={formData.part}
                        onChange={handleChange}
                        placeholder="Describe the part (e.g. Gearbox for a 2.5L engine, pearl white left fender...)"
                        style={{ ...inputStyle(errors.part), height: '120px', resize: 'vertical' }}
                    />
                    {errors.part && <p style={errorStyle}><AlertCircle size={14} /> {errors.part}</p>}
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ width: '100%', padding: '1rem' }}
                    >
                        {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                        {!isSubmitting && <Send size={18} />}
                    </button>
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '1rem' }}>
                        Dealers will receive your request instantly.
                    </p>
                </div>
            </form>
        </div>
    );
};

// Internal styles
const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    fontSize: '0.925rem',
    color: 'var(--primary-light)'
};

const inputStyle = (hasError) => ({
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${hasError ? '#ef4444' : 'var(--border)'}`,
    fontSize: '1rem',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
    outline: 'none',
    backgroundColor: '#fdfdfd'
});

const errorStyle = {
    color: '#ef4444',
    fontSize: '0.8125rem',
    marginTop: '0.375rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
};

export default RequestForm;
