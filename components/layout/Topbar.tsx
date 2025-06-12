// components/layout/Topbar.tsx
"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Search, Plus, User, LogOut } from "lucide-react"
import { useState, useEffect } from "react" 
import { useDebounce } from "use-debounce"
import axios from "axios"
import betterAuthClient from "@/lib/integrations/better-auth"
import { serverUrl } from "@/lib/environment"

const { useSession } = betterAuthClient;

interface Memory {
  id: string
  title: string
  content: string
  user: {
    username: string
  }
  createdAt: string
}

interface SearchResponse {
  data: Memory[]
}

export function Topbar() {
  const { data: session } = useSession();
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(true)
  const [username, setUsername] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery] = useDebounce(searchQuery, 500)
  const [searchResults, setSearchResults] = useState<Memory[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleLogout = () => {
    betterAuthClient.signOut();
    setLoggedIn(false);
    setUsername(null);
    router.push("/");
  };

  const handleProfileClick = () => {
    router.push("/dashboard/profile")
  }

  // Reset results when query changes
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }
  }, [debouncedQuery])

  // Search effect
  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedQuery.trim()) {
        setSearchResults([])
        setShowResults(false)
        return
      }

      setIsSearching(true)
      try {
        console.log('Searching for:', debouncedQuery);
        console.log('Server URL:', serverUrl);
        console.log('Session:', session);

        const res = await axios.get<SearchResponse>(
  `${serverUrl}/memories/search`,
  {
    params: { q: debouncedQuery },
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  }
);
        
        console.log('Search response:', res.data);
        setSearchResults(res.data.data || res.data || [])
        setShowResults(true)
      } catch (error) {
        console.error("Error fetching search results:", error)
        
        // More detailed error logging
        if (axios.isAxiosError(error)) {
          console.error("Response data:", error.response?.data)
          console.error("Response status:", error.response?.status)
          console.error("Response headers:", error.response?.headers)
          console.error("Request config:", error.config)
        }
        
        setSearchResults([])
        setShowResults(false)
      } finally {
        setIsSearching(false)
      }
    }

    if (debouncedQuery.trim() && session) {
      fetchResults()
    }
  }, [debouncedQuery, session])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (!query.trim()) {
      setShowResults(false)
    }
  }

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`)
    setShowResults(false);
    setSearchQuery("");
  }
};

  const handleResultClick = (result: Memory) => {
    setShowResults(false)
    setSearchQuery("")
    router.push(`/dashboard/memories/${result.id}`)
  }

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

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
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onFocus={() => searchQuery && setShowResults(true)}
              onBlur={() => setTimeout(() => setShowResults(false), 200)}
              className="w-full pl-10 pr-4 py-2 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            />
            
            {/* Search Results Dropdown */}
            {showResults && session && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-black/90 backdrop-blur-sm border border-white/10 rounded-lg shadow-xl max-h-64 overflow-y-auto z-50">
                {isSearching ? (
                  <div className="p-3 text-center text-gray-400 flex items-center justify-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"></div>
                    <span>Searching...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className="w-full text-left p-3 hover:bg-white/10 transition-colors duration-200 border-b border-white/5 last:border-b-0"
                    >
                      <div className="font-medium text-white truncate">{result.title}</div>
                      <div className="text-sm text-gray-400 truncate mt-1">
                        {truncateContent(result.content)}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        by {result.user.username} • {new Date(result.createdAt).toLocaleDateString()}
                      </div>
                    </button>
                  ))
                ) : searchQuery.trim() && (
                  <div className="p-3 text-center text-gray-400">
                    No memories found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Add Memory Button */}
          <Button 
            asChild
            className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
          >
            <Link href="/dashboard/memories/new" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add</span>
            </Link>
          </Button>

          <div className="relative group">
            <button
              onClick={handleProfileClick}
              className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg shadow-blue-500/10"
              title="View Profile"
            >
              <User className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors duration-200" />
            </button>

            {/* Tooltip */}
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-white/10 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200">
              Your Profile
            </div>
          </div>

          {/* Logout Button */}
          <div className="relative group">
            <Button
              onClick={handleLogout}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-red-400 transition-colors duration-300 px-2"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </Button>
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs bg-white/10 text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition duration-200">
              Logout
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}
