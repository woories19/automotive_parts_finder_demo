import React, { useState } from 'react';
import { Send, AlertCircle, Car, Settings, User, Phone, ClipboardList } from 'lucide-react';

import { getApiBaseUrl, API_ENDPOINTS } from '../utils/api-config';

const WEBHOOK_URL = API_ENDPOINTS.PART_REQUEST(getApiBaseUrl());

const RequestForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.car_make.trim()) newErrors.car_make = 'Car make is required';
        if (!formData.model.trim()) newErrors.model = 'Car model is required';
        if (!formData.year.trim()) newErrors.year = 'Model year is required';
        if (!formData.part.trim()) newErrors.part = 'Please describe the part';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const payload = { ...formData };
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                const result = await response.json();
                onSubmit(payload, result.request_id);
            } else {
                // Fallback if n8n doesn't return 200 OK
                onSubmit(payload);
            }
        } catch (error) {
            console.error('Submission error:', error);
            // Submit anyway to show success state in demo if webhook fails
            onSubmit({ ...formData });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '6rem' }}>
            <header style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>Sourcing Service</h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>
                    Can't find the exact part? Our Sharjah agents will find it for you within minutes.
                </p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2.5rem', alignItems: 'start' }} className="form-layout">
                <form onSubmit={handleSubmit} className="card" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        {/* User Info Section */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                <User size={18} style={{ color: 'var(--accent)' }} />
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Information</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label className="label">Full Name</label>
                                    <div style={{ position: 'relative' }}>
                                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Ahmed Salem" style={inputStyle(errors.name)} />
                                        {errors.name && <p style={errorStyle}><AlertCircle size={14} /> {errors.name}</p>}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label className="label">Email Address</label>
                                    <div style={{ position: 'relative' }}>
                                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ahmed@example.com" style={inputStyle(errors.email)} />
                                        {errors.email && <p style={errorStyle}><AlertCircle size={14} /> {errors.email}</p>}
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label className="label">WhatsApp / Phone</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+971 50 ..." style={inputStyle()} />
                                </div>
                            </div>
                        </div>

                        {/* Car Details Section */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                <Car size={18} style={{ color: 'var(--accent)' }} />
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vehicle Details</h3>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
                                <div className="input-group">
                                    <label className="label">Make</label>
                                    <input name="car_make" value={formData.car_make} onChange={handleChange} placeholder="e.g. Mercedes" style={inputStyle(errors.car_make)} />
                                </div>
                                <div className="input-group">
                                    <label className="label">Model</label>
                                    <input name="model" value={formData.model} onChange={handleChange} placeholder="e.g. S-Class" style={inputStyle(errors.model)} />
                                </div>
                                <div className="input-group">
                                    <label className="label">Year</label>
                                    <input name="year" type="number" value={formData.year} onChange={handleChange} placeholder="2022" style={inputStyle(errors.year)} />
                                </div>
                            </div>
                        </div>

                        {/* Part Description */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
                                <Settings size={18} style={{ color: 'var(--accent)' }} />
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Part Required</h3>
                            </div>
                            <div className="input-group">
                                <label className="label">Detailed Description</label>
                                <textarea
                                    name="part" value={formData.part} onChange={handleChange}
                                    placeholder="Tell us exactly what you need. (e.g. Gearbox for a 2.5L engine, specific part numbers if known)"
                                    style={{ ...inputStyle(errors.part), height: '150px', resize: 'none' }}
                                />
                                {errors.part && <p style={errorStyle}><AlertCircle size={14} /> {errors.part}</p>}
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" disabled={isSubmitting} style={{ padding: '1.25rem', fontSize: '1.125rem' }}>
                            {isSubmitting ? 'Transmitting Request...' : 'Find My Part'}
                            <Send size={20} />
                        </button>
                    </div>
                </form>

                {/* Sidebar info */}
                <aside className="form-sidebar" style={{ display: 'grid', gap: '1.5rem' }}>
                    <div className="card glass" style={{ padding: '1.5rem' }}>
                        <div style={{ backgroundColor: 'var(--accent-glow)', width: '40px', height: '40px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1rem' }}>
                            <ClipboardList size={24} />
                        </div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Instant Broadcast</h4>
                        <p style={{ fontSize: '0.875rem' }}>Your request is instantly broadcasted to 500+ verified dealers in Sharjah.</p>
                    </div>
                    <div className="card glass" style={{ padding: '1.5rem' }}>
                        <div style={{ backgroundColor: 'var(--accent-glow)', width: '40px', height: '40px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', marginBottom: '1rem' }}>
                            <Phone size={24} />
                        </div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Quick Offers</h4>
                        <p style={{ fontSize: '0.875rem' }}>Expect 3-5 price offers within minutes. No hidden fees or commissions.</p>
                    </div>
                </aside>
            </div>

            <style>{`
        @media (max-width: 900px) {
          .form-layout { grid-template-columns: 1fr !important; }
          .form-sidebar { order: 2; }
        }
      `}</style>
        </div>
    );
};

const inputStyle = (hasError) => ({
    border: hasError ? '2px solid var(--error)' : '2px solid var(--border)',
});

const errorStyle = {
    color: 'var(--error)',
    fontSize: '0.75rem',
    fontWeight: 600,
    marginTop: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    animation: 'slideUp 0.3s ease'
};

export default RequestForm;
