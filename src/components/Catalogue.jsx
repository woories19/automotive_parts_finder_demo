import React from 'react';
import { Package, MapPin, Tag } from 'lucide-react';

const MOCK_PARTS = [
    { id: 1, name: 'Brake Pads Set', car: 'Toyota Camry 2018-2023', price: 'AED 245', image: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=400&auto=format&fit=crop', stock: true },
    { id: 2, name: 'Oil Filter', car: 'Nissan Altima 2015-2020', price: 'AED 45', image: 'https://images.unsplash.com/photo-1635773100235-44c1d2f58842?q=80&w=400&auto=format&fit=crop', stock: true },
    { id: 3, name: 'Spark Plugs (Platinum)', car: 'Honda Accord 2018+', price: 'AED 180', image: 'https://images.unsplash.com/photo-1597762137731-08f36c4b9d0e?q=80&w=400&auto=format&fit=crop', stock: true },
    { id: 4, name: 'Air Filter', car: 'Hyundai Tucson 2016-2021', price: 'AED 65', image: 'https://images.unsplash.com/photo-1636113645324-4f8087948332?q=80&w=400&auto=format&fit=crop', stock: true },
    { id: 5, name: 'Shock Absorber (Front)', car: 'Lexus LS 2010-2017', price: 'AED 420', image: 'https://images.unsplash.com/photo-1605367611438-297f6734d85e?q=80&w=400&auto=format&fit=crop', stock: true },
    { id: 6, name: 'Headlight Assembly', car: 'Mitsubishi Pajero 2008+', price: 'AED 850', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400&auto=format&fit=crop', stock: true },
];

const Catalogue = () => {
    return (
        <div className="fade-in">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.875rem', marginBottom: '0.5rem' }}>Available Parts</h2>
                <p style={{ color: 'var(--text-muted)' }}>Common parts in stock at Sharjah Industrial Area dealers.</p>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {MOCK_PARTS.map(part => (
                    <div key={part.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            height: '180px',
                            backgroundColor: '#f1f5f9',
                            borderTopLeftRadius: 'var(--radius-md)',
                            borderTopRightRadius: 'var(--radius-md)',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            <img
                                src={part.image}
                                alt={part.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '0.75rem',
                                right: '0.75rem'
                            }}>
                                <span className="badge badge-success">
                                    In Stock
                                </span>
                            </div>
                        </div>

                        <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>{part.name}</h3>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                color: 'var(--text-muted)',
                                fontSize: '0.875rem',
                                marginBottom: '1rem'
                            }}>
                                <Package size={14} />
                                <span> Fits: {part.car}</span>
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)' }}>
                                    <Tag size={18} style={{ color: 'var(--accent)' }} />
                                    {part.price}
                                </div>

                                <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                marginTop: '4rem',
                padding: '3rem',
                backgroundColor: 'var(--primary)',
                borderRadius: 'var(--radius-lg)',
                color: 'white',
                textAlign: 'center'
            }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', marginBottom: '1rem' }}>Can't find your part?</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
                    We work with over 500 dealers in Sharjah Industrial Area. If it's not in our catalogue, we can find it for you in minutes.
                </p>
                <button className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                    Submit Custom Request
                </button>
            </div>
        </div>
    );
};

export default Catalogue;
