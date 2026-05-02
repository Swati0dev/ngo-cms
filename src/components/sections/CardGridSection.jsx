import Card from '@/components/ui/Card';
import componentStyles from '@/styles/components.module.css';
import sectionStyles from '@/styles/sections.module.css';

export default function CardGridSection({ payload }) {
  if (!payload) return null;
  
  const { sectionTitle, cards } = payload; // cards expects an Array of JSON objects
  
  return (
    <section className={sectionStyles.gridSection}>
      {/* Optional Super Title */}
      {sectionTitle && (
        <div className={sectionStyles.gridSectionHeader}>
          <h2 className={componentStyles.text_hero_title} style={{ fontSize: '2rem' }}>
            {sectionTitle}
          </h2>
        </div>
      )}
      
      {/* Dynamic Mapping grid */}
      <div className={sectionStyles.gridContainer}>
        {Array.isArray(cards) && cards.length > 0 ? (
          cards.map((cardData, index) => (
            <Card 
              key={index}
              title={cardData.title}
              content={cardData.content}
              image={cardData.image}
              link={cardData.link}
              linkText={cardData.linkText}
            />
          ))
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </section>
  );
}
