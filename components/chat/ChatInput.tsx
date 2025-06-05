// components/chat/ChatInput.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatStore } from "@/app/store/chat"

export function ChatInput() {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const addMessage = useChatStore((state) => state.addMessage)
  const addAIResponse = useChatStore((state) => state.addAIResponse)

  const handleSend = async () => {
    if (!query.trim()) return

    addMessage({ role: "user", content: query })
    setQuery("")
    setLoading(true)

    // try {
    //   const response = await sendQueryToAI(query)
    //   addAIResponse(response.answer)
    // } catch (err) {
    //   console.error("Error querying AI:", err)
    //   addAIResponse("❌ Failed to get a response. Please try again.")
    // } finally {
    //   setLoading(false)
    // }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-center gap-2 p-2 border-t">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask anything about your memories..."
        disabled={loading}
      />
      <Button onClick={handleSend} disabled={loading || !query.trim()}>
        Send
      </Button>
    </div>
  )
}
