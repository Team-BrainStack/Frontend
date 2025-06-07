// components/ui/skeleton.tsx
import { cn } from "@/lib/utils"

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-muted rounded-md", className)}
      {...props}
    />
  )
}
