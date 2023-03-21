import { useState } from "react";
import FormularioUsuario from "./FormularioUsuario";
import Error from "../Error";

const ModalUsuario = ({ toggleModal, editarUsuario, apiUsuario }) => {
  const [error, setError] = useState({});
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
                  {editarUsuario.Nombre_empleado
                    ? "Editar Usuario"
                    : "Registro del Usuario"}
                </h3>

                {/*Mensaje de Error*/}
                {error.msg && <Error error={error} />}
                {/*Componente Formulario*/}
                <FormularioUsuario
                  editarUsuario={editarUsuario}
                  toggleModal={toggleModal}
                  apiUsuario={apiUsuario}
                  setError={setError}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={toggleModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;
