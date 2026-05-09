import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; 

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} flex flex-col h-screen bg-black text-white antialiased overflow-hidden`}
        suppressHydrationWarning={true}
      >
        {/* The Frame: Navbar */}
        <nav className="w-full bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="font-bold text-xl tracking-tighter">SUPERMIND OS</div>
          <div className="text-sm text-gray-400">v1.0.0-alpha</div>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Area */}
          <Sidebar />
          
          {/* Main Dashboard Area */}
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>

        {/* The Frame: Footer */}
        <footer className="w-full bg-white/5 border-t border-white/10 px-6 py-3 text-center text-xs text-gray-500 shrink-0">
          SUPERMIND CREATOR OS &copy; {new Date().getFullYear()} &mdash; Autonomous Content Intelligence
        </footer>
      </body>
    </html>
  );
}