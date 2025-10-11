import { Server, Socket } from "socket.io";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Connected:", socket.id);

    socket.on("join_room", (user_id: string) => {
      console.log("Connect");
      if (!user_id) return;
      socket.join(user_id);
      console.log(`User ${user_id} joined their room`);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};

export const sendNotification = (io: Server, user_id: string) => {
  io.to(user_id).emit("NOTIF_UPDATE");
};
