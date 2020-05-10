var socket = io();

var label = $("#lblNuevoTicket");

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('connect', function() {
    console.log('Conectado al servidor');
    socket.emit("estado", {
        ok:true
    }, function(data) {
        label.text(data.estado);
    });
});

$("button").on("click", function() {
    socket.emit("siguiente", {
        ok:true
    }, function(data) {
        label.text(data.siguiente);
    });
})