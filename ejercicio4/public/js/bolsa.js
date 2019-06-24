"use strict";

function actualizarInformacion() {
    $.ajax({
        type: "GET",
        url: "/empresas",
        success: function (data, textStatus, jqXHR) {

            if ($("td").length === 0) {
                data.result.forEach(function (cotizacion, i) {
                    let elem = "<tr><td id= cotizacion" + i + ">" + cotizacion.nombre + "</td><td id=" + i + "> " + cotizacion.valor + "</td></tr>";
                    $("#" + i).prop("value", cotizacion.valor);
                    $("tbody").append(elem);
                    if (cotizacion.sube) {
                        $("#" + i).css("color", "green");
                    }
                    else {
                        $("#" + i).css("color", "red");
                    }
                });
            }
            else {
                data.result.forEach(function (cotizacion, i) {
                    if (cotizacion.sube) {
                        $("#" + i).css("color", "green");
                    }
                    else {
                        $("#" + i).css("color", "red");
                    }
                });
            }
        },
        // En caso de error, mostrar el error producido
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Se ha producido un error: " + errorThrown);
        }
    });
}

$(() => {
    $("#botonActualizar").on("click", actualizarInformacion);
});