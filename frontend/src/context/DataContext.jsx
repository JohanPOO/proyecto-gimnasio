import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sedes, setSedes] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [clases, setClases] = useState([]);
  const [tiposMembresias, setTiposMembresias] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [generos, setGeneros] = useState([]);

  const apiBaseUrl = "http://localhost:8000/api/";
  const urls = [
    "http://localhost:8000/api/sedes",
    "http://localhost:8000/api/instructores",
    "http://localhost:8000/api/clases",
    "http://localhost:8000/api/tipomembresias",
    "http://localhost:8000/api/clientes",
    "http://localhost:8000/api/generos",
  ];

  useEffect(() => {
    const apis = async () => {

      try {
        const sedesResponse = await axios.get(apiBaseUrl + "sedes");
        const instructoresResponse = await axios.get(
          apiBaseUrl + "instructores"
        );
        const clasesResponse = await axios.get(apiBaseUrl + "clases");
        const tiposMembresiasResponse = await axios.get(
          apiBaseUrl + "tipomembresias"
        );
        const clientesResponse = await axios.get(apiBaseUrl + "clientes");
        const generosResponse = await axios.get(apiBaseUrl + "generos");

        setSedes(sedesResponse.data);
        setInstructores(instructoresResponse.data);
        setClases(clasesResponse.data);
        setTiposMembresias(tiposMembresiasResponse.data);
        setClientes(clientesResponse.data);
        setGeneros(generosResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    apis();
  }, []);

  return (
    <DataContext.Provider
      value={{
        sedes,
        instructores,
        clases,
        tiposMembresias,
        clientes,
        generos,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
