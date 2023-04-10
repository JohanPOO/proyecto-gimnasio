import { useState } from "react";
import axios from "axios";
import Error from "../Error";
import CambiarContraseña from "./CambiarContraseña";

const ConfirmarEmail = () => {
  const [dato, setDato] = useState({});
  const [correo, setCorreo] = useState("");
  const [validarCorreo, setValidarCorreo] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si el correo electrónico existe en la base de datos

    try {
      if (correo === "") {
        setError({ msg: "No se permite el campo vacio", alerta: true });

        setTimeout(() => {
          setError({});
        }, 2000);
        return;
      }

      const { data } = await axios.get(
        `http://localhost:8000/api/comprobar-correo/${correo}`
      );

      if (data) {
        setDato(data);

        setError({ msg: "Correo Valido", alerta: false });

        setTimeout(() => {
          setError({});
          setValidarCorreo(true);
        }, 2000);
      }
    } catch (error) {
      setError({ msg: error.response.data.msg, alerta: true });
      setTimeout(() => {
        setError({});
      }, 2000);
    }
  };

  return (
    <>
      {validarCorreo ? (
        <CambiarContraseña dato={dato} />
      ) : (
        <div className="lg:p-40">
          <h2 className="text-4xl uppercase font-bold text-center mb-10">
            <p className="inline text-blue-700">RECUPERAR</p>{" "}
            <p className="inline text-red-600">CONTRASEÑA</p>
          </h2>
          <div className="flex flex-col justify-center mx-auto text-center w-2/3">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Digite su Correo Electronico
              </label>
              {error.msg && <Error error={error} />}
              <input
                id="email"
                name="email"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ">
                Siguiente
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmarEmail;
