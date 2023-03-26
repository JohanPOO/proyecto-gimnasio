import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./layouts/Header";
import Principal from "./components/Principal";
import LoginCliente from "./components/LoginCliente";
import LoginGestion from "./components/LoginGestion";

import CardInstructores from "./components/instructores/CardInstructores";
import CardClases from "./components/clases/CardClases";

import SedeDetalle from "./components/sedes/SedeDetalle";

import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Principal />} />
            <Route path="/login-cliente" element={<LoginCliente />} />
            <Route path="/login-gestion" element={<LoginGestion />} />
            <Route path="/instructores" element={<CardInstructores />} />
            <Route path="/clases" element={<CardClases />} />
            <Route path="/sedes/:sedeId" element={<SedeDetalle />} />
          </Route>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
