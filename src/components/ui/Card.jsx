import ImageBlock from './ImageBlock';
import TextBlock from './TextBlock';
import Button from './Button';
import styles from '@/styles/components.module.css';

export default function Card({ title, content, image, link, linkText = 'Read More' }) {
  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.cardImageWrapper}>
          <ImageBlock src={image} alt={title || 'Card Image'} />
        </div>
      )}
      <div className={styles.cardBody}>
        {title && <h3 className={styles.cardTitle}>{title}</h3>}
        {content && <div className={styles.cardContent}><TextBlock html={content} /></div>}
        {link && (
          <div className={styles.cardFooter}>
            <Button href={link} label={linkText} variant="outline" size="small" />
          </div>
        )}
      </div>
    </div>
  );
}
