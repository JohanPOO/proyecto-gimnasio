import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Principal from "./components/Principal";
import LoginCliente from "./components/LoginCliente";
import LoginGestion from "./components/LoginGestion";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Principal />} />
          <Route path="/login-cliente" element={<LoginCliente />} />
          <Route path="/login-gestion" element={<LoginGestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
