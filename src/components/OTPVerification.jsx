import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';

const OTPVerification = ({ email, onVerify, onResend }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState('');
    const inputRefs = useRef([]);

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        const data = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(data)) {
            const newOtp = data.split('').concat(Array(6 - data.length).fill(''));
            setOtp(newOtp);
            inputRefs.current[Math.min(data.length, 5)].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length < 6) {
            setError('Please enter the full 6-digit code');
            return;
        }

        setIsVerifying(true);
        setError('');
        try {
            await onVerify(code);
        } catch (err) {
            setError('Invalid code. Please try again.');
            setIsVerifying(false);
        }
    };

    const handleResend = () => {
        setTimer(30);
        onResend();
    };

    return (
        <div className="fade-in card" style={{
            maxWidth: '500px',
            margin: '2rem auto',
            padding: 'clamp(1.5rem, 5vw, 3rem)',
            textAlign: 'center'
        }}>
            <div style={{
                backgroundColor: 'var(--accent-glow)',
                color: 'var(--accent)',
                padding: '1rem',
                borderRadius: '50%',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
            }}>
                <ShieldCheck size={32} />
            </div>

            <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Verify Your Email</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                We've sent a 6-digit code to <br />
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{email}</span>
            </p>

            <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            inputMode="numeric"
                            value={digit}
                            onChange={e => handleChange(index, e.target.value)}
                            onKeyDown={e => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            maxLength={1}
                            style={{
                                width: 'clamp(40px, 10vw, 55px)',
                                height: 'clamp(50px, 12vw, 65px)',
                                textAlign: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                borderRadius: 'var(--radius-md)',
                                border: `2px solid ${error ? 'var(--error)' : 'var(--border)'}`,
                                backgroundColor: 'var(--background)',
                                color: 'var(--primary)',
                                transition: 'all 0.2s ease'
                            }}
                        />
                    ))}
                </div>

                {error && (
                    <div style={{
                        color: 'var(--error)',
                        fontSize: '0.85rem',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        fontWeight: 600
                    }}>
                        <AlertCircle size={14} /> {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isVerifying}
                    style={{ width: '100%', padding: '1rem', marginBottom: '1.5rem' }}
                >
                    {isVerifying ? (
                        <>Verifying... <RefreshCw size={18} className="spin" /></>
                    ) : (
                        <>Verify & Continue <ArrowRight size={18} /></>
                    )}
                </button>

                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Didn't receive the code?{' '}
                    {timer > 0 ? (
                        <span style={{ fontWeight: 600, color: 'var(--accent)' }}>Resend in {timer}s</span>
                    ) : (
                        <button
                            type="button"
                            onClick={handleResend}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                color: 'var(--accent)',
                                fontWeight: 700,
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Resend Code
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default OTPVerification;
