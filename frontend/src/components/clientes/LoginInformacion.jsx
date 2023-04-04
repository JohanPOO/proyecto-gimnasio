import { useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";

const LoginInformacion = () => {
  const { clientes } = useContext(DataContext);
  const { id } = useParams();

  const data = clientes.find((cliente) => cliente.ID_usuario === Number(id));
  console.log(data);
  return (
    <div
      className={`${
        data?.Estado_membresia === 1 ? "flex justify-center" : "shadow-sm"
      } p-12 `}
    >
      {data ? (
        <div
          className={`${
            data.Estado_membresia !== 1
              ? "grid grid-cols-1 md:grid-cols-2"
              : "text-center w-3/5  "
          } bg-white border border-gray-300 rounded-lg p-8`}
        >
          <section>
            <h1 className="text-3xl font-bold mb-4">
              Información de {data.Nombre_cliente} {data.Apellidos_cliente}!
            </h1>
            <p className="text-lg font-medium mb-2">
              Nombre de Usuario: {data.Username}
            </p>
            <p className="text-lg font-medium mb-2">
              Correo Electronico: {data.Correo_electronico}
            </p>
            <p className="text-lg font-medium mb-2">Dni: {data.Dni}</p>
            <p className="text-lg font-medium mb-4">
              Número Celular: {data.Numero_celular}
            </p>
            <p className="text-lg font-medium mb-2">
              Estado de Membresia:{" "}
              {data.Estado_membresia === 1 ? (
                <p className="inline p-2 rounded-md bg-green-600 text-white">
                  Activado
                </p>
              ) : (
                <p className="inline p-2 rounded-md bg-red-600 text-white">
                  Desactivado
                </p>
              )}
            </p>
          </section>
          {data.Estado_membresia !== 1 && (
            <section className="mt-10 md:mt-0">
              <div className="flex flex-col justify-center text-center gap-3 h-full">
                <p className="text-3xl font-bold uppercase">
                  <p className="text-blue-600 inline">Activa</p>{" "}
                  <p className="text-green-500 inline">tu membresia</p>
                </p>
                <button className="p-4 bg-blue-300 rounded-md inline">
                  Click Aqui
                </button>
              </div>
            </section>
          )}
        </div>
      ) : (
        <p>No se encontró ningún cliente</p>
      )}
    </div>
  );
};

export default LoginInformacion;
