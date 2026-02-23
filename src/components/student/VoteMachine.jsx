import { useEffect, useState } from "react";
import API from "../../services/api";
import OtpModal from "../auth/OtpModal";
import { Cpu, Lock, Clock } from "lucide-react";

export default function VoteMachine({
  candidates = [],
  votedPositions = []
}) {

  const [list, setList] = useState([]);
  const [voted, setVoted] = useState(votedPositions);

  const [otp, setOtp] = useState(false);
  const [pending, setPending] = useState(null);
  const [loading, setLoading] = useState(false);

  const [sessionTime, setSessionTime] = useState(900);
  const [systemStatus, setSystemStatus] = useState("ACTIVE");

  const [photos,setPhotos] = useState({});


  // ================= SYNC =================
  useEffect(() => {
    setList(candidates || []);
  }, [candidates]);

  useEffect(() => {
    setVoted(votedPositions || []);
  }, [votedPositions]);


  // ================= LOAD PHOTOS =================
  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const res = await API.get("/photos");
        const map = {};
        res.data.forEach(p=>{
          map[p.candidateId] = p.image;
        });
        setPhotos(map);
      } catch {}
    };
    loadPhotos();
  }, []);


  // ================= TIMER =================
  useEffect(() => {

    if (sessionTime <= 0) {
      setSystemStatus("SESSION_EXPIRED");
      return;
    }

    const t = setInterval(() => {
      setSessionTime(p => p - 1);
    }, 1000);

    return () => clearInterval(t);

  }, [sessionTime]);


  // ================= START VOTE =================
  const vote = async (id, pos) => {

    if (voted.includes(pos))
      return alert("Already voted for this position");

    if (systemStatus !== "ACTIVE")
      return alert("Voting session expired");

    try {
      setLoading(true);
      await API.post("/otp/send");
      setPending({ id, pos });
      setOtp(true);
    } catch {
      alert("Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };


  // ================= VERIFY OTP =================
  const verify = async (code) => {

    try {

      setLoading(true);

      await API.post("/otp/verify", { otp: code });

      await API.post("/votes", {
        candidateId: pending.id,
        position: pending.pos
      });

      const updated = [...voted, pending.pos];
      setVoted(updated);

      setOtp(false);
      setPending(null);

      alert("Vote Recorded ✅");

      if (updated.length >= 2)
        window.location.reload();

    } catch {
      alert("OTP verification failed ❌");
    } finally {
      setLoading(false);
    }
  };


  // ================= FORMAT TIME =================
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2,"0")}:${sec.toString().padStart(2,"0")}`;
  };


  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-2 sm:p-3 md:p-4">

      <div className="max-w-7xl mx-auto bg-gray-800 rounded-lg sm:rounded-xl md:rounded-xl border-2 sm:border-4 border-gray-900">

        {/* HEADER */}
        <div className="bg-black p-3 sm:p-4 border-b-2 sm:border-b-4 border-red-800 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <Lock className="text-white w-4 h-4 sm:w-5 sm:h-5" />
            <h1 className="text-white font-black text-xs sm:text-sm md:text-base">
              DIGITAL VOTING TERMINAL
            </h1>
          </div>

          <div className="flex gap-3 sm:gap-6 text-white text-xs sm:text-sm">
            <div className="flex items-center gap-1 sm:gap-2">
              <Clock size={12} className="sm:w-4 sm:h-4" />
              <span>{formatTime(sessionTime)}</span>
            </div>
            <div>{voted.length} / 2 Voted</div>
          </div>
        </div>


        {/* ================= CANDIDATES ================= */}
        <div className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
          {list.length > 0 ? (
            list.map(c => (
              <div
                key={c._id}
                className={`
                  flex flex-wrap items-center justify-between
                  bg-black border rounded-lg p-3 sm:p-4
                  ${voted.includes(c.position)
                    ? "border-green-600 opacity-60"
                    : "border-gray-700"}
                `}
              >
                {/* Mobile: Top row with photo and basic info */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* PHOTO */}
                  <img
                    src={photos[c._id] || "/noimg.png"}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded border flex-shrink-0"
                    alt={c.name}
                  />

                  {/* NAME - visible on all screens */}
                  <div className="text-white font-bold text-sm sm:text-base truncate flex-1">
                    {c.name}
                  </div>

                  {/* SYMBOL - visible on mobile only */}
                  <div className="text-2xl sm:hidden">
                    {c.symbol || "❔"}
                  </div>
                </div>

                {/* Desktop: Additional info row */}
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between sm:ml-3">
                  {/* SYMBOL */}
                  <div className="text-2xl md:text-3xl w-12 md:w-20 text-center">
                    {c.symbol || "❔"}
                  </div>

                  {/* DEPT */}
                  <div className="w-24 lg:w-32 text-gray-400 text-xs md:text-sm text-center truncate px-1">
                    {c.department || "Dept"}
                  </div>

                  {/* ROLE */}
                  <div className="w-24 lg:w-32 text-blue-400 text-xs md:text-sm text-center font-semibold truncate px-1">
                    {c.position}
                  </div>

                  {/* QR */}
                  {c.qrCode ? (
                    <img
                      src={c.qrCode}
                      className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border rounded"
                      alt="QR"
                    />
                  ) : (
                    <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border flex items-center justify-center text-[8px] md:text-xs text-gray-500">
                      NO QR
                    </div>
                  )}
                </div>

                {/* Mobile: Additional details row */}
                <div className="flex sm:hidden w-full mt-2 justify-between items-center">
                  <div className="text-gray-400 text-xs">
                    {c.department || "Dept"} • {c.position}
                  </div>
                  
                  {c.qrCode ? (
                    <img
                      src={c.qrCode}
                      className="w-8 h-8 border rounded"
                      alt="QR"
                    />
                  ) : (
                    <div className="w-8 h-8 border flex items-center justify-center text-[6px] text-gray-500">
                      NO QR
                    </div>
                  )}
                </div>

                {/* BUTTON - always visible */}
                <button
                  disabled={voted.includes(c.position) || loading}
                  onClick={() => vote(c._id, c.position)}
                  className={`
                    w-full sm:w-auto mt-2 sm:mt-0 px-4 sm:px-5 md:px-6 py-2 sm:py-2 font-bold rounded text-sm sm:text-base
                    ${voted.includes(c.position)
                      ? "bg-green-700"
                      : "bg-red-700 hover:bg-red-600"}
                  `}
                >
                  {voted.includes(c.position)
                    ? "VOTED ✔"
                    : "VOTE"}
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-8 sm:py-12 text-gray-400">
              No candidates available
            </div>
          )}
        </div>

      </div>


     {/* LOADING */}
{loading && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
    <Cpu
      className="animate-spin text-blue-500 w-10 h-10 sm:w-[50px] sm:h-[50px]"
    />
  </div>
)}


      {/* OTP */}
      {otp && (
        <OtpModal
          onVerify={verify}
          onClose={() => setOtp(false)}
        />
      )}

    </div>
  );
}