import React from 'react';
import { Search, PenTool, Car } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav style={{
      backgroundColor: 'var(--primary)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      color: 'white',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            backgroundColor: 'var(--accent)',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Car size={24} />
          </div>
          <h1 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 700 }}>
            PartsFinder <span style={{ color: 'var(--secondary)', fontWeight: 400 }}>MVP</span>
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            className={`btn ${activeTab === 'catalogue' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('catalogue')}
            style={activeTab === 'catalogue' ? {} : { color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <Search size={18} />
            <span>Catalogue</span>
          </button>
          <button 
            className={`btn ${activeTab === 'request' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('request')}
            style={activeTab === 'request' ? {} : { color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
          >
            <PenTool size={18} />
            <span>Request Part</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
