import { useEffect, useState } from "react";
import API from "../../services/api";

export default function TeacherCandidateList(){

 const [list,setList] = useState([]);
 const [loading,setLoading] = useState(true);

 const load = ()=>{
  setLoading(true);

  API.get("/candidates")
    .then(res=>{
      setList(res.data);
    })
    .catch(()=>{
      alert("Unable to load candidates");
    })
    .finally(()=>{
      setLoading(false);
    });
 };

 useEffect(load,[]);

 return(
  <div className="bg-secondary p-5 rounded-xl">

    <div className="flex justify-between mb-4">
      <h3 className="font-bold text-lg">
        Selected Candidates
      </h3>

      <button
        onClick={load}
        className="bg-accent px-3 py-1 rounded text-white">
        Refresh
      </button>
    </div>

    {loading && <p>Loading...</p>}

    <div className="grid grid-cols-3 gap-6">

      {list.map(c=>(
        <div
          key={c._id}
          className="bg-white text-black p-4 rounded-xl text-center shadow">

          {/* QR SAFE */}
          {c.qrCode ? (
            <img
              src={c.qrCode}
              className="mx-auto w-20 mb-2"/>
          ):(
            <div className="w-20 h-20 bg-gray-300 mx-auto mb-2 rounded flex items-center justify-center">
              QR
            </div>
          )}

          <h4 className="font-bold">{c.name}</h4>

          <p className="text-sm">
            Position: {c.position}
          </p>

          {/* FEATURES */}
          <ul className="text-left text-xs mt-2 list-disc ml-4">
            {c.features?.map((f,i)=>(
              <li key={i}>{f}</li>
            ))}
          </ul>

        </div>
      ))}

    </div>

  </div>
 );
}
