import Carrusel from "./Carrusel";
import CardSedes from "./sedes/CardSedes";
import CardTipoMembresias from "./tipomembresias/CardTipoMembresias";

const Principal = () => {
  return (
    <>
      <Carrusel />
      <div className="p-12">
        <CardSedes />
        <CardTipoMembresias />
      </div>
    </>
  );
};

export default Principal;
