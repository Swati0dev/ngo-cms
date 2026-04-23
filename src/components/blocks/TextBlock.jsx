import styles from '@/styles/components.module.css';

export default function TextBlock({ html, text, variant = 'body' }) {
  const cssClass = styles[`text_${variant}`] || styles.text_body;

  if (html) {
    return <div className={cssClass} dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return <p className={cssClass}>{text}</p>;
}
