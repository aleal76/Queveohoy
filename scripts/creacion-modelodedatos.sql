CREATE DATABASE P9QUEVEOHOY;
USE P9QUEVEOHOY;
CREATE TABLE pelicula (
 id INT NOT NULL AUTO_INCREMENT,
 titulo VARCHAR(100) NOT NULL,
 duracion INT(5) NOT NULL,
 director VARCHAR(400),
 anio INT(5) NOT NULL,
 fecha_lanzamiento DATE,
 puntuacion INT(2),
 poster VARCHAR(300),
 trama VARCHAR(700),
 PRIMARY KEY (id)
);

CREATE TABLE genero (
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(30),
PRIMARY KEY (id)
);
ALTER TABLE pelicula ADD genero_id INT NOT NULL AFTER trama;
ALTER TABLE pelicula ADD FOREIGN KEY (genero_id) REFERENCES genero(id);

CREATE TABLE actor (
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(70),
PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula (
id INT NOT NULL AUTO_INCREMENT,
actor_id INT,
pelicula_id int,
PRIMARY KEY (id),
FOREIGN KEY (actor_id) REFERENCES actor(id),
FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
);

