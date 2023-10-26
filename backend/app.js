document.addEventListener("DOMContentLoaded", function () {
  // Define elements
  const temperatureElement = document.getElementById("temperature");
  const humidityElement = document.getElementById("humidity");
  const toggleDeviceButton = document.getElementById("toggleDevice");

  // Function to update device status
  function updateDeviceStatus() {
    // Replace these with actual data from your device
    const temperatureValue = 25.5; // Example temperature value
    const humidityValue = 60; // Example humidity value

    temperatureElement.textContent = temperatureValue + " °C";
    humidityElement.textContent = humidityValue + "%";
  }

  // Function to toggle the device
  // Function to toggle the device
  function toggleDevice() {
    // Define the endpoint URL for toggling the device
    const toggleDeviceEndpoint = "http://localhost:4000/toggle-device"; // Replace with your server's URL

    // Create a POST request to toggle the device
    fetch(toggleDeviceEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Include any request data (if required) in the body
      // For example, you might send a command to toggle the device.
      body: JSON.stringify({ command: "untoggle" }), // Replace with your command data
    })
      .then((response) => {
        if (response.ok) {
          console.log("Device toggled successfully.");
        } else {
          console.error("Failed to toggle device.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Add a click event listener to the toggleDevice button
  toggleDeviceButton.addEventListener("click", toggleDevice);

  // Initial device status update
  updateDeviceStatus();

  // Periodically update device status (e.g., every 5 seconds)
  setInterval(updateDeviceStatus, 5000);
});
