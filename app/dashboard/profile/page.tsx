"use client"

import { useEffect, useState } from "react"
import betterAuthClient from "@/lib/integrations/better-auth"
import { serverUrl } from "@/lib/environment"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import { User } from "lucide-react"
import Link from "next/link"

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 flex flex-col items-center gap-10 overflow-hidden">

      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        👤 Your Profile
      </h1>

      {loading ? (
        <div className="flex flex-col gap-4 w-full max-w-lg">
          <Skeleton className="h-24 rounded-xl bg-white/10" />
          <Skeleton className="h-20 rounded-xl bg-white/10" />
          <Skeleton className="h-20 rounded-xl bg-white/10" />
        </div>
      ) : (
        <div className="w-full max-w-xl flex flex-col gap-8">

          {/* Profile Info */}
          <div className="flex items-center gap-4 bg-white/5 px-5 py-4 rounded-xl border border-white/10 backdrop-blur-md shadow-md shadow-blue-500/10">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shadow-inner shadow-blue-600/20">
              <User className="w-6 h-6 text-blue-300" />
            </div>
            <div className="text-sm">
              <h2 className="text-lg font-semibold">{session?.user?.username || "Unnamed User"}</h2>
              <p className="text-gray-400">{session?.user?.email}</p>
            </div>
          </div>

          {/* Stats Section */}
<div className="flex justify-center gap-6">
  {/* Memories Count */}
  <Link href="/dashboard/memories" className="transition-transform hover:scale-105">
    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-700/30 to-cyan-500/10 flex flex-col justify-center items-center text-center border border-white/10 shadow-md shadow-blue-600/10 backdrop-blur-md">
      <span className="text-3xl font-bold text-blue-300">{memoryCount}</span>
      <p className="text-xs text-white/70 mt-1">Memories</p>
    </div>
  </Link>

  {/* Tags Count */}
  <Link href="/dashboard/tags" className="transition-transform hover:scale-105">
    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-600/30 to-blue-600/10 flex flex-col justify-center items-center text-center border border-white/10 shadow-md shadow-cyan-600/10 backdrop-blur-md">
      <span className="text-3xl font-bold text-cyan-300">{uniqueTags.length}</span>
      <p className="text-xs text-white/70 mt-1">Tags</p>
    </div>
  </Link>
</div>


          
        </div>
      )}
    </div>
  )
}
