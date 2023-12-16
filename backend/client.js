import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function App() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    socket.on("sensorData", (data) => {
      setTemperature(data.temperature);
      setHumidity(data.humidity);
    });
    return () => socket.off("sensorData");
  }, []);

  return (
    <div>
      <h1>Temperature: {temperature}°C</h1>
      <h1>Humidity: {humidity}%</h1>
    </div>
  );
}

export default App;
