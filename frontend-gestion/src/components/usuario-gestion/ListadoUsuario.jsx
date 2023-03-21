import { useState, useEffect } from "react";
import axios from "axios";
import Usuario from "./Usuario";
import ModalUsuario from "./ModalUsuario";

const ListadoUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modal, setModal] = useState(false);
  const [editarUsuario, setEditarUsuario] = useState({});

  const apiUsuario = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/usuarios-gestion`
      );

      setUsuarios(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(usuarios);
  useEffect(() => {
    apiUsuario();
  }, []);

  const handleEditar = (usuario) => {
    toggleModal();
    setEditarUsuario(usuario);
  };

  const toggleModal = () => {
    setModal(!modal);
    setEditarUsuario({});
  };

  const filtrado = !busqueda
    ? usuarios
    : usuarios.filter((usuario) =>
        usuario.Username.toLowerCase().includes(busqueda.toLocaleLowerCase())
      );
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Usuarios</h1>
      <p className="my-3 text-xl">Administra tus Usuarios</p>

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
          <ModalUsuario
            toggleModal={toggleModal}
            editarUsuario={editarUsuario}
            apiUsuario={apiUsuario}
          />
        )}
      </div>
      {usuarios.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Empleado</th>
              <th className="p-2">Username</th>
              <th className="p-2">Rol</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filtrado.map((usuario) => (
              <Usuario
                key={usuario.ID_usuario}
                usuario={usuario}
                apiUsuario={apiUsuario}
                handleEditar={handleEditar}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay Usuarios Registrados</p>
      )}
    </>
  );
};

export default ListadoUsuario;
