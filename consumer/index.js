const express = require("express");
const kafka = require("kafka-node");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL);
const Messages = new mongoose.model("messages", {
  message: String,
});

const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER,
});
const consumer = new kafka.Consumer(
  client,
  [{ topic: process.env.KAFKA_TOPIC }],
  {
    autoCommit: false,
    fromOffset: "latest",
  }
);

consumer.on("message", async (message) => {
  const user = await new Messages(JSON.parse(message.value));
  await user.save();
});

consumer.on("error", (err) => {
  console.log(err);
});

app.get("/message", async (req, res) => {
  const data = await Messages.find();
  const messages = data.map((item) => ({
    id: item._id,
    message: item.message,
  }));
  res.send(messages);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
