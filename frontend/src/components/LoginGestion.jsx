import { useState } from "react";
import axios from "axios";
import Error from "./Error";

const LoginGestion = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    // aquí puedes añadir la lógica para validar y enviar los datos del formulario al servidor

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/inicio-sesion-gestion",
        {
          username,
          password,
        }
      );

      console.log(data);
      setError({ msg: data.msg, alerta: false });
      setTimeout(() => {
        setError({});
      }, 2000);

      window.open("http://localhost:5174", "_blank");
    } catch (error) {
      setError({ msg: error.response.data.msg, alerta: true });
      setTimeout(() => {
        setError({});
      }, 2000);
    }
  };

  const { msg } = error;

  return (
    <div className="lg:px-48 p-12">
      <div className="bg-white shadow-lg rounded-md min-h-screen px-10 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="md:text-2xl sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-5xl font-extrabold text-gray-900">
            <p className="inline-block text-sky-600">Inicia Sesión</p> como
            Gestor
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
            {/*Si msg es "true", se lanza el componente Error*/}
            {msg && <Error error={error} />}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Usuario
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base uppercase font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginGestion;
