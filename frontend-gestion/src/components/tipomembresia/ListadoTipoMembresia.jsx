import { useState, useEffect } from "react";
import axios from "axios";
import ModalTipoMembresia from "./ModalTipoMembresia";
import TipoMembresia from "./TipoMembresia";

const ListadoTipoMembresia = () => {
  const [tiposMembresias, setTiposMembresias] = useState([]);
  const [modal, setModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [editarTipoMembresia, setEditarTipoMembresia] = useState([]);

  const apiTipoMembresia = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/tipomembresias`
    );
    setTiposMembresias(data);
  };

  useEffect(() => {
    apiTipoMembresia();
  }, []);

  const handleEditar = (tipomemb) => {
    toggleModal();
    setEditarTipoMembresia(tipomemb);
  };

  const toggleModal = () => {
    setModal(!modal);
    setEditarTipoMembresia({});
  };

  const filtrado = !busqueda
    ? tiposMembresias
    : tiposMembresias.filter((tipo) =>
        tipo.Nombre.toLowerCase().includes(busqueda.toLocaleLowerCase())
      );

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Tipos de Membresias</h1>
      <p className="my-3 text-xl">Administra tus Tipos de Membresias</p>
      <div className="flex justify-between items-center">
        <input
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
          <ModalTipoMembresia
            apiTipoMembresia={apiTipoMembresia}
            toggleModal={toggleModal}
            editarTipoMembresia={editarTipoMembresia}
          />
        )}
      </div>
      {tiposMembresias.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Tipo de Membresia</th>
              <th className="p-2">Descripción</th>
              <th className="p-2">Precio</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filtrado.map((tipo) => (
              <TipoMembresia
                key={tipo.ID_tip_memb}
                tipo={tipo}
                apiTipoMembresia={apiTipoMembresia}
                handleEditar={handleEditar}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay Tipos de Membresias Registradas</p>
      )}
    </>
  );
};

export default ListadoTipoMembresia;
