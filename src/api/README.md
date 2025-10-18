# TubeGenie API Integration

This directory contains the API layer for TubeGenie, organized following best practices with clear separation of concerns.

## Structure

```
src/api/
├── client/          # API client configuration
├── hooks/           # TanStack Query hooks
├── schemas/         # Zod validation schemas
├── services/        # API service methods
└── index.ts         # Public exports
```

## Usage Example

### Basic Usage

```tsx
"use client";

import { useGenerateContent } from "@/api";
import { toast } from "sonner";

export default function MyComponent() {
  const { mutate, isPending, data } = useGenerateContent({
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Content generated!");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleGenerate = () => {
    mutate({
      topic: "AI in Healthcare 2025",
      model: "tngtech/deepseek-r1t2-chimera:free",
    });
  };

  return (
    <button onClick={handleGenerate} disabled={isPending}>
      {isPending ? "Generating..." : "Generate"}
    </button>
  );
}
```

### With Form Validation

```tsx
import { useGenerateContent, generateContentRequestSchema } from "@/api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FormExample() {
  const form = useForm({
    resolver: zodResolver(generateContentRequestSchema),
  });

  const { mutate } = useGenerateContent();

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return <form onSubmit={onSubmit}>{/* form fields */}</form>;
}
```

## Features

- ✅ **Type Safety**: Full TypeScript support with Zod schemas
- ✅ **Authentication**: Automatic Clerk token handling
- ✅ **Validation**: Request/response validation with Zod
- ✅ **Error Handling**: Comprehensive error handling
- ✅ **React Query**: Built-in caching and state management
- ✅ **Best Practices**: Clean separation of concerns

## Environment Variables

Add to your `.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

## API Reference

### `useGenerateContent(options?)`

TanStack Query mutation hook for generating content.

**Parameters:**

- `options` - Optional mutation options (onSuccess, onError, etc.)

**Returns:**

- `mutate(data)` - Trigger the mutation
- `isPending` - Loading state
- `data` - Response data
- `error` - Error object if failed

**Request Schema:**

```typescript
{
  topic: string;
  model: string;
}
```

**Success Response:**

```typescript
{
  success: true;
  data: {
    titles: string[];
    description: string;
    tags: string[];
    thumbnailIdeas: string[];
    scriptOutline: string[];
    aiModel: string;
  };
}
```

**Error Response:**

```typescript
{
  success: false;
  error: string;
  path?: string;
}
```
