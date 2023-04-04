import axios from "axios";

const TipoMembresia = ({ tipo, apiTipoMembresia, handleEditar }) => {
  //console.log(tipo);
  const { ID_tip_memb, Nombre, Descripcion, Precio, Estado_tip_memb } = tipo;

  const cambiarEstadoTipoMemb = async (ID) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/eliminar-tipomembresia/${ID}`
    );
    apiTipoMembresia();
  };

  return (
    <tr>
      <td className="p-6 space-y-2">
        <p className="text-lg text-gray-800">{Nombre}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-lg text-gray-800">{Descripcion}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-lg text-gray-800">{Precio}</p>
      </td>

      <td className="p-2 space-y-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-lg font-semibold ${
            Estado_tip_memb === 1
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {`${Estado_tip_memb === 1 ? "Activo" : "Inactivo"}`}
        </span>
      </td>

      {/* Acciones */}
      <td className="p-6 gap-3 space-y-2">
        <button
          type={"button"}
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-lg"
          onClick={() => handleEditar(tipo)}
        >
          Editar
        </button>
        <button
          className={`${
            Estado_tip_memb === 1 ? "text-red-500" : "text-green-500"
          } ${
            Estado_tip_memb === 1
              ? "hover:text-red-700"
              : "hover:text-green-700"
          } text-lg font-bold uppercase py-1 px-2 rounded`}
          onClick={() => cambiarEstadoTipoMemb(ID_tip_memb)}
        >
          {Estado_tip_memb === 1 ? "Inactivo" : "Activo"}
        </button>
      </td>
    </tr>
  );
};

export default TipoMembresia;
