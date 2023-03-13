import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header";
import ListadoSede from "./components/ListadoSede";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<h1>aa</h1>} />
          <Route path="/sede-gestion" element={<ListadoSede />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
