export default function DashboardPage() {
  return (
    <div className="flex items-center justify-center h-full w-full relative  bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="p-8 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl shadow-blue-500/10">
        <h1 className="text-xl md:text-3xl font-bold text-center bg-gradient-to-r from-white via-blue-300 to-cyan-300 bg-clip-text text-transparent drop-shadow-lg">
          Welcome to Memory Assistant 👋
        </h1>
        <p className="mt-4 text-center text-gray-300 text-sm md:text-base">
          Your AI-powered memory assistant is ready to help you store, search, and relive your moments.
        </p>
      </div>
    </div>
  )
}
