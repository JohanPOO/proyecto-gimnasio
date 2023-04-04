import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
//import { useParams } from "react-router-dom";

import DatosMembresia from "./DatosMembresia";

const FormularioMembresia = () => {
  const [idGenero, setIdGenero] = useState(1);
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [celular, setCelular] = useState("");
  const [dni, setDni] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const [idSede, setIdSede] = useState(1);
  const [tipoMemb, setTipoMemb] = useState(1);
  const [renovacion, setRenovacion] = useState(1);

  const [isExpanded, setIsExpanded] = useState(false);

  const { generos } = useContext(DataContext);
  //const { id } = useParams();

  /* const tipomembresia = tiposMembresias.find(
    (tipo) => tipo.ID_tip_memb === Number(id)
  );*/

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      idGenero,
      nombre,
      apellidos,
      celular,
      dni,
      correo,
      fechaNacimiento,
      usuario,
      contraseña,
      idSede,
      tipoMemb,
      renovacion,
    };

    console.log(data);
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-start gap-4">
          <div className="mb-6 w-full">
            <label htmlFor="nombre" className="text-lg font-medium mb-2 block">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Ingresa tu nombre"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="apellidos"
              className="text-lg font-medium mb-2 block"
            >
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              placeholder="Ingresa tu apellido"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <div className="mb-6 w-full">
            <label htmlFor="celular" className="text-lg font-medium mb-2 block">
              Número Celular
            </label>
            <input
              type="text"
              id="celular"
              name="celular"
              placeholder="Ingresa tu N° de celular"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
          <div className="mb-6 w-full">
            <label htmlFor="dni" className="text-lg font-medium mb-2 block">
              Dni
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              placeholder="Ingresa tu N° de DNI"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <div className="mb-6 w-full">
            <label htmlFor="email" className="text-lg font-medium mb-2 block">
              Correo Electronico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Ingresa tu nombre completo"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="mb-4 px-6 w-full">
            <label className="block text text-gray-700 font-medium mb-2">
              Selecciona un Género:
            </label>
            <select
              className="form-select block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-black sm:text-sm"
              value={idGenero}
              onChange={(e) => setIdGenero(Number(e.target.value))}
            >
              {generos.map((genero) => (
                <option key={genero.ID_genero} value={genero.ID_genero}>
                  {genero.Descripcion}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 w-full">
          <label htmlFor="date" className="text-lg font-medium mb-2 block">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="w-full border border-gray-300 rounded-lg py-2 px-4"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </div>

        <div className="flex justify-start gap-4">
          <div className="mb-6 w-full">
            <label htmlFor="usuario" className="text-lg font-medium mb-2 block">
              Nombre de Usuario
            </label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Ingresa tu Usuario"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="mb-6 w-full">
            <label
              htmlFor="contraseña"
              className="text-lg font-medium mb-2 block"
            >
              Contraseña
            </label>
            <input
              type="text"
              id="contraseña"
              name="dncontraseñai"
              placeholder="Ingresa tu Contraseña"
              className="w-full border border-gray-300 rounded-lg py-2 px-4"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-6">
          <button
            type="button"
            className="text-blue-500 font-medium underline"
            onClick={toggleExpansion}
          >
            Datos de Membresía <span>{isExpanded ? "▲" : "▼"}</span>
          </button>
        </div>
        {isExpanded && (
          <DatosMembresia
            idSede={idSede}
            setIdSede={setIdSede}
            renovacion={renovacion}
            setRenovacion={setRenovacion}
            tipoMemb={tipoMemb}
            setTipoMemb={setTipoMemb}
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default FormularioMembresia;
