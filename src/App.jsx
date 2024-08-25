import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [allEvas, setAllEvas] = useState([]);

  useEffect(() => {
    getEvas();
  }, []);
  
  const getEvas = () => {
    /*   setIsLoading(true); */
    setTimeout(() => {
      axios
        .get("/evas")
        .then((res) => setAllEvas(res.data))
        .catch((error) => console.error(error));
      /*    .finally(() => setIsLoading(false));  */
    }, 1500);
  };
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home allEvas={allEvas} />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminPage allEvas={allEvas}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
