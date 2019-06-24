
const mysql = require("mysql");

class DAO {
    constructor(host, user, password, database) {
        this.pool = mysql.createPool({
            host: host,
            user: user,
            password: password,
            database: database
        });
    }


    altaFestival(festival, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                // console.log(`Error al obtener la conexión: ${err.message}`);
                callback(err);
            } else {
                let query = "INSERT INTO festivales (id, nombre, lugar, aforo) VALUES ('', ?, ?, ?);";
                let elems = [festival.nombre, festival.lugar, festival.aforo];
                connection.query(query, elems, function (err, resultado) {
                    if (err) {
                        //  console.log('Error en la consulta a la base de datos al insertar un festival');
                        callback(err);
                    }
                    else {
                        //   console.log("Entramos en el insertar artistas");
                        let query2 = "INSERT INTO artistas (id, idFestival, nombre, nacionalidad, tipo) VALUES"
                        let elems2 = [];
                        festival.artistas.forEach(function (artista, i) {
                            query2 += " ('', ?, ?, ?, ?)";
                            elems2.push(resultado.insertId, artista.nombre, artista.nacionalidad, artista.tipo);
                            if (i == festival.artistas.length - 1) {
                                query2 += ";"
                            }
                            else {
                                query2 += ",";
                            }
                        });
                        //  console.log("QUERY DE LOS ARTISTAS: " + query2);
                        //  console.log("ARTISTAS: " + query2);
                        connection.query(query2, elems2, function (error, resultado) {
                            connection.release();
                            if (error) {
                                //   console.log('Error en la consulta a la base de datos al insertar artistas');
                                callback(error);
                            }
                            else {
                                //    console.log("Insertados festival y artistas correctamente.");
                                callback(null);
                            }

                        });
                    }
                }
                );
            }
        });
    }
}

module.exports = DAO;