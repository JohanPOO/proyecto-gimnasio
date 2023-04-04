import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import Sede from "./Sede";

const Sedes = () => {
  const { sedes } = useContext(DataContext);

  return (
    <>
      <p className="font-bold uppercase text-3xl text-center mb-8">
        --------------------------------SEDES-------------------------------------
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center p-10 text-white">
        {sedes.map((sede) => (
          <Sede key={sede.ID_sede} sede={sede} />
        ))}
      </div>
    </>
  );
};

export default Sedes;
