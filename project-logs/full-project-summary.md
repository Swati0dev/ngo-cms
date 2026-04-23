# 🏆 NGO CMS: The Ultimate Project Handover Document

This document is the definitive guide to the architecture, development journey, and code logic of the Modular NGO CMS. It is designed to onboard any developer or AI agent in minutes.

---

## **🌟 Project Overview**
- **Product:** A registry-driven, component-based CMS for NGOs.
- **Stack:** Next.js 16 (App Router/Turbopack), Prisma 7.7.0 (Driver Adapters), Neon PostgreSQL.
- **Design:** Modern Vanilla CSS (No Tailwind), Lucide Icons, Mobile-First.

---

## **🛤️ The Journey (Phases 1 - 11)**

1. **Foundations:** Established a strict Service Layer (`PageService`, `SectionService`) to decouple DB logic from the UI.
2. **Dynamic Engine:** Built a `PageRenderer` that maps DB JSON payloads to atomic UI blocks (`Hero`, `CardGrid`, `CTA`).
3. **Admin Builder:** Developed a dual-panel interactive editor for real-time page structure management.
4. **Security & Payments:** Integrated NextAuth for admin protection and Razorpay for secure donations (with server-side signature verification).
5. **Hardening:** Performed a deep architectural audit to make the system "Registry-Driven" and Next.js 16 production-ready.

---

## **🛠️ Key Code Architectures (The "What" & "How")**

### **1. Registry-Driven CMS (`src/config/section-registry.js`)**
The project uses a **Single Source of Truth**. Any new section type added to this registry is automatically available in both the Admin Builder and the Page Renderer.
```javascript
export const SECTION_REGISTRY = {
  HERO: { name: "Hero", component: "HeroSection", defaultPayload: {...} },
  // Adding a section here updates the entire system.
};
```

### **2. Prisma 7 Driver Adapters (`src/lib/prisma.js`)**
To handle Prisma 7's breaking changes, we implemented the **Driver Adapter** pattern using `pg` pools.
```javascript
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
```

### **3. Build Safety Guards (`src/app/api/pages/route.js`)**
To prevent crashes during Next.js 16 static analysis/build time, all API routes feature a **`NEXT_PHASE` bypass**.
```javascript
if (process.env.NEXT_PHASE === 'phase-production-build') {
  return NextResponse.json({ success: true });
}
```

### **4. Real-Time SSR & SEO (`src/app/(public)/[slug]/page.jsx`)**
We use `force-dynamic` to bypass stale caching and `generateMetadata` to provide dynamic SEO titles/descriptions for every CMS page.

---

## **⚠️ Critical Challenges & Resolutions**

| Challenge | Resolution |
| :--- | :--- |
| **Next.js 16 Build Crash** | Injected `NEXT_PHASE` guards into all DB-dependent API routes. |
| **Prisma 7 Migration** | Installed `@prisma/adapter-pg` and refactored the Singleton client. |
| **Admin Security** | Configured `middleware.js` to protect `/admin` while keeping `/auth/login` accessible. |
| **CMS Caching** | Enforced `force-dynamic` on all SSR pages to ensure instant live updates. |

---

## **🤖 Guidelines for the Next Agent**
- **Stick to Vanilla CSS:** Use `.module.css` for all styles.
- **Update the Registry:** When adding new section types, start with `section-registry.js`.
- **Follow the Workflow:** Always run `npm run build` after major changes as per `.agent/workflow/verification-workflow.md`.

---

**Project Handover Status: 100% COMPLETE.** 🚀
