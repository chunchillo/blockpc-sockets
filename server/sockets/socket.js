const { io } = require("../server");
const { Tickets } = require("../classes/tickets");

const tickets = new Tickets();

// const clientes = [];
// console.log("Clientes", clientes)

io.on('connection', (client) => {
    //console.log(client.id);
    client.on('conectar', (data, callback) => {
        console.log(`Escritorio ${data.escritorio} Conectado`);
    });

    client.on('disconnect', () => {
        console.log("Terminal desconectada");
    });

    client.on('desconectar', (data, callback) => {
        console.log(`Escritorio Desconectado ${data.escritorio}`);
        //tickets.desconectarEscritorio(data.escritorio);
    });

    client.on('siguiente', (data, callback) => {
        siguiente = tickets.siguiente();
        if ( data.ok ) {
            callback({
                siguiente
            });
        }
    });

    client.on('estadoEscritorio', (data, callback) => {
        estado = tickets.estado();
        ultimos4 = tickets.ultimosCuatro();
        escritorios = tickets.losEscritorios();
        if ( data.ok ) {
            callback({
                estado,
                ultimos4,
                escritorios
            });
        }
    });
    
    client.on('atencion', (data, callback) => {
        if ( !data.escritorio ) {
            return callback({
                ok: false,
                error: "EL escritorio es necesario"
            });
        }
        if ( data.ok ) {
            let ticket = tickets.atender(data.escritorio);
            if ( !ticket.ok ) {
                callback({
                    ok: false,
                    error: ticket.message
                });
            }
            callback({
                ok: true,
                numero: ticket.numero
            });
        }
        // Actualiza / Notificar Ventana Publico
        client.broadcast.emit('ultimos4', {
            ok: true,
            ultimos4: tickets.ultimosCuatro(),
            escritorios: tickets.losEscritorios()
        });
    });
});