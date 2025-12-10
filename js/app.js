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
  const url = "http://localhost:3000/platillos";

  fetch(url)
    .then((response) => response.json())
    .then((result) => mostrarMenu(result))
    .catch((error) => console.log(error));
}

function mostrarMenu(menues) {
  const contenido = document.querySelector("#platillos .contenido");

  menues.forEach((menu) => {
    const { nombre, precio, categoria, id } = menu;

    const div = document.createElement("DIV");
    div.classList.add("col-md-4", "col-lg-3", "mb-4");

    const card = document.createElement("DIV");
    card.classList.add("card", "h-100");

    const cardBody = document.createElement("DIV");
    cardBody.classList.add("card-body", "d-flex", "flex-column");

    const nombrePlatillo = document.createElement("H3");
    nombrePlatillo.classList.add("card-title");
    nombrePlatillo.textContent = nombre;

    const precioPlatillo = document.createElement("P");
    precioPlatillo.classList.add("card-text", "fw-bold");
    precioPlatillo.textContent = `$${precio}`;

    const categoriaPlatillo = document.createElement("P");
    categoriaPlatillo.classList.add("card-text");
    categoriaPlatillo.textContent = categorias[categoria];

    const inputCantidad = document.createElement("INPUT");
    inputCantidad.type = "number";
    inputCantidad.min = 0;
    inputCantidad.value = 0;
    inputCantidad.id = `producto-${id}`;
    inputCantidad.classList.add("form-control", "mt-auto");

    // Función que detecta la cantidad y la agrega al arreglo
    inputCantidad.onchange = function () {
      const cantidad = parseInt(inputCantidad.value);
      agregarMenu({ ...menu, cantidad });
    };

    // Agregar al HTML
    cardBody.appendChild(nombrePlatillo);
    cardBody.appendChild(precioPlatillo);
    cardBody.appendChild(categoriaPlatillo);
    cardBody.appendChild(inputCantidad);

    card.appendChild(cardBody);
    div.appendChild(card);

    contenido.appendChild(div);
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

  if (cliente.pedido.length) {
    //mostrar el resumen del pedido si tenemos elementos en el array de pedido
    actualizarResumen();
  } else {
    // si no tiene ningun elemento nuestro array de pedido
    mensajePedidoVacio();
  }
}

function actualizarResumen() {
  //selecionar el elemento donde inyectaremos nuevo contenido
  const contenido = document.querySelector("#resumen .contenido");

  const resumen = document.createElement("DIV");
  resumen.classList.add("col-md-6", "card", "py-4", "px-3", "shadow");

  // Título de la sección
  const heading = document.createElement("H3");
  heading.textContent = "Platos Consumidos";
  heading.classList.add("my-4", "text-center");

  // Mostrar Mesa y Hora en una sola linea
  const mesaHora = document.createElement("P");
  mesaHora.classList.add("text-center", "fw-bold", "fs-5");
  mesaHora.textContent = `Mesa: ${cliente.mesa} - Hora: ${cliente.hora}`;

  // Iterar sobre el array de pedidos
  const grupo = document.createElement("UL");
  grupo.classList.add("list-group");

  const { pedido } = cliente;
  pedido.forEach((plato) => {
    const { nombre, cantidad, precio, id } = plato;

    const lista = document.createElement("LI");
    lista.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );

    // Contenedor de info del plato
    const infoDiv = document.createElement("DIV");

    const nombreEl = document.createElement("H4");
    nombreEl.classList.add("my-0", "fs-5", "fw-bold");
    nombreEl.textContent = nombre;

    const cantidadEl = document.createElement("P");
    cantidadEl.classList.add("my-0");
    cantidadEl.textContent = `Cantidad: ${cantidad}`;

    const precioEl = document.createElement("P");
    precioEl.classList.add("my-0");
    precioEl.textContent = `Precio unitario: $${precio}`;

    infoDiv.appendChild(nombreEl);
    infoDiv.appendChild(cantidadEl);
    infoDiv.appendChild(precioEl);

    // Subtotal del plato specific
    const subtotalEl = document.createElement("P");
    subtotalEl.classList.add("fw-bold", "fs-5", "my-0", "mx-3");
    subtotalEl.textContent = calcularSubtotal(precio, cantidad);

    // Botón Eliminar (Icono de Basurero)
    const btnEliminar = document.createElement("BUTTON");
    btnEliminar.classList.add("btn", "btn-danger", "p-2");
    // Icono SVG
    btnEliminar.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
        </svg>
    `;

    // Función del botón eliminar
    btnEliminar.onclick = function () {
      eliminarPedido(id);
    };

    // Agregar elementos a la lista (flex container)
    lista.appendChild(infoDiv);
    lista.appendChild(subtotalEl);
    lista.appendChild(btnEliminar);

    // Agregar lista al grupo
    grupo.appendChild(lista);
  });

  // Agregar al resumen
  resumen.appendChild(heading);
  resumen.appendChild(mesaHora);
  resumen.appendChild(grupo);

  //agrega elemento a contenido
  contenido.appendChild(resumen);

  //mostrar formulario de propina
  formularioPropina();
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

function eliminarPedido(id) {
  const { pedido } = cliente;
  const pedidoEliminado = pedido.filter(
    (iteradorPedido) => iteradorPedido.id !== id
  );
  cliente.pedido = [...pedidoEliminado];
  //limpiar el codigo html previo
  limpiarHTML();

  if (cliente.pedido.length) {
    //mostrar el resumen del pedido si tenemos elementos en el array de pedido
    actualizarResumen();
  } else {
    // si no tiene ningun elemento nuestro array de pedido
    mensajePedidoVacio();
  }

  // el producto se elimina entonces regresamos a 0 los inputs del formulario de menu
  const inputIdEliminar = document.querySelector(`#producto-${id}`);
  inputIdEliminar.value = 0;
}

function mensajePedidoVacio() {
  const contenido = document.querySelector("#resumen .contenido");

  const mensaje = document.createElement("P");
  mensaje.classList.add("text-center");
  mensaje.textContent = "Añade los elementos del pedido";

  contenido.appendChild(mensaje);
}

function formularioPropina() {
  const contenido = document.querySelector("#resumen .contenido");

  const formularioPropina = document.createElement("DIV");
  formularioPropina.classList.add("col-md-6", "formulario");

  const divformulario = document.createElement("DIV");
  divformulario.classList.add("card", "shadow", "py-4", "px-3");

  const heading = document.createElement("H3");
  heading.classList.add("text-center", "my-4");
  heading.textContent = "Propina: ";

  //radio button 10%
  const radio10 = document.createElement("INPUT");
  radio10.type = "radio";
  radio10.name = "propina";
  radio10.value = 10;
  radio10.classList.add("form-check-input");
  radio10.onclick = calcularPropina;

  const radio10Label = document.createElement("LABEL");
  radio10Label.textContent = "10%";
  radio10Label.classList.add("form-chek-label");

  const radio10Div = document.createElement("DIV");
  radio10Div.classList.add("form-check");

  radio10Div.appendChild(radio10);
  radio10Div.appendChild(radio10Label);

  //radio button 25%
  const radio25 = document.createElement("INPUT");
  radio25.type = "radio";
  radio25.name = "propina";
  radio25.value = 25;
  radio25.classList.add("form-check-input");
  radio25.onclick = calcularPropina;

  const radio25Label = document.createElement("LABEL");
  radio25Label.textContent = "25%";
  radio25Label.classList.add("form-chek-label");

  const radio25Div = document.createElement("DIV");
  radio25Div.classList.add("form-check");

  radio25Div.appendChild(radio25);
  radio25Div.appendChild(radio25Label);

  //radio button 50%
  const radio50 = document.createElement("INPUT");
  radio50.type = "radio";
  radio50.name = "propina";
  radio50.value = 50;
  radio50.classList.add("form-check-input");
  radio50.onclick = calcularPropina;

  const radio50Label = document.createElement("LABEL");
  radio50Label.textContent = "50%";
  radio50Label.classList.add("form-chek-label");

  const radio50Div = document.createElement("DIV");
  radio50Div.classList.add("form-check");

  radio50Div.appendChild(radio50);
  radio50Div.appendChild(radio50Label);

  //agrega al div principal
  divformulario.appendChild(heading);
  divformulario.appendChild(radio10Div);
  divformulario.appendChild(radio25Div);
  divformulario.appendChild(radio50Div);

  //agrega al formulario
  formularioPropina.appendChild(divformulario);
  contenido.appendChild(formularioPropina);
}

function calcularPropina() {
  const { pedido } = cliente;
  let subtotal = 0;

  //calcular subtotal a pagar
  pedido.forEach((plato) => {
    subtotal += plato.cantidad * plato.precio;
  });

  // seleccionar el radio button con la propina del cliente
  const propinaSeleccionada = document.querySelector(
    '[name="propina"]:checked'
  ).value;

  //calcular propina
  const propina = (subtotal * parseInt(propinaSeleccionada)) / 100;

  //calcular total a pagar
  const total = subtotal + propina;

  mostrarTotal(subtotal, total, propina);
}

function mostrarTotal(subtotal, total, propina) {
  const divTotales = document.createElement("DIV");
  divTotales.classList.add("total-pagar", "my-5");

  //subtotal
  const subtotalParrafo = document.createElement("P");
  subtotalParrafo.classList.add(
    "fs-4",
    "fw-bold",
    "mt-2",
    "d-flex",
    "justify-content-between"
  );
  subtotalParrafo.textContent = "Subtotal: ";

  const subtotalSpan = document.createElement("SPAN");
  subtotalSpan.classList.add("fw-normal");
  subtotalSpan.textContent = `$${subtotal}`;
  subtotalParrafo.appendChild(subtotalSpan);

  //propina
  const propinaParrafo = document.createElement("P");
  propinaParrafo.classList.add(
    "fs-4",
    "fw-bold",
    "mt-2",
    "d-flex",
    "justify-content-between"
  );
  propinaParrafo.textContent = "Propina: ";

  const propinaSpan = document.createElement("SPAN");
  propinaSpan.classList.add("fw-normal");
  propinaSpan.textContent = `$${propina}`;
  propinaParrafo.appendChild(propinaSpan);

  // Divisor
  const divisor = document.createElement("HR");

  //total
  const totalParrafo = document.createElement("P");
  totalParrafo.classList.add(
    "fs-3",
    "fw-bold",
    "mt-2",
    "d-flex",
    "justify-content-between",
    "text-black"
  );
  totalParrafo.textContent = "Total Total: ";

  const totalSpan = document.createElement("SPAN");
  totalSpan.classList.add("fw-bold");
  totalSpan.textContent = `$${total}`;
  totalParrafo.appendChild(totalSpan);

  //eliminar totales previos
  const divTotalesExiste = document.querySelector(".total-pagar");
  if (divTotalesExiste) {
    divTotalesExiste.remove();
  }
  //agregar al div contenedor
  divTotales.appendChild(subtotalParrafo);
  divTotales.appendChild(propinaParrafo);
  divTotales.appendChild(divisor);
  divTotales.appendChild(totalParrafo);

  //agrega al formulario
  const formularioPropina = document.querySelector(".formulario > div");

  formularioPropina.appendChild(divTotales);
}
