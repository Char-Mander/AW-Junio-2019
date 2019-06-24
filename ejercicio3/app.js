"use strict";

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

var staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public", "views"));

app.use(bodyParser.urlencoded({ extended: false }));

// Array para almacenar los amigos apuntados a la cena
var misAmigos = [];


// Añadir manejadores de ruta
app.get("/amigos.html", function (request, response) {
    response.status(200);
    response.render("lista", { amigos: misAmigos });
});

app.post("/nuevoAmigo", function (request, response) {
    let nuevo = request.body.amigo;
    if (nuevo !== "") {
        misAmigos.push(nuevo);
        response.redirect("/amigos.html");
    }
    else {
        response.status(500);
        response.redirect("/amigos.html");
    }
});

app.get("/borrar/:amigo", function (request, response) {
    let amigo = request.params.amigo;
    let found = false;
    let i = 0;
    while (!found) {
        if (misAmigos[i] === amigo) {
            misAmigos.splice(i, 1);
            found = true;
        }
        i++;
    }
    response.redirect("/amigos.html");
});


app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: "
            + err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});