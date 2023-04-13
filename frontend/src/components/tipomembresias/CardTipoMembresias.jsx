import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import TipoMembresia from "./TipoMembresia";

const CardTipoMembresias = () => {
  const { tiposMembresias } = useContext(DataContext);

  return (
    <>
      <p className="font-bold uppercase text-5xl text-center">MEMBRESIAS</p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 content-center justify-center py-10 text-black text-center">
        {tiposMembresias.map((tipo) => (
          <TipoMembresia key={tipo.ID_tip_memb} tipo={tipo} />
        ))}
      </div>
    </>
  );
};

export default CardTipoMembresias;
