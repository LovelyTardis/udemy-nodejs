const socket = io();
const divOnline = document.getElementById("alert-online");
const divOffline = document.getElementById("alert-offline");

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
