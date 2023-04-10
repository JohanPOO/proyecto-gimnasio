import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import FormularioMembresia from "./FormularioMembresia";

const RegistroMembresia = () => {
  const { tiposMembresias } = useContext(DataContext);

  const { id } = useParams();
  const tipomembresia = tiposMembresias.find(
    (tipo) => tipo.ID_tip_memb === Number(id)
  );
  console.log(tipomembresia);
  return (
    <article className="p-10">
      <h1 className="text-3xl font-bold mb-6">Compra de Membresía</h1>
      <section className="grid grid-cols-2 gap-4">
        <FormularioMembresia
          precio={tipomembresia.Precio}
          descripcion={tipomembresia.Descripcion}
        />
        <div className="flex flex-col justify-center h-1/2 bg-white border border-gray-300 rounded-lg p-6">
          <div className="text-4xl uppercase font-extrabold text-center mb-4">
            <p className="text-blue-600">
              {tipomembresia?.Nombre?.split(" ").slice(0, 2).join(" ")} {""}
              <span className="text-red-600">
                {tipomembresia?.Nombre?.split(" ").slice(2, 4).join(" ")}
              </span>
            </p>
          </div>
          <p className="text-2xl mb-6 font-bold text-center">
            {tipomembresia?.Descripcion}
          </p>
          <p className="text-5xl text-center text-blue-700 font-extrabold">
            S/{tipomembresia?.Precio}
          </p>
        </div>
      </section>
    </article>
  );
};

export default RegistroMembresia;
