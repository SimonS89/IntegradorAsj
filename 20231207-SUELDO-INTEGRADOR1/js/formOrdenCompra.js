import data from "./util.js";
window.addEventListener("load", () => {
  const { guardarDatosEnLocalStorage, obtenerDatosDesdeLocalStorage } = data;
  const form = document.getElementById("myForm");
  let ordenes = obtenerDatosDesdeLocalStorage("ordenesCompra") || [];
  let productos = obtenerDatosDesdeLocalStorage("productosServicios") || [];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const orden = crearOrden(formData, productos);
    let confirmar = confirm("¿Desea confirmar la compra?");
    if (confirmar) {
      ordenes.push(orden);
      guardarDatosEnLocalStorage("ordenesCompra", ordenes);
      this.reset();
      alert(
        `La orden de compra para ${orden.producto} se ha generado satisfactoriamente.`
      );
      window.location.href = "./../ordenCompra.html";
    }
  });
});

function fechaHoy() {
  return new Date().toISOString().split("T")[0];
}

function calcularTotal(cantidad, producto, productos) {
  let productoBuscado =
    productos.find((item) => item.nombre == producto) || null;
  console.log(productoBuscado);
  return (
    parseInt(cantidad) *
    (productoBuscado != null ? productoBuscado.precio : 100)
  );
}

function crearOrden(formData, productos) {
  return {
    id: `OC-${new Date().getTime().toString().slice(-6)}`,
    producto: formData.get("producto"),
    cantidad: formData.get("cantidad"),
    total: calcularTotal(
      formData.get("cantidad"),
      formData.get("producto"),
      productos
    ),
    informacionRecepcion: formData.get("informacionRecepcion"),
    fechaEmision: fechaHoy(),
    fechaEntrega: formData.get("fechaEntrega"),
  };
}
