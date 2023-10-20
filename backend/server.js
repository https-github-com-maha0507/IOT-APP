const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000; // Change this to your desired port

// Parse JSON requests
app.use(bodyParser.json());

// Define an endpoint to toggle the device (this is just a placeholder)
app.post("/toggle-device", (req, res) => {
  // Implement device control logic here
  // You can access the request body using req.body
  // For example, if you want to toggle the device based on a command, you can do:
  console.log(req.body.command);
  const command = req.body.command;
  // Implement device control logic here based on the command

  // Respond with a success message
  res.status(200).json({
    result: command,
    message: "Device toggled successfully",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
