import TicketControl from "../models/ticket-control.js";

export const ticketControl = new TicketControl();

export const socketController = (client) => {
  console.log("Client " + client.id + " connected");

  client.emit("last-ticket", ticketControl.last);
  client.emit("actual-state", ticketControl.lastTickets);
  client.emit("pending-tickets", ticketControl.tickets);

  client.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    client.broadcast.emit("pending-tickets", ticketControl.tickets);
    client.emit("pending-tickets", ticketControl.tickets);
    callback(next);
  });

  client.on("attend-ticket", ({ desk }, callback) => {
    if (desk == undefined)
      return callback({ ok: false, msg: "Desk is required" });

    const ticket = ticketControl.attendTicket(desk);

    client.broadcast.emit("actual-state", ticketControl.lastTickets);
    client.broadcast.emit("pending-tickets", ticketControl.tickets);
    client.emit("pending-tickets", ticketControl.tickets);

    if (!ticket) return callback({ ok: false, msg: "No pending tickets" });
    callback({ ok: true, ticket });
  });
};
