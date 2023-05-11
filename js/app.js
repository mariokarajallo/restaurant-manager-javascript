let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
};

const categorias = {
  1: "Comida",
  2: "bebidas",
  3: "Postres",
};

const btnGuardarCliente = document.querySelector("#guardar-cliente");
btnGuardarCliente.addEventListener("click", guardarCliente);

function guardarCliente() {
  const mesa = document.querySelector("#mesa").value;
  const hora = document.querySelector("#hora").value;

  // metodo some para revisar si hay campos vacios
  const camposVacios = [mesa, hora].some((campo) => campo === "");

  if (camposVacios) {
    // verificar si existe alerta
    const existeAlerta = document.querySelector(".invalid-feedback");
    if (!existeAlerta) {
      // creamos el elemento para el mensaje de alerta
      const alerta = document.createElement("DIV");
      alerta.classList.add("invalid-feedback", "d-block", "text-center");
      alerta.textContent = "Todos los campos son obligatorios";

      // agregamos la alerta en el html
      document.querySelector(".modal-body form").appendChild(alerta);

      // eliminamos el mensaje luego de notificar al usuario
      setTimeout(() => {
        alerta.remove();
      }, 3000);
    }

    return;
  }

  //guardamos los datos del formulario en nuestro arrelo de pedido
  cliente = { ...cliente, mesa, hora };

  //cerrar modal
  const modalFormulario = document.querySelector("#formulario");
  const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
  modalBootstrap.hide();

  // mostrar las secciones
  mostrarSecciones();

  //obtener datos de la API con json-server
  obteneMenu();
}

function mostrarSecciones() {
  const seccionesOcultas = document.querySelectorAll(".d-none");
  seccionesOcultas.forEach((seccion) => seccion.classList.remove("d-none"));
}

function obteneMenu() {
  const url = "http://localhost:4000/platillos";

  fetch(url)
    .then((response) => response.json())
    .then((result) => mostrarMenu(result))
    .catch((error) => console.log(error));
}

function mostrarMenu(menues) {
  const contenido = document.querySelector("#platillos .contenido");

  menues.forEach((menu) => {
    const row = document.createElement("DIV");
    row.classList.add("row", "py-2", "border-top");

    const nombre = document.createElement("DIV");
    nombre.classList.add("col-md-4");
    nombre.textContent = menu.nombre;

    const precio = document.createElement("DIV");
    precio.classList.add("col-md-3", "fw-bold");
    precio.textContent = `$${menu.precio}`;

    const categoria = document.createElement("DIV");
    categoria.classList.add("col-md-3");
    categoria.textContent = categorias[menu.categoria];

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);

    contenido.appendChild(row);
  });
}
