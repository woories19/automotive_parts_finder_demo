import React, { useState } from 'react';
import { Settings, Save, X, RotateCcw } from 'lucide-react';
import { getApiBaseUrl, setApiOverride, clearApiOverride } from '../utils/api-config';

const DevBadge = () => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [customUrl, setCustomUrl] = useState(localStorage.getItem('parts_finder_api_override') || '');

    // __APP_VERSION__ is injected by Vite at build time via vite.config.js
    const version = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.1.local';
    const activeApi = getApiBaseUrl();

    const handleSave = () => {
        setApiOverride(customUrl);
        setIsSettingsOpen(false);
        window.location.reload(); // Reload to apply new API URL across app
    };

    const handleReset = () => {
        clearApiOverride();
        setCustomUrl('');
        window.location.reload();
    };

    return (
        <div style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '0.5rem'
        }}>
            {/* Main Badge */}
            <div className="glass" style={{
                padding: '0.4rem 0.8rem',
                borderRadius: '2rem',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                boxShadow: 'var(--shadow-md)',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                color: 'white',
                cursor: 'pointer',
                pointerEvents: 'auto'
            }} onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 8px #10b981',
                    animation: 'pulse 2s infinite'
                }}></div>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <span style={{
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        opacity: 0.9
                    }}>
                        Dev Mode
                    </span>
                    <span style={{ fontSize: '0.55rem', opacity: 0.6, fontFamily: 'monospace' }}>
                        {version}
                    </span>
                </div>
                <Settings size={14} style={{ opacity: 0.7, marginLeft: '0.2rem' }} />
            </div>

            {/* Settings Dropdown */}
            {isSettingsOpen && (
                <div className="card glass fade-in" style={{
                    width: '280px',
                    padding: '1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid var(--accent)',
                    boxShadow: 'var(--shadow-xl)',
                    pointerEvents: 'auto'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: 700 }}>API Configuration</h4>
                        <button onClick={() => setIsSettingsOpen(false)} style={{ color: 'var(--secondary)' }}>
                            <X size={16} />
                        </button>
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.4rem' }}>
                            BASE API URL (NGROK)
                        </label>
                        <input
                            value={customUrl}
                            onChange={(e) => setCustomUrl(e.target.value)}
                            placeholder="https://xxx.ngrok-free.app"
                            style={{
                                fontSize: '0.8rem',
                                padding: '0.6rem',
                                border: '1px solid var(--border)',
                                borderRadius: 'var(--radius-sm)'
                            }}
                        />
                        <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.4rem', fontStyle: 'italic' }}>
                            Currently: <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{activeApi.substring(0, 30)}...</span>
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                            onClick={handleSave}
                            className="btn btn-primary"
                            style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem', borderRadius: 'var(--radius-sm)' }}
                        >
                            <Save size={14} /> Update
                        </button>
                        <button
                            onClick={handleReset}
                            className="btn btn-outline"
                            style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}
                            title="Reset to .env default"
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.7; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default DevBadge;
