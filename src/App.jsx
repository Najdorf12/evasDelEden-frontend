import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import AgeVerification from "./components/AgeVerification"; // Importa el nuevo componente
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEvas } from "./api/handlers";

function App() {
  const [allEvas, setAllEvas] = useState([]);
  const [isVerified, setIsVerified] = useState(false); // Estado para verificar la edad

  useEffect(() => {
    const fetchEvas = async () => {
      try {
        const evasData = await getEvas();
        console.log("Evas Data:", evasData);
        setAllEvas(evasData);
      } catch (error) {
        console.error("Failed to fetch evas:", error);
      }
    };

    fetchEvas();
  }, []);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
