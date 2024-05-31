const express = require("express");
const expressWs = require("express-ws");
const kafka = require("kafka-node");
const cors = require("cors");

// Express app and set up WebSocket
const app = express();
expressWs(app);

// Kafka Consumer
const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER,
});
const consumer = new kafka.Consumer(
  client,
  [{ topic: process.env.KAFKA_TOPIC }],
  {
    autoCommit: false,
  }
);

// WebSocket connection handler
app.ws("/ws", (ws, req) => {
  console.log("WebSocket client connected");

  // Send messages to WebSocket clients
  consumer.on("message", (message) => {
    console.log("Received message:", message.value);
    ws.send(message.value);
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
