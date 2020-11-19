import * as WebSocket from "ws";

const WebSocketServer = require("ws").Server;
const wss: any = new WebSocketServer({ port: 5555 });


const clients = new Set();

wss.on("connection", function(ws: WebSocket) {
  clients.add(ws);
  ws.on("message", function(message: string) {
    console.log(clients.size);
    for (let client of clients) {
      // @ts-ignore
      client.send(message);

    }
    console.log("received: %s", message);
  });

  ws.on("close", function() {
    clients.delete(ws);
  });
});