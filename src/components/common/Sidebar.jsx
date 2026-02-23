import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LogOut, Home, Trophy, Vote, Users,
  Shield, BarChart3, X
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {

  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();
  const location = useLocation();

  const go = (path) => {
    nav(path);
    setOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `
    flex items-center gap-3 w-full p-3 rounded-lg
    transition-all duration-200 text-sm font-medium
    ${
      isActive(path)
        ? "bg-blue-600 text-white"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }
  `;

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Prevent body scroll on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);


  return (
    <>
      {/* OVERLAY (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72 max-w-[85%]
          bg-white shadow-xl
          flex flex-col
          transition-transform duration-300
          ${open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"}
        `}
      >

        {/* CLOSE BUTTON (mobile) */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-600"
        >
          <X size={22} />
        </button>

        {/* HEADER */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold">Vote-App</h2>
          <p className="text-xs text-gray-500 capitalize">
            {user?.role} Portal
          </p>
        </div>

        {/* NAVIGATION (scrollable) */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">

          <button
            onClick={() => go("/" + user?.role)}
            className={linkClass("/" + user?.role)}
          >
            <Home size={18} /> Dashboard
          </button>

          {user?.role === "student" && (
            <>
              <button onClick={() => go("/results")} className={linkClass("/results")}>
                <Trophy size={18} /> Live Results
              </button>
              <button onClick={() => go("/student")} className={linkClass("/student")}>
                <Vote size={18} /> Vote Now
              </button>
            </>
          )}

          {user?.role === "teacher" && (
            <button onClick={() => go("/teacher")} className={linkClass("/teacher")}>
              <Users size={18} /> Candidates
            </button>
          )}

          {user?.role === "hod" && (
            <button onClick={() => go("/hod")} className={linkClass("/hod")}>
              <Shield size={18} /> Control Panel
            </button>
          )}

          {user?.role === "principal" && (
            <>
              <button onClick={() => go("/results")} className={linkClass("/results")}>
                <Trophy size={18} /> Live Results
              </button>
              <button onClick={() => go("/principal")} className={linkClass("/principal")}>
                <BarChart3 size={18} /> Manage Nominations
              </button>
            </>
          )}
        </nav>

        {/* USER + LOGOUT */}
        <div className="p-6 border-t border-gray-200">
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-500 mb-3">{user?.email}</p>

          <button
            onClick={() => { logout(); nav("/"); }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            <LogOut size={18} className="inline mr-2" />
            Logout
          </button>
        </div>

      </aside>
    </>
  );
}