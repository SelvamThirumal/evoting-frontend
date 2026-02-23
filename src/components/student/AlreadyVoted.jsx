import { useNavigate } from "react-router-dom";
import { CheckCircle2, ShieldCheck, LogOut } from "lucide-react";

export default function AlreadyVoted() {
  const nav = useNavigate();

  return (
    // Changed h-full to min-h-[60vh] to ensure visibility
    <div className="flex items-center justify-center min-h-[60vh] p-4 md:p-10 animate-in fade-in zoom-in duration-500">
      
      {/* Container with distinct border and shadow for visibility */}
      <div className="bg-slate-900 border-2 border-emerald-500/30 p-10 rounded-[2.5rem] text-center shadow-[0_0_50px_rgba(16,185,129,0.1)] max-w-md w-full relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl"></div>

        <div className="mb-6 flex justify-center">
          <div className="bg-emerald-500/10 p-5 rounded-full ring-2 ring-emerald-500/20">
            <CheckCircle2 className="text-emerald-500 w-12 h-12" />
          </div>
        </div>

        <h2 className="text-3xl font-black text-white mb-3 tracking-tight">
          VOTING COMPLETE
        </h2>

        <p className="text-slate-400 mb-8 leading-relaxed font-mono text-sm uppercase tracking-wider">
          Your digital ballot has been securely <span className="text-emerald-400">encrypted</span> and recorded in the central database.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => nav("/student")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
          >
            REFRESH DASHBOARD
          </button>
          
          <div className="flex items-center justify-center gap-2 mt-4 py-2 px-4 bg-slate-850 rounded-lg border border-slate-800">
            <ShieldCheck className="text-slate-500 w-4 h-4" />
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
              Verified by E-Voting System
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}