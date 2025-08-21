import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ItemsPage from "./components/ItemsPage";
import AdminPage from "./components/AdminPage";

// Navbar now takes user and setUser for logout logic
function Navbar({ user, setUser }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/auth/logout", { method: "POST", credentials: "include" });
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-12 py-4 bg-blue-900 shadow text-white">
      <span className="text-2xl font-bold tracking-wider text-blue-100">InventorySystem</span>
      <div className="flex gap-4">
        {!user ? (
          <>
            <Link
              to="/login"
              className={`rounded px-6 py-2 font-semibold text-lg transition ${location.pathname === "/login"
                ? "bg-blue-100 text-blue-800 shadow"
                : "bg-blue-700 hover:bg-blue-600"
                }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`rounded px-6 py-2 font-semibold text-lg transition ${location.pathname === "/signup"
                ? "bg-blue-100 text-blue-800 shadow"
                : "bg-blue-700 hover:bg-blue-600"
                }`}
            >
              Signup
            </Link>
            <Link
              to="/admin"
              className={`rounded px-6 py-2 font-semibold text-lg transition ${location.pathname === "/admin"
                ? "bg-blue-100 text-blue-800 shadow"
                : "bg-blue-700 hover:bg-blue-600"
                }`}
            >
              Admin
            </Link>
          </>
        ) : (
          <>
            <span className="rounded px-6 py-2 font-semibold text-lg bg-blue-200 text-blue-800">
              {user.name}
            </span>
            <button
              onClick={handleLogout}
              className="rounded px-6 py-2 font-semibold text-lg bg-red-600 hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [user, setUser] = useState(null);

  // On mount, check if user is already logged in via cookie
  useEffect(() => {
    fetch("/auth/me", { credentials: "include" })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUser({ name: data.name, email: data.email });
        }
      })
      .catch(() => { });
  }, []);

  return (
    <Router>
      <div className="font-sans bg-blue-50 min-h-screen flex flex-col">
        <Navbar user={user} setUser={setUser} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
