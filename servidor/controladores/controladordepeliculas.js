var con = require('../lib/conexionbd');
console.log(con);

//Request URL: http://localhost:8080/peliculas?pagina=1&titulo=contract&genero=5&anio=2015&cantidad=52&columna_orden=titulo&tipo_orden=ASC

//Request URL: http://localhost:8080/peliculas?pagina=1&cantidad=52&columna_orden=titulo&tipo_orden=ASC
function buscapeliculas(req, res) {
    //pedio todo sin importar que venga

    var pagina = req.query.pagina;
    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var anio= req.query.anio;
    var cantidad = req.query.cantidad;
    var columna_orden = req.query.columna_orden;
    var tipo_orden = req.query.tipo_orden;
    //armado de las partes del sqlquery.
    // si cantidad es 0 lo dejo en 25
    var sqlcantidad = (cantidad) ? cantidad : 52;
   if (titulo) {
        var sqltitulo = "titulo = '" + titulo + "'";
    } else {
        //si no fue enviado el parámetro igual armo pero = cualquiera
        var sqltitulo = " TRUE ";
    }
    console.log("aquí sale genero :", genero);
    if (genero != 0 && genero != undefined) {
        var sqlgeneroid = " genero_id = "+genero;
    } else {
        //si no fue enviado el parámetro igual armo pero = cualquiera
        var sqlgeneroid = " TRUE ";
    }
    if (anio!=0 && anio != undefined) {
        var sqlanio = "anio = " + anio;
    } else {
        //si no fue enviado el parámetro igual armo pero = cualquiera
        var sqlanio = " TRUE ";
    }
    //armo el query con todas las condiciones posibles
    var sql = 'select * from  pelicula where '+sqltitulo+'&&'+sqlgeneroid+'&&'+sqlanio+' limit '+sqlcantidad;
    console.log(sql);
   //var pagina= 
    //var sql = 'select * from  pelicula limit 50';
    //se ejecuta la consulta
    con.query(sql, function (error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un erssror en la consulta", error);
            return res.status(404).send("Hubo un errddor en la consulta");
        }
        //si no hubo error, se crea el objeto respuesta con las canciones encontradas
        var response = {
            'peliculas': resultado
        };
        //se envía la respuesta
        res.send(JSON.stringify(response));
    });
}


function buscageneros(req, res) {
    //pedio todo sin importar que venga

    var sql = 'select * from  genero';
    //se ejecuta la consulta
    con.query(sql, function (error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta géneros", error.message);
            return res.status(404).send("Hubo un error en la consulta géneros");
        }
        //si no hubo error, se crea el objeto respuesta con las 
        var response = {
            'generos': resultado
        };
        //se envía la respuesta
        res.send(JSON.stringify(response));
    });
}



module.exports = {
    buscapeliculas: buscapeliculas,
    buscageneros: buscageneros
} // no olvidarse cabeza de foco
