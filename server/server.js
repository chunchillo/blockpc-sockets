const express = require('express');
const path = require('path');
const socket = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);
module.exports.io = socket(server);
require("./sockets/socket");

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));



server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});