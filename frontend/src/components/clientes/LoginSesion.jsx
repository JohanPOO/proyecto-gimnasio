import { useState, useEffect } from "react";
import axios from "axios";

const LoginSesion = ({ token }) => {
  const [clienteLogin, setClienteLogin] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const apiCliente = async () => {
      const cliente = await axios.get(
        `http://localhost:8000/api/cliente/${token}`
      );

      setClienteLogin(cliente.data);
    };
    apiCliente();
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("token");
    window.location.href = "http://localhost:8001/";
  }

  return (
    <div className="inline-flex text-white border font-bold rounded-md">
      <p className="px-4 py-2 text-sm uppercase hover:text-neutral-400 rounded-l-md">
        {clienteLogin.Username}
      </p>

      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center justify-center h-full px-2 border-l border-gray-500 hover:text-neutral-400 rounded-r-md"
          onClick={() => setShowMenu(!showMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {showMenu && (
          <div className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg">
            <div className="p-2">
              <a
                href={`/cliente-informacion/${clienteLogin.ID_usuario}`}
                className="block px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
              >
                Información
              </a>
              <button className="w-full">
                <a
                  href="#"
                  className="block text-start px-4 py-2 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginSesion;
