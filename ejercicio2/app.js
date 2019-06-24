"use strict";
const DAO = require("./dao.js");
// CREACIÓN DE UN OBJETO PARA TRABAJAR SOBRE LA BASE DE DATOS
var dao = new DAO("localhost", "root", "", "festivalesInternacionales");

// callback de altaFestival
function cb_altaFestival(err){
    if(err){
        console.log("ERROR EN ALTA DE FESTIVAL");
    }
    else{
        console.log("ALTA DE FESTIVAL OK");
    }
};

// festival a dar de alta de la base de datos
var festival = {
    nombre: "Tomorrowland",
    lugar: "Bélgica",
    aforo: 180000,
    artistas: [
        {nombre:"deadmau5", nacionalidad:"Canadá", tipo:"Individual"},
        {nombre:"skrillex", nacionalidad:"EEUU", tipo:"Individual"},
        {nombre:"Avicii", nacionalidad:"Suecia", tipo:"Individual"},
    ]
};

// prueba de la función altaFestival
dao.altaFestival(festival,cb_altaFestival);

