import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function Signup(){

  const nav = useNavigate();

  const [loading,setLoading] = useState(false);
  const [show,setShow] = useState(false);

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:"",
    phone:"",
    role:"student",
    department:"",
    regNo:""
  });

  const change = e=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const submit = async(e)=>{
    e.preventDefault();

    try{
      setLoading(true);

      await API.post("/auth/signup",form);

      alert("Signup Success ✅");
      nav("/");

    }catch(err){
      alert(err.response?.data || "Signup failed");
    }finally{
      setLoading(false);
    }
  };

  const isStudent = form.role === "student";

  return(
    <div className="
      min-h-screen flex items-center justify-center
      px-4 sm:px-6
      bg-gradient-to-br from-slate-900 to-slate-800
    ">

      <form
        onSubmit={submit}
        className="
        w-full max-w-md
        bg-white/10 backdrop-blur-xl border border-white/20
        p-6 sm:p-8 md:p-10
        rounded-xl sm:rounded-2xl
        shadow-xl
        ">

        <h2 className="text-2xl sm:text-3xl text-center mb-6 font-bold">
          Create Account
        </h2>

        <input
          name="name"
          placeholder="Name"
          onChange={change}
          required
          className="
            w-full p-3 mb-3
            rounded-lg bg-white text-black
            text-sm sm:text-base
          "
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={change}
          required
          className="
            w-full p-3 mb-3
            rounded-lg bg-white text-black
            text-sm sm:text-base
          "
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            name="password"
            type={show ? "text":"password"}
            placeholder="Password"
            onChange={change}
            required
            className="
              w-full p-3 mb-3
              rounded-lg bg-white text-black
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

        {/* ROLE */}
        <select
          name="role"
          onChange={change}
          className="
            w-full p-3 mb-3
            rounded-lg bg-white text-black
            text-sm sm:text-base
          ">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="hod">HOD</option>
          <option value="principal">Principal</option>
        </select>

        {/* STUDENT ONLY */}
        {isStudent && (
          <>
            <input
              name="phone"
              placeholder="Phone"
              onChange={change}
              required
              className="w-full p-3 mb-3 rounded-lg bg-white text-black"
            />

            <input
              name="department"
              placeholder="Department"
              onChange={change}
              required
              className="w-full p-3 mb-3 rounded-lg bg-white text-black"
            />

            <input
              name="regNo"
              placeholder="Register No"
              onChange={change}
              required
              className="w-full p-3 mb-3 rounded-lg bg-white text-black"
            />
          </>
        )}

        <button
          disabled={loading}
          className="
            bg-orange-500 hover:bg-orange-600
            w-full py-3 rounded-lg font-bold mt-2
            text-sm sm:text-base
            transition transform hover:scale-105
          ">

          {loading ? "Creating..." : "Signup"}

        </button>

      </form>
    </div>
  );
}
