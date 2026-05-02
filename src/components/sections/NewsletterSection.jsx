import { Mail, ArrowRight } from 'lucide-react';

export default function NewsletterSection({ payload }) {
  if (!payload) return null;
  const { title, description, placeholder, buttonText } = payload;

  return (
    <section style={{ padding: '4rem 5%', backgroundColor: '#0284c7', display: 'flex', justifyContent: 'center' }}>
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '4rem', width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
        
        <div style={{ width: '60px', height: '60px', backgroundColor: '#e0f2fe', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Mail size={30} />
        </div>
        
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' }}>{title || "Stay Updated"}</h2>
        <p style={{ color: '#475569', fontSize: '1.1rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
          {description || "Join our community and get the latest updates on our missions, impact, and how you can help."}
        </p>

        <form style={{ display: 'flex', width: '100%', maxWidth: '500px', gap: '0.5rem' }} onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder={placeholder || "Enter your email address"} 
            style={{ 
              flexGrow: 1, 
              padding: '1rem 1.5rem', 
              borderRadius: '50px', 
              border: '1px solid #cbd5e1', 
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => e.target.style.borderColor = '#0284c7'}
            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            required
          />
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#0f172a', 
              color: 'white', 
              border: 'none', 
              borderRadius: '50px', 
              padding: '0 2rem', 
              fontSize: '1rem', 
              fontWeight: '600', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1e293b'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0f172a'}
          >
            {buttonText || "Subscribe"} <ArrowRight size={18} />
          </button>
        </form>

      </div>
    </section>
  );
}
