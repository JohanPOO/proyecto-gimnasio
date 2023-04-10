import { useState, useEffect } from "react";
import axios from "axios";
import Membresia from "./Membresia";

const ListadoMembresia = () => {
  const [membresias, setMembresias] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  //const [busqueda, setBusqueda] = useState("");

  const apiMembresia = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/membresias`
    );
    setMembresias(data);
  };

  useEffect(() => {
    apiMembresia();
  }, []);

  const handleOptionChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    // Filtrar la información por fecha y guardarla en el arreglo filteredData
    const filteredByDate = membresias.filter((membresia) => {
      let fecha = membresia.Fecha_fin.split("-").join("-").slice(0, 10);
      return fecha === date;
    });
    //const filteredByDate = data.filter((item) => item.date === date);
    setFilteredData(filteredByDate);
  };

  const handleEstadoChange = (event) => {
    const estado = event.target.value;
    // Filtrar la información por estado y guardarla en el arreglo filteredData
    const filteredByEstado = membresias.filter(
      (item) => item.Estado_membresia === Number(estado)
    );
    setFilteredData(filteredByEstado);
  };

  let itemsToRender;
  if (selectedOption === "") {
    itemsToRender = membresias;
  } else {
    itemsToRender = filteredData;
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Membresias</h1>
      <p className="my-3 text-xl">Administra tus Membresias</p>
      <select
        className="form-select mr-4 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-base uppercase"
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">Seleccione una opción</option>
        <option value="fecha">Fecha</option>
        <option value="estado">Estado</option>
      </select>
      {selectedOption === "fecha" && (
        <input
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg border-gray-300 rounded-md p-2"
          type="date"
          onChange={handleDateChange}
        />
      )}
      {selectedOption === "estado" && (
        <select
          className="form-select mr-4 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-lg uppercase"
          value={selectedOption}
          onChange={handleEstadoChange}
        >
          <option value="">Seleccione un estado</option>
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      )}
      {membresias ? (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Membresia</th>
              <th className="p-2">Descripcion</th>
              <th className="p-2">Fecha Inicio</th>
              <th className="p-2">Fecha Fin</th>
              <th className="p-2">Estado</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {itemsToRender.map((membresia) => (
              <Membresia key={membresia.ID_memb} membresia={membresia} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay Membresias Registradas</p>
      )}
    </>
  );
};

export default ListadoMembresia;
