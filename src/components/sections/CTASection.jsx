import Button from '@/components/blocks/Button';
import componentStyles from '@/styles/components.module.css';
import sectionStyles from '@/styles/sections.module.css';

export default function CTASection({ payload }) {
  if (!payload) return null;
  
  const { heading, text, button } = payload;
  
  return (
    <section className={sectionStyles.ctaSection}>
      <h2 className={componentStyles.text_hero_title} style={{ color: 'white' }}>
        {heading}
      </h2>
      
      {text && (
        <p className={componentStyles.text_body} style={{ color: '#cbd5e1', fontSize: '1.1rem', margin: '1.5rem auto', maxWidth: '600px' }}>
          {text}
        </p>
      )}
      
      {button && (
        <div style={{ marginTop: '2rem' }}>
           <Button 
             label={button.label} 
             href={button.href} 
             variant={button.variant || 'primary'}
             iconType={button.iconType}
             size="large"
           />
        </div>
      )}
    </section>
  );
}
