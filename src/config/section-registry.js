import { Layout, Grid, MousePointerClick, Image, MessageSquare, Mail, Video, Calendar } from "lucide-react";

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
  },
  GALLERY: {
    name: "Image Gallery",
    icon: Image,
    component: "ImageGallerySection",
    defaultPayload: {
      title: "Our Work in Pictures",
      images: [
        { url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c", caption: "Field Work" },
        { url: "https://images.unsplash.com/photo-1593113565637-0279fc40536d", caption: "Community Impact" }
      ]
    }
  },
  TESTIMONIALS: {
    name: "Testimonials",
    icon: MessageSquare,
    component: "TestimonialSection",
    defaultPayload: {
      title: "What People Say",
      testimonials: [
        { quote: "This NGO completely changed my life for the better.", author: "Jane Doe", role: "Beneficiary" }
      ]
    }
  },
  CONTACT_FORM: {
    name: "Contact Form",
    icon: Mail,
    component: "ContactFormSection",
    defaultPayload: {
      title: "Get In Touch",
      subtitle: "We would love to hear from you."
    }
  },
  VIDEO_PLAYER: {
    name: "Video Player",
    icon: Video,
    component: "VideoPlayerSection",
    defaultPayload: {
      title: "Watch Our Story",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
    }
  },
  EVENT_CALENDAR: {
    name: "Event Calendar",
    icon: Calendar,
    component: "EventCalendarSection",
    defaultPayload: {
      title: "Upcoming Events",
      events: [
        { name: "Annual Fundraiser", date: "2026-05-15", description: "Join us for our annual gala." }
      ]
    }
  }
};

export const getSectionMetadata = (type) => SECTION_REGISTRY[type.toUpperCase()] || null;
export const getAllSectionTypes = () => Object.keys(SECTION_REGISTRY);
