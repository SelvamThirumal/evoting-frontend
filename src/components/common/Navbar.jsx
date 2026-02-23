import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Menu } from "lucide-react";

export default function Navbar({ onMenuClick }) {

  const { user } = useContext(AuthContext);

  const today = new Date().toLocaleDateString("en-US",{
    weekday:"short",
    month:"short",
    day:"numeric"
  });

  return(
    <div className="sticky top-0 z-30 bg-slate-900 px-4 sm:px-6 py-3 flex justify-between items-center">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-3">

        {/* 📱 MOBILE MENU BUTTON */}
        <button
          onClick={onMenuClick}
          className="lg:hidden text-white"
        >
          <Menu size={24}/>
        </button>

        <div>
          <div className="text-white font-bold text-lg">
            E-Voting <span className="text-blue-500">Portal</span>
          </div>

          <div className="text-xs text-slate-400">
            {today} • System Online
          </div>
        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="flex items-center gap-3">

        <div className="bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold">
          {user?.name?.charAt(0)}
        </div>

      </div>

    </div>
  )
}