// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
dotenv.config({ path: "./config.env" });

// Connect to MongoDB
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => console.log("DB connection succesful"));

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
// Define a mongoose model for the light sensor data
const LightSensorData = mongoose.model("LightSensorData", {
  value: Number,
  timestamp: { type: Date, default: Date.now },
});

app.use(bodyParser.json());

// Endpoint to receive light sensor data
app.post("/api/light-sensor", async (req, res) => {
  try {
    const { value } = req.body;

    // Save the received data to MongoDB
    const sensorData = new LightSensorData({ value });
    await sensorData.save();

    res
      .status(200)
      .json({ message: "Light sensor data received successfully" });
  } catch (error) {
    console.error("Error saving sensor data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to retrieve the latest light sensor data
app.get("/api/light-sensor", async (req, res) => {
  try {
    // Find the latest light sensor data from MongoDB
    const latestData = await LightSensorData.findOne()
      .sort({ timestamp: -1 })
      .exec();

    if (latestData) {
      res
        .status(200)
        .json({ value: latestData.value, timestamp: latestData.timestamp });
    } else {
      res.status(404).json({ message: "No light sensor data found" });
    }
  } catch (error) {
    console.error("Error retrieving latest sensor data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Example API Endpoints
app.post("/api/register", (req, res) => {
  // Handle user registration logic here
  const { username, password } = req.body;
  // Save user to MongoDB or perform authentication
  res.json({
    message: "User registered successfully",
  });
});

app.post("/api/device", (req, res) => {
  // Handle device registration logic here
  const { deviceId, userId } = req.body;
  // Save device information to MongoDB
  res.json({ message: "Device registered successfully" });
});

app.post("/api/data", (req, res) => {
  // Handle data communication logic here
  const { deviceId, data } = req.body;
  // Process and store data in MongoDB
  res.json({ message: "Data received successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});