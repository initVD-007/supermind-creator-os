"use client";
import { useState } from "react";
import { apiFetch } from "@/lib/api";

export default function IdeaGenerator({ onIdeaSelect }: { onIdeaSelect: (idea: string) => void }) {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);

  const getIdeas = async () => {
    if (!topic || !audience) return alert("Fill topic and audience");
    setLoadingIdeas(true);
    try {
      const data = await apiFetch("/generate-ideas", { topic, target_audience: audience });
      setIdeas(data.ideas || []);
    } catch (e) {
      console.error(e);
      alert("Failed to fetch ideas. Make sure the backend is running.");
    } finally {
      setLoadingIdeas(false);
    }
  };

  return (
    <section className="glass-card p-8 border border-white/10 rounded-3xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-blue-500 rounded-full" />
        <h2 className="text-2xl font-bold">01. Idea Generator</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input 
          value={topic} 
          onChange={e => setTopic(e.target.value)} 
          placeholder="Topic (e.g., Python AI)" 
          className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-blue-500 transition-all" 
        />
        <input 
          value={audience} 
          onChange={e => setAudience(e.target.value)} 
          placeholder="Audience (e.g., Developers)" 
          className="bg-white/5 p-4 rounded-xl border border-white/10 outline-none focus:border-blue-500 transition-all" 
        />
      </div>
      <button 
        onClick={getIdeas} 
        disabled={loadingIdeas} 
        className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold transition-all disabled:opacity-50"
      >
        {loadingIdeas ? "AI is brainstorming..." : "Generate Viral Ideas"}
      </button>
      {ideas.length > 0 && (
        <div className="grid gap-3 pt-4">
          {ideas.map((id, i) => (
            <div 
              key={i} 
              className="p-4 bg-white/5 border border-white/5 rounded-xl hover:border-blue-500/50 cursor-pointer transition-all" 
              onClick={() => onIdeaSelect(id)}
            >
              {id} <span className="text-xs text-blue-400 ml-2">(Click to Write Script)</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
