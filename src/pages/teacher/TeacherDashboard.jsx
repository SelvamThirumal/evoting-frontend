import { useState, useEffect } from "react";
import API from "../../services/api";
 
export default function TeacherDashboard() {

  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [attendance, setAttendance] = useState("");
  const [exam, setExam] = useState("");
  const [features, setFeatures] = useState("");
  const [photo, setPhoto] = useState(null);

  const [list, setList] = useState([]);
  const [photos, setPhotos] = useState({});
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);

  // LOAD
  const load = () => {
    API.get("/candidates").then(res => setList(res.data));

    API.get("/photos").then(res => {
      const map = {};
      res.data.forEach(p => {
        map[p.candidateId] = p.image;
      });
      setPhotos(map);
    });
  };

  useEffect(load, []);

  // POSITION
  const calcPosition = () => {
    const att = Number(attendance);
    const ex = Number(exam);

    if (att >= 80 && ex >= 80) return "chairman";
    if (att >= 75 && ex >= 80) return "representative";
    return null;
  };

  // SUBMIT
  const submit = async (e) => {
    e.preventDefault();

    const pos = calcPosition();
    if (!pos) {
      setMsg("Not Eligible ❌");
      return;
    }

    const data = {
      name,
      department,
      position: pos,
      features: features.split(",").map(f => f.trim())
    };

    try {
      let res;

      if (editing)
        res = await API.put(`/candidates/${editing}`, data);
      else
        res = await API.post("/candidates", data);

      if (photo) {
        const fd = new FormData();
        fd.append("file", photo);

        await API.post(`/photos/upload/${res.data._id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      setMsg("Saved Successfully ✅");

      setEditing(null);
      setName("");
      setDepartment("");
      setAttendance("");
      setExam("");
      setFeatures("");
      setPhoto(null);

      load();

    } catch {
      setMsg("Failed to Save ❌");
    }
  };

  // DELETE
  const remove = async (id) => {
    if (!window.confirm("Delete candidate permanently?")) return;

    try {
      await API.delete(`/candidates/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      setMsg("Deleted Successfully 🗑️");
      load();

    } catch (err) {
      if (err.response?.status === 403)
        setMsg("Permission Denied ❌");
      else
        setMsg("Delete Failed ❌");
    }
  };

  // EDIT
  const edit = (c) => {
    setEditing(c._id);
    setName(c.name || "");
    setDepartment(c.department || "");
    setFeatures((c.features || []).join(","));
  };

  // FILTER
  const filtered = list.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ================= UI =================
  return (

 

      <div className="w-full max-w-none">

        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Teacher Dashboard
        </h1>

        {/* FORM */}
        <form onSubmit={submit}
          className="bg-slate-800 p-4 sm:p-6 rounded-xl mb-6 space-y-3">

          <input value={name}
            onChange={e=>setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 bg-slate-900 rounded"/>

          <input value={department}
            onChange={e=>setDepartment(e.target.value)}
            placeholder="Department"
            className="w-full p-3 bg-slate-900 rounded"/>

          <div className="flex flex-col sm:flex-row gap-3">
            <input type="number"
              value={attendance}
              onChange={e=>setAttendance(e.target.value)}
              placeholder="Attendance %"
              className="w-full p-3 bg-slate-900 rounded"/>

            <input type="number"
              value={exam}
              onChange={e=>setExam(e.target.value)}
              placeholder="Exam %"
              className="w-full p-3 bg-slate-900 rounded"/>
          </div>

          <input value={features}
            onChange={e=>setFeatures(e.target.value)}
            placeholder="Skills comma separated"
            className="w-full p-3 bg-slate-900 rounded"/>

          <input type="file"
            onChange={e=>setPhoto(e.target.files[0])}
            className="w-full"/>

          <button className="w-full sm:w-auto bg-blue-600 px-6 py-3 rounded">
            {editing ? "Update Candidate" : "Add Candidate"}
          </button>

          {msg && <div>{msg}</div>}
        </form>

        {/* SEARCH */}
        <input
          placeholder="Search candidates..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="w-full p-3 bg-slate-800 rounded mb-6"
        />

        {/* LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map(c=>(
            <div key={c._id}
              className="bg-slate-800 p-4 rounded-xl">

              <div className="flex gap-3 items-center">

                {photos[c._id]
                  ? <img src={photos[c._id]}
                        className="w-14 h-14 rounded-full"/>
                  : <div className="w-14 h-14 bg-slate-700 rounded-full"/>}

                <div>
                  <div className="font-bold">{c.name}</div>
                  <div className="text-sm text-slate-400">{c.department}</div>
                </div>

              </div>

              <div className="flex justify-between mt-4">

                <button onClick={()=>edit(c)}
                  className="text-blue-400">
                  Edit
                </button>

                <button onClick={()=>remove(c._id)}
                  className="text-red-400">
                  Delete
                </button>

              </div>

            </div>
          ))}
        </div>

      </div>

    
  );
}
