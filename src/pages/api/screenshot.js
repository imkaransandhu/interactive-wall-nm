// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe' })
// }

import { Server } from "socket.io";
const SocketHandler = (req, res) => {
  //console.log(req);
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      // Listen for button clicks from Screen 1
      socket.on("screen1-click", () => {
        // Emit a 'screen2-click' event to Screen 2
        console.log("karan");
        socket.broadcast.emit("screen2-click");
      });

      // Listen for button clicks from Screen 2
      socket.on("screen2-click", () => {
        // Emit a 'screen1-click' event to Screen 1
        console.log("karan2");
        socket.broadcast.emit("screen1-click");
      });
    });
  }
  res.end();
};

export default SocketHandler;
