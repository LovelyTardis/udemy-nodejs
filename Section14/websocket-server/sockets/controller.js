export const socketController = (client) => {
  console.log("Client " + client.id + " connected");

  client.on("disconnect", () => {
    console.log("Client " + client.id + " disconnected");
  });

  client.on("sendMessage", (payload, callback) => {
    const { id, message } = payload;

    callback(id);
    client.broadcast.emit("newMessage", `${id}: ${message}`);
  });
};
