import { useEffect, useState } from "react";
import API from "../../services/api";

export default function UserManageCard(){

 const [users,setUsers]=useState([]);

 const load = ()=>{
  API.get("/auth/users")
    .then(res=>setUsers(res.data))
    .catch(()=>{});
 };

 useEffect(load,[]);


 const approve = async(id)=>{
  await API.put(`/auth/approve/${id}`);
  load();
 };

 const block = async(id)=>{
  await API.put(`/auth/block/${id}`);
  load();
 };


 return(
  <div className="bg-secondary p-5 rounded-xl">

    <h3 className="font-bold mb-4">
      User Management
    </h3>

    <div className="space-y-3">

      {users.map(u=>(
        <div key={u._id}
          className="flex justify-between items-center border-b pb-2">

          <div>
            <p>{u.name}</p>
            <span className="text-xs opacity-70">
              {u.role}
            </span>
          </div>

          <div className="flex gap-2">

            <button
              onClick={()=>approve(u._id)}
              className="bg-success px-3 py-1 rounded text-white">
              Approve
            </button>

            <button
              onClick={()=>block(u._id)}
              className="bg-danger px-3 py-1 rounded text-white">
              Block
            </button>

          </div>

        </div>
      ))}

    </div>

  </div>
 );
}
