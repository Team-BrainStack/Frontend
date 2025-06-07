import { PropsWithChildren, ReactNode } from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { Topbar } from "@/components/layout/Topbar"
import { ChatPanel } from "@/components/layout/Chatpannel"

const DashboardLayout = (props: PropsWithChildren): ReactNode => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <Topbar />

        {/* Main Page Content */}
        <main className="flex-1 overflow-auto ">
          {props.children}
        </main>
      </div>

      {/* AI Chat Assistant Panel */}
      <ChatPanel />
    </div>
  );
};

export default DashboardLayout;
