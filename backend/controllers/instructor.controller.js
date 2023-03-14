import {
  getInstructor,
  getByIdInstructor,
  postInstructor,
  putInstructor,
  deleteInstructor,
} from "../models/instructor.models.js";

//EndPoint Listar Instructores
const obtenerInstructores = async (req, res) => {
  try {
    const instructores = await getInstructor();

    if (Object.keys(instructores).length === 0) {
      const error = new Error("No hay instructores");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(instructores);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//EndPoint Buscar un Instructor
const buscarInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await getByIdInstructor(id);

    if (Object.keys(instructor).length === 0) {
      const error = new Error("No existe el Instructor");
      return res.status(404).json({ msg: error.message });
    }

    res.status(200).json(instructor);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//EndPont Registro de un Instructor
const registroInstructor = async (req, res) => {
  try {
    const {
      url,
      idSede,
      nombre,
      apellidos,
      especialidad,
      trayectoria,
      fechaRegistro,
      estado,
    } = req.body;

    if (
      idSede < 1 ||
      [
        url,
        idSede,
        nombre,
        apellidos,
        especialidad,
        trayectoria,
        fechaRegistro,
        estado,
      ].includes("")
    ) {
      const error = new Error("No se permiten campos vacios o erroneos");
      return res.status(400).json({ msg: error.message });
    }

    const result = await postInstructor({
      url,
      idSede,
      nombre,
      apellidos,
      especialidad,
      trayectoria,
      fechaRegistro,
      estado,
    });

    if (result.affectedRows < 1) {
      const error = new Error("No se puedo registrar al instructor");
      return res.status(401).json({ msg: error.message });
    }

    res.json({ id: result.insertId, msg: "Registro EXISTOSO" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//EndPoint Editar Instructor
const editarInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      url,
      idSede,
      nombre,
      apellidos,
      especialidad,
      trayectoria,
      fechaRegistro,
      estado,
    } = req.body;

    if (
      idSede < 1 ||
      [
        url,
        idSede,
        nombre,
        apellidos,
        especialidad,
        trayectoria,
        fechaRegistro,
        estado,
      ].includes("")
    ) {
      const error = new Error("No se permiten campos vacios o erroneos");
      return res.status(400).json({ msg: error.message });
    }

    const instructor = await getByIdInstructor(id);

    if (Object.keys(instructor).length === 0) {
      const error = new Error("Instructor No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const result = await putInstructor({
      id,
      url,
      idSede,
      nombre,
      apellidos,
      especialidad,
      trayectoria,
      fechaRegistro,
      estado,
    });

    if (result.affectedRows === 0) {
      const error = new Error("Instructor No Actualizado");
      return res.status(304).json({ msg: error.message });
    }

    return res.status(200).json({ msg: "Instructor Actualizado" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

//EndPoint Cambiar estado al instructor
const eliminarInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await getByIdInstructor(id);

    if (Object.keys(instructor).length === 0) {
      const error = new Error("El Instructor No Existe");
      return res.status(404).json({ msg: error.message });
    }

    const instructorDelete = await deleteInstructor(id);

    if (instructorDelete.affectedRows === 1) {
      res.status(200).json({
        msg: "Cambió el Estado del  Instructor Correctamente",
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

export {
  obtenerInstructores,
  buscarInstructor,
  registroInstructor,
  editarInstructor,
  eliminarInstructor,
};
