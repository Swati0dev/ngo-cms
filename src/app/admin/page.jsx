"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminPagesList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Poll our internal Phase 6 API strictly on the client
  useEffect(() => {
    fetch('/api/pages')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPages(data.pages);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Dashboard Fetch Error", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.2rem', color: '#0f172a', fontWeight: 'bold' }}>Website Pages</h1>
        <Link 
          href="/admin/pages/new" 
          style={{ backgroundColor: '#2563eb', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
        >
          + Create New Page
        </Link>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Loading CMS data...</div>
      ) : (
        <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -2px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: '600' }}>Page Title</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: '600' }}>URL Route</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '1rem 1.5rem', color: '#475569', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s' }}>
                  <td style={{ padding: '1rem 1.5rem', color: '#0f172a', fontWeight: '500' }}>{page.title}</td>
                  <td style={{ padding: '1rem 1.5rem', color: '#64748b' }}>
                    <span style={{ backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                      /{page.slug}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      backgroundColor: page.status === 'published' ? '#dcfce3' : '#fef3c7', 
                      color: page.status === 'published' ? '#166534' : '#92400e', 
                      fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      {page.status?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <Link href={`/admin/pages/${page.id}`} style={{ color: '#2563eb', textDecoration: 'none', marginRight: '1.5rem', fontWeight: '500' }}>
                      Build UI
                    </Link>
                    <Link href={`/${page.slug === 'home' ? '' : page.slug}`} target="_blank" style={{ color: '#10b981', textDecoration: 'none', fontWeight: '500' }}>
                      Test Live
                    </Link>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
                    No pages have been created yet. Click "Create New Page" to start.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
