import Home2 from "./pages/Home2";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import Contact from "./pages/Contact";
import EvaDetail from "./pages/EvaDetail"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
 
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home2 />} />
    <Route path="/:id" element={<EvaDetail />} />
    <Route path="/contacto" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
