const { io } = require("../server");

io.on('connection', (client) => {
    console.log("Usuario Conectado");
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: "Bienvenido a Blockpc"
    });
    client.on('disconnect', () => {
        console.log("Usuario desconectado");
    });
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log(mensaje);
        client.broadcast.emit('enviarMensaje', mensaje);
        // if ( mensaje.usuario ) {
        //     callback({
        //         resp: "Todo OK"
        //     });
        // } else {
        //     callback({
        //         resp: "Algo salio mal!"
        //     });
        // }
    });
});