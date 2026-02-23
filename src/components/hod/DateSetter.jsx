import { useState } from "react";
import API from "../../services/api";

export default function DateSetter(){

 const [start,setStart]=useState("");
 const [result,setResult]=useState("");
 const [msg,setMsg]=useState("");

 const save = async()=>{
  try{

    await API.post("/settings/dates",{
      startDate:start,
      resultDate:result
    });

    setMsg("Saved ✅");

  }catch{
    setMsg("Failed ❌");
  }
 };

 return(
  <div className="bg-secondary p-5 rounded-xl w-full max-w-md">

    <h3 className="font-bold mb-4">
      Election Dates
    </h3>

    <input
      type="date"
      value={start}
      onChange={e=>setStart(e.target.value)}
      className="w-full p-2 mb-3 text-black rounded"
    />

    <input
      type="date"
      value={result}
      onChange={e=>setResult(e.target.value)}
      className="w-full p-2 mb-3 text-black rounded"
    />

    <button
      onClick={save}
      className="bg-accent px-4 py-2 rounded text-white">
      Save
    </button>

    {msg && (
      <p className="mt-3 text-sm">{msg}</p>
    )}

  </div>
 );
}
