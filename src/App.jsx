import { useEffect } from 'react';
import Home2 from "./pages/Home2";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Contact from "./pages/Contact";
import EvaDetail from "./pages/EvaDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { preloadData } from './api/preload';

function App() {
  useEffect(() => {
    const storedVerification = sessionStorage.getItem("isVerified");
    if (storedVerification === "true") {
      preloadData();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home2 />} />
        <Route path="/:name/:id" element={<EvaDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;