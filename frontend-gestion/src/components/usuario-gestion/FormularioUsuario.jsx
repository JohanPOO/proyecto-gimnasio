import { useState, useEffect } from "react";
import axios from "axios";
import { formatFecha } from "../../helpers/utils.js";

const FormularioUsuario = ({
  editarUsuario,
  toggleModal,
  apiUsuario,
  setError,
}) => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [dni, setDni] = useState("");
  const [fecha_nacimiento, setFecha_nacimiento] = useState("");
  const [username, setUsername] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [idRol, setIdRol] = useState(1);
  const [estado, setEstado] = useState(1);
  //Almacena los roles
  const [roles, setRoles] = useState([]);

  //Llamado a la api roles
  const apiRoles = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/roles`);
    setRoles(data);
  };

  useEffect(() => {
    apiRoles();
    if (Object.keys(editarUsuario).length > 0) {
      setNombre(editarUsuario.Nombre_empleado);
      setApellidos(editarUsuario.Apellidos_empleado);
      setCelular(editarUsuario.Numero_celular);
      setDni(editarUsuario.Dni);
      setFecha_nacimiento(formatFecha(editarUsuario.Fecha_nacimiento));
      setUsername(editarUsuario.Username);
      setContraseña(editarUsuario.Contraseña);
      setIdRol(editarUsuario.ID_rol);
      setEstado(editarUsuario.Estado_usuario);
    }
  }, []);

  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const objetoUsuario = {
      nombre,
      apellidos,
      celular,
      dni,
      fecha_nacimiento,
      username,
      contraseña,
      idRol,
      estado,
    };

    if (editarUsuario.ID_usuario) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/editar-usuario-gestion/${
            editarUsuario.ID_usuario
          }`,
          objetoUsuario
        );
        setError({ msg: data.msg, alerta: false });

        setTimeout(() => {
          setError({});
          apiUsuario();
          toggleModal();
        }, 2000);
      } catch (error) {
        setError({ msg: error.response.data.msg, alerta: true });
        setTimeout(() => {
          setError({});
        }, 2000);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/registro-usuario-gestion`,
          objetoUsuario
        );
        console.log(data);
        setError({ msg: data.msg, alerta: false });
        setTimeout(() => {
          setError({});
          toggleModal();
          apiUsuario();
        }, 2000);
      } catch (error) {
        setError({ msg: error.response.data.msg, alerta: true });
        setTimeout(() => {
          setError({});
        }, 2000);
      }
    }
  };

  //Manejador del estado
  const handleEstado = (e) => {
    setEstado(e.target.value === "true" ? 1 : 0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2">
        <div className="flex justify-around">
          <div className="mb-4">
            <label className="block text font-medium text-gray-700">
              Nombre
            </label>
            <input
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              autoFocus
              placeholder="Nombre del Empleado"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text font-medium text-gray-700">
              Apellidos
            </label>
            <input
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Apellidos del Empleado"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-around">
          <div className="mb-4">
            <label className="block text font-medium text-gray-700">Dni</label>
            <input
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Número de DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text font-medium text-gray-700">
              Celular
            </label>
            <input
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Número de celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 px-6">
          <label className="block text font-medium text-gray-700">
            Fecha de Nacimiento
          </label>
          <input
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            type={"date"}
            value={fecha_nacimiento}
            onChange={(e) => setFecha_nacimiento(e.target.value)}
          />
        </div>

        <div className="flex justify-around">
          <div className="mb-4">
            <label className="block text font-medium text-gray-700">
              Usuario
            </label>
            <input
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type={"password"}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4 px-6">
          <label className="block text text-gray-700 font-medium mb-2">
            Selecciona un Rol:
          </label>
          <select
            className="form-select block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-sm"
            value={idRol}
            onChange={(e) => setIdRol(Number(e.target.value))}
          >
            {roles.map((rol) => (
              <option key={rol.ID_rol} value={rol.ID_rol}>
                {rol.Nombre_rol}
              </option>
            ))}
          </select>
        </div>

        {/* RADIO BUTTON DEL ESTADO DEL USUARIO*/}
        <div className="mb-4 px-6">
          <span className="block text text-gray-700 font-medium mb-2">
            Estado
          </span>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center">
              <input
                type="radio"
                id="activo"
                name="activo"
                value="true"
                className="form-radio h-4 w-4 text-blue-600"
                checked={estado}
                onChange={handleEstado}
              />
              <label
                htmlFor="activo"
                className="ml-2 block text-gray-700 font-bold"
              >
                Activo
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="inactivo"
                name="activo"
                value="false"
                className="form-radio h-4 w-4 text-blue-600"
                checked={!estado}
                onChange={handleEstado}
              />
              <label
                htmlFor="inactivo"
                className="ml-2 block text-gray-700 font-bold"
              >
                Inactivo
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full uppercase inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
        >
          {editarUsuario.Nombre_empleado ? "Guardar Cambios" : "Registrar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioUsuario;
