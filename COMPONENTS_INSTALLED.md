# Installed shadcn/ui Components

## UI Components (src/components/ui/)
1. **button.tsx** - Button component with variants and sizes
2. **input.tsx** - Text input component
3. **label.tsx** - Form label component
4. **card.tsx** - Card container with header, content, footer, title, and description sub-components
5. **badge.tsx** - Badge component with variants
6. **select.tsx** - Select/dropdown component
7. **textarea.tsx** - Textarea component
8. **switch.tsx** - Toggle switch component
9. **alert-dialog.tsx** - Alert dialog component
10. **toast.tsx** - Toast notification component
11. **toaster.tsx** - Toast notification container component

## Hooks (src/hooks/)
1. **use-toast.ts** - Hook for triggering toast notifications

## Installation Details
- All components are installed in `/src/components/ui/` as configured
- Toast hook (use-toast) is installed in `/src/hooks/`
- All dependencies have been automatically installed
- Components are ready to be imported and used throughout the project

## Import Examples
```typescript
// Button
import { Button } from "@/components/ui/button"

// Input
import { Input } from "@/components/ui/input"

// Card
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Toast
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
```
