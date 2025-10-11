import { Server, Socket } from "socket.io";

export const socketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("New client connected:", socket.id);

    socket.on("join_room", (user_id: string) => {
      if (!user_id) {
        console.log("No user_id provided");
        return;
      }
      socket.join(user_id);
      console.log(`User ${user_id} joined room with socket ${socket.id}`);
      // Send an acknowledgment back to the client
      socket.emit("room_joined", { status: "success", room: user_id });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  });
};

export const sendNotification = (
  io: Server,
  user_id: string,
  invalidate: boolean
) => {
  console.log(`Attempting to send notification to user ${user_id}`);

  // Get all socket instances in the room
  const sockets = io.sockets.adapter.rooms.get(user_id);

  if (!sockets) {
    console.log(`No active sockets found for user ${user_id}`);
    return;
  }

  console.log(`Found ${sockets.size} socket(s) for user ${user_id}`);

  // Emit the event to the specific room
  io.to(user_id).emit("NOTIF_UPDATE", invalidate);
  console.log(`Notification sent to user ${user_id}`);
};
