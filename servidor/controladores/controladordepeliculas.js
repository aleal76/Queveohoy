var con = require('../lib/conexionbd');
//console.log(con);

function buscapeliculas(req, res) {
    var pagina = req.query.pagina;
    var titulo = req.query.titulo;
    var genero = req.query.genero;
    var anio = req.query.anio;
    var cantidad = req.query.cantidad;
    var columna_orden = req.query.columna_orden;
    var tipo_orden = req.query.tipo_orden;
    //armado de las partes del query si no hay condición uso true para que siempre sea el mismo query independientemente de cuántos parámetros lleguen.
    // si cantidad es 0 lo dejo en 52
    var sqlcantidad = (cantidad) ? cantidad : 52;
    var offset = sqlcantidad * (pagina - 1); //inicio de cada página a mostrar, aranca en 0 y se incrementa en n cantidades
    if (titulo) {
        var sqltitulo = "titulo = '" + titulo + "'";
    } else {
        var sqltitulo = " TRUE ";
    }
    if (genero != 0 && genero != undefined) { 
        var sqlgeneroid = " genero_id = " + genero;
    } else {
        var sqlgeneroid = " TRUE ";
    }
    if (anio != 0 && anio != undefined) {
        var sqlanio = "anio = " + anio;
    } else {
        var sqlanio = " TRUE ";
    }

    // multiple query habilitado en conexionbd
    // hago una query mulitple para traer las peliculas buscadas y el total con otro query 
    var sql1 = 'SELECT * FROM pelicula WHERE ' + sqltitulo + ' AND ' + sqlgeneroid + ' AND ' + sqlanio + ' ORDER BY ' + columna_orden + ' ' + tipo_orden + ' LIMIT ' + offset + ',' + sqlcantidad + ';'
    var sql2 = 'SELECT COUNT(*) FROM pelicula WHERE ' + sqltitulo + ' AND ' + sqlgeneroid + ' AND ' + sqlanio + ';'
    //console.log("\nbuscapelicula queries", sql1);
    //se ejecuta la consulta
    con.query(sql1 + sql2, [1, 2], function (error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta películas", error);
            return res.status(404).send("Hubo un error en la consulta películas");
        }
        //si no hubo error, se crea el objeto respuesta con las canciones encontradas
        var response = {
            'peliculas': resultado[0],
            'total': Object.values(resultado[1][0])
        };
        //se envía la respuesta
        res.send(JSON.stringify(response));

    });
}

function buscageneros(req, res) {
    // trae todo género, no hay filtro
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

function buscaInformacion(req, res) {
    //idem anterior, doble query uno para todo película + género y otro película + actor para los actores de cada película
    var sql1 = 'SELECT * FROM genero JOIN pelicula ON genero.id = pelicula.genero_id  where pelicula.id= ' + req.params.id + ';';
    var sql2 = 'SELECT * FROM actor JOIN actor_pelicula ON actor.id=actor_id where pelicula_id=' + req.params.id + ';';
    //se ejecuta la consulta doble
    con.query(sql1 + sql2, [2, 1], function (error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta información", error.message);
            return res.status(404).send("Hubo un error en la consulta informaciónss");
        }
        //si no hubo error, se crea el objeto respuesta con las 
        var response = {
            'pelicula': resultado[0][0],
            'actores': resultado[1]
        };
        //se envía la respuesta
        res.send(JSON.stringify(response));
    });


}

//busca recomendaciones
function buscaRecomendaciones(req, res) {
    var genero = req.query.genero;
    var anio_inicio = req.query.anio_inicio;
    var anio_fin = req.query.anio_fin;
    var puntuacion = req.query.puntuacion;

    if (genero) {
        var sqlgenero = "nombre = '" + genero + "'";
    } else {
        //si no fue enviado el parámetro igual armo pero = cualquiera
        var sqlgenero = " TRUE ";
    }

    if (anio_inicio != 0 && anio_inicio != undefined) {
        var sqlanio_inicio = "anio >= " + anio_inicio;
    } else {
        //si no fue enviado el parámetro igual armo pero = cualquiera
        var sqlanio_inicio = " TRUE ";
    }
    if (anio_fin != 0 && anio_fin != undefined) {
        var sqlanio_fin = "anio <= " + anio_fin;
    } else {
        //si no fue enviado el parámetro igual armo pero = cualquiera
        var sqlanio_fin = " TRUE ";
    }


    if (puntuacion != 0 && puntuacion != undefined) {
        var sqlpuntuacion = "puntuacion = " + puntuacion;
    } else {
        //si no fue enviado el parámetro igual armo pero = cualquiera
        var sqlpuntuacion = " TRUE ";
    }


    var sql1 = 'SELECT * FROM genero JOIN pelicula ON genero.id = pelicula.genero_id  where ' + sqlanio_inicio + ' AND ' + sqlanio_fin + ' AND ' + sqlgenero + ';';

    //console.log("\n en recomendacion", sql1);
    con.query(sql1, function (error, resultado, fields) {
        //si hubo un error, se informa y se envía un mensaje de error
        if (error) {
            console.log("Hubo un error en la consulta recomendaciones", error.message);
            return res.status(404).send("Hubo un error en la consulta recomendaciones");
        }
        //si no hubo error, se crea el objeto respuesta con las 
        var response = {
            'peliculas': resultado
        };
        //se envía la respuesta
        //console.log(JSON.stringify(response));
        res.send(JSON.stringify(response));
    });


}




module.exports = {
    buscapeliculas: buscapeliculas,
    buscageneros: buscageneros,
    buscaInformacion: buscaInformacion,
    buscaRecomendaciones: buscaRecomendaciones
} // no olvidarse cabeza de foco
