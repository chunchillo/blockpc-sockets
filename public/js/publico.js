var socket = io();

var ticket_actual = $("#lblTicketActual");
var escritorio_actual = $("#lblEscritorioActual");
var ticket_x = $("#lblTicketX");
var ticket_y = $("#lblTicketY");
var ticket_z = $("#lblTicketZ");
var escritorio_x = $("#lblEscritorioX");
var escritorio_y = $("#lblEscritorioY");
var escritorio_z = $("#lblEscritorioZ");

var contenedor = $("#contenedor");

socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

socket.on('connect', function() {
    console.log('Conectado al publico');
});

socket.emit("estadoEscritorio", {
    ok:true
}, async (data) => {
    if ( data.ultimos4.length ) {
        var audio = new Audio("audio/new-ticket.mp3");
        await audio.play();
        estado(data.ultimos4, data.escritorios);
    } else {
        contenedor.html(`<div class="flex-center position-ref text-white">
        <div class="content">
            <span id="lblTicketX" class="ticket-actual-numero">Esperando ...</span>
            <br>
            <span class="ticket-actual-escritorio"></span>
        </div>
        </div>`);
    }
});

socket.on('ultimos4', async (data) => {
    if ( data.ultimos4.length ) {
        var audio = new Audio("audio/new-ticket.mp3");
        await audio.play();
        estado(data.ultimos4, data.escritorios);
    }
});

function estado(ultimos, escritorios) {
    contenedor.html('');
    for ( let i = 0; i < escritorios.length; i++ ) {
        if ( i == 0 ) {
            contenedor.append(`<div class="flex-center position-ref text-white">
            <div class="content">
                <span id="lblTicketX" class="ticket-actual-numero">Ticket <b>${ultimos[i].numero}</b></span>
                <br>
                <span class="ticket-actual-escritorio">Escritorio <b>${ultimos[i].escritorio}</b></span>
            </div>
            </div>`);
        } else {
            contenedor.append(`<div class="flex-center position-ref text-white">
            <div class="content">
                <span id="lblTicketX" class="ticket-secundario">Ticket <b>${ultimos[i].numero}</b></span>
                <br>
                <span id="lblEscritorioX">Escritorio <b>${ultimos[i].escritorio}</b></span>
            </div>
            </div>`);
        }
    }
}