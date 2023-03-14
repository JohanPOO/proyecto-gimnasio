import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import Principal from "./components/Principal";
import ListadoSede from "./components/ListadoSede";
import ListadoInstructor from "./components/ListadoInstructor";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Principal />} />
          <Route path="/sede-gestion" element={<ListadoSede />} />
          <Route path="/instructor-gestion" element={<ListadoInstructor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
