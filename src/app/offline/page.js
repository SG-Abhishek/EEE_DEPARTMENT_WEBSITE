// app/offline/page.js
'use client';

export default function OfflinePage() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem',
      color: '#fff',
      backgroundColor: '#0f172a'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>You are currently offline</h1>
      <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
        Please check your internet connection to load pages on the EEE Department portal.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '0.6rem 1.2rem',
          backgroundColor: '#2563eb',
          color: '#fff',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer'
        }}
      >
        Retry
      </button>
    </div>
  );
}