import "./App.css";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Discussion from "./components/pages/Discussion";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import EditProfile from "./components/pages/EditProfile";
import Profile from "./components/pages/Profile";
import MyProfile from "./components/pages/MyProfile";
import Room from "./components/pages/Room";
import PrivateRoutes from "./utils/PrivateRoutes";
import Settings from "./components/pages/Settings";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.setItem("user", null);
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <>
      <Navbar user={user} logout={logout} />
      <main>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/discussion" element={<Discussion />} />
            <Route path="/room" element={<Room user={user} />} />
            <Route path="/myprofile/" element={<MyProfile />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="/editprofile" element={<EditProfile user={user} />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
