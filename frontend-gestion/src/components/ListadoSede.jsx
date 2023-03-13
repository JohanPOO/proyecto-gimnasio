import { useEffect, useState } from "react";
import axios from "axios";
import Sede from "./Sede";
import Modal from "./Modal";

const ListadoSede = () => {
  const [sedes, setSedes] = useState([]);
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    apiSede();
  }, []);

  const apiSede = async () => {
    const { data } = await axios.get("http://localhost:8000/api/sedes");
    setSedes(data);
  };
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Sedes</h1>
      <p className="mt-3 text-xl">Administra tus Sedes</p>

      <div className="flex justify-end items-center">
        <button
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          Registro
        </button>
        {modal && <Modal toggleModal={toggleModal} apiSede={apiSede} />}
      </div>

      {sedes.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Nombre Sede</th>
              <th className="p-2">Distrito</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sedes.map((sede) => (
              <Sede key={sede.ID_sede} sede={sede} setSedes={setSedes} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay Sedes Registradas</p>
      )}
    </>
  );
};

export default ListadoSede;
