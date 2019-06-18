var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var puerto = '8080';

var comidas = ["Carne", "Pollo", "Fideos", "Pizza", "Hamburguesa", "Helado",
    "Pescado", "Ensalada"];

app.get('/saludar/:nombre/:apellido', function (req, res) {
    var nombre = req.params.nombre;
    var ape = req.params.apellido;
    res.send('Hola ' + nombre + " " + ape);
})

app.get('/comidas/:comida', function (req, res) {
    var comida = req.params.comida;
    pos = comidas.indexOf(comida);
    console.log(pos);
    if (pos == -1) {
        res.send("no se econtró esa comida");
    }
    else {
        res.send('La comida fue ' + comida + " y está en la pos " + pos);
    }
})

app.get('/palabras', function (req, res) {
    var numero = req.query.cant;
    var palabra = req.query.palabra;
    console.log(numero, palabra);
    arreglo = new Array(numero);
    var i = 0;
    for (i = 0; i < numero; i++) {
        arreglo[i] = palabra;
    }

    res.send("Aquí ua palabra y su pos " + arreglo);

})



app.listen(puerto, function () {
    console.log("Escuchando pedidos en el puerto " + puerto);
});