import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/message")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    setMessage("");
  };

  return (
    <div className="App">
      <div className="container">
        <div className="half">
          <h1>Consumer Data</h1>
          {data.length > 0 ? (
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  ID: {item.id}, Message: {item.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="half">
          <h1>Producer Message</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
