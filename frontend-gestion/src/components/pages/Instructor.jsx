import axios from "axios";
import { mapeoFecha } from "../../helpers/utils.js";

const Instructor = ({ instructor, apiInstructor, handleEditar }) => {
  const {
    ID_instructor,
    Nombre_instructor,
    Apellidos_instructor,
    Especialidad,
    Trayectoria,
    Fecha_registro,
    NombreSede,
    Estado_instructor,
  } = instructor;

  const cambiarEstadoInstructor = async (ID_instructor) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/eliminar-instructor/${ID_instructor}`
    );
    apiInstructor();
    return;
  };
  return (
    <tr>
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{Nombre_instructor}</p>
        <p>{Apellidos_instructor}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-2xl text-gray-800">{Especialidad}</p>
        <p>{Trayectoria}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-2xl text-gray-800">{mapeoFecha(Fecha_registro)}</p>
        <p>{NombreSede}</p>
      </td>

      <td className="p-2 space-y-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-lg font-semibold ${
            Estado_instructor === 1
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {`${Estado_instructor === 1 ? "Activo" : "Inactivo"}`}
        </span>
      </td>

      {/* Acciones */}
      <td className="p-6 gap-3 space-y-2">
        <button
          type={"button"}
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-lg"
          onClick={() => handleEditar(instructor)}
        >
          Editar
        </button>
        <button
          className={`${
            Estado_instructor === 1 ? "text-red-500" : "text-green-500"
          } ${
            Estado_instructor === 1
              ? "hover:text-red-700"
              : "hover:text-green-700"
          } text-lg font-bold uppercase py-1 px-2 rounded`}
          onClick={() => cambiarEstadoInstructor(ID_instructor)}
        >
          {Estado_instructor === 1 ? "Inactivo" : "Activo"}
        </button>
      </td>
    </tr>
  );
};

export default Instructor;
