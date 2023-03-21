import {
  getClases,
  getByIdClase,
  postClase,
  deleteClase,
} from "../models/clases.model.js";

//EndPoint Listar Clases
const obtenerClases = async (req, res) => {
  try {
    const clases = await getClases();

    if (Object.keys(clases).length === 0) {
      const error = new Error("No hay Clases");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(clases);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//EndPoint Registrar una clase
const registroClase = async (req, res) => {
  try {
    const {
      nombre,
      url,
      descripcion,
      idInstructor,
      fecha,
      duracion,
      hora,
      estado,
    } = req.body;

    if (
      idInstructor < 1 ||
      [
        nombre,
        url,
        descripcion,
        idInstructor,
        fecha,
        duracion,
        hora,
        estado,
      ].includes("")
    ) {
      const error = new Error("No se permiten campos vacios o erroneos");
      return res.status(400).json({ msg: error.message });
    }

    const result = await postClase({
      nombre,
      url,
      descripcion,
      idInstructor,
      fecha,
      duracion,
      hora,
      estado,
    });

    if (result.affectedRows < 1) {
      const error = new Error("No se puedo registrar al instructor");
      return res.status(401).json({ msg: error.message });
    }

    res.status(200).json({ msg: "Registro EXISTOSO" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//EndPoint Cambiar estado de la clase
const eliminarClase = async (req, res) => {
  try {
    const { id } = req.params;

    const clase = await getByIdClase(id);

    if (Object.keys(clase).length === 0) {
      const error = new Error("La clase No Existe");
      return res.status(404).json({ msg: error.message });
    }

    const claseDelete = await deleteClase(id);

    if (claseDelete.affectedRows === 1) {
      res.status(200).json({
        msg: "Cambió el Estado de la clase Correctamente",
      });
    } else {
      return res.status(501).json({
        msg: "Ocurrio un error inesperado",
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export { obtenerClases, registroClase, eliminarClase };
