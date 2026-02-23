import { useState, useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function Login(){

  const { role } = useParams();

  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [password,setPassword] = useState("");
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);

  const {login} = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async(e)=>{
    e.preventDefault();

    try{
      setLoading(true);

      const res = await API.post("/auth/login",{
        email,
        phone,
        password
      });

      login(res.data);
      nav("/"+res.data.user.role);

    }catch(err){
      alert(err.response?.data || "Login failed");
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="
      min-h-screen flex items-center justify-center
      px-4 sm:px-6
      bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
    ">

      <form
        onSubmit={submit}
        className="
        w-full max-w-md
        bg-white/10 backdrop-blur-xl border border-white/20
        shadow-[0_0_40px_rgba(0,0,0,0.5)]
        p-6 sm:p-8 md:p-10
        rounded-2xl sm:rounded-3xl
        transition
        ">

        {/* TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          🗳 E-Voting Portal
        </h1>

        {role && (
          <p className="text-center text-xs sm:text-sm text-orange-400 mb-4 font-bold uppercase">
            {role} Login
          </p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={e=>setEmail(e.target.value)}
          required
          className="
            w-full p-3 sm:p-3.5 mb-3
            rounded-xl bg-white/80 text-black outline-none
            text-sm sm:text-base
          "
        />

        {/* PHONE */}
        <input
          type="text"
          placeholder="Phone Number (Students)"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          className="
            w-full p-3 sm:p-3.5 mb-3
            rounded-xl bg-white/80 text-black outline-none
            text-sm sm:text-base
          "
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={show ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
            className="
              w-full p-3 sm:p-3.5
              rounded-xl bg-white/80 text-black outline-none
              text-sm sm:text-base
            "
          />

          <span
            onClick={()=>setShow(!show)}
            className="
              absolute right-3 top-3
              cursor-pointer text-gray-600
              text-xs sm:text-sm
            ">
            {show ? "Hide" : "Show"}
          </span>
        </div>

        {/* BUTTON */}
        <button
          disabled={loading}
          className="
            bg-orange-500 hover:bg-orange-600
            w-full py-3 mt-5 rounded-xl font-bold
            text-sm sm:text-base
            transition transform hover:scale-105
          ">

          {loading ? "Logging in..." : "Login"}

        </button>

        {/* SIGNUP */}
        <p className="text-center mt-5 text-xs sm:text-sm text-gray-300">
          New user?{" "}
          <Link to="/signup"
            className="text-orange-400 font-bold hover:underline">
            Create Account
          </Link>
        </p>

      </form>
    </div>
  );
}
