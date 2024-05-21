const express = require("express");
const kafka = require("kafka-node");
const app = express();
app.use(express.json());

const client = new kafka.KafkaClient({
  kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVER,
});
const producer = new kafka.Producer(client);
producer.on("ready", () => {
  app.post("/message", (req, res) => {
    producer.send(
      [{ topic: process.env.KAFKA_TOPIC, messages: JSON.stringify(req.body) }],
      (err, data) => {
        if (err) console.log(err);
        else {
          console.log(data);
          res.send(req.body);
        }
      }
    );
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
