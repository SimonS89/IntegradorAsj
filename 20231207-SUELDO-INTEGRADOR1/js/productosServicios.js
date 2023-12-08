import data from "./util.js";
window.addEventListener("load", () => {
  const {
    productosEjemplo,
    guardarDatosEnLocalStorage,
    obtenerDatosDesdeLocalStorage,
    pintarTabla,
    eliminarElemento,
  } = data;
  let productosServicios;
  const table = document.querySelector("tbody");
  const btnAdd = document.querySelector(".btnAdd");
  /*Descomentar la primera vez que se ejecuta*/
  // guardarDatosEnLocalStorage("productosServicios", productosEjemplo);
  productosServicios =
    obtenerDatosDesdeLocalStorage("productosServicios") || [];
  pintarTabla(productosServicios, table);
  //Eliminar productoServicio
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  const editBtns = document.querySelectorAll(".editBtn");

  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (e) => {
      productosServicios = eliminarElemento(
        e,
        deleteBtn,
        productosServicios,
        "productosServicios"
      );
    });
  });
});
