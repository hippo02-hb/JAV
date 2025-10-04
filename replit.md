# Japanese Language Center Design - Tiếng Nhật Quang Dũng Online (TNQDO)

## Overview

A comprehensive online Japanese language learning center website built with React, TypeScript, and Tailwind CSS. The platform features a modern, responsive design with both user-facing pages and an admin panel for course management. The site showcases courses ranging from beginner (N5) to intermediate (N3) JLPT levels, plus specialized business and professional courses.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18.3.1 with TypeScript for type-safe component development
- Vite as the build tool and development server
- SWC plugin for fast React refresh and compilation

**UI Component Library**
- Radix UI primitives for accessible, unstyled components (accordion, dialog, dropdown, etc.)
- Shadcn/ui design system with custom theme integration
- Tailwind CSS v4 for utility-first styling with custom brand colors
- Motion (Framer Motion) for animations and transitions

**Routing & Navigation**
- Hash-based client-side routing (no external router library)
- Managed through custom App.tsx logic with hash change listeners
- Supports dynamic routes for course details and blog posts

**State Management**
- React hooks (useState, useEffect) for local component state
- Custom event bus system for cross-component communication
- Session storage for admin authentication state
- Supabase PostgreSQL database for data persistence

**Theme System**
- Custom CSS variables defined in globals.css
- Brand colors: Navy (#1b2460), Lavender (#d1d7fe), Green, Rose
- Dark mode support via next-themes
- Consistent spacing and typography scales

### Data Management

**Storage Strategy**
- Supabase PostgreSQL as primary data store (courses, blog posts, teachers, FAQs, company info)
- UUID primary keys for all records
- Relational database with proper schema and indexes
- Row Level Security (RLS) policies for data access control

**Data Models**
- Courses: Full JLPT course details with syllabus, features, requirements, outcomes
- Blog Posts: Content management with categories, tags, publishing status
- Teachers: Instructor profiles with qualifications and experience
- Contact: Inquiry forms and FAQ data

**API Layer Architecture**
- Centralized API client pattern with domain-specific services
- CoursesAPI: Course CRUD operations using Supabase
- BlogAPI/BlogAdminAPI: Blog content management using Supabase
- TeachersAPI: Teacher profile management using Supabase
- ContactAPI: FAQ and company info using Supabase
- AdminAPI: Admin-specific operations with authentication checks
- Supabase client (src/lib/supabase.ts) configured with environment variables

### Admin Panel

**Authentication**
- Simple credential-based login (demo: admin@tnqdo.com / admin123)
- Session storage for auth state
- Session timeout tracking (60-minute default)
- Route guards requiring authentication

**Content Management**
- Course CRUD: Create, read, update, delete courses
- Blog CRUD: Full blog post management with draft/publish workflow
- Image upload: Base64 encoding for inline image storage
- Real-time preview capabilities
- Bulk operations and filtering

**Admin Views**
- Dashboard: Statistics and analytics overview
- Course Management: Table and card views with search/filter
- Blog Management: Content editor with category/tag system
- Debug Panel: Data export/import, storage reset capabilities

### Component Architecture

**Layout Components**
- Header: Fixed navigation with mobile menu support
- Footer: Contact info and quick links
- BackToTop: Scroll-to-top button with visibility detection

**Page Components**
- Home: Hero section, featured courses, testimonials
- AboutPage: Company story and values
- CoursesPage: Course catalog with filtering
- CourseDetailPage: Full course information and enrollment CTA
- BlogPage/BlogDetailPage: Blog listing and individual posts
- TeachersPage: Instructor profiles
- FAQPage: Frequently asked questions
- ContactPage: Contact forms and information
- AdminPage: Admin panel hub
- AdminLoginPage: Authentication interface

**Reusable UI Components**
- Cards, Buttons, Badges for content display
- Forms: Input, Textarea, Select, Switch with validation
- Tables: Sortable, filterable data tables
- Dialogs, Alerts for user interactions
- Tabs, Accordions for content organization

### Image Handling

**Image Management**
- Base64 encoding for uploaded images
- Default fallback images by course level
- Image validation (size, format checking)
- File-to-base64 conversion utilities
- Responsive image display with lazy loading

### Event System

**Cross-Component Communication**
- Custom EventBus class for pub/sub pattern
- Event constants for type safety
- Course and blog update events
- Real-time UI synchronization across components

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of accessible component primitives
- **Lucide React**: Icon library for consistent iconography
- **Sonner**: Toast notification system
- **Recharts**: Charting library for analytics
- **Embla Carousel**: Carousel component
- **React Hook Form**: Form state management
- **React Day Picker**: Date picker component
- **CMDK**: Command menu component

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Type checking and better developer experience
- **Tailwind CSS**: Utility-first CSS framework
- **Motion**: Animation library (Framer Motion)

### Backend Services
- **Supabase**: PostgreSQL database integration (Active)
  - Client initialized with environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
  - TypeScript type definitions for database schema (src/lib/database.types.ts)
  - Database schema: courses, blog_posts, teachers, faqs, company_info tables
  - Row Level Security (RLS) enabled with public read policies
  - SQL schema files: supabase-schema.sql, supabase-sample-data.sql

### Build & Deployment
- **serve**: Static file server for production preview
- **SWC**: Fast JavaScript/TypeScript compiler
- **PostCSS**: CSS processing

### Form & Validation
- **React Hook Form**: Form state and validation
- **Zod**: Schema validation (implicitly through type system)

### Styling
- **class-variance-authority**: Component variant management
- **clsx**: Conditional class name composition
- **tailwind-merge**: Tailwind class merging utility

### Notes on Architecture Decisions

**Why Hash Routing**: Simplifies deployment without server-side routing configuration, works well for static hosting.

**Why Supabase**: Production-ready PostgreSQL database with real-time capabilities, built-in authentication, and automatic API generation. Provides scalability and data persistence.

**Why Event Bus**: Decouples components, enables real-time updates across admin and public views without prop drilling.

**Why Base64 Images**: Simplifies image management by storing images directly in the database, no need for separate object storage for MVP.

### Supabase Setup Instructions

**Database Tables:**
1. courses - Course information and details
2. blog_posts - Blog articles and content
3. teachers - Teacher profiles and information
4. faqs - Frequently asked questions
5. company_info - Company/organization information

**Setup Steps:**
1. Run `supabase-schema.sql` in Supabase SQL Editor to create tables
2. Run `supabase-sample-data.sql` to insert sample data
3. Environment variables are configured via Replit Secrets:
   - SUPABASE_URL
   - SUPABASE_ANON_KEY

### Recent Changes (October 2025)

- Migrated from LocalStorage to Supabase PostgreSQL database
- Updated all API services to use Supabase client
- Configured Vite for Replit environment (allowedHosts: true, port 5000)
- Created database schema and sample data SQL files
- Added TypeScript database type definitions