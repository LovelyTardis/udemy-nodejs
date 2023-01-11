const lblNewTicket = document.querySelector("#lblNuevoTicket");
const buttonCreate = document.querySelector("#btn");

const socket = io();

socket.on("connect", () => {
  buttonCreate.disabled = false;
});

socket.on("disconnect", () => {
  buttonCreate.disabled = true;
});

socket.on("last-ticket", (payload) => {
  lblNewTicket.innerText =
    payload === 0 ? "There are no tickets" : `Ticket ${payload}`;
});

buttonCreate.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
