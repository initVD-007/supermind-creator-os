"use client";
import { useState, useEffect } from "react";
import { apiFetch } from "@/lib/api";

export default function ScriptWriter({ initialTitle = "" }: { initialTitle?: string }) {
  const [scriptTitle, setScriptTitle] = useState(initialTitle);
  const [script, setScript] = useState<{hook: string, body: string, cta: string} | null>(null);
  const [loadingScript, setLoadingScript] = useState(false);

  useEffect(() => {
    if (initialTitle) {
      setScriptTitle(initialTitle);
    }
  }, [initialTitle]);

  const getScript = async () => {
    if (!scriptTitle) return alert("Enter a title");
    setLoadingScript(true);
    try {
      const data = await apiFetch("/generate-script", { title: scriptTitle, tone: "energetic" });
      setScript(data);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch script. Make sure the backend is running.");
    } finally {
      setLoadingScript(false);
    }
  };

  return (
    <section className="glass-card p-8 border border-white/10 rounded-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-purple-500 rounded-full" />
        <h2 className="text-2xl font-bold">02. Script Writer</h2>
      </div>
      <input 
        value={scriptTitle} 
        onChange={e => setScriptTitle(e.target.value)} 
        placeholder="Paste your idea title here..." 
        className="w-full bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-purple-500 transition-all" 
      />
      <button 
        onClick={getScript} 
        disabled={loadingScript} 
        className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
      >
        {loadingScript ? "Writing script with Gemini 3 Flash..." : "Draft Full Script"}
      </button>
      {script && (
        <div className="grid gap-4 pt-4">
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
            <h3 className="text-xs font-bold text-blue-400 mb-2 uppercase">Hook</h3>
            <p className="italic text-lg">"{script.hook}"</p>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
            <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase">Body</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">{script.body}</p>
          </div>
          <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
            <h3 className="text-xs font-bold text-green-400 mb-2 uppercase">CTA</h3>
            <p>{script.cta}</p>
          </div>
        </div>
      )}
    </section>
  );
}
