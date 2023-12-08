import data from "./util.js";
window.addEventListener("load", () => {
  const { guardarDatosEnLocalStorage, obtenerDatosDesdeLocalStorage } = data;
  const form = document.getElementById("myForm");
  let proveedores = obtenerDatosDesdeLocalStorage("proveedores") || [];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const proveedor = crearProveedor(formData);
    let confirmar = confirm("¿Desea confirmar la creación del proveedor?");
    if (confirmar) {
      proveedores.push(proveedor);
      guardarDatosEnLocalStorage("proveedores", proveedores);
      this.reset();
      alert(
        `El proveedor ${proveedor.razonSocial} se ha creadosatisfactoriamente.`
      );
      window.location.href = "./../proveedores.html";
    }
  });
});

function crearProveedor(formData) {
  return {
    id: `ID-${new Date().getTime().toString().slice(-6)}`,
    razonSocial: formData.get("razonSocial"),
    tipoIva: formData.get("tipoIva"),
    rubro: formData.get("rubro"),
    sitioWeb: formData.get("sitioWeb"),
    domicilio: {
      direccion: formData.get("direccion"),
      codigoPostal: formData.get("codigoPostal"),
      localidad: formData.get("localidad"),
      provincia: formData.get("provincia"),
      pais: formData.get("pais"),
    },
    datosContacto: {
      nombreCompleto: formData.get("nombreCompleto"),
      telefono: formData.get("telefono"),
      email: formData.get("email"),
      rol: formData.get("rol"),
    },
  };
}
