const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");

let io;

module.exports = {
  init: (server) => {
    io = socketIO(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      try {
        const token = socket.handshake.auth?.token;

        if (!token) {
          console.log("❌ Socket rejected: No token");
          socket.disconnect();
          return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const role = decoded.role;

        // 🔥 JOIN PERSONAL ROOM
        socket.join(userId);

        console.log(
          `🔌 ${role.toUpperCase()} connected → room: ${userId}`
        );

        socket.on("disconnect", () => {
          console.log(
            `❌ ${role.toUpperCase()} disconnected → ${userId}`
          );
        });
      } catch (err) {
        console.error("❌ Socket auth failed:", err.message);
        socket.disconnect();
      }
    });

    return io;
  },

  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized!");
    }
    return io;
  },
};
