import { Layout, Grid, MousePointerClick, Image, MessageSquare, Mail, Video, Calendar, ArrowUpToLine, ArrowDownToLine, BarChart3, Star, Bell } from "lucide-react";

/**
 * The Section Registry is the single source of truth for the Modular CMS.
 * It maps section types to their visual wrappers, icons, and default payloads.
 */
export const SECTION_REGISTRY = {
  GLOBAL_HEADER: {
    name: "Global Header",
    icon: ArrowUpToLine,
    component: "GlobalHeader",
    defaultPayload: {
      logoText: "Global Outreach",
      navLinks: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "Events", href: "/events" },
        { label: "Contact Us", href: "/contact" }
      ],
      donateButton: { label: "Donate", href: "/donate" }
    }
  },
  GLOBAL_FOOTER: {
    name: "Global Footer",
    icon: ArrowDownToLine,
    component: "GlobalFooter",
    defaultPayload: {
      description: "Global Outreach is a non-profit organization dedicated to fostering sustainable growth and providing essential resources to underserved communities worldwide. Together, we build foundations for a brighter tomorrow.",
      companyLinks: [
        { label: "About Us", href: "/about" },
        { label: "Our Impact", href: "/impact" },
        { label: "Transparency", href: "/transparency" }
      ],
      involvedLinks: [
        { label: "Volunteer", href: "/volunteer" },
        { label: "Donate Now", href: "/donate" },
        { label: "Careers", href: "/careers" }
      ],
      legalLinks: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookies", href: "/cookies" }
      ],
      copyright: "© 2024 Global Outreach NGO. Empowering communities through transparency and action.",
      bottomLinks: [
        { label: "Support Center", href: "/support" },
        { label: "Contact", href: "/contact" }
      ]
    }
  },
  HERO: {
    name: "Hero Section",
    icon: Layout,
    component: "HeroSection",
    defaultPayload: {
      missionBadge: "Our Mission",
      title: "Restoring Hope, Building Futures.",
      subtitle: "Global Outreach is dedicated to providing sustainable clean water, education, and healthcare to underserved communities across the globe. Together, we can create a world where every individual has the opportunity to thrive.",
      button1: { label: "Donate Now", href: "/donate" },
      button2: { label: "Learn More", href: "/about" },
      bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
    }
  },
  STATS: {
    name: "Stats (Our Footprint)",
    icon: BarChart3,
    component: "StatsSection",
    defaultPayload: {
      preTitle: "Our Footprint",
      title: "The Impact of Your Support",
      bigStat: { value: "1.2 Million", description: "Lives touched through our regional healthcare initiatives in East Africa." },
      topRightStat: { value: "450+", description: "Clean water wells built in remote villages." },
      bottomWideStat: { value: "92%", description: "Funds directly go to community programs on the ground.", secondaryValue: "25k Students", secondaryDesc: "Empowered through digital literacy and scholarship programs." }
    }
  },
  EVENTS: {
    name: "Upcoming Events",
    icon: Calendar,
    component: "EventsSection",
    defaultPayload: {
      preTitle: "Get Involved",
      title: "Upcoming Events",
      events: [
        { date: "15 Oct", title: "Global Reforestation Summit", description: "Join experts and activists to discuss scalable solutions for climate change.", linkText: "Register Now", linkHref: "#", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09" },
        { date: "22 Nov", title: "Annual Gala Dinner", description: "An evening of celebration and fundraising for our next primary initiatives.", linkText: "Reserve Seat", linkHref: "#", image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf" },
        { date: "05 Dec", title: "Volunteer Workshop", description: "Learn how you can contribute your specific skills to our local and global chapters.", linkText: "Get Involved", linkHref: "#", image: "https://images.unsplash.com/photo-1593113565637-0279fc40536d" }
      ]
    }
  },
  SUCCESS_STORIES: {
    name: "Success Stories",
    icon: Star,
    component: "SuccessStoriesSection",
    defaultPayload: {
      preTitle: "Success Stories",
      title: "Real Stories of Transformation",
      description: "We measure our success not by the number of dollars raised, but by the tangible improvements in the lives of the people we serve. Every donation contributes to a narrative of hope and empowerment.",
      featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      quote: "Thanks to Global Outreach, I was the first in my family to attend university.",
      quoteAuthor: "Amina J.",
      quoteRole: "Scholarship Recipient, Kenya",
      features: [
        { title: "Education for All", description: "Built 12 schools providing safe learning environments for 5,000+ children in rural Southeast Asia." },
        { title: "Mental Health Support", description: "Established 24/7 counseling centers for refugees transitioning to new communities." },
        { title: "Mobile Clinics", description: "Launched mobile medical units reaching over 100 isolated villages per month." }
      ],
      readAllLink: "/stories"
    }
  },
  NEWSLETTER: {
    name: "Newsletter",
    icon: Bell,
    component: "NewsletterSection",
    defaultPayload: {
      title: "Stay Informed on Our Progress",
      description: "Subscribe to our newsletter to receive monthly updates on our projects, upcoming events, and stories of impact.",
      placeholder: "Your Email Address",
      buttonText: "Subscribe"
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
  }
};

export const getSectionMetadata = (type) => SECTION_REGISTRY[type.toUpperCase()] || null;
export const getAllSectionTypes = () => Object.keys(SECTION_REGISTRY);
