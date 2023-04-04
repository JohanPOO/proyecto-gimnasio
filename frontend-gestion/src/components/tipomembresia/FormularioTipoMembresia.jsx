import { useState, useEffect } from "react";
import axios from "axios";

const FormularioTipoMembresia = ({
  apiTipoMembresia,
  editarTipoMembresia,
  toggleModal,
  setError,
}) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [estado, setEstado] = useState(1);

  useEffect(() => {
    if (Object.keys(editarTipoMembresia).length > 0) {
      setNombre(editarTipoMembresia.Nombre);
      setDescripcion(editarTipoMembresia.Descripcion);
      setPrecio(editarTipoMembresia.Precio);
      setEstado(editarTipoMembresia.Estado_tip_memb);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const objetoTipoMemb = {
      nombre,
      descripcion,
      precio,
      estado,
    };

    if (editarTipoMembresia.ID_tip_memb) {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/editar-tipomembresia/${
            editarTipoMembresia.ID_tip_memb
          }`,
          objetoTipoMemb
        );
        setError({ msg: data.msg, alerta: false });

        setTimeout(() => {
          setError({});
          apiTipoMembresia();
          toggleModal();
        }, 2000);
      } catch (error) {
        setError({ msg: error.response.data.msg, alerta: true });
        setTimeout(() => {
          setError({});
        }, 2000);
      }
    } else {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/registro-tipomembresia`,
          objetoTipoMemb
        );
        console.log(data);
        setError({ msg: data.msg, alerta: false });
        setTimeout(() => {
          setError({});
          toggleModal();
          apiTipoMembresia();
        }, 2000);
      } catch (error) {
        setError({ msg: error.response.data.msg, alerta: true });
        setTimeout(() => {
          setError({});
        }, 2000);
      }
    }
  };

  //Manejador del estado
  const handleEstado = (e) => {
    setEstado(e.target.value === "true" ? 1 : 0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-2 px-6">
        <div className="mb-4">
          <label className="block text font-medium text-gray-700">Nombre</label>
          <input
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            autoFocus
            placeholder="Nombre del tipo de membresia"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text font-medium text-gray-700">
            Descripcion
          </label>
          <input
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Descripcion del tipo de membresia"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text font-medium text-gray-700">Precio</label>
          <input
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
            type={"number"}
            value={precio}
            min={0}
            onChange={(e) => setPrecio(Number(e.target.value))}
          />
        </div>

        {/* RADIO BUTTON DEL ESTADO DEL TIPO DE MEMB*/}
        <div className="mb-4">
          <span className="block text text-gray-700 font-medium mb-2">
            Estado
          </span>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center">
              <input
                type="radio"
                id="activo"
                name="activo"
                value="true"
                className="form-radio h-4 w-4 text-blue-600"
                checked={estado}
                onChange={handleEstado}
              />
              <label
                htmlFor="activo"
                className="ml-2 block text-gray-700 font-bold"
              >
                Activo
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="inactivo"
                name="activo"
                value="false"
                className="form-radio h-4 w-4 text-blue-600"
                checked={!estado}
                onChange={handleEstado}
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

        <button
          type="submit"
          className="w-full uppercase inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-700 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
        >
          {editarTipoMembresia.ID_tip_memb ? "Guardar Cambios" : "Registrar"}
        </button>
      </div>
    </form>
  );
};

export default FormularioTipoMembresia;
