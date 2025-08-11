const express = require("express");

const server = express();

absoluteHtmlFile = __dirname + "/views/index.html";

server.get("/", (req, res) => {
  res.sendFile(absoluteHtmlFile);
});

server.get("/api/", (req, res) => {
  const currentDate = new Date();

  res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
});

server.get("/api/:id", (req, res) => {
  const input = req.params.id;
  let date;

  const numInput = Number(input);

  if (!isNaN(numInput) && input.trim() !== "") {
    date =
      numInput.toString().length === 10
        ? new Date(numInput * 1000) // seconds → ms
        : new Date(numInput);
  } else {
    date = new Date(input);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

server.listen(5000, () => {
  console.log("server is running");
});
