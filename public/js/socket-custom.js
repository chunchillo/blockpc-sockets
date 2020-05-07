var socket = io();
socket.on('connect', function() {
    console.log("Conectado al servidor");
});
socket.on('disconnect', function() {
    console.log("Se ha perdido la conexión al servidor");
});
socket.emit('enviarMensaje', {
    usuario: "Juan Carlos",
    mensaje: "Hola Mundo"
}, function( resp ) {
    console.log("Respuesta Servidor", resp);
});
socket.on('enviarMensaje', function(mensaje) {
    console.log("Mensaje del Servidor", mensaje)
});