import { useState, useEffect } from "react";
import "../public/style.css";
import axios from "axios";

function Carrusel() {
  const [imagenActual, setImagenActual] = useState(0);
  const [images, setImages] = useState([]);
  //const API = "SqZU5SUzOHKpoU3dnz1nkTQaTySDyUMa57EQqhy5H4qt1QCHyLjMIzhP"

  useEffect(() => {
    const callApi = async () => {
      const response = await axios.get("http://localhost:8000/api/afiches");

      const data = response.data.map(function (afiche) {
        return afiche.Url_afiche;
      });

      setImages(data);
    };
    callApi();
  }, []);

  const atras = () => {
    const index = imagenActual === 0 ? images.length - 1 : imagenActual - 1;
    setImagenActual(index);
  };

  const siguiente = () => {
    const index = imagenActual === images.length - 1 ? 0 : imagenActual + 1;
    setImagenActual(index);
  };

  return (
    <div className="flex flex-col items-center w-full h-100">
      <img
        src={images[imagenActual]}
        alt={`Image ${imagenActual + 1}`}
        className="w-full h-full object-fit-cover mb-4 transition duration-500"
      />

      <div className="flex space-x-4">
        <button onClick={atras}>
          <svg
            className="w-6 h-6 fill-current text-gray-500 hover:text-gray-700 transition-transform hover:-translate-x-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
          </svg>
        </button>
        <button onClick={siguiente}>
          <svg
            className="w-6 h-6 fill-current text-gray-500 hover:text-gray-700 transition-transform hover:translate-x-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M8.59 16.41L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Carrusel;
