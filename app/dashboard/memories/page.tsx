"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { serverUrl } from "@/lib/environment"
import betterAuthClient from "@/lib/integrations/better-auth"

type Memory = {
  id: string
  title: string | null
  content: string
  tags: string[]
  createdAt: string
}

export default function MemoriesPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const { data: session } = betterAuthClient.useSession()

  useEffect(() => {
    if (!session?.user?.email) return

    const fetchMemories = async () => {
      try {
        const res = await fetch(`${serverUrl}/memories/user/${session.user?.email}`)
        const json = await res.json()

        if (json.success) {
          setMemories(json.data)
        } else {
          toast.error(json.error.message)
        }
      } catch (error) {
        console.error(error)
        toast.error("Failed to load memories")
      } finally {
        setLoading(false)
      }
    }

    fetchMemories()
  }, [session])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-10">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg bg-white/20" />
          ))}
        </div>
      </div>
    )
  }

  if (memories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="p-6 text-gray-300 text-center relative z-10">
          No memories yet. Start saving your thoughts!
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3 relative z-10">
        {memories.map(memory => (
          <Card key={memory.id} className="bg-black/20 border border-white/10 backdrop-blur-xl text-white shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
            <CardContent className="p-4">
              <h2 className="font-bold text-lg mb-2 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                {memory.title || "Untitled Memory"}
              </h2>
              <p className="text-gray-300 text-sm">{memory.content}</p>
              <div className="mt-2 text-xs text-gray-400">
                {new Date(memory.createdAt).toLocaleDateString()}{" "}
                {memory.tags?.length > 0 && (
                  <span>· {memory.tags.join(", ")}</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
