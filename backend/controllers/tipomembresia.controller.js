import {
  getTipoMembresias,
  getByTipoMembresia,
  postRegistroTipoMembresia,
  putTipoMembresia,
  deleteTipoMembresia,
} from "../models/tipomembresia.model.js";

export const obtenerTiposMembresias = async (req, res) => {
  try {
    const tipomembresia = await getTipoMembresias();

    if (Object.keys(tipomembresia).length === 0) {
      const error = new Error("No hay Tipos de Membresias");
      return res.status(400).json({ msg: error.message });
    }
    res.status(200).json(tipomembresia);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const buscarTipoMembresia = async (req, res) => {
  try {
    const { id } = req.params;

    const tipomembresia = await getByTipoMembresia(id);

    if (Object.keys(tipomembresia).length === 0) {
      const error = new Error("Tipo Membresia No Encontrada");
      return res.status(404).json({ msg: error.message });
    }

    res.json(tipomembresia);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const registroTipoMembresia = async (req, res) => {
  try {
    const { nombre, descripcion, precio, estado } = req.body;

    if ([nombre, descripcion, precio, estado].includes("")) {
      const error = new Error("No se permiten datos vacios");
      return res.status(400).json({ msg: error.message });
    }

    const result = await postRegistroTipoMembresia({
      nombre,
      descripcion,
      precio,
      estado,
    });

    if (result.affectedRows < 1) {
      const error = new Error("No se puedo registrar el tipo de membresia");
      return res.status(401).json({ msg: error.message });
    }

    res.json({ msg: "Registro EXITOSO" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const editarTipoMembresia = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, estado } = req.body;

    if ([nombre, descripcion, precio, estado].includes("")) {
      const error = new Error("No se permiten datos vacios");
      return res.status(400).json({ msg: error.message });
    }

    const tipomembresia = await getByTipoMembresia(id);

    if (Object.keys(tipomembresia).length === 0) {
      const error = new Error("Tipo de Membresia No Encontrado");
      return res.status(404).json({ msg: error.message });
    }

    const result = await putTipoMembresia({
      nombre,
      descripcion,
      precio,
      estado,
      id,
    });

    if (result.affectedRows === 0) {
      const error = new Error("Tipo de Membresia No Actualizado");
      return res.status(304).json({ msg: error.message });
    }

    return res.json({ msg: "Tipo de Membresia Actualizado" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const eliminarTipoMembresia = async (req, res) => {
  try {
    const { id } = req.params;

    const tipomembresia = await getByTipoMembresia(id);

    if (Object.keys(tipomembresia).length === 0) {
      const error = new Error("El Tipo de Membresia No Existe");
      return res.status(404).json({ msg: error.message });
    }

    const tipomembresiaDelete = await deleteTipoMembresia(id);

    if (tipomembresiaDelete.affectedRows === 1) {
      res.status(200).json({
        msg: "Cambió el Estado del Tipo de Membresia Correctamente",
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
