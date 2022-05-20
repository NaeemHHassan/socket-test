const express = require("express");
const socketIO = require("socket.io");

const app = express();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log("Server running at " + PORT);
});

const io = socketIO.listen(server);
const users = {};

io.on("connection", (socket) => {
  //Listem....

  socket.on("CONNECTION", ({ id }) => {
    users[id] = socket.id;
    io.emit("CONNECTION", { id });
  });
  // join room
  // socket.join('roomId')
  //    io.to('roomid').emit(PodcastEvents.RAISE_HAND, { podcast: _podcast });

  console.log(socket.id);
  socket.on("LISTEN", ({ data }) => {
    console.log({ data });

    //EMITING..
    socket.emit("NEW_MESSAGE", { data });
    io.emit("NEW_MESSAGE", { data });
  });
});
