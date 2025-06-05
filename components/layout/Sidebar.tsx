// components/layout/Sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Tag, Clock, MessageSquare, Settings } from "lucide-react"

const navItems = [
  { href: "/dashboard", label: "My Memories", icon: Home },
  { href: "/dashboard/tags", label: "Tags", icon: Tag },
  { href: "/dashboard/timeline", label: "Timeline", icon: Clock },
  { href: "/dashboard/chat", label: "Assistant", icon: MessageSquare },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-64 bg-background border-r p-4 hidden md:flex flex-col">
      <h2 className="text-xl font-bold mb-6">🧠 MemoryVault</h2>
      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-muted",
              pathname === href && "bg-muted text-primary"
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
