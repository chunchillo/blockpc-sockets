var socket = io();

var escritorio = $("#escritorio");
var error_label = $("#error");
var atencion = $("#numero_atencion");

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('connect', function() {
    console.log('Conectado al escritorio', escritorio.val());
    socket.emit('conectar', {
        ok: true,
        escritorio: parseInt(escritorio.val())
    });
});

$("button").on("click", function() {
    socket.emit('atencion', {
        ok: true,
        escritorio: parseInt(escritorio.val())
    }, function(resp) {
        if ( !resp.ok ) {
            error_label.text(resp.error).show();
            atencion.text('...');
        } else {
            error_label.text('').hide();
            atencion.text(resp.numero);
        }
    });
})