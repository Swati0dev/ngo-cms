import { Layout, Grid, MousePointerClick } from "lucide-react";

/**
 * The Section Registry is the single source of truth for the Modular CMS.
 * It maps section types to their visual wrappers, icons, and default payloads.
 */
export const SECTION_REGISTRY = {
  HERO: {
    name: "Hero Section",
    icon: Layout,
    component: "HeroSection",
    defaultPayload: {
      title: "Welcome to Our Mission",
      subtitle: "Helping communities grow together.",
      buttonText: "Donate Now",
      buttonLink: "/donate",
      bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
    }
  },
  CARD_GRID: {
    name: "Features / Grid",
    icon: Grid,
    component: "CardGridSection",
    defaultPayload: {
      sectionTitle: "Our Programs",
      cards: [
        { title: "Education", content: "Empowering children.", image: "", link: "#", linkText: "Learn More" }
      ]
    }
  },
  CTA: {
    name: "Call to Action",
    icon: MousePointerClick,
    component: "CTASection",
    defaultPayload: {
      title: "Ready to help?",
      text: "Join our volunteer network today.",
      buttonText: "Join Us",
      buttonLink: "/volunteer"
    }
  }
};

export const getSectionMetadata = (type) => SECTION_REGISTRY[type.toUpperCase()] || null;
export const getAllSectionTypes = () => Object.keys(SECTION_REGISTRY);
