//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var peliculasControlador = require('./controladores/controladordepeliculas');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


app.get('/peliculas/recomendacion?',peliculasControlador.buscaRecomendaciones);
app.get('/peliculas', peliculasControlador.buscapeliculas);
app.get('/generos', peliculasControlador.buscageneros);

app.get('/peliculas/:id',peliculasControlador.buscaInformacion);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

