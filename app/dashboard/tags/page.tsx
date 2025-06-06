"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
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

export default function TagsPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const { data: session } = betterAuthClient.useSession()

  useEffect(() => {
    if (!session?.user?.id) return

    const fetchMemories = async () => {
      try {
        const res = await fetch(`${serverUrl}/memories/user/${session.user.id}`)
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

  const allTags = Array.from(
    new Set(memories.flatMap((m) => m.tags))
  ).filter(Boolean)

  const filteredMemories =
    selectedTag === null
      ? []
      : memories.filter((m) => m.tags.includes(selectedTag))

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full rounded-lg bg-white/20" />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm mb-2">
            Tap a Tag, Unlock a Memory 🔓
          </h1>
      <div className="flex flex-wrap gap-3 mb-8">
        {allTags.map((tag) => (
          <Button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`rounded-full text-xs px-3 py-1 border border-white/10 ${
              selectedTag === tag
                ? "bg-white/10 text-cyan-300"
                : "bg-transparent hover:bg-white/5"
            }`}
          >
            {tag}
          </Button>
        ))}

        {selectedTag && (
          <Button
            onClick={() => setSelectedTag(null)}
            className="rounded-full text-xs px-3 py-1 border border-red-500 text-red-300 hover:bg-red-500/10"
          >
            Clear Filter
          </Button>
        )}
      </div>

      {selectedTag && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredMemories.length === 0 ? (
            <p className="text-gray-400 text-sm">No memories found for “{selectedTag}”.</p>
          ) : (
            filteredMemories.map((memory) => (
              <Card
                key={memory.id}
                className="bg-black/20 border border-white/10 backdrop-blur-xl text-white shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <CardContent className="p-4">
                  <h2 className="font-bold text-lg mb-2 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    {memory.title || "Untitled Memory"}
                  </h2>
                  <p className="text-gray-300 text-sm line-clamp-3">{memory.content}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {memory.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-white/10 text-cyan-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-gray-400">
                    {new Date(memory.createdAt).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  )
}
