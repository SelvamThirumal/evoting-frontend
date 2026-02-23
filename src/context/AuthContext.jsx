import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(true);

  // ⭐ Restore session
  useEffect(()=>{
    try{
      const saved = localStorage.getItem("user");
      if(saved){
        setUser(JSON.parse(saved));
      }
    }catch{}
    setLoading(false);
  },[]);


  // ⭐ Login
  const login = (data)=>{
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  // ⭐ Logout
  const logout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // ⭐ Helpers
  const getToken = ()=> localStorage.getItem("token");
  const hasRole = (r)=> user?.role === r;

  return(
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        getToken,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
