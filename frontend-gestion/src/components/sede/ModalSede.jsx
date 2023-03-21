import { useState, useEffect } from "react";
import axios from "axios";
import Error from "../Error";

const Modal = ({ toggleModal, apiSede, editarSede }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nombre_distrito, setNombre_distrito] = useState("");
  const [nombre_provincia, setNombre_provincia] = useState("");
  const [nombre_departamento, setNombre_departamento] = useState("");
  const [url, setUrl] = useState("");
  const [estado, setEstado] = useState(1);
  const [error, setError] = useState({});

  useEffect(() => {
    if (Object.keys(editarSede).length > 0) {
      setNombre(editarSede.Nombre);
      setDireccion(editarSede.Direccion);
      setNombre_distrito(editarSede.Nombre_distrito);
      setNombre_provincia(editarSede.Nombre_provincia);
      setNombre_departamento(editarSede.Nombre_departamento);
      setUrl(editarSede.Url_foto);
      setEstado(editarSede.Estado_sede);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objetoSede = {
      nombre,
      direccion,
      nombre_distrito,
      nombre_provincia,
      nombre_departamento,
      url,
      estado,
    };

    if (editarSede.ID_sede) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/editar-sede/${editarSede.ID_sede}`,
          objetoSede
        );
        setError({ msg: data.msg, alerta: false });

        setTimeout(() => {
          setError({});
          apiSede();
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
          `${import.meta.env.VITE_API_URL}/registro-sede`,
          objetoSede
        );

        setError({ msg: data.msg, alerta: false });

        setTimeout(() => {
          setError({});
          apiSede();
          toggleModal();
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
                  {editarSede.Nombre ? "Editar Sede" : "Registro de Sede"}
                </h3>

                {/*Mensaje de Error*/}
                {msg && <Error error={error} />}

                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <div className="mb-4">
                      <label className="block text font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        autoFocus
                        placeholder="Nombre de la sede"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text font-medium text-gray-700">
                        Dirección
                      </label>
                      <input
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Dirección de la sede"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text font-medium text-gray-700">
                        Distrito
                      </label>
                      <input
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Nombre del distrito"
                        value={nombre_distrito}
                        onChange={(e) => setNombre_distrito(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text font-medium text-gray-700">
                        Provincia
                      </label>
                      <input
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Nombre de la provincia"
                        value={nombre_provincia}
                        onChange={(e) => setNombre_provincia(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text font-medium text-gray-700">
                        Departamento
                      </label>
                      <input
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Nombre del departamento"
                        value={nombre_departamento}
                        onChange={(e) => setNombre_departamento(e.target.value)}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text font-medium text-gray-700">
                        Imagen
                      </label>
                      <input
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Url de la imagen"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>

                    {/* RADIO BUTTON DEL ESTADO DE LA SEDE*/}
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
                      {editarSede.Nombre ? "Editar Cambios" : "Registrar"}
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

export default Modal;
