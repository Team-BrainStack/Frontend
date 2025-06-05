// components/layout/Topbar.tsx
"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Search, Plus, User, LogOut, Brain } from "lucide-react"

export function Topbar() {
  const router = useRouter()

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Topbar Header */}
      <header className="sticky top-0 z-10 w-full border-b border-white/10 backdrop-blur-sm bg-black/20 px-4 py-3 flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search memories…"
              className="w-full pl-10 pr-4 py-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/dashboard/chat?query=${encodeURIComponent(e.currentTarget.value)}`)
                }
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Add Memory Button */}
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Link href="/dashboard/memory/new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </Link>
          </Button>

          {/* User Menu */}
          <div className="flex items-center gap-2">
            {/* User Avatar */}
            <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <User className="w-4 h-4 text-gray-300" />
            </div>
            
            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-300 px-2"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}