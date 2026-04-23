"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewPageCreator() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', slug: '', status: 'draft' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Directly pushes to our Phase 6 Neon DB endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (!data.success) {
        setError(data.error || 'Failed to create page.');
      } else {
        // Teleport the admin straight into the Drag/Drop builder for the new page!
        router.push(`/admin/pages/${data.page.id}`);
      }
    } catch (err) {
      console.error(err);
      setError('A fatal network error occurred reaching the backend.');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '650px', margin: '0 auto', backgroundColor: 'white', padding: '3rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
      <h1 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '1.5rem', fontWeight: 'bold' }}>Create New Page</h1>
      
      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', borderLeft: '4px solid #ef4444' }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '600' }}>Page Title</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Our NGO Mission"
            value={formData.title}
            onChange={(e) => {
              // Smart-slug generator: auto formatting human text into URL safe strings
              const val = e.target.value;
              const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
              setFormData({ ...formData, title: val, slug: autoSlug });
            }}
            style={{ width: '100%', padding: '0.9rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem' }} 
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '600' }}>URL Route Slug</label>
          <input 
            type="text" 
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
            style={{ width: '100%', padding: '0.9rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem', backgroundColor: '#f8fafc', fontFamily: 'monospace' }} 
          />
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.4rem' }}>Ex: Using "home" will override the main website starting page.</p>
        </div>

        <div>
           <label style={{ display: 'block', marginBottom: '0.5rem', color: '#475569', fontWeight: '600' }}>Starting Status</label>
           <select 
             value={formData.status}
             onChange={(e) => setFormData({ ...formData, status: e.target.value })}
             style={{ width: '100%', padding: '0.9rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem' }}
           >
             <option value="draft">Draft (Hidden from public site)</option>
             <option value="published">Published (Live to users instantly)</option>
           </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            marginTop: '1rem', 
            padding: '1.2rem', 
            backgroundColor: '#0f172a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            fontWeight: 'bold', 
            fontSize: '1rem',
            cursor: loading ? 'wait' : 'pointer', 
            opacity: loading ? 0.7 : 1,
            transition: 'opacity 0.2s'
          }}
        >
          {loading ? 'Generating Record...' : 'Save & Initiate Design Builder \u2192'}
        </button>
      </form>
    </div>
  );
}
