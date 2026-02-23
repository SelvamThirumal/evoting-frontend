import { useState } from "react";

export default function OtpModal({ onVerify, onClose }) {

  const [otp,setOtp] = useState("");
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState("");

  const submit = async()=>{
    if(!otp){
      setErr("Enter OTP");
      return;
    }

    try{
      setLoading(true);
      setErr("");

      await onVerify(otp);

    }catch{
      setErr("Invalid OTP");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl shadow-xl w-80">

        <h3 className="text-lg font-bold mb-4 text-center text-black">
          Enter OTP
        </h3>

        <input
          value={otp}
          onChange={e=>setOtp(e.target.value)}
          onKeyDown={e=> e.key==="Enter" && submit()}
          className="w-full p-2 border rounded mb-2 text-black"
          placeholder="6 digit code"
        />

        {err && (
          <p className="text-red-500 text-sm mb-2">{err}</p>
        )}

        <div className="flex justify-between mt-3">

          {onClose && (
            <button
              onClick={onClose}
              className="bg-gray-400 px-4 py-2 rounded text-white">
              Cancel
            </button>
          )}

          <button
            disabled={loading}
            onClick={submit}
            className="bg-accent px-4 py-2 rounded text-white">

            {loading ? "Verifying..." : "Verify"}

          </button>

        </div>

      </div>

    </div>
  );
}
