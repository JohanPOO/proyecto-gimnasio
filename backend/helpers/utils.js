export function fechaActual() {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  const day = ("0" + today.getDate()).slice(-2);

  const formatted_date = `${year}-${month}-${day}`;

  return formatted_date;
}

export function fechaFinal(tipomembresia) {
  // Obtener la fecha actual
  const fechaCalendario = fechaActual();

  // Duración de la membresía
  const membresia = tipomembresia;
  const duracion = parseInt(membresia.split(" ")[2]); // obtener la duración en meses

  // Convertir la fecha actual a objeto Date
  const fechaInicio = new Date(fechaCalendario);

  // Sumar un mes a la fecha de inicio
  const fechaFinal = new Date(
    fechaInicio.setMonth(fechaInicio.getMonth() + duracion)
  );

  // Imprimir la fecha final
  return fechaFinal.toISOString().slice(0, 10);
}
