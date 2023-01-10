// Referencias del HTML
const lblOnline = document.querySelector("#alert-online");
const lblOffline = document.querySelector("#alert-offline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();

socket.on("connect", () => {
  // console.log("Conectado");

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
});

socket.on("disconnect", () => {
  // console.log('Desconectado del servidor');

  lblOnline.style.display = "none";
  lblOffline.style.display = "";
});

socket.on("enviar-mensaje", (payload) => {
  console.log(payload);
});
