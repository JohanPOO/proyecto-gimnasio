import {
  getSedes,
  getByIdSede,
  postRegistroSede,
  putSede,
  deleteSede,
} from "../models/sede.model.js";

const obtenerSedes = async (req, res) => {
  try {
    const sedes = await getSedes();

    if (Object.keys(sedes).length === 0) {
      const error = new Error("No hay sedes");
      return res.status(404).json({ msg: error.message });
    }

    res.json(sedes);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const buscarSede = async (req, res) => {
  try {
    const { id } = req.params;

    const sede = await getByIdSede(id);

    if (Object.keys(sede).length === 0) {
      const error = new Error("Sede No Encontrada");
      return res.status(404).json({ msg: error.message });
    }

    res.json(sede);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const registroSede = async (req, res) => {
  const {
    nombre,
    direccion,
    nombre_distrito,
    nombre_provincia,
    nombre_departamento,
    url,
    estado,
  } = req.body;

  if (
    [
      nombre,
      direccion,
      nombre_distrito,
      nombre_provincia,
      nombre_departamento,
      url,
      estado,
    ].includes("")
  ) {
    const error = new Error("No se permiten datos vacios");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const result = await postRegistroSede(
      nombre,
      direccion,
      nombre_distrito,
      nombre_provincia,
      nombre_departamento,
      url,
      estado
    );

    if (result.affectedRows < 1) {
      const error = new Error("No se puedo registrar la sede");
      return res.status(401).json({ msg: error.message });
    }

    res.json({ id: result.insertId, msg: "Registro EXISTOSO" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const editarSede = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    direccion,
    nombre_distrito,
    nombre_provincia,
    nombre_departamento,
    url,
    estado,
  } = req.body;

  try {
    if (
      [
        nombre,
        direccion,
        nombre_distrito,
        nombre_provincia,
        nombre_departamento,
        url,
        estado,
      ].includes("")
    ) {
      const error = new Error("No se permiten datos vacios");
      return res.status(400).json({ msg: error.message });
    }

    const sede = await getByIdSede(id);

    if (Object.keys(sede).length === 0) {
      const error = new Error("Sede No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const result = await putSede(
      nombre,
      direccion,
      nombre_distrito,
      nombre_provincia,
      nombre_departamento,
      url,
      estado,
      id
    );

    if (result.affectedRows === 0) {
      const error = new Error("Sede No Actualizado");
      return res.status(304).json({ msg: error.message });
    }

    return res.json({ msg: "Sede Actualizado" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

const eliminarSede = async (req, res) => {
  try {
    const { id } = req.params;

    const sede = await getByIdSede(id);

    if (Object.keys(sede).length === 0) {
      const error = new Error("La Sede No Existe");
      return res.status(404).json({ msg: error.message });
    }

    const sedeDelete = await deleteSede(id);

    if (sedeDelete.affectedRows === 1) {
      res.status(200).json({
        msg: "Cambió el Estado de la Sede Correctamente",
        results: await getSedes(),
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

export { obtenerSedes, buscarSede, registroSede, editarSede, eliminarSede };
