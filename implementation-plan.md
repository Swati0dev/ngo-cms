# Modular Component-Driven API-First Next.js CMS

This system transforms a standard CMS into a **Modular, Layered, Component-Driven Mini Page Builder system**. Pages are dynamically built using SECTIONS, and Sections are built using atomic COMPONENTS. 

## 🏗️ 1. Required Architecture Layers

1. **UI Layer (Next.js pages):** Resides in `app/[slug]/page.jsx`. Fetches structural JSON from the API/Service layer and pipes it to the PageRenderer. It controls *where* things render, but has no business logic.
2. **Section Layer:** Smart containers (e.g. `HeroSection`, `CardGridSection`) in `components/sections/`. This layer takes raw JSON props from the UI layer and maps them to appropriate internal atomic components.
3. **Component Layer:** Pure functional elements (e.g. `Button`, `Card`) in `components/blocks/`. Completely dumb, styled with CSS Modules, and reusable anywhere.
4. **Page Structure Layer:** The JSON data tree (stored in Neon Postgres) defining exactly which Sections exist on a Page and in what order.
5. **API Layer (Route Handlers):** Resides in `app/api/`. These endpoints serve as REST bridges. They do not hold complex logic, they only receive requests and call the Service Layer.
6. **Service Layer:** Business logic abstraction in `src/services/`. This layer transforms and validities the nested JSON structures before Prisma inserts them into the DB.
7. **Data Layer:** Prisma ORM connected to **Neon (Serverless PostgreSQL)**.

---

## 🗄️ 2. Database Design (Prisma + Neon)
The Prisma layout must flexibly support rigid page structures combined with JSON-based flexible block variables.

```prisma
model Page {
  id        String    @id @default(uuid())
  slug      String    @unique
  title     String
  sections  Section[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Section {
  id           String   @id @default(uuid())
  pageId       String
  page         Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)
  type         String   // E.g., "HERO", "TEXT_BLOCK"
  sortOrder    Int      // Admin defined order per page
  payload      Json     // JSON string storing variables like titles, images, array of buttons
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## ⚙️ 3. Frontend Engine (Dynamic Page Renderer)
**File:** `src/lib/pageRenderer.jsx`
The core engine that translates Database JSON back into React components using a `switch/case` or mapping dictionary.

```jsx
import HeroSection from '@/components/sections/HeroSection';
import CardGridSection from '@/components/sections/CardGridSection';
import TextBlock from '@/components/blocks/TextBlock';

const SECTION_MAP = {
  HERO: HeroSection,
  CARD_GRID: CardGridSection,
  TEXT_BLOCK: TextBlock, // Direct block mapping if standalone
};

export default function PageRenderer({ sections }) {
  if (!sections || sections.length === 0) return <div>No content configured for this page.</div>;

  return (
    <>
      {sections
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((section) => {
          const NodeComponent = SECTION_MAP[section.type];
          if (!NodeComponent) return <div key={section.id}>Invalid or missing section type: {section.type}</div>;
          
          // Spread operator passes the JSON 'payload' deeply as props
          return <NodeComponent key={section.id} id={section.id} {...section.payload} />;
      })}
    </>
  );
}
```

---

## 🛠️ 4. Admin Panel Upgrade (Page Builder)
The Admin transitions from editing rich-text blocks to structured visual composition.
- **Page List:** Ability to Create/Delete `Page` instances.
- **Builder UI (`[id]/builder`):** 
  - Allows adding new `Sections` (choosing from 'HERO', 'CTA', etc.).
  - Reordering sections structurally (updating `sortOrder`).
  - Selecting a Section reveals a specific form tailored to that section (e.g., Hero form has 1 image uploader and 1 title array).

---

## 📁 5. File & Folder Structure
```text
d:/project/
├── prisma/
│   └── schema.prisma           
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── [slug]/page.jsx         
│   │   │   ├── donate/page.jsx         
│   │   │   └── page.jsx                
│   │   ├── admin/
│   │   │   ├── layout.jsx
│   │   │   ├── page.jsx                
│   │   │   └── pages/
│   │   │       ├── page.jsx            
│   │   │       └── [id]/builder/page.jsx 
│   │   ├── api/
│   │   │   ├── pages/route.js          
│   │   │   ├── sections/route.js       
│   │   │   └── payment/route.js        
│   ├── components/
│   │   ├── blocks/                     
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── TextBlock.jsx
│   │   │   └── ImageBlock.jsx
│   │   ├── sections/                   
│   │   │   ├── HeroSection.jsx
│   │   │   ├── CardGridSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   └── CTASection.jsx
│   │   └── admin/
│   │       ├── BuilderForm.jsx         
│   │       └── SectionList.jsx         
│   ├── lib/
│   │   └── pageRenderer.jsx            
│   ├── services/                       
│   │   ├── PageService.js              
│   │   └── SectionService.js           
│   └── styles/
│       ├── globals.css
│       └── blocks.module.css
```

---

## 🧭 6. Implementation Phases (Execution Strategy)

### Phase 1: Base Setup
- **What is implemented:** Next.js scaffolding, Neon PostgreSQL init, and the 7-layer architecture folders.
- **Files created:** `package.json`, `prisma/schema.prisma`, `src/services/`, `lib/`

### Phase 2: Component System
- **What is implemented:** Dumb, reusable elements built using standard CSS Modules.
- **Files created:** `components/blocks/Button.jsx`, `components/blocks/Card.jsx`, `components/blocks/TextBlock.jsx`, `components/blocks/ImageBlock.jsx`

### Phase 3: Section System
- **What is implemented:** High-level wrappers collecting atomic components.
- **Files created:** `components/sections/HeroSection.jsx`, `components/sections/CardGridSection.jsx`, `components/sections/CTASection.jsx`

### Phase 4: Dynamic Rendering Engine
- **What is implemented:** Core logic processing the `type` mapping.
- **Files created:** `lib/pageRenderer.jsx`

### Phase 5: CMS Backend (API + DB)
- **What is implemented:** The Business Service and API Route logic to save JSON structures to Neon.
- **Files created:** `services/PageService.js`, `api/pages/route.js`, `api/sections/route.js`

### Phase 6: Admin Panel (Page Builder)
- **What is implemented:** The full visual builder for the admin panel. Form processing for modifying sections.
- **Files created:** `admin/pages/page.jsx`, `admin/pages/[id]/builder/page.jsx`, `components/admin/BuilderForm.jsx`

### Phase 7: Public Frontend Integration
- **What is implemented:** Connecting the Dynamic Renderer (Phase 4) with the API logic (Phase 5) so live pages fetch structures properly.
- **Files created:** `app/(public)/[slug]/page.jsx`, `app/(public)/page.jsx`

### Phase 8: Payment Integration
- **What is implemented:** Razorpay server-side verification and frontend execution.
- **Files created:** `app/(public)/donate/page.jsx`, `api/payment/route.js`

### Phase 9: Optimization
- **What is implemented:** Hardening security, payload validation, CSS cleanups, and load time enhancements.
- **Files modified:** Global middleware, `.env` sanity checks.

### Phase 10: Vercel Deployment (Production)
- **What is implemented:** Deploying the Next.js application to Vercel's edge network securely. Linking production Neon DB environment variables inside the Vercel Dashboard.
- **Files created/modified:** Vercel Dashboard sync, `package.json` build validations.
