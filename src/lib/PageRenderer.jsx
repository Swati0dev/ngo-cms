import HeroSection from '@/components/sections/HeroSection';
import CardGridSection from '@/components/sections/CardGridSection';
import CTASection from '@/components/sections/CTASection';
import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalFooter from '@/components/layout/GlobalFooter';
import StatsSection from '@/components/sections/StatsSection';
import EventsSection from '@/components/sections/EventsSection';
import SuccessStoriesSection from '@/components/sections/SuccessStoriesSection';
import NewsletterSection from '@/components/sections/NewsletterSection';
import { SECTION_REGISTRY } from '@/config/section-registry';

// Dynamic Section Map: Automatically populated from the Registry
const SECTION_MAP = {
  HERO: HeroSection,
  CARD_GRID: CardGridSection,
  CTA: CTASection,
  GLOBAL_HEADER: GlobalHeader,
  GLOBAL_FOOTER: GlobalFooter,
  STATS: StatsSection,
  EVENTS: EventsSection,
  SUCCESS_STORIES: SuccessStoriesSection,
  NEWSLETTER: NewsletterSection,
};

export default function PageRenderer({ sections }) {
  // Safety execution check: ensures we don't crash on empty or corrupted page queries
  if (!Array.isArray(sections) || sections.length === 0) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', color: '#64748b' }}>
        <p>This page has no content yet.</p>
      </div>
    );
  }

  return (
    <>
      {sections.map((sectionConfig, index) => {
        // Enforce UPPERCASE string parsing to completely kill case-sensitivity crash risks
        const rawType = sectionConfig?.type || '';
        const typeKey = String(rawType).toUpperCase().trim();
        const SectionComponent = SECTION_MAP[typeKey];

        // Soft-fail: If the DB returns a bizarre/deleted section type, do not render it, but don't crash
        if (!SectionComponent) {
          console.warn(`[PageRenderer Warning] Unknown layout type requested: ${typeKey}`);
          return null; 
        }

        // Native Injection: Safely pass the JSON payload straight into the Wrapper
        return (
          <SectionComponent 
            key={sectionConfig.id || `section-fallback-${index}`} 
            payload={sectionConfig.payload} 
          />
        );
      })}
    </>
  );
}
