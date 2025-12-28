const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");

const connectDB = require("./config/db");
const socket = require("./socket");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tokens", require("./routes/tokenRoutes"));

// 🔥 SOCKET INIT (IMPORTANT)
socket.init(server);

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
