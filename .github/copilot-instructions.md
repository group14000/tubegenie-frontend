# TubeGenie Frontend - AI Coding Guidelines

## Project Overview
TubeGenie is a Next.js 15 application using the App Router for YouTube-related functionality. The app integrates Clerk for user authentication and features a modern UI built with Tailwind CSS v4 and shadcn/ui components.

## Architecture
- **Framework**: Next.js 15 with App Router (`src/app/`)
- **Styling**: Tailwind CSS v4 with custom theme variables
- **UI Components**: shadcn/ui in `src/components/ui/`
- **Authentication**: Clerk with protected routes via middleware
- **API Layer**: TanStack Query + Zod validation + Axios client
- **Structure**: `src/` directory with `app/`, `components/`, `hooks/`, `lib/`, `api/`

## Key Patterns

### API Integration
- **Structure**: `src/api/` with `schemas/` (Zod), `services/`, `hooks/` (TanStack Query), `client/` (Axios)
- **Authentication**: Use `useAuth().getToken()` for Clerk tokens, pass to API hooks
- **Error Handling**: API hooks handle auth automatically, return `{isPending, error, data}`
- **Example**: `const { mutate, isPending } = useGenerateContent({ onSuccess: (data) => toast.success('Done!') })`

### Component Patterns
- **Imports**: Use `@/*` alias for `src/` imports (configured in `tsconfig.json`)
- **Styling**: Combine classes with `cn()` utility from `src/lib/utils.ts`
- **Components**: Place reusable UI in `src/components/ui/`, app-specific in `src/components/`
- **State Management**: TanStack Query for server state, React state for UI state
- **Authentication**: Routes are protected by default; public routes listed in `src/middleware.ts`

### UI/UX Patterns
- **Loading States**: Use `Skeleton` components and `Loader2` icons during async operations
- **Error States**: Use `Alert` components with `AlertCircle` icons for error display
- **Success Feedback**: Use `toast()` from Sonner for user notifications
- **Copy Functionality**: Implement clipboard copy with `navigator.clipboard.writeText()`
- **Responsive Design**: Use Tailwind responsive classes and `useSidebar()` hook

### Navigation & Layout
- **Route Groups**: Dashboard routes use `(dashboard)` group with shared layout
- **Sidebar Navigation**: Active route highlighting with `usePathname()` and `cn()` for styling
- **Layout Structure**: `SidebarProvider` wraps dashboard with `AppSidebar` + main content area

## Workflows
- **Development**: `pnpm dev` (uses Turbopack)
- **Build**: `pnpm build` (includes Turbopack)
- **Lint**: `pnpm lint` (ESLint with Next.js rules)
- **Auth Routes**: Sign-in/up handled by Clerk catch-all routes (`app/sign-in/[[...sign-in]]/`)

## Examples

### API Hook Usage
```tsx
const { mutate, isPending, data, error } = useGenerateContent({
  onSuccess: (response) => {
    if (response.success) {
      toast.success('Content generated!');
    }
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
```

### Component with API Integration
```tsx
export default function MyComponent() {
  const { mutate, isPending } = useGenerateContent();

  return (
    <Button onClick={() => mutate({ topic: 'AI', model: 'deepseek' })} disabled={isPending}>
      {isPending ? <Loader2 className="animate-spin" /> : 'Generate'}
    </Button>
  );
}
```

### Styled Component
```tsx
<Button className={cn("gradient-primary", isActive && "opacity-90")}>
  <Sparkles className="mr-2 h-4 w-4" />
  Generate Content
</Button>
```

### Navigation Menu Item
```tsx
const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
<Link
  href={item.href}
  className={cn(
    "flex items-center gap-3 p-6 rounded-md",
    isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"
  )}
>
```

## Dependencies
- **Clerk**: `@clerk/nextjs` for auth with automatic token handling
- **TanStack Query**: `@tanstack/react-query` for server state management
- **Zod**: Runtime type validation for API requests/responses
- **Sonner**: Toast notifications for user feedback
- **shadcn/ui**: Pre-built components with Radix UI primitives
- **Tailwind v4**: Modern CSS with custom theme variables and `@custom-variant dark`

## Critical Conventions
- **API Responses**: Always check `response.success` before accessing `response.data`
- **Error Handling**: Use try/catch in API services, display errors via toast/alert
- **Loading States**: Show skeletons/loaders during async operations, disable buttons
- **Authentication**: All dashboard routes are protected by default via middleware
- **File Organization**: Keep API logic separate from UI components using custom hooks

Focus on YouTube content generation features when adding new functionality.