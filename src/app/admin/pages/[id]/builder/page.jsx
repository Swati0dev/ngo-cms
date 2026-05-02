"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUp, ArrowDown, Trash2, Plus, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { SECTION_REGISTRY, getAllSectionTypes } from '@/config/section-registry';

export default function PageBuilder({ params }) {
  const router = useRouter();
  const { id: pageId } = use(params);
  
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [activeSectionId, setActiveSectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 📡 Initial Data Fetching from Phase 6 APIs
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/pages`); // We'll filter client-side or we could make a specific ID route
        const data = await res.json();
        if (data.success) {
          const currentPage = data.pages.find(p => p.id === pageId);
          if (currentPage) {
            setPage(currentPage);
            // Sort sections by sortOrder before setting state
            const sortedSections = (currentPage.sections || []).sort((a, b) => a.sortOrder - b.sortOrder);
            setSections(sortedSections);
            if (sortedSections.length > 0) setActiveSectionId(sortedSections[0].id);
          }
        }
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [pageId]);

  // ➕ Add New Section Logic
  const addSection = async (type) => {
    const config = SECTION_REGISTRY[type];
    if (!config) return;

    const newSection = {
      id: `temp-${Date.now()}`,
      type: type,
      payload: JSON.parse(JSON.stringify(config.defaultPayload)), // Deep clone
      sortOrder: sections.length
    };
    const updated = [...sections, newSection];
    setSections(updated);
    setActiveSectionId(newSection.id);
  };

  // 🗑️ Delete Section
  const deleteSection = (id) => {
    const updated = sections.filter(s => s.id !== id);
    setSections(updated);
    if (activeSectionId === id) setActiveSectionId(updated[0]?.id || null);
  };

  // 🔼 Move Section Logic
  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;
    
    [newSections[index], newSections[targetIndex]] = [newSections[targetIndex], newSections[index]];
    
    // Update sortOrder numbers
    const reordered = newSections.map((s, idx) => ({ ...s, sortOrder: idx }));
    setSections(reordered);
  };

  // ✍️ Update Payload Logic (The Right Panel Editor)
  const updatePayload = (key, value) => {
    const updated = sections.map(s => {
      if (s.id === activeSectionId) {
        return { ...s, payload: { ...s.payload, [key]: value } };
      }
      return s;
    });
    setSections(updated);
  };

  // 💾 Final Save to Neon via API
  const handleSave = async () => {
    setSaving(true);
    try {
      // 1. We update the page status/title if needed
      // 2. We loop and update/create sections
      // For simplicity in this demo, we'll hit the /api/sections endpoint for each
      for (const section of sections) {
        const isTemp = String(section.id).startsWith('temp-');
        const method = isTemp ? 'POST' : 'PUT';
        const body = isTemp 
          ? { pageId, type: section.type, payload: section.payload, sortOrder: section.sortOrder }
          : { sectionId: section.id, payload: section.payload, sortOrder: section.sortOrder };

        await fetch('/api/sections', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
      }
      alert("Page Updated Successfully!");
      router.refresh();
    } catch (err) {
      alert("Failed to save. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading Builder...</div>;

  const activeSection = sections.find(s => s.id === activeSectionId);

  return (
    <div style={{ display: 'flex', transition: 'all 0.3s' }}>
      
      {/* 🧩 LEFT PANEL: Structure Management */}
      <div style={{ width: '380px', borderRight: '1px solid #e2e8f0', height: 'calc(100vh - 100px)', padding: '1.5rem', overflowY: 'auto', backgroundColor: '#fdfdfd' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#64748b', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Page Structure
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sections.map((section, index) => (
            <div 
              key={section.id} 
              onClick={() => setActiveSectionId(section.id)}
              style={{ 
                padding: '1rem', 
                borderRadius: '8px', 
                border: activeSectionId === section.id ? '2px solid #2563eb' : '1px solid #e2e8f0',
                backgroundColor: activeSectionId === section.id ? '#eff6ff' : 'white',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>{index + 1}. {section.type}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'up'); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#475569' }}><ArrowUp size={16} /></button>
                  <button onClick={(e) => { e.stopPropagation(); moveSection(index, 'down'); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#475569' }}><ArrowDown size={16} /></button>
                  <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc2626' }}><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px dashed #cbd5e1' }}>
          <p style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem', color: '#475569' }}>ADD NEW SECTION</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {getAllSectionTypes().map((type) => {
              const config = SECTION_REGISTRY[type];
              const Icon = config.icon;
              return (
                  <button 
                    key={type}
                    onClick={() => addSection(type)} 
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', 
                      fontSize: '0.8rem', cursor: 'pointer', borderRadius: '4px', 
                      border: '1px solid #94a3b8', backgroundColor: '#ffffff',
                      color: '#0f172a', fontWeight: '600'
                    }}
                  >
                    <Icon size={14} color="#2563eb" /> {config.name}
                  </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 📝 RIGHT PANEL: Content Editor */}
      <div style={{ flex: 1, padding: '2.5rem', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>Editing: {page?.title}</h2>
            <p style={{ color: '#475569', fontWeight: '500', marginTop: '4px' }}>Route: /{page?.slug}</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
             <Link href={`/${page?.slug}`} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px solid #cbd5e1', borderRadius: '6px', textDecoration: 'none', color: '#1e293b', fontWeight: '600' }}>
               <Eye size={18} /> Preview
             </Link>
             <button 
               onClick={handleSave}
               disabled={saving}
               style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 25px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
             >
               <Save size={18} /> {saving ? 'Saving...' : 'Publish Changes'}
             </button>
          </div>
        </div>

        {activeSection ? (
          <div style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #2563eb' }}>
               <h4 style={{ margin: 0, color: '#1e293b' }}>Configuring {activeSection.type} Block</h4>
               <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Updates here are stored in the local state until you click Publish.</p>
            </div>

            {/* Dynamic Form Logic based on Active Section Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               {activeSection.type === 'HERO' && (
                 <>
                   <div><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Mission Badge</label>
                     <input type="text" value={activeSection.payload.missionBadge || ''} onChange={(e) => updatePayload('missionBadge', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                   <div><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Hero Title</label>
                     <input type="text" value={activeSection.payload.title || ''} onChange={(e) => updatePayload('title', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                   <div><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Subtitle</label>
                     <textarea rows="3" value={activeSection.payload.subtitle || ''} onChange={(e) => updatePayload('subtitle', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                   <div><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Background Image URL</label>
                     <input type="text" value={activeSection.payload.bgImage || ''} onChange={(e) => updatePayload('bgImage', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                   <div style={{display:'flex', gap:'1rem'}}>
                     <div style={{flex:1}}><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Button 1 Label</label>
                       <input type="text" value={activeSection.payload.button1?.label || ''} onChange={(e) => updatePayload('button1', {...activeSection.payload.button1, label: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                     <div style={{flex:1}}><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Button 2 Label</label>
                       <input type="text" value={activeSection.payload.button2?.label || ''} onChange={(e) => updatePayload('button2', {...activeSection.payload.button2, label: e.target.value})} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                   </div>
                 </>
               )}

               {activeSection.type === 'CTA' && (
                 <>
                   <div><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>CTA Heading</label><input type="text" value={activeSection.payload.heading || ''} onChange={(e) => updatePayload('heading', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                   <div><label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Body Text</label><textarea rows="3" value={activeSection.payload.text || ''} onChange={(e) => updatePayload('text', e.target.value)} style={{ width: '100%', padding: '0.8rem', border: '1px solid #cbd5e1' }} /></div>
                 </>
               )}

               {['GLOBAL_HEADER', 'GLOBAL_FOOTER', 'STATS', 'EVENTS', 'SUCCESS_STORIES', 'NEWSLETTER', 'CARD_GRID'].includes(activeSection.type) && (
                 <>
                   <div style={{ marginBottom: '1.5rem' }}>
                     <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#eab308' }}>Advanced Configuration (JSON)</label>
                     <p style={{fontSize: '0.85rem', color: '#64748b', marginBottom: '1rem'}}>For complex layouts like {activeSection.type}, you can edit the raw JSON structure directly to update text, links, and cards.</p>
                     <textarea 
                       value={JSON.stringify(activeSection.payload, null, 2)} 
                       onChange={(e) => {
                         try {
                           const parsed = JSON.parse(e.target.value);
                           const updated = sections.map(s => s.id === activeSectionId ? { ...s, payload: parsed } : s);
                           setSections(updated);
                         } catch (err) {
                           // Invalid JSON, ignore until fixed
                         }
                       }} 
                        style={{ 
                          width: '100%', padding: '1.2rem', border: '2px solid #cbd5e1', 
                          borderRadius: '8px', fontFamily: 'monospace', fontSize: '14px', 
                          backgroundColor: '#f8fafc', color: '#1e293b', lineHeight: '1.5'
                        }} 
                        rows="15" 
                      />
                   </div>
                 </>
               )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10rem 2rem', color: '#94a3b8' }}>
            <Plus size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <p>Select a section from the left or add a new one to start building.</p>
          </div>
        )}
      </div>

    </div>
  );
}
