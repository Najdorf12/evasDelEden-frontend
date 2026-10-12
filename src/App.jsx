import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ModeloLogin from "./pages/modelo/ModeloLogin";
import ModeloRegister from "./pages/modelo/ModeloRegister";
import ModeloDashboard from "./pages/modelo/ModeloDashboard";
import PageLoader from "./components/PageLoader";

const Loading = () => <PageLoader show text="Cargando página..." />;

const Home2 = lazy(() => import("./pages/Home2"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const Login = lazy(() => import("./pages/login/Login"));
const Register = lazy(() => import("./pages/login/Register"));
const Contact = lazy(() => import("./pages/Contact"));
const EvaDetail = lazy(() => import("./pages/EvaDetail"));
const ModeloForgotPassword = lazy(
  () => import("./pages/modelo/ModeloForgotPassword"),
);
const ModeloResetPassword = lazy(
  () => import("./pages/modelo/ModeloResetPassword"),
);

function App() {
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
          <Route path="/modelo/login" element={<ModeloLogin />} />
          <Route path="/modelo/register" element={<ModeloRegister />} />
          <Route path="/modelo/dashboard" element={<ModeloDashboard />} />
          <Route
            path="/modelo/forgot-password"
            element={<ModeloForgotPassword />}
          />
          <Route
            path="/modelo/reset-password/:token"
            element={<ModeloResetPassword />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
