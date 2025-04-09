import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { preloadData } from './api/preload';

// Componente de carga (puedes personalizarlo)
const Loading = () => <div className="loading-spinner">Cargando...</div>;

// Carga diferida de todos los componentes de ruta
const Home2 = lazy(() => import("./pages/Home2"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/login/Register"));
const Contact = lazy(() => import("./pages/Contact"));
const EvaDetail = lazy(() => import("./pages/EvaDetail"));

function App() {
  useEffect(() => {
    const storedVerification = sessionStorage.getItem("isVerified");
    if (storedVerification === "true") {
      preloadData();
    }
  }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home2 />} />
          <Route path="/:name/:id" element={<EvaDetail />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;