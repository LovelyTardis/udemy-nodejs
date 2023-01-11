const socket = io();
const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desk")) {
  window.location = "index.html";
  throw new Error("Desk is required");
}

const desk = searchParams.get("desk");

const lblDesk = document.querySelector("h1");
const lblTicket = document.querySelector("small");
const lblPendientes = document.querySelector("#lblPendientes");
const buttonAttend = document.querySelector("button");
const divAlert = document.querySelector(".alert");
divAlert.style.display = "none";

socket.on("connect", () => {
  buttonAttend.disabled = false;
});

socket.on("disconnect", () => {
  buttonAttend.disabled = true;
});

socket.on("pending-tickets", (tickets) => {
  lblPendientes.innerText = tickets.length;
});

buttonAttend.addEventListener("click", () => {
  const payload = { desk };
  socket.emit("attend-ticket", payload, ({ ok, ticket }) => {
    if (!ok) {
      lblTicket.innerText = "nobody";
      divAlert.style.display = "";
      return;
    }

    lblTicket.innerText = `Ticket ${ticket.num}`;
  });
});
