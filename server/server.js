const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
const socket = require("socket.io");
const http = require("http");
const hbs = require("hbs");

const app = express();
const server = http.createServer(app);
module.exports.io = socket(server);
require("./sockets/socket");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const hbsPath = path.resolve(__dirname, '../views/partials');
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));
app.set('view engine', 'hbs');
hbs.registerPartials(hbsPath, (err) => {});

app.get('/', (req, res) => {
    res.render('home.hbs');
});
app.get('/publico', (req, res) => {
    res.render('publico.hbs');
});
app.get('/crear', (req, res) => {
    res.render('crear.hbs');
});
app.post('/escritorio', (req, res) => {
    let escritorio = req.body.escritorio;
    res.render('escritorio.hbs', {
        escritorio
    });
});

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});