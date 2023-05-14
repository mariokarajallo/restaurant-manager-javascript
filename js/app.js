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

    const inputCantidad = document.createElement("INPUT");
    inputCantidad.type = "number";
    inputCantidad.min = 0;
    inputCantidad.id = `producto-${menu.id}`;
    inputCantidad.value = 0;
    inputCantidad.classList.add("form-control");
    inputCantidad.onchange = function () {
      const cantidad = parseInt(inputCantidad.value);
      agregarMenu({ ...menu, cantidad });
    };

    const agregarCantidad = document.createElement("DIV");
    agregarCantidad.classList.add("col-md-2");
    agregarCantidad.appendChild(inputCantidad);

    row.appendChild(nombre);
    row.appendChild(precio);
    row.appendChild(categoria);
    row.appendChild(agregarCantidad);

    contenido.appendChild(row);
  });
}

function agregarMenu(plato) {
  //extraer el pedido actual, genera una copia nueva sin afectar al original
  const { pedido } = cliente;

  // revisar que la cantidad al agregar un plato sea mayor a 0
  if (plato.cantidad > 0) {
    // si el plato ya existe dentro del array pedido, y queremos agregar mas cantidad entonces preguntamos si ya existia anteriormente
    // el metodo some nos devuelve true o false
    if (pedido.some((platoArrayPedido) => platoArrayPedido.id === plato.id)) {
      // el metodo .map crea un nuevo array para poder recorrer cada elemento del array pedido
      const pedidoCantidadActualizado = pedido.map((platoArrayPedido) => {
        // si la comida ya existe, actualizar la cantidad
        if (platoArrayPedido.id === plato.id) {
          platoArrayPedido.cantidad = plato.cantidad;
        }
        return platoArrayPedido;
      });

      // se asigna el nuevo array con cantidades actualizadas al array original de pedido
      cliente.pedido = [...pedidoCantidadActualizado];
    } else {
      // si al agregar la cantidad de un plato, esta cantidad es 0, osea no existe en el array pedido el plato, entonces se agrega al array original de pedido
      cliente.pedido = [...pedido, plato];
    }
  } else {
    //eliminar elementos cuando la cantidad es 0
    const pedidoEliminado = pedido.filter(
      (platoArrayIterador) => platoArrayIterador.id !== plato.id
    );

    cliente.pedido = [...pedidoEliminado];
  }

  //limpiar el codigo html previo
  limpiarHTML();

  //mostrar el resumen del pedido
  actualizarResumen();
}

function actualizarResumen() {
  //selecionar el elemento donde inyectaremos nuevo contenido
  const contenido = document.querySelector("#resumen .contenido");

  const resumen = document.createElement("DIV");
  resumen.classList.add("col-md-6", "card", "py-5", "px-3", "shadow");

  const propina = document.createElement("DIV");
  propina.classList.add("col-md-6");

  //elemento MESA
  const mesa = document.createElement("P");
  mesa.classList.add("fw-bold");
  mesa.textContent = "Mesa: ";

  const mesaSpan = document.createElement("SPAN");
  mesaSpan.classList.add("fw-normal");
  mesaSpan.textContent = cliente.mesa;

  //elemento hora
  const hora = document.createElement("P");
  hora.classList.add("fw-bold");
  hora.textContent = "Hora: ";

  const horaSpan = document.createElement("SPAN");
  horaSpan.classList.add("fw-normal");
  horaSpan.textContent = cliente.hora;

  //agregar elemento a su elemento padre
  mesa.appendChild(mesaSpan);
  hora.appendChild(horaSpan);

  //titulo de la seccion
  const heading = document.createElement("H3");
  heading.textContent = "Platos Consumidos";
  heading.classList.add("my-4", "text-center");

  //iterar sobre el array de pedidos
  const grupo = document.createElement("UL");
  grupo.classList.add("list-group");

  const { pedido } = cliente;
  pedido.forEach((plato) => {
    const { nombre, cantidad, precio, id } = plato;

    const lista = document.createElement("LI");
    lista.classList.add("list-group-item");

    // nombre del plato
    const nombreEl = document.createElement("H4");
    nombreEl.classList.add("my-4");
    nombreEl.textContent = nombre;

    // contenedor de cantidad
    const cantidadEl = document.createElement("P");
    cantidadEl.classList.add("fw-bold");
    cantidadEl.textContent = "Cantidad: ";

    const cantidadSpan = document.createElement("SPAN");
    cantidadSpan.classList.add("fw-normal");
    cantidadSpan.textContent = cantidad;

    // contenedor de Precio
    const precioEl = document.createElement("P");
    precioEl.classList.add("fw-bold");
    precioEl.textContent = "Precio: ";

    const precioSpan = document.createElement("SPAN");
    precioSpan.classList.add("fw-normal");
    precioSpan.textContent = `$${precio}`;

    // contenedor de subtotal
    const subtotalEl = document.createElement("P");
    subtotalEl.classList.add("fw-bold");
    subtotalEl.textContent = "SubTotal: ";

    const subtotalSpan = document.createElement("SPAN");
    subtotalSpan.classList.add("fw-normal");
    subtotalSpan.textContent = calcularSubtotal(precio, cantidad);

    //agrega elemento a su contenedor
    cantidadEl.appendChild(cantidadSpan);
    precioEl.appendChild(precioSpan);
    subtotalEl.appendChild(subtotalSpan);

    //agrega elementos a la lista
    lista.appendChild(nombreEl);
    lista.appendChild(cantidadEl);
    lista.appendChild(precioEl);
    lista.appendChild(subtotalEl);

    //agrega la lista a un grupo de lista
    grupo.appendChild(lista);
  });

  // agrega al resumen
  resumen.appendChild(mesa);
  resumen.appendChild(hora);
  resumen.appendChild(heading);
  resumen.appendChild(grupo);

  //agrega elemento a contenido
  contenido.appendChild(resumen);
}

function limpiarHTML() {
  const contenido = document.querySelector("#resumen .contenido");
  while (contenido.firstChild) {
    contenido.removeChild(contenido.firstChild);
  }
}

function calcularSubtotal(precio, cantidad) {
  return `$ ${precio * cantidad}`;
}
