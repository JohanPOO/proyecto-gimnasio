import { useContext, useEffect } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";

const DatosMembresia = ({
  idSede,
  setIdSede,
  renovacion,
  setRenovacion,
  setTipoMemb,
  setTipoMembNombre,
}) => {
  const { sedes, tiposMembresias } = useContext(DataContext);

  const { id } = useParams();

  useEffect(() => {
    setTipoMemb(tipomembresia.ID_tip_memb);
    setTipoMembNombre(tipomembresia.Nombre);
  }, []);

  const tipomembresia = tiposMembresias.find(
    (tipo) => tipo.ID_tip_memb === Number(id)
  );

  const handleRenovacion = (e) => {
    setRenovacion(e.target.value === "true" ? 1 : 0);
  };

  return (
    <div>
      <div className="mb-4 w-full">
        <label className="block text-lg font-medium mb-2">
          Selecciona una sede:
        </label>
        <select
          className="form-select block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-sm"
          value={idSede}
          onChange={(e) => setIdSede(Number(e.target.value))}
        >
          {sedes.map((sede) => (
            <option key={sede.ID_sede} value={sede.ID_sede}>
              {sede.Nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 w-full">
        <label className="block text-lg font-medium mb-2">
          Tipo de Membresia:
        </label>
        <label className="form-select block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-sm">
          {tipomembresia.Nombre}
        </label>
      </div>

      {/* RADIO BUTTON DE LA RENOVACION DE LA MEMBRESIA*/}
      <div className="mb-4">
        <span className="block text-lg font-medium mb-2">
          Renovacion Automatica
        </span>
        <div className="flex items-center justify-evenly">
          <div className="flex items-center">
            <input
              type="radio"
              id="activo"
              name="activo"
              value="true"
              className="form-radio h-4 w-4 text-blue-600"
              checked={renovacion}
              onChange={handleRenovacion}
            />
            <label
              htmlFor="activo"
              className="ml-2 block text-gray-700 font-bold"
            >
              Activo
            </label>
          </div>
          <div className="flex items-center mb-3">
            <input
              type="radio"
              id="inactivo"
              name="activo"
              value="false"
              className="form-radio h-4 w-4 text-blue-600"
              checked={!renovacion}
              onChange={handleRenovacion}
            />
            <label
              htmlFor="inactivo"
              className="ml-2 block text-gray-700 font-bold"
            >
              Inactivo
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosMembresia;
