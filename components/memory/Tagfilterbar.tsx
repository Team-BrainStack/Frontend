// components/memory/TagFilterBar.tsx
"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const exampleTags = ["AI", "Work", "Startups", "Marketing", "Learning", "Personal"]

export function TagFilterBar() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <ScrollArea className="max-w-full">
      <div className="flex gap-2 overflow-x-auto pb-1">
        <Badge
          variant={active === null ? "default" : "outline"}
          onClick={() => setActive(null)}
          className="cursor-pointer"
        >
          All
        </Badge>
        {exampleTags.map((tag) => (
          <Badge
            key={tag}
            variant={active === tag ? "default" : "outline"}
            onClick={() => setActive(tag)}
            className="cursor-pointer"
          >
            {tag}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  )
}
