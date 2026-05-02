import Button from '@/components/ui/Button';
import ImageBlock from '@/components/ui/ImageBlock';
import componentStyles from '@/styles/components.module.css';
import sectionStyles from '@/styles/sections.module.css';

export default function HeroSection({ payload }) {
  if (!payload) return null;
  
  const { title, subtitle, bgImage, missionBadge, button1, button2 } = payload;
  
  return (
    <section className={sectionStyles.heroSection} style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', position: 'relative' }}>
      {/* Background Image Absolute Layer */}
      {bgImage && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <ImageBlock src={bgImage} alt={title || "Hero Overlay"} priority={true} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)' }}></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15, 23, 42, 0.8) 0%, rgba(15, 23, 42, 0.2) 100%)' }}></div>
        </div>
      )}
      
      {/* Content Layer */}
      <div className={sectionStyles.heroContent} style={{ position: 'relative', zIndex: 1, padding: '0 5%', maxWidth: '800px', textAlign: 'left' }}>
         {missionBadge && (
           <div style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(4px)', color: '#e2e8f0', borderRadius: '20px', fontSize: '0.9rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.2)' }}>
             {missionBadge}
           </div>
         )}
         
         <h1 className={componentStyles.text_hero_title} style={bgImage ? { color: 'white', fontSize: '4rem', lineHeight: '1.1', fontWeight: '800', marginBottom: '1.5rem' } : { fontSize: '4rem', lineHeight: '1.1', fontWeight: '800', marginBottom: '1.5rem' }}>
           {title}
         </h1>
         
         {subtitle && (
           <p className={componentStyles.text_hero_subtitle} style={bgImage ? { color: '#e2e8f0', fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', marginBottom: '2.5rem' } : { fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', marginBottom: '2.5rem' }}>
             {subtitle}
           </p>
         )}
         
         <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
           {button1 && (
             <Button 
               label={button1.label} 
               href={button1.href} 
               variant="primary"
               size="large"
               style={{ backgroundColor: '#fde047', color: '#0f172a', fontWeight: '700' }}
             />
           )}
           {button2 && (
             <Button 
               label={button2.label} 
               href={button2.href} 
               variant="outline"
               size="large"
               style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', backdropFilter: 'blur(4px)' }}
             />
           )}
         </div>
      </div>
    </section>
  );
}
