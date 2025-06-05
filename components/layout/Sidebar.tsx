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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-10 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-40 left-10 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-32 right-8 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-ping delay-1000"></div>
      </div>

      <aside className="h-full w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 p-4 hidden md:flex flex-col shadow-2xl shadow-blue-500/10 relative z-10">
        <h2 className="text-xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">🧠 MemoryVault</h2>
        <nav className="space-y-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-[1.02]",
                pathname === href 
                  ? "bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-sm border border-blue-400/30 text-white shadow-lg shadow-blue-500/20" 
                  : "text-gray-300 hover:text-white hover:bg-black/30 hover:backdrop-blur-sm hover:border hover:border-white/10"
              )}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  )
}
