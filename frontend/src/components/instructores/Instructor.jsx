import React from "react";

const Instructor = ({ instructor }) => {
  const {
    Nombre_instructor,
    Apellidos_instructor,
    Especialidad,
    Trayectoria,
    NombreSede,
    Url_foto,
  } = instructor;
  return (
    <>
      <div className="flex flex-row gap-6 bg-slate-200 shadow-xl p-6 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
        <div className="flex flex-col justify-center items-center md:items-start font-bold">
          <p>
            Nombre: <i className="font-normal">{Nombre_instructor}</i>
          </p>
          <p>
            Apellido: <i className="font-normal"> {Apellidos_instructor}</i>
          </p>
          <p>
            Especialidad: <i className="font-normal">{Especialidad}</i>
          </p>
          <p>
            Trayectoria: <i className="font-normal">{Trayectoria}</i>
          </p>
          <p>
            Sede:{" "}
            <i className="font-normal">{NombreSede.split(" ").slice(1, 2)}</i>
          </p>
        </div>
        <div className="flex justify-center w-auto h-[300px]">
          <img
            className="flex justify-center w-auto h-[300px]"
            src={Url_foto}
            alt="imagen"
          />
        </div>
      </div>
    </>
  );
};

export default Instructor;
