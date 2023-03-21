import axios from "axios";

const Usuario = ({ usuario, apiUsuario, handleEditar }) => {
  const {
    Nombre_empleado,
    Apellidos_empleado,
    Username,
    Nombre_rol,
    Estado_usuario,
    ID_usuario,
  } = usuario;

  const cambiarEstadoUsuario = async (ID_usuario) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/eliminar-usuario-gestion/${ID_usuario}`
    );
    apiUsuario();
  };
  return (
    <tr className="border-b">
      <td className="p-6 space-y-2">
        <p className="text-2xl text-gray-800">{Nombre_empleado}</p>
        <p>{Apellidos_empleado}</p>
      </td>

      <td className="p-6">
        <p className="text-2xl text-gray-800">{Username.toUpperCase()}</p>
      </td>

      <td className="p-6">
        <p className="text-2xl text-gray-800">{Nombre_rol}</p>
      </td>

      <td className="p-6 space-y-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-lg font-semibold ${
            Estado_usuario === 1
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {`${Estado_usuario === 1 ? "Activo" : "Inactivo"}`}
        </span>
      </td>

      <td className="p-6 gap-3 space-y-2">
        <button
          type={"button"}
          className="text-blue-600 hover:text-blue-700 uppercase font-bold text-lg"
          onClick={() => handleEditar(usuario)}
        >
          Editar
        </button>
        {
          <button
            className={`${
              Estado_usuario === 1 ? "text-red-500" : "text-green-500"
            } ${
              Estado_usuario === 1
                ? "hover:text-red-700"
                : "hover:text-green-700"
            } text-lg font-bold uppercase py-1 px-2 rounded m-0`}
            onClick={() => cambiarEstadoUsuario(ID_usuario)}
          >
            {Estado_usuario === 1 ? "Inactivo" : "Activo"}
          </button>
        }
      </td>
    </tr>
  );
};

export default Usuario;
