import React, { useState } from "react";
import { clearDemoState } from '../api/mock/storage';

// Shown only in the static portfolio build (DEMO_MODE=true).
export default function DemoBanner() {
  const [open, setOpen] = useState(true);
  if (process.env.DEMO_MODE !== 'true' || !open) return null;

  const reset = () => {
    clearDemoState();
    window.location.href = '/';
  };

  const link = { color: 'inherit', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 };

  return (
    <div
      role="status"
      style={{
        position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 2000,
        maxWidth: 720, margin: '0 auto', padding: '10px 16px', borderRadius: 10,
        background: '#1f2937', color: '#f9fafb', fontSize: 14, lineHeight: 1.4,
        boxShadow: '0 6px 24px rgba(0,0,0,0.25)', display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap',
      }}
    >
      <span style={{ flex: '1 1 260px' }}>
        <strong>Demo mode</strong>: no server, fake data, nothing is charged.
        Log in with <code>demo@demo.com</code> / <code>test1234</code>.
      </span>
      <button type="button" style={link} onClick={reset}>Reset demo</button>
      <button type="button" style={link} onClick={() => setOpen(false)} aria-label="Hide demo banner">Hide</button>
    </div>
  );
}
