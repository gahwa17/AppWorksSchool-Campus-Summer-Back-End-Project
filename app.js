const express = require("express");
const app = express();
require("dotenv").config();

const userRoutes = require("./server/routes/userRoute");
const friendRoutes = require("./server/routes/friendRoute");
const eventRoutes = require("./server/routes/eventRoute");
const postRoutes = require("./server/routes/postRoute");
const groupRoutes = require("./server/routes/groupRoute");
const chatRoutes = require("./server/routes/chatRoute");
const ELBRoutes = require("./server/routes/ELBRoute");

const cors = require("cors");
const corsOptions = {
  origin: ["https://canchu-for-backend.vercel.app"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/public/images", express.static("./public/images"));

// const rateLimit = require('./util/ratelimiter');
// app.use(rateLimit(10, 60));

app.use("/api/1.0/users", userRoutes);
app.use("/api/1.0/friends", friendRoutes);
app.use("/api/1.0/events", eventRoutes);
app.use("/api/1.0/posts", postRoutes);
app.use("/api/1.0/groups", groupRoutes);
app.use("/api/1.0/chat", chatRoutes);
app.get("/", ELBRoutes);

module.exports = app;
