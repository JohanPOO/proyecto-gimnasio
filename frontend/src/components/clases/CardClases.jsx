import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import Clase from "./Clase";

const CardClases = () => {
  const { clases } = useContext(DataContext);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-8 justify-center px-20 py-12 text-black">
      {clases.map((clase) => (
        <Clase key={clase.ID_clase} clase={clase} />
      ))}
    </div>
  );
};

export default CardClases;
