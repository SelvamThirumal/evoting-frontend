import { useState } from "react";
import API from "../../services/api";

export default function SymbolAssignCard(){

 const [symbol,setSymbol]=useState("");
 const [candidate,setCandidate]=useState("");
 const [msg,setMsg]=useState("");

 // ⭐ College symbols
 const symbols=[
  "⭐","🔥","🌟","🚀","🎯",
  "🏆","📘","🦁","🌍","⚡"
 ];

 const assign = async()=>{
  try{

    await API.put(`/candidates/symbol/${candidate}`,{
      symbol
    });

    setMsg("Assigned ✅");

  }catch{
    setMsg("Failed ❌");
  }
 };

 return(
  <div className="bg-secondary p-5 rounded-xl max-w-md">

    <h3 className="font-bold mb-3">
      Assign Candidate Symbol
    </h3>

    <input
      placeholder="Candidate ID"
      onChange={e=>setCandidate(e.target.value)}
      className="w-full p-2 mb-3 text-black rounded"
    />

    <select
      value={symbol}
      onChange={e=>setSymbol(e.target.value)}
      className="w-full p-2 mb-3 text-black rounded">

      <option value="">Select Symbol</option>

      {symbols.map(s=>(
        <option key={s} value={s}>{s}</option>
      ))}

    </select>

    <button
      onClick={assign}
      className="bg-accent px-4 py-2 rounded text-white">

      Assign

    </button>

    {msg && <p className="mt-2 text-sm">{msg}</p>}

  </div>
 );
}
