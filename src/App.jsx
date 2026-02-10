import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, MapPin, ArrowLeft, Star, Lock, Check } from 'lucide-react';
import Navbar from './components/Navbar';
import Catalogue from './components/Catalogue';
import RequestForm from './components/RequestForm';

const OFFERS_FETCH_URL = 'https://13f5-2406-d00-cccf-72e2-497a-37-3c22-23f2.ngrok-free.app/webhook/get-offers';

function App() {
  const [activeTab, setActiveTab] = useState('catalogue');
  const [submittedData, setSubmittedData] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const handleRequestSubmit = (data, serverRequestId) => {
    setSubmittedData(data);
    setRequestId(serverRequestId);
    setActiveTab('waiting');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Navbar activeTab={activeTab === 'waiting' ? 'request' : activeTab} setActiveTab={setActiveTab} />

      <main className="container" style={{ flex: 1, paddingTop: '1.5rem', paddingBottom: '6rem' }}>
        {activeTab === 'catalogue' && <Catalogue />}
        {activeTab === 'request' && <RequestForm onSubmit={handleRequestSubmit} />}
        {activeTab === 'waiting' && <SuccessState data={submittedData} requestId={requestId} onReset={() => setActiveTab('catalogue')} />}
      </main>

      <footer style={{
        padding: '3rem 0',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto',
        color: 'var(--text-muted)',
        fontSize: '0.875rem',
        backgroundColor: 'white'
      }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, opacity: 0.5 }}>
            <MapPin size={16} />
            Sharjah Industrial Area 12, UAE
          </div>
          <p>&copy; 2026 PartsFinder MVP. The future of automotive sourcing.</p>
        </div>
      </footer>
    </>
  );
}

const SuccessState = ({ data, requestId, onReset }) => {
  const [offers, setOffers] = useState([]);
  const [isPolling, setIsPolling] = useState(true);
  const displayId = requestId || 'DEMO-ID';

  const fetchOffers = useCallback(async () => {
    if (!requestId) return;
    try {
      const response = await fetch(`${OFFERS_FETCH_URL}?request_id=${requestId}`);
      if (response.ok) {
        const result = await response.json();
        if (result.offers) {
          setOffers(result.offers);
        }
      }
    } catch (error) {
      console.warn('Failed to fetch offers:', error);
    }
  }, [requestId]);

  useEffect(() => {
    let interval;
    if (isPolling && requestId) {
      fetchOffers();
      interval = setInterval(fetchOffers, 5000);
    }
    return () => clearInterval(interval);
  }, [isPolling, requestId, fetchOffers]);

  return (
    <div className="fade-in" style={{
      maxWidth: '900px',
      margin: '2rem auto',
      textAlign: 'center'
    }}>
      <div className="card" style={{ padding: 'clamp(1.5rem, 5vw, 3rem)', position: 'relative', overflow: 'hidden' }}>
        {/* Success Background Glow */}
        <div style={{ position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '200px', background: 'var(--success)', filter: 'blur(100px)', opacity: 0.1, borderRadius: '50%' }}></div>

        <div style={{
          backgroundColor: '#dcfce7',
          color: 'var(--success)',
          padding: '1.25rem',
          borderRadius: '50%',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)'
        }}>
          <CheckCircle size={40} strokeWidth={2.5} />
        </div>

        <h2 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)', marginBottom: '1rem' }}>Request Broadcasted!</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.125rem' }}>
          Your requirement for <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{data?.part || 'Custom Part'}</span> is live.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--secondary)', display: 'block', marginBottom: '0.25rem' }}>STATUS</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div className="status-dot"></div>
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>BROADCASTING</span>
            </div>
          </div>
          <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--secondary)', display: 'block', marginBottom: '0.25rem' }}>REQUEST ID</span>
            <span style={{ fontWeight: 800, color: 'var(--accent)', fontSize: '0.9rem' }}>#{displayId}</span>
          </div>
          <div className="glass" style={{ padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--secondary)', display: 'block', marginBottom: '0.25rem' }}>LOCATION</span>
            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Sharjah Industrial</span>
          </div>
        </div>

        {offers.length > 0 ? (
          <OffersTable offers={offers} requestId={displayId} partName={data?.part} />
        ) : (
          <div style={{
            padding: '3rem',
            backgroundColor: 'var(--background)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--border)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}>
            <div className="searching-spinner big"></div>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Finding the best offers...</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We are currently matching your request with Sharjah dealers.</p>
            </div>
          </div>
        )}

        <button
          className="btn btn-outline"
          onClick={onReset}
          style={{ marginTop: '3rem', width: 'auto' }}
        >
          <ArrowLeft size={18} />
          Back to Catalogue
        </button>
      </div>

      <style>{`
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          70% { transform: scale(1.1); opacity: 0.8; box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { transform: scale(1); opacity: 1; }
        }
        .searching-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid var(--border);
          border-top: 3px solid var(--accent);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        .searching-spinner.big {
          width: 48px;
          height: 48px;
          border-width: 4px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const OffersTable = ({ offers, requestId, partName }) => {
  const [lockedOffers, setLockedOffers] = useState([]);

  const toggleLock = (offerId) => {
    setLockedOffers(prev =>
      prev.includes(offerId)
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  const connectWithDealers = () => {
    const selected = offers.filter(o => lockedOffers.includes(o.id));
    const dealerText = selected.map(o => `${o.dealer_name} (AED ${o.price})`).join(', ');
    const message = `Hi, I'm interested in the offers for ${partName} (Request ID: #${requestId}). Specifically for: ${dealerText}`;
    window.open(`https://wa.me/971501234567?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fade-in" style={{ textAlign: 'left', marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem' }}>Receive Dealer Offers ({offers.length})</h3>
        {lockedOffers.length > 0 && (
          <button className="btn btn-primary" onClick={connectWithDealers} style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
            Connect with {lockedOffers.length} {lockedOffers.length === 1 ? 'Dealer' : 'Dealers'}
          </button>
        )}
      </div>

      <div className="glass" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.03)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left' }}>DEALER</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>CONDITION</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>PRICE</th>
                <th style={{ padding: '1rem', textAlign: 'left' }}>DELIVERY</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => {
                const isLocked = lockedOffers.includes(offer.id);
                return (
                  <tr key={offer.id} style={{
                    borderBottom: '1px solid var(--border)',
                    backgroundColor: isLocked ? 'rgba(59, 130, 246, 0.05)' : 'transparent',
                    transition: 'background-color 0.2s ease'
                  }}>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, color: 'var(--primary)' }}>{offer.dealer_name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--secondary)' }}>
                        <Star size={10} fill="currentColor" /> {offer.rating} • Verified
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'white', border: '1px solid var(--border)' }}>
                        {offer.condition}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', fontWeight: 800, color: 'var(--accent)' }}>
                      AED {offer.price}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>{offer.delivery}</td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <button
                        onClick={() => toggleLock(offer.id)}
                        style={{
                          padding: '0.5rem',
                          borderRadius: '50%',
                          backgroundColor: isLocked ? 'var(--accent)' : 'var(--background)',
                          color: isLocked ? 'white' : 'var(--secondary)',
                          border: '1px solid ' + (isLocked ? 'var(--accent)' : 'var(--border)')
                        }}
                      >
                        {isLocked ? <Check size={16} /> : <Lock size={16} />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
