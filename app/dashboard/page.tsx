// app/dashboard/page.tsx
"use client"

import { useState } from "react"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryList } from "@/components/memory/Memorylist"
import { TagFilterBar } from "@/components/memory/Tagfilterbar"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, Brain, Search, Filter, User, LogOut } from "lucide-react"
import Link from "next/link"

function DashboardContent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['memories'],
    queryFn: async () => {
      const response = await fetch(`localhost:3000/memories`);
      if (!response.ok) {
        throw new Error('Failed to fetch memories');
      }
      return response.json();
    }
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative overflow-hidden">
       
        <div className="container mx-auto px-6 py-8 relative z-10">
          <Card className="max-w-md mx-auto bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-red-500/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-red-500/20 backdrop-blur-sm border border-red-400/30 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  Oops! Something went wrong
                </h3>
                <p className="text-gray-300">
                  We couldn't load your memories right now. Please try again later.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-40 left-32 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-32 right-40 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-ping delay-1000"></div>
      </div>

      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 backdrop-blur-sm bg-black/20 relative z-10">
        <div className="text-xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
          🧠 MemoryVault
        </div>
        <nav className="flex items-center space-x-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Welcome back!</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-colors duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </nav>
      </header>

      <div className="container mx-auto px-6 py-8 relative z-10 flex-1">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/80 to-cyan-600/80 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
                Memory Dashboard
              </h1>
              <p className="text-gray-300">
                Organize and explore your digital memories with AI power
              </p>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Total Memories
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      {data?.length || 0}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                    <Brain className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-500/10 hover:shadow-cyan-500/20 transition-all duration-300 transform hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      Categories
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                      12
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/30 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-cyan-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/10 hover:shadow-blue-500/20 transition-all duration-300 transform hover:scale-[1.02]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-400">
                      This Week
                    </p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                      5
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center">
                    <Plus className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl shadow-blue-500/20 relative">
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/10 rounded-lg pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5 rounded-lg pointer-events-none"></div>
          
          <CardHeader className="pb-4 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                  Your Memories
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Browse, filter, and manage your stored memories
                </CardDescription>
              </div>
              
              <Button 
                asChild 
                className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25 self-start sm:self-auto"
              >
                <Link href="/dashboard/memory/new" className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Memory
                </Link>
              </Button>
            </div>
          </CardHeader>
          
          <Separator className="bg-white/10" />
          
          <CardContent className="pt-6 relative z-10">
            {/* Filter Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">
                  Filter & Search
                </span>
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                <TagFilterBar />
              </div>
            </div>

            <Separator className="bg-white/10 mb-6" />

            {/* Memory List Section */}
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 rounded bg-white/20 animate-pulse" />
                  <Skeleton className="h-4 w-32 bg-white/20" />
                </div>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="bg-black/30 backdrop-blur-sm border border-white/10">
                      <CardContent className="p-4">
                        <Skeleton className="h-4 w-3/4 mb-3 bg-white/20" />
                        <Skeleton className="h-3 w-full mb-2 bg-white/20" />
                        <Skeleton className="h-3 w-2/3 mb-4 bg-white/20" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-16 rounded-full bg-white/20" />
                          <Skeleton className="h-6 w-20 rounded-full bg-white/20" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : data?.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-sm">
                      {data.length} memories found
                    </Badge>
                  </div>
                </div>
                <MemoryList memories={data} />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Brain className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent mb-3">
                  No memories yet
                </h3>
                <p className="text-gray-400 mb-8 max-w-sm mx-auto">
                  Start building your digital memory collection by adding your first memory.
                </p>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0"
                >
                  <a href="/dashboard/memory/new" className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Your First Memory
                  </a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
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
