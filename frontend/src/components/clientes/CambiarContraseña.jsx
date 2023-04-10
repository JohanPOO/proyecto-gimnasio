import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../Error";

const CambiarContraseña = ({ dato }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/cambiar-contrasenia/${dato.ID_usuario}`,
        { password, confirmPassword }
      );

      setError({ msg: data.msg, alerta: false });

      setTimeout(() => {
        setError({});
        //return navigate("/");
        window.location.href = "http://localhost:8001";
      }, 2000);
    } catch (error) {
      setError({ msg: error.response.data.msg, alerta: true });
      setTimeout(() => {
        setError({});
      }, 2000);
    }
  };

  return (
    <div className="lg:p-40">
      <div className="flex flex-col items-center justify-center ">
        <form onSubmit={handleSubmit} className="w-96">
          <div className="mb-4">
            {error.msg && <Error error={error} />}
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Nueva contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
};

export default CambiarContraseña;
