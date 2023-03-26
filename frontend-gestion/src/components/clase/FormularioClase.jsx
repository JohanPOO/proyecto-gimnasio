import { useState, useEffect } from "react";
import axios from "axios";
import { formatFecha } from "../../helpers/utils.js";

const FormularioClase = ({ apiClase, editarClase, toggleModal, setError }) => {
  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idInstructor, setIdInstructor] = useState(1);
  const [fecha, setFecha] = useState("");
  const [duracion, setDuracion] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState(1);
  const [instructores, setInstructores] = useState([]);

  //Llamada a la api de Instructores para listarlos en el Select

  const apiInstructor = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/instructores`
    );
    setInstructores(data);
  };

  useEffect(() => {
    apiInstructor();
    if (Object.keys(editarClase).length > 0) {
      setNombre(editarClase.Nombre);
      setUrl(editarClase.Url_foto);
      setDescripcion(editarClase.Descripcion);
      setIdInstructor(editarClase.ID_instructor);
      setFecha(formatFecha(editarClase.Fecha));
      setDuracion(editarClase.Duracion);
      setHora(editarClase.Hora_inicio);
      setEstado(editarClase.Estado_clase);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objetoClase = {
      nombre,
      url,
      descripcion,
      idInstructor,
      fecha,
      duracion,
      hora,
      estado,
    };

    if (editarClase.ID_clase) {
      //DATOS A EDITAR
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/editar-clase/${
            editarClase.ID_clase
          }`,
          objetoClase
        );
        setError({ msg: data.msg, alerta: false });

        setTimeout(() => {
          setError({});
          apiClase();
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
          `${import.meta.env.VITE_API_URL}/registro-clase`,
          objetoClase
        );

        setError({ msg: data.msg, alerta: false });
        setTimeout(() => {
          setError({});
          toggleModal();
          apiClase();
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
              placeholder="Nombre de la clase"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text font-medium text-gray-700">Url</label>
            <input
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Url de la clase"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-4 px-6">
          <label className="block text font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            className="resize-none shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div className="mb-4 px-6">
          <label className="block text text-gray-700 font-medium mb-2">
            Selecciona un Instructor:
          </label>
          <select
            className="form-select block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-sm"
            value={idInstructor}
            onChange={(e) => setIdInstructor(Number(e.target.value))}
          >
            {instructores.map((instructor) => (
              <option
                key={instructor.ID_instructor}
                value={instructor.ID_instructor}
              >
                {instructor.Nombre_instructor}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 px-6">
          <label className="block text font-medium text-gray-700">Fecha</label>
          <input
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            type={"date"}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="flex justify-around">
          <div className="mb-4">
            <label className="block text font-medium text-gray-700">
              Duracion
            </label>
            <input
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              placeholder="Duracion de la clase"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text font-medium text-gray-700">Hora</label>
            <input
              type={"time"}
              className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
              value={hora}
              onChange={(e) => setHora(e.target.value)}
            />
          </div>
        </div>

        {/* RADIO BUTTON DEL ESTADO DE LA CLASE*/}
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
          {editarClase.ID_clase ? "Guardar Cambios" : "Registrar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioClase;
