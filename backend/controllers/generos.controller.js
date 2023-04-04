import { getGeneros } from "../models/generos.model.js";

const obtenerGeneros = async (req, res) => {
  try {
    const generos = await getGeneros();

    if (Object.keys(generos).length === 0) {
      const error = new Error("No hay Generos");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(generos);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { obtenerGeneros };
