import { useState } from "react";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

export default function Layout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">

      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* MAIN AREA */}
      <div className="flex flex-col min-h-screen lg:ml-72">

        {/* NAVBAR */}
        <Navbar onMenuClick={() => setOpen(true)} />

        {/* CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300">
          {children}
        </main>

      </div>

    </div>
  );
}