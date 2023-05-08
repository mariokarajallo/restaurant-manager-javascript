let cliente = {
  mesa: "",
  hora: "",
  pedido: [],
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
  } else {
    console.log("campos validados");
  }
}
