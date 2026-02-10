import React from 'react';
import { PenTool, Car, LayoutGrid } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <>
      {/* Desktop Header */}
      <nav className="glass" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '1rem 0',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)',
              padding: '0.625rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px var(--accent-glow)',
              color: 'white'
            }}>
              <Car size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>
                PARTS<span style={{ color: 'var(--accent)' }}>FINDER</span>
              </h1>
              <p style={{ fontSize: '0.625rem', fontWeight: 700, margin: 0, color: 'var(--secondary)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Dubai x Sharjah
              </p>
            </div>
          </div>

          <div className="desktop-menu" style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              className={`btn ${activeTab === 'catalogue' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('catalogue')}
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
            >
              <LayoutGrid size={18} />
              <span>Catalogue</span>
            </button>
            <button
              className={`btn ${activeTab === 'request' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('request')}
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
            >
              <PenTool size={18} />
              <span>Request Part</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav glass" style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: '1.5rem',
        right: '1.5rem',
        zIndex: 1000,
        padding: '0.75rem',
        borderRadius: 'var(--radius-xl)',
        display: 'none',
        justifyContent: 'space-around',
        alignItems: 'center',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--glass-border)'
      }}>
        <button
          onClick={() => setActiveTab('catalogue')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            color: activeTab === 'catalogue' ? 'var(--accent)' : 'var(--secondary)',
            flex: 1
          }}
        >
          <div style={{
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: activeTab === 'catalogue' ? 'var(--accent-glow)' : 'transparent',
            display: 'flex',
          }}>
            <LayoutGrid size={24} strokeWidth={activeTab === 'catalogue' ? 2.5 : 2} />
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Catalogue</span>
        </button>

        <button
          onClick={() => setActiveTab('request')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            color: activeTab === 'request' ? 'var(--accent)' : 'var(--secondary)',
            flex: 1
          }}
        >
          <div style={{
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: activeTab === 'request' ? 'var(--accent-glow)' : 'transparent',
            display: 'flex'
          }}>
            <PenTool size={24} strokeWidth={activeTab === 'request' ? 2.5 : 2} />
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Request</span>
        </button>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
