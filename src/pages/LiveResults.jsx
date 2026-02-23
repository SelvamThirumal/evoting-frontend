import { useEffect, useState } from "react";
import API from "../services/api";

export default function LiveResults() {
  const [results, setResults] = useState([]);
  const [settings, setSettings] = useState({ resultDate: "", isDeclared: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveStatus = async () => {
      try {
        setLoading(true);
        
        // 1. Settings fetch panni results declare aayiducha nu check panrom
        const setRes = await API.get("/settings/dates");
        setSettings(setRes.data);

        // 2. Oru vela Principal declare pannirundha, results-ai fetch panrom
        if (setRes.data.isDeclared) {
          const resRes = await API.get("/results/declare");
          setResults(resRes.data);
        }
      } catch (err) {
        console.error("Error fetching live results:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStatus();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
            ELECTION RESULTS
          </h1>
          <div className="mt-4 flex justify-center gap-4">
            <span className="bg-slate-900 border border-slate-800 px-4 py-1 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Academic Year 2025-26
            </span>
          </div>
        </div>

        {/* CONDITION 1: RESULTS DECLARED */}
        {settings.isDeclared ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <h2 className="text-emerald-400 font-bold text-center uppercase tracking-[0.3em] text-xs mb-8">
              Official Winners List
            </h2>
            
            {results.length > 0 ? (
              results.map((r, index) => (
                <div key={index} className="relative group">
                  {/* Rank Badge for the Top Winner */}
                  {index === 0 && (
                    <div className="absolute -top-3 -left-3 bg-amber-500 text-black font-black px-3 py-1 rounded-lg z-10 shadow-lg text-xs italic">
                      WINNER
                    </div>
                  )}
                  
                  <div className={`p-8 rounded-[2rem] border transition-all duration-500 flex justify-between items-center ${
                    index === 0 
                    ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                  }`}>
                    <div>
                      <h3 className={`text-3xl font-black ${index === 0 ? "text-emerald-400" : "text-slate-200"}`}>
                        {r.name}
                      </h3>
                      <p className="text-slate-500 uppercase font-bold tracking-widest text-xs mt-1">
                        {r.position}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <p className={`text-5xl font-black ${index === 0 ? "text-emerald-400" : "text-slate-400"}`}>
                        {r.total}
                      </p>
                      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Total Votes Received</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-500">No votes found in the system.</p>
            )}
          </div>
        ) : (
          /* CONDITION 2: RESULTS LOCKED */
          <div className="bg-slate-900/40 border border-slate-800 p-16 rounded-[3rem] text-center backdrop-blur-sm">
            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl shadow-inner border border-slate-700">
              🔒
            </div>
            <h2 className="text-3xl font-black text-slate-200 mb-4">Results are Locked</h2>
            <p className="text-slate-500 max-w-sm mx-auto leading-relaxed mb-8">
              The election outcome is currently being processed. Results will be visible once officially declared by the Principal.
            </p>
            
            {settings.resultDate && (
              <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-2xl">
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-1">Scheduled Date</p>
                <p className="text-xl font-mono font-bold text-blue-200">
                  {new Date(settings.resultDate).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="mt-20 pt-8 border-t border-slate-900 text-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-[0.5em]">
            Certified Digital Election Result
          </p>
        </div>
      </div>
    </div>
  );
}