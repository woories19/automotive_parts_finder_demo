import React from 'react';
import { Package, Tag, ChevronRight, Star, ShieldCheck, PenTool } from 'lucide-react';

const MOCK_PARTS = [
    { id: 1, name: 'Performance Brake Pads', car: 'Toyota Camry 2018+', price: '245', image: 'https://www.brakeperformance.com/_next/image?url=https%3A%2F%2Fbrakeperformance.com%2Fapi%2Fadmin%2Fbase_product_images%2F114%2Ffile%2F1743110378%3Fimage%3D1&w=640&q=75', stock: true, rating: 4.8 },
    { id: 2, name: 'Synthetic Oil Filter', car: 'Nissan Altima 2015-2020', price: '45', image: 'https://s3.amazonaws.com/rp-part-images/assets/abe218ec38864e8227c134097c0f1c7e.webp', stock: true, rating: 4.9 },
    { id: 3, name: 'Iridium Spark Plugs', car: 'Honda Accord 2018+', price: '180', image: 'https://images.unsplash.com/photo-1597762137731-08f36c4b9d0e?q=80&w=600&auto=format&fit=crop', stock: true, rating: 4.7 },
    { id: 4, name: 'Active Carbon Air Filter', car: 'Hyundai Tucson 2016+', price: '65', image: 'https://images.unsplash.com/photo-1636113645324-4f8087948332?q=80&w=600&auto=format&fit=crop', stock: true, rating: 4.6 },
    { id: 5, name: 'Gas-Charged Shock Absorber', car: 'Lexus LS 2010-2017', price: '420', image: 'https://images.unsplash.com/photo-1605367611438-297f6734d85e?q=80&w=600&auto=format&fit=crop', stock: true, rating: 4.9 },
    { id: 6, name: 'LED Headlight Unit', car: 'Mitsubishi Pajero 2008+', price: '850', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=600&auto=format&fit=crop', stock: true, rating: 4.8 },
];

const Catalogue = () => {
    return (
        <div className="fade-in">
            <header style={{ marginBottom: '3rem', marginTop: '1rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)', marginBottom: '1.25rem', border: '1px solid var(--border)' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--success)' }} />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified Sharjah Dealers</span>
                </div>
                <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--primary)', marginBottom: '1rem' }}>
                    Genuine Spare Parts
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '600px' }}>
                    Browse our curated selection of high-quality components, sourced directly from trusted Sharjah dealers.
                </p>
            </header>

            <div className="parts-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '2.5rem 1.5rem'
            }}>
                {MOCK_PARTS.map(part => (
                    <div key={part.id} className="card part-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{
                            height: '240px',
                            backgroundColor: '#f1f5f9',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={part.image}
                                alt={part.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                className="part-image"
                            />
                            <div style={{
                                position: 'absolute',
                                top: '1rem',
                                left: '1rem',
                                zIndex: 10
                            }}>
                                <div className="glass" style={{
                                    padding: '0.375rem 0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem',
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    color: 'var(--primary)'
                                }}>
                                    <Star size={12} fill="currentColor" />
                                    {part.rating}
                                </div>
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: '1rem',
                                right: '1rem',
                                zIndex: 10
                            }}>
                                <span style={{
                                    backgroundColor: 'white',
                                    color: 'var(--success)',
                                    padding: '0.375rem 0.75rem',
                                    borderRadius: 'var(--radius-sm)',
                                    fontSize: '0.7rem',
                                    fontWeight: 800,
                                    boxShadow: 'var(--shadow-md)',
                                    textTransform: 'uppercase'
                                }}>
                                    In Stock
                                </span>
                            </div>
                        </div>

                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '0.75rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{part.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: 500 }}>
                                    <Package size={14} strokeWidth={2.5} />
                                    <span>{part.car}</span>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                                <div>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '-0.25rem' }}>Price</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent)' }}>
                                        <span style={{ fontSize: '0.875rem', marginRight: '0.125rem' }}>AED</span>{part.price}
                                    </span>
                                </div>

                                <button className="btn btn-primary" style={{ padding: '0.625rem 1rem', borderRadius: 'var(--radius-md)' }}>
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="custom-banner" style={{
                marginTop: '6rem',
                marginBottom: '4rem',
                padding: 'clamp(2rem, 8vw, 5rem) 2rem',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                borderRadius: 'var(--radius-xl)',
                color: 'white',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)'
            }}>
                {/* Animated Background Elements */}
                <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '80%', background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '30%', height: '60%', background: 'var(--accent)', filter: 'blur(80px)', opacity: 0.1, borderRadius: '50%' }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{ color: 'white', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
                        Not in the catalogue? <br /><span style={{ color: 'rgba(255,255,255,0.5)' }}>We'll find it for you.</span>
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem', fontSize: '1.125rem' }}>
                        Our agent network in Sharjah Industrial Area can source rare or specific parts in under 30 minutes.
                    </p>
                    <button className="btn btn-primary" style={{ padding: '1.25rem 3rem', fontSize: '1.125rem' }}>
                        <PenTool size={20} />
                        Submit Custom Request
                    </button>
                </div>
            </div>

            <style>{`
        .part-card:hover .part-image {
          transform: scale(1.1);
        }
        @media (max-width: 640px) {
          .parts-grid {
            gap: 1.5rem;
          }
          .custom-banner {
            padding: 3rem 1.5rem;
          }
        }
      `}</style>
        </div>
    );
};

export default Catalogue;
