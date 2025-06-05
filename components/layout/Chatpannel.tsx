// components/layout/ChatPanel.tsx
"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MessageSquare } from "lucide-react"
import { ChatMessages } from "../chat/ChatMessages"
import { ChatInput } from "../chat/ChatInput"

export function ChatPanel() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-40 left-32 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-32 right-40 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-ping delay-1000"></div>
      </div>

      <div className="fixed bottom-4 right-4 md:relative md:bottom-0 md:right-0 z-10">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button 
              size="icon" 
              className="md:hidden fixed bottom-4 right-4 z-40 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-[1.02]"
            >
              <MessageSquare />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-full sm:w-[400px] md:w-[350px] bg-black/20 backdrop-blur-xl border-l border-white/10 text-white">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">💬 AI Assistant</h3>
              <div className="flex-1 overflow-y-auto bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-2 mb-4">
                <ChatMessages />
              </div>
              <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-2">
                <ChatInput />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Show as panel on desktop */}
        <div className="hidden md:flex md:flex-col h-screen w-[350px] bg-black/20 backdrop-blur-xl border-l border-white/10 p-3 shadow-2xl shadow-blue-500/10 relative z-10">
          <h3 className="text-lg font-semibold mb-2 bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">💬 AI Assistant</h3>
          <div className="flex-1 overflow-y-auto bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-2 mb-4">
            <ChatMessages />
          </div>
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-2">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  )
}
