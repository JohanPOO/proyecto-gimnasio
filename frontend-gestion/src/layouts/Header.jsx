import { Outlet, Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="md:flex md:min-h-screen">
      <aside className="md:w-1/5 bg-blue-900 px-5 py-10">
        <h2 className="text-4xl font-black text-center text-white">GESTIÓN</h2>
        <nav className="mt-10 text-center">
          <Link
            className={`${
              location.pathname === "/" ? "text-blue-500" : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/"
          >
            Principal
          </Link>
          <Link
            className={`${
              location.pathname === "/sede-gestion"
                ? "text-blue-500"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/sede-gestion"
          >
            Sede
          </Link>
          <Link
            className={`${
              location.pathname === "/instructor-gestion"
                ? "text-blue-500"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/instructor-gestion"
          >
            Instructor
          </Link>

          <Link
            className={`${
              location.pathname === "/usuario-gestion"
                ? "text-blue-500"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/usuario-gestion"
          >
            Usuarios
          </Link>

          <Link
            className={`${
              location.pathname === "/clase-gestion"
                ? "text-blue-500"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/clase-gestion"
          >
            Clases
          </Link>

          <Link
            className={`${
              location.pathname === "/tipo-membresia"
                ? "text-blue-500"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/tipo-membresia"
          >
            Tipos de Membresias
          </Link>

          <Link
            className={`${
              location.pathname === "/membresia-gestion"
                ? "text-blue-500"
                : "text-white"
            } text-2xl block mt-2 hover:text-blue-300`}
            to="/membresia-gestion"
          >
            Membresias
          </Link>
        </nav>
      </aside>
      <main className="md:w-3/4 p-10 md:min-h-screen overflow-scroll bg-">
        <Outlet />
      </main>
    </div>
  );
};

export default Header;
