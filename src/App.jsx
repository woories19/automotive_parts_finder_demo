import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Catalogue from './components/Catalogue';
import RequestForm from './components/RequestForm';

function App() {
  const [activeTab, setActiveTab] = useState('catalogue');
  const [submittedData, setSubmittedData] = useState(null);

  const handleRequestSubmit = (data) => {
    setSubmittedData(data);
    setActiveTab('waiting');
  };

  return (
    <>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container" style={{ flex: 1, padding: '2rem 1.5rem' }}>
        {activeTab === 'catalogue' && <Catalogue />}
        {activeTab === 'request' && <RequestForm onSubmit={handleRequestSubmit} />}
        {activeTab === 'waiting' && <SuccessState data={submittedData} onReset={() => setActiveTab('catalogue')} />}
      </main>
      <footer style={{
        padding: '2rem 0',
        textAlign: 'center',
        borderTop: '1px solid var(--border)',
        marginTop: 'auto',
        color: 'var(--text-muted)',
        fontSize: '0.875rem'
      }}>
        <div className="container">
          <p>&copy; 2026 PartsFinder MVP. Connecting Dubai & Sharjah.</p>
        </div>
      </footer >
    </>
  );
}

// Inline SuccessState for now, can move to separate file later
const SuccessState = ({ data, onReset }) => {
  const requestId = Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="fade-in" style={{
      maxWidth: '600px',
      margin: '4rem auto',
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: 'white',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      border: '1px solid var(--border)'
    }}>
      <div style={{
        backgroundColor: '#dcfce7',
        color: '#166534',
        padding: '1rem',
        borderRadius: '50%',
        width: '64px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem'
      }}>
        <CheckCircle size={32} />
      </div>
      <h2 style={{ marginBottom: '1rem' }}>Request Submitted!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>
        We’re checking availability with nearby dealers. You’ll see offers appear here shortly.
      </p>

      <div style={{
        backgroundColor: 'var(--background)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-md)',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span style={{ fontWeight: 600 }}>Request ID:</span>
          <span style={{ color: 'var(--accent)', fontWeight: 700 }}>#{requestId}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 600 }}>Part Requested:</span>
          <span style={{ color: 'var(--text-main)' }}>{data?.part}</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
        <div className="searching-spinner"></div>
        <span>Searching for offers from 12 Sharjah dealers...</span>
      </div>

      <button
        className="btn btn-outline"
        onClick={onReset}
        style={{ marginTop: '2rem' }}
      >
        Back to Catalogue
      </button>

      <style>{`
        .searching-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border);
          border-top: 2px solid var(--accent);
          borderRadius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default App;
