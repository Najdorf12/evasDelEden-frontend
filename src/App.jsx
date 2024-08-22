import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />
          

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/admin" element={<AdminPage />} />
         
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
