import Link from 'next/link';
import { ArrowRight, ChevronRight, Check } from 'lucide-react';
import styles from '@/styles/components.module.css';

const ICON_MAP = {
  "arrow-right": ArrowRight,
  "chevron-right": ChevronRight,
  "check": Check
};

export default function Button({ label, href, iconType, variant = 'primary', size = 'medium', className = '' }) {
  const combinedClasses = `${styles.btn} ${styles[`btn_${variant}`]} ${styles[`btn_${size}`]} ${className}`;
  const IconRender = iconType ? ICON_MAP[iconType] : null;

  const content = (
    <>
      {label}
      {IconRender && <IconRender size={18} style={{ marginLeft: '8px' }} />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses}>
      {content}
    </button>
  );
}
