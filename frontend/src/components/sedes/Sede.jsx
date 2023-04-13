import { Link } from "react-router-dom";

const Sede = ({ sede }) => {
  const { ID_sede, Nombre, Url_foto, Direccion, Estado_sede } = sede;

  return (
    <div className="relative w-11/12 flex flex-col bg-white text-black rounded-md shadow p-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 border-2 ">
      <br />
      {/*SVG DEL LOGO DE LOCACION*/}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-blue-900 mr-2 inline"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 0C5.588 0 2 3.589 2 8.004c0 2.018.706 3.861 1.875 5.21l5.108 6.181a1.002 1.002 0 0 0 1.434.144l.013-.012 5.106-4.973a8.143 8.143 0 0 0 1.874-5.168C18 3.589 14.412 0 10 0zm0 11.716a3.717 3.717 0 1 1 0-7.434 3.717 3.717 0 0 1 0 7.434z"
        />
      </svg>
      <p className="text-2xl uppercase font-bold inline">
        Athletic Fision Perú {Nombre.split(" ").slice(1, 2).join()}
      </p>
      <br />

      <h2 className="text-xl font-semibold mb-2">{Direccion}</h2>
      <img src={Url_foto} />
      {/*<div className=" flex flex-col justify-between flex-1">
        <Link
          to={`/sedes/${ID_sede}`}
          className="bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 mt-4"
        >
          Mas info
        </Link>
    </div>*/}
      <div className="absolute top-0 right-0 -mt-8 -mr-6 z-10">
        <div
          className={`${
            Estado_sede === 1
              ? " bg-white text-green-600"
              : " bg-white text-red-500"
          }  text-3xl font-semibold py-2 px-2 border-2`}
        >
          {Estado_sede === 1 ? "Abierto" : "Cerrado"}
        </div>
      </div>
    </div>
  );
};

export default Sede;
