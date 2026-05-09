"use client";
import { useState } from "react";
import { aiApi } from "@/lib/api";

export default function Home() {
  // Agent 01 State
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [ideas, setIdeas] = useState<string[]>([]);
  
  // Agent 02 State
  const [scriptTitle, setScriptTitle] = useState("");
  const [script, setScript] = useState<{hook: string, body: string, cta: string} | null>(null);

  // Loading States
  const [loading, setLoading] = useState(false);

  const handleGetIdeas = async () => {
    setLoading(true);
    try {
      const data = await aiApi.fetchIdeas(topic, audience);
      setIdeas(data.ideas);
    } catch (err) { alert("Check Backend Connection"); }
    finally { setLoading(false); }
  };

  const handleGetScript = async () => {
    setLoading(true);
    try {
      const data = await aiApi.fetchScript(scriptTitle);
      setScript(data);
    } catch (err) { alert("Check Backend Connection"); }
    finally { setLoading(false); }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center py-10">
          <h1 className="text-5xl font-extrabold tracking-tight">SUPERMIND <span className="text-blue-500">OS</span></h1>
          <p className="text-gray-400 mt-2">Autonomous Creator Intel</p>
        </header>

        {/* AGENT 01: IDEAS */}
        <section className="p-8 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Agent 01: Idea Generator</h2>
          <div className="flex gap-4 mb-4">
            <input placeholder="Topic" className="flex-1 bg-black p-3 rounded-lg border border-white/10" onChange={e => setTopic(e.target.value)} />
            <input placeholder="Audience" className="flex-1 bg-black p-3 rounded-lg border border-white/10" onChange={e => setAudience(e.target.value)} />
          </div>
          <button onClick={handleGetIdeas} className="w-full bg-blue-600 p-3 rounded-lg font-bold hover:bg-blue-700 transition">
            {loading ? "Processing..." : "Generate Ideas"}
          </button>
          
          <div className="mt-4 space-y-2">
            {ideas.map((id, index) => (
              <div key={index} onClick={() => setScriptTitle(id)} className="p-3 bg-white/5 rounded border border-white/5 cursor-pointer hover:border-blue-500">
                {id} <span className="text-xs text-blue-400 ml-2">(Draft Script)</span>
              </div>
            ))}
          </div>
        </section>

        {/* AGENT 02: SCRIPT */}
        <section className="p-8 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-bold mb-4 text-purple-400">Agent 02: Script Writer</h2>
          <input placeholder="Paste title here" value={scriptTitle} className="w-full bg-black p-3 rounded-lg border border-white/10 mb-4" onChange={e => setScriptTitle(e.target.value)} />
          <button onClick={handleGetScript} className="w-full bg-purple-600 p-3 rounded-lg font-bold hover:bg-purple-700 transition">
            {loading ? "Writing..." : "Generate Full Script"}
          </button>

          {script && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-500/10 rounded-lg"><strong>Hook:</strong> <p>{script.hook}</p></div>
              <div className="p-4 bg-white/5 rounded-lg"><strong>Body:</strong> <p>{script.body}</p></div>
              <div className="p-4 bg-green-500/10 rounded-lg"><strong>CTA:</strong> <p>{script.cta}</p></div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}