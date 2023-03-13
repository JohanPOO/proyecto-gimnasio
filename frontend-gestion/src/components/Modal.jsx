import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "./Error";

const Modal = ({ toggleModal, apiSede }) => {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [nombre_distrito, setNombre_distrito] = useState("");
  const [nombre_provincia, setNombre_provincia] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registro = {
      nombre,
      direccion,
      nombre_distrito,
      nombre_provincia,
      url,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/registro-sede",
        registro
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
                  Registro de Sede
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
                        Imagen
                      </label>
                      <input
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                        placeholder="Url de la imagen"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full uppercase inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                    >
                      Registrar
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
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
