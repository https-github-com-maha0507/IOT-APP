const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 4000; // Change this to your desired port
const path = require("path");

// Serve static files, including your CSS, "widget.html," and "chart1.html"
app.use(express.static(path.join(__dirname)));

// Parse JSON requests
app.use(bodyParser.json());

// Define an endpoint to serve the index.html file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
