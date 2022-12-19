const socket = io();
const divOnline = document.getElementById("alert-online");
const divOffline = document.getElementById("alert-offline");

const txtMessage = document.getElementById("txt-message");
const btnSend = document.getElementById("btn-send");

socket.on("connect", () => {
  divOnline.style.display = "";
  divOffline.style.display = "none";
  console.log("Connected");
});

socket.on("disconnect", () => {
  divOnline.style.display = "none";
  divOffline.style.display = "";
  console.log("DISCONNECTED");
});

socket.on("newMessage", (payload) => {
  console.log(payload);
});

btnSend.addEventListener("click", () => {
  const payload = {
    id: socket.id,
    message: txtMessage.value,
    date: new Date().getTime(),
  };
  socket.emit("sendMessage", payload, () => {
    console.log("I am a callback");
  });
});
