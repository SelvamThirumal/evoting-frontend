import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }){

 const { user } = useContext(AuthContext);

 // Not logged in
 if(!user)
   return <Navigate to="/" />;

 // Role mismatch
 if(role && user.role !== role)
   return <Navigate to={"/"+user.role} />;

 return children;
}
