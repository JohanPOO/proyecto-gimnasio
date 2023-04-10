import { Link } from "react-router-dom";

const TipoMembresia = ({ tipo }) => {
  const { ID_tip_memb, Nombre, Precio } = tipo;

  return (
    <div
      className={`${Precio <= 10.0 && "bg-green-400"} 
      ${Precio > 10.0 && Precio <= 80.0 && "bg-red-300"} 
      ${Precio <= 110.0 && "bg-blue-300"} 
      ${Precio >= 190.0 && "bg-purple-300"} 
      ${
        Precio >= 220.0 && "bg-pink-300"
      } text-center border-2 border-black font-serif shadow-lg p-6 transition-all duration-300 transform hover:scale-105`}
    >
      <div className="text-2xl font-bold mb-2 px-2">{Nombre}</div>
      <hr className="mb-2 border-black" />
      {Precio > 10.0 && (
        <>
          <div className="mb-2">Carnet de Asistencia</div>
          <hr className="mb-2 border-black" />
        </>
      )}

      <div className="mb-2">Accede a las Máquinas del Gimnasio</div>
      <hr className="mb-2 border-black" />
      <div className="mb-2">Todas las clases grupales</div>
      <hr className="mb-2 border-black" />
      <div className="mb-2">Vestidores y baños</div>
      <hr className="mb-2 border-black" />
      <div className="mb-2">Lockers</div>
      <hr className="mb-2 border-black" />
      <div className="flex flex-col justify-center text-center">
        <div className="mb-4 text-3xl font-bold">S/{Precio}</div>
        <Link
          to={`/tipomembresia/${ID_tip_memb}`}
          className="bg-gray-500 hover:bg-gray-600 border border-black text-white font-medium py-2 px-4 rounded"
        >
          Seleccionar
        </Link>
      </div>
    </div>
  );
};

export default TipoMembresia;
