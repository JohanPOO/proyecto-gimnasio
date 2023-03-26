import { DataProvider } from "../context/DataContext";
import Carrusel from "./Carrusel";
import CardSedes from "./sedes/CardSedes";

const Principal = () => {
  return (
    <>
      <Carrusel />
      <div className="p-12">
        <CardSedes />
      </div>
    </>
  );
};

export default Principal;
