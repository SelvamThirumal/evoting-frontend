import { useState, useEffect } from "react";
import API from "../../services/api";
import { LayoutDashboard, Palette, Calendar, CheckCircle2, Info } from "lucide-react";

import {
FaStar, FaFire, FaRocket, FaBullseye, FaTrophy, FaBook, FaGlobe, FaBolt,
FaHeart, FaCrown, FaGem, FaLeaf, FaSun, FaMoon, FaCloud, FaAppleAlt,
FaCar, FaBicycle, FaBus, FaPlane, FaShip, FaAnchor, FaBell, FaCamera,
FaCoffee, FaCookie, FaDice, FaDragon, FaFeather, FaFish, FaFlag,
FaGift, FaGraduationCap, FaHammer, FaHeadphones, FaHome, FaKey,
FaLaptop, FaLightbulb, FaLock, FaMagic, FaMagnet, FaMedal,
FaMicrophone, FaMobile, FaMusic, FaPalette, FaPaperPlane,
FaPen, FaPiggyBank, FaPuzzlePiece, FaRobot, FaSatellite,
FaSearch, FaShieldAlt, FaShoppingCart, FaSkull,
FaSmile, FaSnowflake, FaSpaceShuttle, FaSpider,
FaSpinner, FaSplotch, FaStopwatch, FaSubway,
FaTag, FaThumbsUp, FaTicketAlt, FaTree,
FaUmbrella, FaUniversity, FaUserAstronaut,
FaUtensils, FaVideo, FaWallet, FaWifi,
FaWind, FaWineGlass, FaWrench
} from "react-icons/fa";

import {
GiLion,
GiTiger,
GiElephant,
GiBearFace,
GiCrystalBall,
GiFireFlower,
GiPlanetCore
} from "react-icons/gi";

