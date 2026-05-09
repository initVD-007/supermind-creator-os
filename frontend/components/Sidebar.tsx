import React from 'react';
import { Sparkles, FileText, BarChart3, Settings, Zap } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-brand-card border-r border-white/10 p-6 flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center gap-2 text-xl font-bold tracking-tighter mb-10">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Zap size={18} fill="white" />
        </div>
        <span>SUPER<span className="text-blue-500">MIND</span></span>
      </div>
      
      {/* Navigation Items */}
      <nav className="flex-1 space-y-2">
        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 ml-2">
          Agent Terminal
        </div>
        <SidebarItem icon={<Sparkles size={18} />} label="Idea Generator" active />
        <SidebarItem icon={<FileText size={18} />} label="Script Writer" />
        <SidebarItem icon={<BarChart3 size={18} />} label="Trend Analyst" />
      </nav>

      {/* Settings at the bottom */}
      <div className="mt-auto pt-6 border-t border-white/10">
        <SidebarItem icon={<Settings size={18} />} label="Settings" />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${active ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}