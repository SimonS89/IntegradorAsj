import data from "./util.js";
window.addEventListener("load", () => {
  const {
    proveedoresEjemplo,
    guardarDatosEnLocalStorage,
    obtenerDatosDesdeLocalStorage,
    pintarTabla,
    eliminarElemento,
  } = data;

  let proveedores;
  const table = document.querySelector("tbody");
  const btnAdd = document.querySelector(".btnAdd");
  /*Descomentar la primera vez que se ejecuta*/
  // guardarDatosEnLocalStorage("proveedores", proveedoresEjemplo);

  proveedores = obtenerDatosDesdeLocalStorage("proveedores") || [];
  pintarTabla(proveedores, table);
  //Eliminar proveedor
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      proveedores = eliminarElemento(e, deleteBtn, proveedores, "proveedores");
    });
  });
});