// ⭐ VERIFIED SYMBOL LIST
const symbols = [
{icon:<FaStar/>,value:"FaStar"},
{icon:<FaFire/>,value:"FaFire"},
{icon:<FaRocket/>,value:"FaRocket"},
{icon:<FaBullseye/>,value:"FaBullseye"},
{icon:<FaTrophy/>,value:"FaTrophy"},
{icon:<FaBook/>,value:"FaBook"},
{icon:<FaGlobe/>,value:"FaGlobe"},
{icon:<FaBolt/>,value:"FaBolt"},
{icon:<FaHeart/>,value:"FaHeart"},
{icon:<FaCrown/>,value:"FaCrown"},
{icon:<FaGem/>,value:"FaGem"},
{icon:<FaLeaf/>,value:"FaLeaf"},
{icon:<FaSun/>,value:"FaSun"},
{icon:<FaMoon/>,value:"FaMoon"},
{icon:<FaCloud/>,value:"FaCloud"},
{icon:<FaAppleAlt/>,value:"FaApple"},
{icon:<FaCar/>,value:"FaCar"},
{icon:<FaBicycle/>,value:"FaBicycle"},
{icon:<FaBus/>,value:"FaBus"},
{icon:<FaPlane/>,value:"FaPlane"},
{icon:<FaShip/>,value:"FaShip"},
{icon:<FaAnchor/>,value:"FaAnchor"},
{icon:<FaBell/>,value:"FaBell"},
{icon:<FaCamera/>,value:"FaCamera"},
{icon:<FaCoffee/>,value:"FaCoffee"},
{icon:<FaCookie/>,value:"FaCookie"},
{icon:<FaDice/>,value:"FaDice"},
{icon:<FaDragon/>,value:"FaDragon"},
{icon:<FaFeather/>,value:"FaFeather"},
{icon:<FaFish/>,value:"FaFish"},
{icon:<FaFlag/>,value:"FaFlag"},
{icon:<FaGift/>,value:"FaGift"},
{icon:<FaGraduationCap/>,value:"FaGrad"},
{icon:<FaHammer/>,value:"FaHammer"},
{icon:<FaHeadphones/>,value:"FaHeadphones"},
{icon:<FaHome/>,value:"FaHome"},
{icon:<FaKey/>,value:"FaKey"},
{icon:<FaLaptop/>,value:"FaLaptop"},
{icon:<FaLightbulb/>,value:"FaLight"},
{icon:<FaLock/>,value:"FaLock"},
{icon:<FaMagic/>,value:"FaMagic"},
{icon:<FaMagnet/>,value:"FaMagnet"},
{icon:<FaMedal/>,value:"FaMedal"},
{icon:<FaMicrophone/>,value:"FaMic"},
{icon:<FaMobile/>,value:"FaMobile"},
{icon:<FaMusic/>,value:"FaMusic"},
{icon:<FaPalette/>,value:"FaPalette"},
{icon:<FaPaperPlane/>,value:"FaPaperPlane"},
{icon:<FaPen/>,value:"FaPen"},
{icon:<FaPiggyBank/>,value:"FaPiggy"},
{icon:<FaPuzzlePiece/>,value:"FaPuzzle"},
{icon:<FaRobot/>,value:"FaRobot"},
{icon:<FaSatellite/>,value:"FaSatellite"},
{icon:<FaSearch/>,value:"FaSearch"},
{icon:<FaShieldAlt/>,value:"FaShield"},
{icon:<FaShoppingCart/>,value:"FaCart"},
{icon:<FaSkull/>,value:"FaSkull"},
{icon:<FaSmile/>,value:"FaSmile"},
{icon:<FaSnowflake/>,value:"FaSnow"},
{icon:<FaSpaceShuttle/>,value:"FaShuttle"},
{icon:<FaSpider/>,value:"FaSpider"},
{icon:<FaSpinner/>,value:"FaSpinner"},
{icon:<FaSplotch/>,value:"FaPaint"},
{icon:<FaStopwatch/>,value:"FaTime"},
{icon:<FaSubway/>,value:"FaSubway"},
{icon:<FaTag/>,value:"FaTag"},
{icon:<FaThumbsUp/>,value:"FaLike"},
{icon:<FaTicketAlt/>,value:"FaTicket"},
{icon:<FaTree/>,value:"FaTree"},
{icon:<FaUmbrella/>,value:"FaUmbrella"},
{icon:<FaUniversity/>,value:"FaUni"},
{icon:<FaUserAstronaut/>,value:"FaAstro"},
{icon:<FaUtensils/>,value:"FaFood"},
{icon:<FaVideo/>,value:"FaVideo"},
{icon:<FaWallet/>,value:"FaWallet"},
{icon:<FaWifi/>,value:"FaWifi"},
{icon:<FaWind/>,value:"FaWind"},
{icon:<FaWineGlass/>,value:"FaWine"},
{icon:<FaWrench/>,value:"FaWrench"},
{icon:<GiLion/>,value:"GiLion"},
{icon:<GiTiger/>,value:"GiTiger"},
{icon:<GiElephant/>,value:"GiElephant"},
{icon:<GiBearFace/>,value:"GiBear"},
{icon:<GiCrystalBall/>,value:"GiCrystal"},
{icon:<GiFireFlower/>,value:"GiFlower"},
{icon:<GiPlanetCore/>,value:"GiPlanet"},
];

