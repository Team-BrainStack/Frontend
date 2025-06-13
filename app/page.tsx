// "use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";

// export default function RootPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       {/* Navbar */}
//       <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 backdrop-blur-sm bg-black/20 relative z-10">
//         <div className="text-1xl font-bold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
//           🧠 MemoryVault
//         </div>
//         <nav className="space-x-6 text-sm text-gray-300">
//           <Link href="#" className="hover:text-blue-400 transition-colors duration-300">About us</Link>
//           <Link href="#" className="hover:text-blue-400 transition-colors duration-300">Contact</Link>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 container mx-auto flex flex-col md:flex-row items-center justify-center gap-20 px-6 py-10 relative z-10">
//         {/* Left section */}
//         <div className="max-w-xl space-y-6">
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent drop-shadow-sm">
//             AI-powered <br /> memory management
//           </h1>
//           <p className="text-lg text-gray-300">
//             Your thoughts deserve more than a notebook!!
//             Meet the <br />  AI memory that listens, remembers, and chats with you.
//           </p>
          
//           {/* Sign Up and Log In Buttons */}
//           <div className="flex flex-row items-center gap-4">
//             <Button
//               asChild
//               className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
//             >
//               <Link href="/sign-up">Sign Up</Link>
//             </Button>
//             <Button
//               variant="secondary"
//               asChild
//               className="bg-black/20 backdrop-blur-sm border border-white/10 text-white hover:bg-black/30 hover:border-blue-400/30 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
//             >
//               <Link href="/log-in">Log In</Link>
//             </Button>
//           </div>
//         </div>

//         {/* Right section with animated glowing brain image */}
//         <div className="mt-10 md:mt-0 relative">
//           {/* Glass container for the image */}
//           <div className="w-[500px] h-[500px] relative">
//             {/* Glass effect background */}
//             <div className="absolute inset-0 bg-black/20 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl shadow-blue-500/20"></div>
            
//             {/* Gradient overlays */}
//             <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-blue-500/10 rounded-full pointer-events-none"></div>
//             <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/5 rounded-full pointer-events-none"></div>
            
//             {/* Animated pulse ring */}
//             <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-pulse"></div>
//             <div className="absolute inset-4 rounded-full border border-cyan-400/20 animate-pulse delay-500"></div>
            
//             {/* Image container */}
//             <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
//               <Image
//                 src="/brain.jpg"
//                 alt="AI Brain"
//                 width={450}
//                 height={450}
//                 className="rounded-full object-cover shadow-lg"
//               />
//             </div>
            
//             {/* Floating particles effect */}
//             <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
//             <div className="absolute top-20 right-16 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping delay-700"></div>
//             <div className="absolute bottom-16 left-20 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-ping delay-1000"></div>
//             <div className="absolute bottom-10 right-10 w-1 h-1 bg-cyan-300/60 rounded-full animate-ping delay-300"></div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { Button } from "@/components/ui/button";
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
        <div
 className="absolute -bottom-40 -left-40 w-80 h-80  rounded-full
blur-3xl animate-pulse delay-1000"></div>
        <div
className="absolute top-1/2 left-1/2 transform -translate-x-1/2
-translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl
animate-pulse delay-500"></div>
      </div>      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4  relative z-10">
        <div
 className="text-1xl font-bold bg-gradient-to-r from-white via-blue-200
to-cyan-300 bg-clip-text text-transparent">
        </div>
        <nav className="space-x-6 text-sm text-gray-300">
  <Link href="/aboutus">
    <span className="hover:text-blue-400 transition-colors duration-300">About us</span>
  </Link>
  <Link href="https://tally.so/r/m6z8Oe">
    <span className="hover:text-blue-400 transition-colors duration-300">Contact</span>
  </Link>
</nav>
      </header>
 <main className="relative z-10 flex-1 flex flex-col items-center
justify-center text-center px-4 py-20">
  <h1 className="text-white font-extrabold text-5xl sm:text-6xl md:text-7xl leading-tight tracking-tight">
    <span className="block">Discover Clarity</span>
    <span className="block">In Complexity</span>
  </h1>  <p className="mt-6 max-w-2xl text-gray-300 text-base md:text-lg">
Your thoughts deserve more than a notebook.
Meet
 the AI memory that listens, remembers, and chats with you.  </p>
 <div className="mt-10 flex flex-col sm:flex-row items-center
gap-4">
    <Button
              asChild
              className="bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-600 hover:to-cyan-600 backdrop-blur-sm border border-white/10 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button
              variant="secondary"
              asChild
              className="bg-black/20 backdrop-blur-sm border border-white/10 text-white hover:bg-black/30 hover:border-blue-400/30 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10"
            >
               <Link href="/log-in">Log In</Link>
            </Button>
  </div>
</main>    </div>
  );
}