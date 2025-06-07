"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { serverUrl } from "@/lib/environment"
import betterAuthClient from "@/lib/integrations/better-auth"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function ProfilePage() {
  const { data: session } = betterAuthClient.useSession()
  const [loading, setLoading] = useState(true)
  const [memoryCount, setMemoryCount] = useState(0)
  const [uniqueTags, setUniqueTags] = useState<string[]>([])

  useEffect(() => {
    if (!session?.user?.id) return

    const fetchUserStats = async () => {
      try {
        const res = await fetch(`${serverUrl}/memories/user/${session.user.id}`)
        const json = await res.json()

        if (json.success) {
          const memories = json.data
          setMemoryCount(memories.length)
          const tags = new Set<string>()
          memories.forEach((m: any) => m.tags?.forEach((tag: string) => tags.add(tag)))
          setUniqueTags(Array.from(tags))
        } else {
          toast.error(json.error.message)
        }
      } catch (err) {
        console.error(err)
        toast.error("Failed to load profile data")
      } finally {
        setLoading(false)
      }
    }

    fetchUserStats()
  }, [session])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 relative overflow-hidden">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        👤 Your Profile
      </h1>

      {loading ? (
        <div className="grid gap-4 max-w-xl mx-auto">
          <Skeleton className="h-28 rounded-lg bg-white/10" />
          <Skeleton className="h-28 rounded-lg bg-white/10" />
        </div>
      ) : (
        <div className="grid gap-4 max-w-xl mx-auto">
          <Card className="bg-black/20 border border-white/10 backdrop-blur-md text-white shadow-lg shadow-blue-500/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">🧠 Total Memories</h2>
              <p className="text-4xl font-bold text-blue-300">{memoryCount}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-md text-white shadow-lg shadow-cyan-500/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">🏷️ Unique Tags Used</h2>
              <div className="flex flex-wrap gap-2">
                {uniqueTags.length > 0 ? (
                  uniqueTags.map(tag => (
                    <span
                      key={tag}
                      className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-400">No tags found</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-md text-white shadow-lg shadow-indigo-500/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">📧 Email</h2>
              <p className="text-gray-300">{session?.user?.email}</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border border-white/10 backdrop-blur-md text-white shadow-lg shadow-purple-500/10">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">👤 Username</h2>
              <p className="text-gray-300">{session?.user?.username || "N/A"}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
