//vamos
//console.log("que onda"); 
var con = require('../lib/conexionbd');

function buscapeliculas(req, res) {
    //pedio todo sin importar que venga
     var sql = "select * from  pelicula";
    //se ejecuta la consulta
    con.query(sql, function(error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        //si no hubo error, se crea el objeto respuesta con las canciones encontradas
        var response = {
            'peliculas': resultado
        };
        //se envía la respuesta
        res.send(JSON.stringify(response));
    });
}