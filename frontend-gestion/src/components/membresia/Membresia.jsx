import React from "react";

const Membresia = ({ membresia }) => {
  const {
    Nombre_cliente,
    Nombre,
    Descripcion,
    Fecha_inicio,
    Fecha_fin,
    Estado_membresia,
  } = membresia;
  return (
    <tr>
      <td className="p-3 space-y-2">
        <p className="text-2xl text-gray-800">{Nombre_cliente}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{Nombre}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{Descripcion}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{Fecha_inicio}</p>
      </td>

      <td className="p-2 space-y-2">
        <p className="text-xl text-gray-800">{Fecha_fin}</p>
      </td>
      {
        <td className="p-2 space-y-2">
          <span
            className={`inline-block rounded-full px-3 py-1 text-lg font-semibold ${
              Estado_membresia === 1
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {`${Estado_membresia === 1 ? "Activo" : "Inactivo"}`}
          </span>
        </td>
      }
    </tr>
  );
};

export default Membresia;
