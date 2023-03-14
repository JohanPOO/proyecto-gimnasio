export const mapeoFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const fechaFormateada = fechaNueva.toLocaleDateString("es-ES", options);

  return fechaFormateada;
};

export const formatFecha = (date) => {
  const fecha = new Date(date);
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Agrega un cero si el mes es menor a 10
  const dia = String(fecha.getDate()).padStart(2, "0"); // Agrega un cero si el día es menor a 10
  const fechaFormateada = `${anio}-${mes}-${dia}`;
  return fechaFormateada;
  //console.log(fechaFormateada); // Ejemplo de salida: "2023-03-14"
};
