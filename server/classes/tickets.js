const fs = require("fs");

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class Tickets {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.pendientes = [];
        this.escritorios = [];
        this.ultimos4 = [];
        let data = require("../data/data.json");
        if ( data.hoy === this.hoy ) {
            this.ultimo = data.ultimo;
            this.pendientes = data.pendientes;
            this.escritorios = data.escritorios;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciar();
        }
    }
    reiniciar() {
        this.ultimo = 0;
        this.pendientes = [];
        this.escritorios = [];
        this.ultimos4 = [];
        this.grabar();
        console.log("Se ha inicializado el Sistema");
    }
    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(this.ultimo, null);
        this.pendientes.push(ticket);
        this.grabar();
        return `Ticket ${this.ultimo}`;
    }
    grabar() {
        let json = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            pendientes: this.pendientes,
            escritorios: this.escritorios,
            ultimos4: this.ultimos4
        };
        let jsonString = JSON.stringify(json);
        fs.writeFileSync("./server/data/data.json", jsonString);
    }
    atender( escritorio ) {
        if ( this.pendientes.length === 0 ) {
            return {
                ok: false,
                message: "No hay tickets"
            }
        }
        if ( this.escritorios.indexOf(escritorio) === -1 ) {
            this.escritorios.push(escritorio)
        }
        let numero = this.pendientes[0].numero;
        this.pendientes.shift();
        let ticket = new Ticket(numero, escritorio);
        this.ultimos4.unshift(ticket);
        if ( this.ultimos4.length > this.escritorios.length ) {
            this.ultimos4.splice(-1,1);
        }
        this.grabar();
        return {
            ok: true,
            numero
        }
    }
    ultimosCuatro() {
        return this.ultimos4;
    }
    estado() {
        return `Ticket ${this.ultimo}`;
    }
    losEscritorios() {
        return this.escritorios;
    }
    desconectarEscritorio(escritorio) {
        let idc = this.escritorios.indexOf(escritorio);
        console.log(this.escritorios, idc);
        if ( idc > -1 ) {
            this.escritorios.splice(idc,1);
            this.grabar();
        }
    }
}

module.exports = { Tickets }