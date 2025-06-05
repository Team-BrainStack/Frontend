// components/layout/Topbar.tsx
"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function Topbar() {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background px-4 py-2 flex items-center justify-between gap-4">
      <Input
        type="search"
        placeholder="Search memories…"
        className="max-w-md"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/dashboard/chat?query=${encodeURIComponent(e.currentTarget.value)}`)
          }
        }}
      />
      <div className="flex items-center gap-3">
        <Button asChild>
          <Link href="/dashboard/memory/new">➕ Add</Link>
        </Button>
        <div className="w-8 h-8 rounded-full bg-muted border" />
      </div>
    </header>
  )
}
