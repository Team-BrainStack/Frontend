// app/dashboard/layout.tsx
"use client"
import { ReactNode } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { ChatPanel } from "@/components/layout/Chatpannel"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Main Page Content */}
        <main className="flex-1 overflow-auto bg-muted/40 p-4">
          {children}
        </main>
      </div>

      {/* AI Chat Assistant Panel */}
      <ChatPanel />
    </div>
  )
}
