import { mapeoFecha } from "../helpers/utils.js";

const Clase = ({ clase }) => {
  const {
    Nombre,
    Descripcion,
    Fecha,
    Hora_inicio,
    Duracion,
    Nombre_instructor,
    Url_foto,
  } = clase;
  return (
    <div className="flex rounded justify-center gap-6 bg-white shadow-xl p-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
      <div className="flex flex-col md:items-start font-bold w-full text-xl">
        <p className="text-center w-full mb-5 text-2xl uppercase">{Nombre}</p>
        <p className="mb-3 font-normal">{Descripcion}</p>
        <p className="mb-3">
          FECHA: <i className="font-normal">{mapeoFecha(Fecha)}</i>
        </p>
        <p className="mb-3">
          HORA: <i className="font-normal">{Hora_inicio}</i>
        </p>
        <p className="mb-3">
          DURACIÓN: <i className="font-normal"> {Duracion}</i>
        </p>
        <p className="mb-3">
          INSTRUCTOR: <i className="font-normal">{Nombre_instructor}</i>
        </p>
      </div>
      <div className="flex justify-center w-full h-[300px]">
        <img
          className="flex justify-center w-auto h-[300px]"
          src={Url_foto}
          alt="imagen"
        />
      </div>
    </div>
  );
};

export default Clase;
