// components/memory/MemoryCard.tsx
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

interface Memory {
  id: string
  userId: string
  content: string
  title?: string
  tags: string[]
  createdAt: string
}

interface MemoryCardProps {
  memory: Memory
}

export function MemoryCard({ memory }: MemoryCardProps) {
  return (
    <Link href={`/dashboard/memory/${memory.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader>
          <CardTitle className="text-base line-clamp-1">
            {memory.title || "Untitled Memory"}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(memory.createdAt))} ago
          </p>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm line-clamp-3 text-muted-foreground">
            {memory.content}
          </p>
          <div className="flex flex-wrap gap-1 pt-1">
            {memory.tags?.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
