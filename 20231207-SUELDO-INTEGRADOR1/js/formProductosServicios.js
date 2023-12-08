import data from "./util.js";
window.addEventListener("load", () => {
  const { guardarDatosEnLocalStorage, obtenerDatosDesdeLocalStorage } = data;
  const form = document.getElementById("myForm");
  let productosServicios =
    obtenerDatosDesdeLocalStorage("productosServicios") || [];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const productoServicio = {
      id: `SKU-${new Date().getTime().toString().slice(-6)}`,
    };
    formData.forEach((valor, clave) => {
      productoServicio[clave] = valor;
    });
    let confirmar = confirm(
      "¿Desea confirmar la creación del producto/servico?"
    );
    if (confirmar) {
      productosServicios.push(productoServicio);
      guardarDatosEnLocalStorage("productosServicios", productosServicios);
      this.reset();
      alert(
        `El producto ${productoServicio.nombre} se ha creado satisfactoriamente.`
      );
      window.location.href = "./../productosServicios.html";
    }
  });
});
