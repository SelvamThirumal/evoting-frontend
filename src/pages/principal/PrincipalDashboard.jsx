import { useEffect, useState } from "react";
import API from "../../services/api";

export default function PrincipalDashboard() {

  const [candidates, setCandidates] = useState([]);
  const [results, setResults] = useState([]);
  const [photos,setPhotos] = useState({});
  const [settings, setSettings] = useState({
    electionStartDate: "",
    resultDate: "",
    isDeclared: false
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // ================= LOAD DASHBOARD =================
  const loadDashboard = async () => {
    try {
      setLoading(true);

      const candRes = await API.get("/candidates");
      setCandidates(candRes.data || []);

      const photoRes = await API.get("/photos");
      const map = {};
      photoRes.data.forEach(p=>{
        map[p.candidateId] = p.image;
      });
      setPhotos(map);

      const setRes = await API.get("/settings/dates");

      if (setRes.data) {
        setSettings({
          electionStartDate: setRes.data.electionStartDate
            ? setRes.data.electionStartDate.split("T")[0]
            : "",
          resultDate: setRes.data.resultDate
            ? setRes.data.resultDate.split("T")[0]
            : "",
          isDeclared: setRes.data.isDeclared || false
        });
      }

      const resRes = await API.get("/results/declare");
      setResults(resRes.data || []);

    } catch (err) {
      console.error(err);
      setMsg("Server sync failed ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  // ================= UPDATE DATE =================
  const updateDate = async (type, value) => {
    try {

      const updated = { ...settings, [type]: value };

      await API.put("/settings/dates", {
        electionStartDate:
          updated.electionStartDate || new Date().toISOString(),
        resultDate:
          updated.resultDate || new Date().toISOString()
      });

      setSettings(updated);
      setMsg("Settings Saved ✅");

      setTimeout(() => setMsg(""), 2500);

    } catch {
      setMsg("Save failed ❌");
    }
  };

  // ================= DECLARE RESULTS =================
  const declareResults = async () => {

    const today = new Date().toISOString().split("T")[0];

    if (today < settings.resultDate) {
      setMsg("Cannot declare before Result Date ❌");
      return;
    }

    if (!window.confirm("Publish results?")) return;

    try {
      await API.post("/settings/declare-result");

      setSettings(prev => ({ ...prev, isDeclared: true }));
      setMsg("Results Published 🏆");

    } catch {
      setMsg("Declaration failed ❌");
    }
  };

  // ================= APPROVE =================
  const approveCandidate = async (id) => {
    try {

      await API.put(`/candidates/approve/${id}`);

      setCandidates(prev =>
        prev.map(c =>
          c._id === id ? { ...c, approved: true } : c
        )
      );

      setMsg("Candidate Approved ✅");

    } catch {
      setMsg("Approval failed ❌");
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-emerald-500 font-black p-4 text-center text-sm sm:text-base">
        CONNECTING TO DATABASE...
      </div>
    );
  }

  // ================= UI =================
  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 sm:p-5 md:p-6">

      <h1 className="text-2xl sm:text-3xl font-black text-amber-500 mb-4 sm:mb-6 break-words">
        Principal Dashboard
      </h1>

      {msg && (
        <div className="bg-slate-800 p-3 sm:p-3 mb-4 rounded border-l-4 border-amber-500 text-sm sm:text-base">
          {msg}
        </div>
      )}

      {/* DATE CONTROLS - Stack on mobile */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
        <input
          type="date"
          value={settings.electionStartDate}
          onChange={e => updateDate("electionStartDate", e.target.value)}
          className="bg-slate-800 p-2.5 sm:p-2 rounded text-sm w-full sm:w-auto"
        />

        <input
          type="date"
          value={settings.resultDate}
          onChange={e => updateDate("resultDate", e.target.value)}
          className="bg-slate-800 p-2.5 sm:p-2 rounded text-sm w-full sm:w-auto"
        />

        <button
          onClick={declareResults}
          disabled={
            settings.isDeclared ||
            new Date().toISOString().split("T")[0] < settings.resultDate
          }
          className={`px-3 sm:px-4 py-2.5 sm:py-2 rounded text-sm w-full sm:w-auto ${
            settings.isDeclared
              ? "bg-gray-600 cursor-not-allowed"
              : new Date().toISOString().split("T")[0] < settings.resultDate
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-orange-600 hover:bg-orange-500"
          }`}
        >
          {settings.isDeclared
            ? "Declared"
            : new Date().toISOString().split("T")[0] < settings.resultDate
            ? "Waiting Result Date"
            : "Declare Results"}
        </button>
      </div>

      {/* CANDIDATE LIST */}
      <div className="grid gap-3 sm:gap-4">
        {candidates.map(c => (
          <div
            key={c._id}
            className="bg-slate-800 p-3 sm:p-4 rounded flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              {photos[c._id] && (
                <img
                  src={photos[c._id]}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border flex-shrink-0"
                  alt={c.name}
                />
              )}

              <div className="min-w-0 flex-1">
                <h3 className="font-medium text-sm sm:text-base truncate">{c.name}</h3>
                <p className="text-xs text-blue-400 truncate">{c.position}</p>
              </div>
            </div>

            <button
              disabled={c.approved}
              onClick={() => approveCandidate(c._id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-1 rounded text-sm w-full sm:w-auto ${
                c.approved
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
              }`}
            >
              {c.approved ? "Approved" : "Approve"}
            </button>
          </div>
        ))}

        {candidates.length === 0 && (
          <div className="bg-slate-800 p-6 rounded text-center text-slate-400">
            No candidates found
          </div>
        )}
      </div>

      {/* RESULTS */}
      <div className="mt-8 sm:mt-10">
        <h2 className="font-bold mb-3 text-lg sm:text-xl">Live Tally</h2>

        <div className="bg-slate-800/50 rounded-lg p-3 sm:p-4">
          {results.length > 0 ? (
            results.map((r, i) => (
              <div key={i} className="flex justify-between border-b border-slate-700 py-2.5 sm:py-2 text-sm sm:text-base">
                <span className="truncate pr-4">{r.name}</span>
                <span className="font-bold text-amber-500">{r.total}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-400 py-4 text-sm">
              No results available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}