export default function HodDashboard() {
  const [candidate, setCandidate] = useState("");
  const [symbol, setSymbol] = useState("");
  const [start, setStart] = useState("");
  const [result, setResult] = useState("");
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");
  const [candidatesList, setCandidatesList] = useState([]);

  useEffect(() => {
    loadCandidates();
  }, []);

  const loadCandidates = async () => {
    try {
      const r = await API.get("/candidates");
      setCandidatesList(r.data);
      setCount(r.data.length);
    } catch {
      setMsg("Failed to fetch candidates ❌");
    }
  };

  const assign = async () => {
    if (!candidate || !symbol) {
      setMsg("Select Candidate & Symbol ⚠️");
      return;
    }

    // ⭐ CLEAN ID
    const cleanId = candidate.split(":")[0].replace(/[^a-zA-Z0-9]/g, "");

    try {
      setMsg("Syncing...");
      await API.put(`/candidates/symbol/${cleanId}`, { symbol });
      setMsg("Symbol Assigned Successfully ✅");
      loadCandidates();
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data || "Assign Failed ❌");
    }
  };

  const saveDates = async () => {
    if (!start || !result) {
      setMsg("Please select both dates ⚠️");
      return;
    }
    try {
      await API.put("/settings/dates", { electionStartDate: start, resultDate: result });
      setMsg("Timeline Updated ✅");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Save Failed ❌");
    }
  };

  // Helper to get icon by symbol value
  const getSymbolIcon = (symbolValue) => {
    const found = symbols.find(s => s.value === symbolValue);
    return found ? found.icon : "⌛";
  };

  return (
    <div className="p-4 md:p-6 lg:p-10 bg-[#0f172a] min-h-screen text-slate-200 font-sans">
      <div className="max-w-7xl mx-auto mb-6 md:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white flex items-center gap-2 md:gap-3">
          <LayoutDashboard className="text-blue-400 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" /> 
          <span className="break-words">HOD Terminal</span>
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
          {/* STATS */}
          <div className="bg-slate-800/40 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/5 flex justify-between items-center shadow-xl">
            <h3 className="text-base sm:text-lg md:text-xl font-bold">Total Candidates: <span className="text-emerald-400">{count}</span></h3>
            <CheckCircle2 className="text-emerald-500/50 w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            {/* SYMBOL BOX */}
            <div className="bg-slate-800/40 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/5 shadow-xl space-y-4 md:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-blue-400 flex items-center gap-2 uppercase"><Palette size={18} className="sm:w-5 sm:h-5"/> Assign Symbol</h2>
              <select 
                onChange={e => setCandidate(e.target.value)}
                value={candidate}
                className="w-full p-3 sm:p-4 bg-slate-900 border border-slate-700 rounded-xl md:rounded-2xl text-xs sm:text-sm outline-none focus:ring-2 ring-blue-500"
              >
                <option value="">-- Choose Candidate --</option>
                {candidatesList.map(c => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>

              {/* ICON GRID - Responsive grid columns */}
              <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-7 gap-1.5 sm:gap-2 max-h-48 sm:max-h-56 md:max-h-64 overflow-y-auto p-1">
                {symbols.map(s => (
                  <button 
                    key={s.value} 
                    onClick={() => setSymbol(s.value)} 
                    className={`p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl text-base sm:text-lg md:text-xl transition-all ${symbol === s.value ? 'bg-blue-600 scale-105 sm:scale-110' : 'bg-slate-900 hover:bg-slate-700'}`}
                    title={s.value}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>

              <button onClick={assign} className="w-full bg-blue-600 hover:bg-blue-500 py-3 sm:py-4 rounded-xl md:rounded-2xl font-bold sm:font-black text-sm sm:text-base shadow-lg active:scale-95 transition-all">
                CONFIRM ASSIGNMENT
              </button>
            </div>

            {/* TIMELINE BOX */}
            <div className="bg-slate-800/40 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/5 shadow-xl space-y-4 md:space-y-6">
              <h2 className="text-lg sm:text-xl font-bold text-emerald-400 flex items-center gap-2 uppercase"><Calendar size={18} className="sm:w-5 sm:h-5"/> Timeline</h2>
              <input 
                type="date" 
                value={start} 
                onChange={e => setStart(e.target.value)} 
                className="w-full p-3 sm:p-4 bg-slate-900 border border-slate-700 rounded-xl md:rounded-2xl text-xs sm:text-sm outline-none" 
              />
              <input 
                type="date" 
                value={result} 
                onChange={e => setResult(e.target.value)} 
                className="w-full p-3 sm:p-4 bg-slate-900 border border-slate-700 rounded-xl md:rounded-2xl text-xs sm:text-sm outline-none" 
              />
              <button onClick={saveDates} className="w-full bg-emerald-600 hover:bg-emerald-500 py-3 sm:py-4 rounded-xl md:rounded-2xl font-bold sm:font-black text-sm sm:text-base shadow-lg active:scale-95 transition-all">
                SAVE DATES
              </button>
            </div>
          </div>

          {msg && (
            <div className={`p-3 sm:p-4 rounded-xl md:rounded-2xl flex items-center gap-2 sm:gap-3 font-bold border text-sm sm:text-base ${msg.includes('❌') ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
              <Info size={16} className="sm:w-[18px] sm:h-[18px]"/> {msg}
            </div>
          )}
        </div>

        {/* RIGHT LIST - with icons from second version */}
        <div className="bg-slate-900/50 p-4 sm:p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/5 h-fit mt-4 lg:mt-0">
          <h4 className="text-[8px] sm:text-[10px] font-black text-slate-500 uppercase mb-3 sm:mb-4 tracking-widest text-center">Live Status</h4>
          <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
            {candidatesList.map(c => (
              <div key={c._id} className="flex justify-between items-center p-2 sm:p-3 bg-slate-800/50 rounded-lg sm:rounded-xl border border-white/5">
                <span className="text-[10px] sm:text-xs font-bold truncate pr-2 max-w-[150px] sm:max-w-[200px]">{c.name}</span>
                <span className="text-base sm:text-lg md:text-xl flex-shrink-0">
                  {getSymbolIcon(c.symbol)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}