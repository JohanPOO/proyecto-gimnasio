import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Principal from "./components/Principal";
import ListadoSede from "./components/sede/ListadoSede";
import ListadoInstructor from "./components/instructor/ListadoInstructor";
import ListadoUsuario from "./components/usuario-gestion/ListadoUsuario";
import ListadoClase from "./components/clase/ListadoClase";
import ListadoTipoMembresia from "./components/tipomembresia/ListadoTipoMembresia";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Principal />} />
          <Route path="/sede-gestion" element={<ListadoSede />} />
          <Route path="/instructor-gestion" element={<ListadoInstructor />} />
          <Route path="/usuario-gestion" element={<ListadoUsuario />} />
          <Route path="/clase-gestion" element={<ListadoClase />} />
          <Route path="/tipo-membresia" element={<ListadoTipoMembresia />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
