# TubeGenie Frontend - AI Coding Guidelines

## Project Overview
TubeGenie is a Next.js 15 application using the App Router for YouTube-related functionality. The app integrates Clerk for user authentication and features a modern UI built with Tailwind CSS v4 and shadcn/ui components.

## Architecture
- **Framework**: Next.js 15 with App Router (`src/app/`)
- **Styling**: Tailwind CSS v4 with custom theme variables
- **UI Components**: shadcn/ui in `src/components/ui/`
- **Authentication**: Clerk with protected routes via middleware
- **Structure**: `src/` directory with `app/`, `components/`, `hooks/`, `lib/`

## Key Patterns
- **Imports**: Use `@/*` alias for `src/` imports (configured in `tsconfig.json`)
- **Styling**: Combine classes with `cn()` utility from `src/lib/utils.ts`
- **Components**: Place reusable UI in `src/components/ui/`, app-specific in `src/components/`
- **Authentication**: Routes are protected by default; public routes listed in `src/middleware.ts`
- **Tailwind**: Use v4 syntax with `@import "tailwindcss"` and custom variants like `@custom-variant dark`

## Workflows
- **Development**: `pnpm dev` (uses Turbopack)
- **Build**: `pnpm build` (includes Turbopack)
- **Lint**: `pnpm lint` (ESLint with Next.js rules)
- **Auth Routes**: Sign-in/up handled by Clerk catch-all routes (`app/sign-in/[[...sign-in]]/`)

## Examples
- **Component with styling**: `<Button className={cn("custom-class", variantStyles)}>`
- **Protected page**: Any route not in `isPublicRoute` requires auth
- **Custom hook**: Place in `src/hooks/` (e.g., `use-mobile.ts` for responsive logic)

## Dependencies
- Clerk: `@clerk/nextjs` for auth
- shadcn/ui: Pre-built components with Tailwind
- Tailwind v4: Modern CSS with PostCSS plugin

Focus on YouTube integration features when adding new functionality.