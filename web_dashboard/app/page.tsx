"use client";

import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runBenchmark = async () => {
    setLoading(true);
    setResults(null);
    try {
      const res = await fetch("/api/benchmark", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setResults(data);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 font-mono">
      <div className="max-w-3xl w-full bg-neutral-900 border border-neutral-800 rounded-xl p-8 shadow-2xl">
        
        <header className="mb-8 border-b border-neutral-800 pb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            M1 NEON AI Core
          </h1>
          <p className="text-neutral-400 mt-2 text-sm">
            Bare-metal ARM64 Assembly vs V8 JavaScript Engine
          </p>
        </header>

        <div className="flex justify-center mb-8">
          <button
            onClick={runBenchmark}
            disabled={loading}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              loading
                ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)]"
            }`}
          >
            {loading ? "Executing Benchmark..." : "Run Matrix Multiplication (10M Items)"}
          </button>
        </div>

        {results && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card: JavaScript */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6">
              <h2 className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-2">V8 JavaScript Math</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-light text-red-400">{results.timeJS}</span>
                <span className="text-neutral-500 text-sm">ms</span>
              </div>
            </div>

            {/* Card: Assembly */}
            <div className="bg-neutral-950 border border-emerald-900/50 rounded-lg p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl -mr-8 -mt-8"></div>
              <h2 className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">ARM64 NEON Assembly</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-emerald-400">{results.timeASM}</span>
                <span className="text-emerald-500/70 text-sm">ms</span>
              </div>
            </div>

            {/* Speedup Result */}
            <div className="md:col-span-2 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-lg p-6 text-center border border-neutral-700">
              <p className="text-neutral-300">
                Assembly is <span className="text-2xl font-bold text-cyan-400 mx-2">{results.speedup}x</span> faster than JavaScript.
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}