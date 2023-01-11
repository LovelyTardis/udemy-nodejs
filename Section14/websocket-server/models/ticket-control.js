import path from "path";
import fs from "fs";
import { fileURLToPath } from "node:url";

import * as data from "../database/data.json" assert { type: "json" };

class Ticket {
  constructor(num, desk) {
    this.num = num;
    this.desk = desk;
  }
}

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate();
    this.tickets = [];
    this.lastTickets = [];

    this.init();
  }

  get toJSON() {
    return {
      last: this.last,
      today: this.today,
      tickets: this.tickets,
      lastTickets: this.lastTickets,
    };
  }

  init() {
    const { last, today, tickets, lastTickets } = data.default;
    if (today == this.today) {
      this.tickets = tickets;
      this.last = last;
      this.lastTickets = lastTickets;
    } else {
      this.save();
    }
  }

  save() {
    const dbPath = fileURLToPath(
      new URL("../database/data.json", import.meta.url)
    );
    fs.writeFileSync(dbPath, JSON.stringify(this.toJSON, true, 2));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tickets.push(ticket);

    this.save();

    return "Ticket " + ticket.num;
  }

  attendTicket(desk) {
    if (this.tickets.length === 0) return null;

    const ticket = this.tickets.shift();
    ticket.desk = desk;

    this.lastTickets.unshift(ticket);

    if (this.lastTickets.length > 4) {
      this.lastTickets.splice(-1, 1);
    }

    this.save();

    return ticket;
  }
}

export default TicketControl;
