import React from 'react';
import { PenTool, Car, LayoutGrid, LogOut, Clock } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, isLoggedIn, onLogout, requestCount }) => {
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

            {isLoggedIn && (
              <button
                className={`btn ${activeTab === 'dashboard' || activeTab === 'waiting' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveTab('dashboard')}
                style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem', position: 'relative' }}
              >
                <Clock size={18} />
                <span>My Requests</span>
                {requestCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-5px',
                    right: '-5px',
                    backgroundColor: 'var(--error)',
                    color: 'white',
                    fontSize: '0.6rem',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    border: '2px solid white'
                  }}>
                    {requestCount}
                  </span>
                )}
              </button>
            )}

            {isLoggedIn && (
              <button
                className="btn btn-outline"
                onClick={onLogout}
                style={{ padding: '0.625rem 1rem', fontSize: '0.875rem', color: 'var(--error)', borderColor: 'rgba(239, 68, 68, 0.2)' }}
              >
                <LogOut size={18} />
              </button>
            )}
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

        {isLoggedIn && (
          <button
            onClick={() => setActiveTab('dashboard')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: (activeTab === 'dashboard' || activeTab === 'waiting') ? 'var(--accent)' : 'var(--secondary)',
              flex: 1,
              position: 'relative'
            }}
          >
            <div style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: (activeTab === 'dashboard' || activeTab === 'waiting') ? 'var(--accent-glow)' : 'transparent',
              display: 'flex'
            }}>
              <Clock size={24} strokeWidth={(activeTab === 'dashboard' || activeTab === 'waiting') ? 2.5 : 2} />
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>My Requests</span>
            {requestCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '15%',
                backgroundColor: 'var(--error)',
                color: 'white',
                fontSize: '0.55rem',
                fontWeight: 900,
                padding: '1px 4px',
                borderRadius: '8px',
                border: '1px solid white'
              }}>
                {requestCount}
              </span>
            )}
          </button>
        )}

        {isLoggedIn && (
          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--error)',
              flex: 1
            }}
          >
            <div style={{ padding: '0.5rem', display: 'flex' }}>
              <LogOut size={24} />
            </div>
            <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>Logout</span>
          </button>
        )}
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
