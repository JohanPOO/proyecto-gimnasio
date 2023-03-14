import { useState, useEffect } from "react";
import axios from "axios";
import Error from "./Error";
import { formatFecha } from "../helpers/utils";

const ModalInstructor = ({ toggleModal, apiInstructor, editarInstructor }) => {
  const [sedes, setSedes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [trayectoria, setTrayectoria] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [url, setUrl] = useState("");
  const [idSede, setIdSede] = useState(1);
  const [estado, setEstado] = useState(1);
  const [error, setError] = useState({});

  useEffect(() => {
    const apiSede = async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/sedes`);
      setSedes(data);
    };

    apiSede();

    if (Object.keys(editarInstructor).length > 0) {
      setNombre(editarInstructor.Nombre_instructor);
      setApellidos(editarInstructor.Apellidos_instructor);
      setEspecialidad(editarInstructor.Especialidad);
      setTrayectoria(editarInstructor.Trayectoria);
      setFechaRegistro(formatFecha(editarInstructor.Fecha_registro));
      setUrl(editarInstructor.Url_imagen);
      setIdSede(editarInstructor.ID_sede);
      setEstado(editarInstructor.Estado_instructor);
    }
  }, []);

  useEffect(() => {}, [editarInstructor]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objetoInstructor = {
      nombre,
      apellidos,
      especialidad,
      trayectoria,
      fechaRegistro,
      url,
      idSede,
      estado,
    };

    if (editarInstructor.ID_instructor) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/editar-instructor/${
            editarInstructor.ID_instructor
          }`,
          objetoInstructor
        );
        setError({ msg: data.msg, alerta: false });

        setTimeout(() => {
          setError({});
          apiInstructor();
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
          `${import.meta.env.VITE_API_URL}/registro-instructor`,
          objetoInstructor
        );
        setError({ msg: data.msg, alerta: false });
        setTimeout(() => {
          setError({});
          toggleModal();
          apiInstructor();
        }, 2000);
      } catch (error) {
        setError({ msg: error.response.data.msg, alerta: true });
        setTimeout(() => {
          setError({});
        }, 2000);
      }
    }
  };

  const handleEstado = (e) => {
    setEstado(e.target.value === "true" ? 1 : 0);
  };

  const { msg } = error;
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-2xl font-bold leading-6 text-gray-900 mb-6 text-center uppercase">
                  {editarInstructor.Nombre_instructor
                    ? "Editar Instructor"
                    : "Registro de Instructor"}
                </h3>

                {/*Mensaje de Error*/}
                {msg && <Error error={error} />}

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
                          placeholder="Nombre del Instructor"
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
                          placeholder="Apellidos del Instructor"
                          value={apellidos}
                          onChange={(e) => setApellidos(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-around">
                      <div className="mb-4">
                        <label className="block text font-medium text-gray-700">
                          Especialidad
                        </label>
                        <input
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                          placeholder="Especialidad del Instructor"
                          value={especialidad}
                          onChange={(e) => setEspecialidad(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text font-medium text-gray-700">
                          Trayectoria
                        </label>
                        <input
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                          placeholder="Trayectoria del Instructor"
                          value={trayectoria}
                          onChange={(e) => setTrayectoria(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex justify-around">
                      <div className="mb-4">
                        <label className="block text font-medium text-gray-700">
                          Fecha de Registro
                        </label>
                        <input
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                          type={"date"}
                          value={fechaRegistro}
                          onChange={(e) => setFechaRegistro(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text font-medium text-gray-700">
                          Url
                        </label>
                        <input
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                          placeholder="Url de la imagen"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text text-gray-700 font-medium mb-2">
                        Selecciona una sede:
                      </label>
                      <select
                        className="form-select block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-sm"
                        value={idSede}
                        onChange={(e) => setIdSede(Number(e.target.value))}
                      >
                        {sedes.map((sede) => (
                          <option key={sede.ID_sede} value={sede.ID_sede}>
                            {sede.Nombre}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* RADIO BUTTON DEL ESTADO DEL INSTRUCTOR*/}
                    <div className="mb-4">
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
                            checked={estado}
                            onChange={handleEstado}
                            className="form-radio h-4 w-4 text-blue-600"
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
                            checked={!estado}
                            onChange={handleEstado}
                            className="form-radio h-4 w-4 text-blue-600"
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
                      {editarInstructor.Nombre_instructor
                        ? "Editar Cambios"
                        : "Registrar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={toggleModal}
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalInstructor;
