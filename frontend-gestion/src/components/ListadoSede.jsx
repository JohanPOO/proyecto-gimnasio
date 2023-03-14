import { useEffect, useState } from "react";
import axios from "axios";
import Sede from "./pages/Sede";
import Modal from "./ModalSede";

const ListadoSede = () => {
  const [sedes, setSedes] = useState([]);
  const [modal, setModal] = useState(false);
  const [editarSede, setEditarSede] = useState({});
  const [busqueda, setBusqueda] = useState("");

  const toggleModal = () => {
    setModal(!modal);
    setEditarSede({});
  };

  useEffect(() => {
    apiSede();
  }, []);

  const apiSede = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sedes`);
    setSedes(data);
  };

  const handleEditar = async (sede) => {
    toggleModal();
    setEditarSede(sede);
  };

  const filtrado = !busqueda
    ? sedes
    : sedes.filter((sede) =>
        sede.Nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())
      );

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Sedes</h1>
      <p className="my-3 text-xl">Administra tus Sedes</p>

      <div className="flex justify-between items-center">
        <input
          type="text"
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
          <Modal
            toggleModal={toggleModal}
            apiSede={apiSede}
            editarSede={editarSede}
          />
        )}
      </div>

      {sedes.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Sede</th>
              <th className="p-2">Distrito</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filtrado.map((sede) => (
              <Sede
                key={sede.ID_sede}
                sede={sede}
                setSedes={setSedes}
                handleEditar={handleEditar}
              />
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
