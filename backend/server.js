// const express = require("express");
// const http = require("http");
// const app = express();
// const server = http.createServer(app);
// const socketIO = require("socket.io");
// const io = socketIO(server);
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");

// dotenv.config({ path: "./config.env" });

// // Middleware
// app.use(bodyParser.json());

// // Connect to MongoDB
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB connection successful"))
//   .catch((err) => console.error(`MongoDB connection error: ${err}`));

// // MongoDB connection

// const Schema = new mongoose.Schema({
//   message: String,
//   timestamp: { type: Date, default: Date.now },
// });
// app.get("/sensor", async (req, res) => {
//   // Check if sensor data is available
//   console.log(req);
//   if (!req.sensorData) {
//     return res.status(404).send("Sensor data not available");
//   }

//   // Send a message with appropriate status code
//   res.status(200).send("Sensor data available through WebSockets");
// });

// io.on("connection", (socket) => {
//   console.log("Client connected");
//   socket.on("sensorData", (data) => {
//     console.log("Received sensor data:", data);
//     // Update server state and potentially emit updates to other clients
//     // ...
//   });
// });

// server.listen(3000, () => console.log("Server started on port 3000"));
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;
const bodyParser = require("body-parser");

// Middleware to enable CORS
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/temperature", (req, res) => {
  // Handle the temperature data here
  const temperatureData = req.body.temperature;
  console.log(`Received temperature data from Arduino: ${temperatureData}°C`); // Broadcast the temperature data to all connected clients

  io.emit("temperature", temperatureData); // Send a response back to the Arduino

  res.send("Temperature data received successfully");
});

// Listen for incoming WebSocket connections
// Listen for incoming WebSocket connections
io.on("connection", (socket) => {
  console.log(`A client has connected. Socket ID: ${socket.id}`);

  // Handle temperature data from Arduino
  socket.on("temperature", (data) => {
    console.log(`Received temperature data from Arduino: ${data}°C`);

    // Broadcast the temperature data to all connected clients
    io.emit("temperature", data);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log(`Client disconnected. Socket ID: ${socket.id}`);
  });

  // Additional logging for client connection
  console.log(`Total connected clients: ${io.engine.clientsCount}`);

  // Send a welcome message to the client
  socket.emit("welcome", "Welcome to the server!");

  // You can add more event handlers or logic here
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
