import data from "./util.js";
window.addEventListener("load", () => {
  const {
    ordenesEjemplo,
    guardarDatosEnLocalStorage,
    obtenerDatosDesdeLocalStorage,
    pintarTabla,
    eliminarElemento,
  } = data;

  let ordenes;
  const table = document.querySelector("tbody");
  const btnAdd = document.querySelector(".btnAdd");
  /*Descomentar la primera vez que se ejecuta*/
  // guardarDatosEnLocalStorage("ordenesCompra", ordenesEjemplo);

  ordenes = obtenerDatosDesdeLocalStorage("ordenesCompra") || [];
  pintarTabla(ordenes, table);
  //Eliminar orden
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      ordenes = eliminarElemento(e, deleteBtn, ordenes, "ordenesCompra");
    });
  });
});
