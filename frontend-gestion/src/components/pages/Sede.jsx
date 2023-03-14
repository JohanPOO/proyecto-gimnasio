import axios from "axios";

const Sede = ({ sede, setSedes, handleEditar }) => {
  const {
    ID_sede,
    Nombre,
    Direccion,
    Nombre_distrito,
    Nombre_provincia,
    Estado_sede,
    Url_imagen,
  } = sede;
  const cambiarEstadoSede = async (ID_sede) => {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_URL}/eliminar-sede/${ID_sede}`
    );
    setSedes(data.results);
  };

  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{Nombre}</p>
        <p>{Direccion}</p>
      </td>

      <td className="p-6">
        <p className="text-2xl text-gray-800">{Nombre_distrito}</p>
        <p>{Nombre_provincia}</p>
      </td>

      <td className="p-6 space-y-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-lg font-semibold ${
            Estado_sede === 1
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {`${Estado_sede === 1 ? "Activo" : "Inactivo"}`}
        </span>
      </td>

      <td className="p-6 gap-3 space-y-2">
        <button
          type={"button"}
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-lg"
          onClick={() => handleEditar(sede)}
        >
          Editar
        </button>
        <button
          className={`${
            Estado_sede === 1 ? "text-red-500" : "text-green-500"
          } ${
            Estado_sede === 1 ? "hover:text-red-700" : "hover:text-green-700"
          } text-lg font-bold uppercase py-1 px-2 rounded`}
          onClick={() => cambiarEstadoSede(ID_sede)}
        >
          {Estado_sede === 1 ? "Inactivo" : "Activo"}
        </button>
      </td>
    </tr>
  );
};

export default Sede;
