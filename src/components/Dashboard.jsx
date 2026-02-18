import React, { useState, useEffect } from 'react';
import { Clock, MessageSquare, ChevronRight, Trash2, ExternalLink, Inbox } from 'lucide-react';

const Dashboard = ({ requests, onSelectRequest, onDeleteRequest }) => {
    return (
        <div className="fade-in" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>My Requests</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your active broadcasts and dealer offers.</p>
                </div>
            </div>

            {requests.length === 0 ? (
                <div className="card glass" style={{
                    padding: '4rem 2rem',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem',
                    border: '2px dashed var(--border)'
                }}>
                    <div style={{ padding: '1.5rem', borderRadius: '50%', backgroundColor: 'var(--background)', color: 'var(--secondary)' }}>
                        <Inbox size={48} strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No active requests</h3>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '400px' }}>Your part requests will appear here once you submit them for broadcasting.</p>
                    </div>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {requests.map((req) => (
                        <RequestCard
                            key={req.rid}
                            request={req}
                            onSelect={() => onSelectRequest(req)}
                            onDelete={() => onDeleteRequest(req.rid)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const RequestCard = ({ request, onSelect, onDelete }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const diff = request.expiry - Date.now();
            if (diff <= 0) {
                setTimeLeft('EXPIRED');
                return;
            }
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(`${h}h ${m}m ${s}s`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [request.expiry]);

    return (
        <div className="card glass-hover" style={{
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            overflow: 'hidden'
        }} onClick={onSelect}>
            {/* Active Indicator */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '4px',
                background: timeLeft === 'EXPIRED' ? 'var(--secondary)' : 'var(--success)'
            }}></div>

            <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--background)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <Clock size={24} color={timeLeft === 'EXPIRED' ? 'var(--secondary)' : 'var(--accent)'} />
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{request.data.part}</h4>
                    <span style={{ fontSize: '0.65rem', fontWeight: 800, padding: '0.2rem 0.5rem', borderRadius: '1rem', backgroundColor: 'var(--background)', color: 'var(--text-muted)' }}>
                        #{request.rid}
                    </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    {request.data.car_make} {request.data.model} ({request.data.year})
                </p>
            </div>

            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--success)', fontWeight: 700, fontSize: '0.9rem' }}>
                        <Clock size={14} />
                        <span style={{ fontFamily: 'monospace' }}>{timeLeft}</span>
                    </div>
                    <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>TIME REMAINING</span>
                </div>

                <button
                    className="btn btn-outline"
                    style={{ padding: '0.5rem', borderRadius: '50%', color: 'var(--error)', borderColor: 'transparent' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <Trash2 size={18} />
                </button>

                <ChevronRight size={20} color="var(--border)" />
            </div>
        </div>
    );
};

export default Dashboard;
