// components/memory/MemoryList.tsx
import { MemoryCard } from "./Memorycard"

interface Memory {
  id: string
  userId: string
  content: string
  title?: string
  tags: string[]
  createdAt: string
}

interface MemoryListProps {
  memories: Memory[]
}

export function MemoryList({ memories }: MemoryListProps) {
  if (memories.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-10">
        No memories found. Try adding a new one!
      </div>
    )
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {memories.map((memory) => (
        <MemoryCard key={memory.id} memory={memory} />
      ))}
    </div>
  )
}
