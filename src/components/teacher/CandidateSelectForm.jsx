import { useState } from "react";
import API from "../../services/api";

export default function CandidateSelectForm(){

 const [name,setName]=useState("");
 const [attendance,setAttendance]=useState("");
 const [exam,setExam]=useState("");
 const [features,setFeatures]=useState("");
 const [msg,setMsg]=useState("");

 // ⭐ AUTO POSITION
 const calcPosition = ()=>{
  if(attendance>=80 && exam>=80)
    return "chairman";

  if(attendance>=75 && exam>=80)
    return "representative";

  return "not eligible";
 };

 const submit=async()=>{

  const position = calcPosition();

  if(position==="not eligible"){
    setMsg("Not eligible ❌");
    return;
  }

  await API.post("/candidates",{
    name,
    position,
    features:features.split(",")
  });

  setMsg("Candidate Added ✅");
 };

 return(
  <div className="bg-secondary p-5 rounded-xl max-w-md">

    <h3 className="font-bold mb-3">
      Select Candidate
    </h3>

    <input
      placeholder="Name"
      onChange={e=>setName(e.target.value)}
      className="w-full p-2 mb-2 text-black rounded"
    />

    <input
      type="number"
      placeholder="Attendance %"
      onChange={e=>setAttendance(e.target.value)}
      className="w-full p-2 mb-2 text-black rounded"
    />

    <input
      type="number"
      placeholder="Exam %"
      onChange={e=>setExam(e.target.value)}
      className="w-full p-2 mb-2 text-black rounded"
    />

    <input
      placeholder="Features comma separated"
      onChange={e=>setFeatures(e.target.value)}
      className="w-full p-2 mb-3 text-black rounded"
    />

    <button
      onClick={submit}
      className="bg-accent px-4 py-2 rounded text-white">

      Create Candidate

    </button>

    {msg && <p className="mt-2 text-sm">{msg}</p>}

  </div>
 );
}