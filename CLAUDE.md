# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production (TypeScript compilation + Vite build)
- `npm run lint` - Run ESLint on all files
- `npm run preview` - Preview production build locally

### Environment Configuration
- Uses VITE_BASE_URL environment variable for API base URL
- Defaults to `http://localhost:3000/api` if not set
- Development server configured to run on port 3000 with host `0.0.0.0`

## Architecture Overview

### State Management Architecture
This application uses a multi-layered state management approach:

1. **Zustand Stores**: Individual domain stores for different features
   - `useAuthStore` - Authentication state and session management
   - `mealStore` - Meal ordering and management
   - `welfareStore` - Employee welfare benefits
   - `activityStore` - Activity management
   - `calendarDateStore` - Calendar date selections
   - `mainDateStore` - Main dashboard date context

2. **Combined Store Pattern**: `combinedStore.ts` aggregates multiple stores and automatically syncs state changes across stores using subscriptions

3. **React Query Integration**: `useApi.tsx` provides generic hooks for API operations:
   - `useApiQuery` - Generic query hook with automatic parameter handling
   - `useApiMutation` - Generic mutation hook with automatic cache invalidation

### Authentication & Routing Architecture
- **SessionStorage-based Auth**: Token and user data stored in sessionStorage (not localStorage)
- **Multi-stage Route Protection**:
  - `AuthGuard` - Initializes auth state from sessionStorage on app load
  - `ProtectedRoute` - Enforces authentication for protected pages
  - Route structure uses nested routes with Layout component

### API Architecture
- **Axios Client**: `apiClient` with automatic token injection and 401 handling
- **Service Layer**: API services organized by domain in `src/api/services/`
- **Interceptor Pattern**: Request interceptor adds Bearer token, response interceptor handles auth failures

### Component Architecture
- **Domain-based Organization**: Components grouped by business domain (meal, leave, activity, etc.)
- **Common Components**: Shared UI components in `src/components/common/`
- **Layout System**: AppShell-based layout with collapsible navbar
- **Page Components**: Top-level page components in `src/pages/`

## Key Technical Patterns

### TypeScript Configuration
- Uses loose TypeScript settings (`noImplicitAny: false`, `strict: false`)
- Path alias `@/*` maps to `src/*`
- ESLint configured to allow explicit `any` types

### UI Framework Integration
- **Mantine v8**: Primary UI component library
- **FullCalendar**: Calendar functionality with multiple view types and resource management
- **Tailwind CSS v4**: Utility-first styling with Vite plugin
- **PostCSS**: Mantine preset with custom breakpoint variables

### Data Flow Patterns
- **Query Invalidation**: Layout component invalidates specific queries when user context changes
- **Store Synchronization**: Combined store pattern keeps multiple Zustand stores in sync
- **Session Management**: Auth store handles session persistence and restoration

## Project-Specific Conventions

### File Organization
- Services follow domain structure: `src/api/services/{domain}/{domain}.services.ts`
- Components use index.tsx pattern for clean imports
- Stores organized by category: `src/store/{category}/{feature}Store.ts`
- Utilities grouped by domain: `src/utils/{domain}/`

### API Integration
- Environment variable `VITE_BASE_URL` for API base URL configuration
- Generic API hooks handle common patterns like cache invalidation
- Service functions should follow the pattern established in existing services

### State Management
- Use domain-specific stores rather than a single global store
- Subscribe to store changes in combinedStore for cross-store communication
- Auth state initialization must happen in AuthGuard component

### Styling Approach
- Mantine components for complex UI elements
- Tailwind for layout and spacing
- CSS modules for component-specific styles (see `src/styles/`)
- GSAP for animations where needed

## Development Notes

### Environment Setup
- Node.js 18+ required
- Uses ES modules (`"type": "module"` in package.json)
- Development server allows all hosts for network access

### Build Process
- TypeScript compilation runs before Vite build
- Vite handles React compilation with SWC plugin
- PostCSS processes Mantine and Tailwind styles

### Testing & Quality
- ESLint configured for React and TypeScript
- No test framework currently configured
- Use `npm run lint` before committing changes