// app/dashboard/page.tsx
"use client"

import { useState } from "react"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryList } from "@/components/memory/Memorylist"
import { TagFilterBar } from "@/components/memory/Tagfilterbar"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

function DashboardContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["memories"],
    //queryFn: getAllMemories,
  })

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Something went wrong while loading your memories.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Tag Filter and Add Memory */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <TagFilterBar />
        <Button asChild>
          <a href="/dashboard/memory/new">➕ Add Memory</a>
        </Button>
      </div>

      {/* Memory List */}
      {/* {isLoading ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      ) : (
        <MemoryList memories={data} />
      )} */}
    </div>
  )
}

export default function DashboardPage() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  )
}
