"use client";
import Link from "next/link";export default function RootPage() {
  return (
    <div className="min-h-screen text-white flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <video
  autoPlay
  loop
  muted
  playsInline
  className="absolute top-0 left-0 w-full h-full object-cover z-0"
>
  <source src="/backgroundvideo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80  rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4  relative z-10">
        <div className="text-1xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
        </div>
        <nav className="space-x-6 text-sm text-gray-300">
  <Link href="https://tally.so/r/3ypPJx">
    <span className="hover:text-blue-400 transition-colors duration-300">About us</span>
  </Link>
  <Link href="https://tally.so/r/m6z8Oe">
    <span className="hover:text-blue-400 transition-colors duration-300">Contact</span>
  </Link>
</nav>
      </header>     <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
  <h1 className="text-white font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tight">
    <span className="block">Discover Clarity</span>
    <span className="block">In Complexity</span>
  </h1>  <p className="mt-6 max-w-2xl text-gray-300 text-base md:text-lg">
Your thoughts deserve more than a notebook.
Meet the AI memory that listens, remembers, and chats with you.  </p>  <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
    <Link href="/sign-up">
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-full transition-all">
        Sign Up
      </button>
    </Link>
    <Link href="/log-in">
      <button className="bg-white text-black font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition-all">
        Log In
      </button>
    </Link>
  </div>
</main>    </div>
  );
}