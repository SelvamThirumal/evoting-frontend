import { useState } from "react";
import API from "../../services/api";

export default function ResultDeclareCard(){

 const [msg,setMsg]=useState("");

 const declare = async()=>{
  try{

    await API.post("/results/declare");

    setMsg("Results Declared ✅");

  }catch{
    setMsg("Failed ❌");
  }
 };

 return(
  <div className="bg-secondary p-5 rounded-xl max-w-sm">

    <h3 className="font-bold mb-3">
      Result Control
    </h3>

    <button
      onClick={declare}
      className="bg-accent px-4 py-2 rounded text-white w-full">

      Declare Results

    </button>

    {msg && (
      <p className="mt-2 text-sm text-center">
        {msg}
      </p>
    )}

  </div>
 );
}
