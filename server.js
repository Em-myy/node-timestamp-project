const express = require("express");
var cors = require("cors");

const server = express();

absoluteHtmlFile = __dirname + "/views/index.html";

server.use(cors({ optionsSuccessStatus: 200 }));

server.get("/", (req, res) => {
  res.sendFile(absoluteHtmlFile);
});

server.get("/api/", (req, res) => {
  const currentDate = new Date();

  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

server.get("/api/:date", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (!isNaN(dateString)) {
    // Numeric input → detect if seconds or milliseconds
    date =
      dateString.length === 10
        ? new Date(parseInt(dateString) * 1000) // seconds
        : new Date(parseInt(dateString)); // milliseconds
  } else {
    date = new Date(dateString);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

server.listen(5000, () => {
  console.log("server is running");
});
