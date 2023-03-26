import axios from "axios";
import { mapeoFecha, mapeoHora } from "../../helpers/utils.js";

const Clase = ({ clase, apiClase, handleEditar }) => {
  const {
    ID_clase,
    Nombre,
    Descripcion,
    Fecha,
    Duracion,
    Hora_inicio,
    Nombre_instructor,
    Estado_clase,
  } = clase;

  const cambiarEstadoClase = async (ID) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/eliminar-clase/${ID}`);
    apiClase();
  };

  return (
    <tr>
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{Nombre}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{Descripcion}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{mapeoFecha(Fecha)}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{Duracion}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{Hora_inicio}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-2xl text-gray-800">{Nombre_instructor}</p>
      </td>

      {
        <td className="p-2 space-y-2">
          <span
            className={`inline-block rounded-full px-3 py-1 text-lg font-semibold ${
              Estado_clase === 1
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {`${Estado_clase === 1 ? "Activo" : "Inactivo"}`}
          </span>
        </td>
      }

      {/* Acciones */}
      <td className="p-6 gap-3 space-y-2">
        <button
          type={"button"}
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-lg"
          onClick={() => handleEditar(clase)}
        >
          Editar
        </button>
        <button
          className={`${
            Estado_clase === 1 ? "text-red-500" : "text-green-500"
          } ${
            Estado_clase === 1 ? "hover:text-red-700" : "hover:text-green-700"
          } text-lg font-bold uppercase py-1 px-2 rounded`}
          onClick={() => cambiarEstadoClase(ID_clase)}
        >
          {Estado_clase === 1 ? "Inactivo" : "Activo"}
        </button>
      </td>
    </tr>
  );
};

export default Clase;
