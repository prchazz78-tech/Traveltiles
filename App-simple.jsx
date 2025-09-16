import React, { useState } from 'react'

function App() {
  const [message, setMessage] = useState('Travel Tiles Loading...')

  return (
    <div style={{
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🌍 Travel Tiles</h1>
      <p style={{ fontSize: '24px', marginBottom: '30px' }}>{message}</p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setMessage('Knowledge Mode Selected!')}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          🧠 Knowledge Mode
        </button>
        
        <button 
          onClick={() => setMessage('Wacky Facts Mode Selected!')}
          style={{
            padding: '15px 30px',
            fontSize: '18px',
            background: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '12px',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          🎭 Wacky Facts Mode
        </button>
      </div>
      
      <div style={{ marginTop: '40px', fontSize: '16px', opacity: 0.8 }}>
        <p>✅ React is working</p>
        <p>✅ Server is running on port 5173</p>
        <p>✅ Styling is applied</p>
        <p>✅ Click buttons to test interactivity</p>
      </div>
    </div>
  )
}

export default App