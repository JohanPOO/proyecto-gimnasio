import { getAfiches } from "../models/afiches.model.js";

export const obtenerAfiches = async (req, res) => {
  try {
    const afiches = await getAfiches();

    if (Object.keys(afiches).length === 0) {
      const error = new Error("No hay Afiches");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(afiches);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
