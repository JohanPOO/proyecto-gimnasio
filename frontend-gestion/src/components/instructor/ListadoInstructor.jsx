import { useState, useEffect } from "react";
import axios from "axios";
import ModalInstructor from "./ModalInstructor";
import Instructor from "./Instructor";

const ListadoInstructor = () => {
  const [instructores, setInstructores] = useState([]);
  const [modal, setModal] = useState(false);
  const [editarInstructor, setEditarInstructor] = useState({});
  const [busqueda, setBusqueda] = useState("");

  const apiInstructor = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/instructores`
    );
    setInstructores(data);
  };

  useEffect(() => {
    apiInstructor();
  }, []);

  const toggleModal = () => {
    setModal(!modal);
    setEditarInstructor({});
  };

  const handleEditar = (instructor) => {
    toggleModal();
    setEditarInstructor(instructor);
  };

  const filtrado = !busqueda
    ? instructores
    : instructores.filter((instructor) =>
        instructor.Nombre_instructor.toLowerCase().includes(
          busqueda.toLocaleLowerCase()
        )
      );

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Instructor</h1>
      <p className="my-3 text-xl">Administra tus Instructores</p>

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
          <ModalInstructor
            toggleModal={toggleModal}
            apiInstructor={apiInstructor}
            editarInstructor={editarInstructor}
          />
        )}
      </div>

      {instructores.length > 0 ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Instructor</th>
              <th className="p-2">Especialidad</th>
              <th className="p-2">Registro</th>
              <th className="p-2">Estado</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filtrado.map((instructor) => (
              <Instructor
                key={instructor.ID_instructor}
                instructor={instructor}
                apiInstructor={apiInstructor}
                handleEditar={handleEditar}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay Instructores Registradas</p>
      )}
    </>
  );
};

export default ListadoInstructor;
