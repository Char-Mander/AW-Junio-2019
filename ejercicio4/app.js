var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();

var staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));


app.use(bodyParser.json());


// Array de cotizaciones

var cotizaciones = [
    { nombre: "ACCIONA", valor: 10000, sube: true},
    { nombre: "BBVA", valor: 9000, sube: false},
    { nombre: "IBERDROLA", valor: 8000, sube: true},
    { nombre: "FERROVIAL", valor: 7000, sube: true},
    { nombre: "INDITEX", valor: 6000, sube: false},
    { nombre: "MEDIASET", valor: 5000, sube: true},
    { nombre: "REPSOL", valor: 4000, sube: false}
];


// Añadir el servicio
app.get("/empresas", function(request, response){
    response.json({result: cotizaciones});
});

app.listen(3000, function(err) {
    if (err) {
        console.log("No se ha podido arrancar el servidor: " + err.message);
    } else {
        console.log("Servidor escuchando en puerto 3000");
    }
});