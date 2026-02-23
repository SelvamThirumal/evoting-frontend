import { BrowserRouter, Routes, Route } from "react-router-dom";

// AUTH
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

// HOME
import Home from "../components/Home";

// DASHBOARDS
import StudentDashboard from "../pages/student/StudentDashboard";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import HodDashboard from "../pages/hod/HodDashboard";
import PrincipalDashboard from "../pages/principal/PrincipalDashboard";

// COMMON
import LiveResults from "../pages/LiveResults";

// COMPONENTS
import ProtectedRoute from "../components/common/ProtectedRoute";
import Layout from "../components/Layout"; // ✅ REAL LAYOUT


export default function AppRoutes(){
  return(
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/login/:role" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />

        {/* STUDENT */}
        <Route path="/student"
          element={
            <ProtectedRoute role="student">
              <Layout>
                <StudentDashboard/>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* TEACHER */}
        <Route path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <Layout>
                <TeacherDashboard/>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* HOD */}
        <Route path="/hod"
          element={
            <ProtectedRoute role="hod">
              <Layout>
                <HodDashboard/>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* PRINCIPAL */}
        <Route path="/principal"
          element={
            <ProtectedRoute role="principal">
              <Layout>
                <PrincipalDashboard/>
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* RESULTS */}
        <Route path="/results"
          element={
            <ProtectedRoute>
              <Layout>
                <LiveResults />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}