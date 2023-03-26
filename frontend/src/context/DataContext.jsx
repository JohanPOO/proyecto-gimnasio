import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sedes, setSedes] = useState([]);
  const [instructores, setInstructores] = useState([]);
  const [clases, setClases] = useState([]);

  const apiSede = axios("http://localhost:8000/api/sedes");
  const apiInstructor = axios("http://localhost:8000/api/instructores");
  const apiClase = axios("http://localhost:8000/api/clases");

  useEffect(() => {
    const apiClases = async () => {
      const [sede, instructor, clase] = await axios.all([
        apiSede,
        apiInstructor,
        apiClase,
      ]);
      setSedes(sede.data);
      setInstructores(instructor.data);
      setClases(clase.data);
    };
    apiClases();
  }, []);

  return (
    <DataContext.Provider value={{ sedes, instructores, clases }}>
      {children}
    </DataContext.Provider>
  );
};
