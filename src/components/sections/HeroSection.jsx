import Button from '@/components/blocks/Button';
import ImageBlock from '@/components/blocks/ImageBlock';
import componentStyles from '@/styles/components.module.css';
import sectionStyles from '@/styles/sections.module.css';

export default function HeroSection({ payload }) {
  if (!payload) return null;
  
  const { title, subtitle, bgImage, ctaButton } = payload;
  
  return (
    <section className={sectionStyles.heroSection}>
      {/* Background Image Absolute Layer */}
      {bgImage && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <ImageBlock src={bgImage} alt={title || "Hero Overlay"} priority={true} />
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.65)' }}></div>
        </div>
      )}
      
      {/* Content Layer */}
      <div className={sectionStyles.heroContent}>
         <h1 className={componentStyles.text_hero_title} style={bgImage ? { color: 'white' } : {}}>
           {title}
         </h1>
         
         {subtitle && (
           <p className={componentStyles.text_hero_subtitle} style={bgImage ? { color: '#e2e8f0' } : {}}>
             {subtitle}
           </p>
         )}
         
         {ctaButton && (
           <div style={{ marginTop: '2.5rem' }}>
             <Button 
               label={ctaButton.label} 
               href={ctaButton.href} 
               variant={ctaButton.variant || 'primary'}
               iconType={ctaButton.iconType}
               size="large"
             />
           </div>
         )}
      </div>
    </section>
  );
}
