import { Link } from "react-router-dom";

const TipoMembresia = ({ tipo }) => {
  const { ID_tip_memb, Nombre, Precio } = tipo;

  return (
    <div className="text-center border-2 border-gray-200 bg-white rounded-md shadow p-6 transition-all duration-300 transform hover:scale-105">
      <div className="text-2xl font-bold mb-2 px-2">{Nombre}</div>
      <hr className="mb-2 border-black " />
      {Precio > 10.0 && (
        <>
          <div className="mb-2 text-gray-500">Carnet de Asistencia</div>
          <hr className="mb-2 border-black" />
        </>
      )}

      <div className="mb-2 text-gray-500">
        Accede a las Máquinas del Gimnasio
      </div>
      <hr className="mb-2 border-black" />
      <div className="mb-2 text-gray-500">Todas las clases grupales</div>
      <hr className="mb-2 border-black" />
      <div className="mb-2 text-gray-500">Vestidores y baños</div>
      <hr className="mb-2 border-black" />
      <div className="mb-2 text-gray-500">Lockers</div>
      <hr className="mb-2 border-black" />
      <div className="flex flex-col justify-center text-center">
        <div className="mb-4 text-3xl font-extrabold text-orange-600 ">
          S/{Precio}
        </div>
        <Link
          to={`/tipomembresia/${ID_tip_memb}`}
          className="bg-gray-400 hover:bg-gray-500 border uppercase text-white font-medium py-2 px-4 rounded"
        >
          Seleccionar
        </Link>
      </div>
    </div>
  );
};

export default TipoMembresia;
