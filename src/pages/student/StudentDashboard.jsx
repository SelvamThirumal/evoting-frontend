import { useEffect, useState } from "react";
import API from "../../services/api";
import VoteMachine from "../../components/student/VoteMachine";
import AlreadyVoted from "../../components/student/AlreadyVoted";
import ChatBot from "../../components/ChatBot"; // ⭐ ONLY ADDITION

export default function StudentDashboard() {

  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [votedPositions, setVotedPositions] = useState([]);
  const [electionStatus, setElectionStatus] = useState({ isLive: false, msg: "" });


  useEffect(() => {

    const initializeDashboard = async () => {

      try {
        setLoading(true);

        // ================= 1️⃣ Vote Status =================
        const statusRes = await API.get("/votes/status");

        if (statusRes.data.voted) {
          setHasVoted(true);
          setLoading(false);
          return;
        }

        setVotedPositions(statusRes.data.votedPositions || []);


        // ================= 2️⃣ Election Date =================
        const settingsRes = await API.get("/settings/dates");

        const today = new Date();
        const start = new Date(settingsRes.data.electionDate);

        if (today < start) {
          setElectionStatus({
            isLive: false,
            msg: `Election starts on ${start.toLocaleDateString()} at ${start.toLocaleTimeString()}`
          });
        } else {
          setElectionStatus({ isLive: true, msg: "" });
        }


        // ================= 3️⃣ Get APPROVED Candidates =================
        const candRes = await API.get("/candidates/approved");

        let list = candRes.data || [];

        // ⭐⭐⭐ PHOTO FIX ONLY (no logic change)
        const photoRes = await API.get("/photos");
        const photoMap = {};
        photoRes.data.forEach(p=>{
          photoMap[p.candidateId] = p.image;
        });

        list = list.map(c => ({
          ...c,
          photo: photoMap[c._id] || null
        }));

        setCandidates(list);


      } catch (err) {
        console.error("Dashboard Loading Error:", err);
      } finally {
        setLoading(false);
      }

    };

    initializeDashboard();

  }, []);



  // ================= Loading Screen =================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-[10px] sm:text-xs text-center">
          Verifying Identity...
        </p>

        {/* ⭐ Chatbot added - responsive positioning */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <ChatBot />
        </div>
      </div>
    );
  }



  // ================= Already Voted =================
  if (hasVoted) {
    return (
      <>
        <AlreadyVoted />
        {/* ⭐ Chatbot added - responsive positioning */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <ChatBot />
        </div>
      </>
    );
  }



  // ================= Main UI =================
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-5 md:p-6 lg:p-10">
      <div className="max-w-5xl mx-auto">

        <div className="mb-6 sm:mb-8 md:mb-10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">

          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent break-words">
              Digital Voting Booth
            </h1>

            <p className="text-slate-500 mt-1 sm:mt-2 uppercase tracking-[0.2em] text-[8px] sm:text-[10px] font-black">
              Verified • Encrypted • Final
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 bg-slate-900 border border-slate-800 px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              electionStatus.isLive
                ? 'bg-emerald-500 animate-ping'
                : 'bg-red-500'
            }`} />

            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-300">
              {electionStatus.isLive ? "System: Live" : "System: Locked"}
            </span>
          </div>

        </div>


        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-3 sm:p-4 md:p-6 lg:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">

          {!electionStatus.isLive ? (

            <div className="text-center py-10 sm:py-16 md:py-20">
              <span className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 block">⏳</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-200">
                Election Not Yet Started
              </h3>
              <p className="text-slate-500 mt-2 sm:mt-3 text-xs sm:text-sm md:text-base px-2">
                {electionStatus.msg}
              </p>
            </div>

          ) : candidates.length > 0 ? (

            <VoteMachine
              candidates={candidates}
              votedPositions={votedPositions}
            />

          ) : (

            <div className="text-center py-10 sm:py-16 md:py-20">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-slate-300 px-4">
                No Approved Candidates Available
              </h3>
            </div>

          )}

        </div>
      </div>

      {/* ⭐ FINAL CHATBOT OVERLAY - responsive positioning */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-50">
        <ChatBot />
      </div>

    </div>
  );
}