const express = require('express');
const app = express();

const mongoose = require('mongoose');
const debug = require("debug")("node-angular");
const http = require("http");
const cors = require('cors');

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

mongoose.connect('mongodb+srv://anth12345250:2Chainz@cluster0.upfww4n.mongodb.net/CryptoSight', {
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected!")
    }).catch((() => {
        console.log("Connection failed!")
}));

app.use(cors());

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
