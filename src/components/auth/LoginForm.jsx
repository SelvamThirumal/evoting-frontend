import { useState,useContext } from "react";
import API from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm(){

 const {login}=useContext(AuthContext);
 const nav = useNavigate();

 const [form,setForm]=useState({
   email:"",
   phone:"",
   password:""
 });

 const submit=async(e)=>{
  e.preventDefault();

  const res = await API.post("/auth/login",form);

  login(res.data);

  // ⭐ Role based redirect
  nav("/"+res.data.user.role);
 };

 return(
  <div className="min-h-screen flex items-center justify-center bg-primary">

   <form
     onSubmit={submit}
     className="bg-secondary p-8 rounded-xl w-80 shadow-lg">

    <h2 className="text-xl mb-4 font-bold">Login</h2>

    {/* EMAIL */}
    <input
      placeholder="Email"
      required
      onChange={e=>setForm({...form,email:e.target.value})}
      className="w-full p-2 mb-3 text-black rounded"
    />

    {/* PHONE (Student only — backend ignore others) */}
    <input
      placeholder="Phone (Student)"
      onChange={e=>setForm({...form,phone:e.target.value})}
      className="w-full p-2 mb-3 text-black rounded"
    />

    {/* PASSWORD */}
    <input
      type="password"
      placeholder="Password"
      required
      onChange={e=>setForm({...form,password:e.target.value})}
      className="w-full p-2 mb-4 text-black rounded"
    />

    <button
      className="bg-accent w-full py-2 rounded font-bold">
      Login
    </button>

   </form>

  </div>
 );
}
