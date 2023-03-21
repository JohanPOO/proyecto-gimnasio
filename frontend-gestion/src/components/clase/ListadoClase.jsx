import { useState, useEffect } from "react";
import axios from "axios";
import ModalClase from "./ModalClase";
import Clase from "./Clase";
import { mapeoFecha } from "../../helpers/utils.js";

const ListadoClase = () => {
  const [clases, setClases] = useState([]);
  const [modal, setModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [editarClase, setEditarClase] = useState({});

  const apiClase = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/clases`);
    setClases(data);
  };

  useEffect(() => {
    apiClase();
  }, []);

  const handleEditar = (clase) => {
    toggleModal();
    setEditarClase(clase);
  };

  const toggleModal = () => {
    setModal(!modal);
    setEditarClase({});
  };

  const filtrado = !busqueda
    ? clases
    : clases.filter((clase) => {
        let fecha = clase.Fecha.split("-").join("-").slice(0, 10);
        return fecha === busqueda;
      });

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clases</h1>
      <p className="my-3 text-xl">Administra tus Clases</p>
      <div className="flex justify-between items-center">
        <input
          type="date"
          placeholder="Buscar..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-2/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        <button
          className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleModal}
        >
          Registro
        </button>

        {modal && (
          <ModalClase
            apiClase={apiClase}
            editarClase={editarClase}
            toggleModal={toggleModal}
          />
        )}
      </div>
      {clases.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Clase</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">Duración</th>
              <th className="p-2">Hora de Inicio</th>
              <th className="p-2">Instructor</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filtrado.map((clase) => (
              <Clase
                key={clase.ID_clase}
                clase={clase}
                apiClase={apiClase}
                handleEditar={handleEditar}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay Clases Registradas</p>
      )}
    </>
  );
};

export default ListadoClase;
