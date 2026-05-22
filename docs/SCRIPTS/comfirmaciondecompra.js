// ======================================
// ELEMENTOS
// ======================================

const pedidoID =
document.getElementById("pedido-id");

const fechaHTML =
document.getElementById("fecha");

const totalHTML =
document.getElementById("total");


// ======================================
// CARGAR DATOS
// ======================================

function cargarConfirmacion(){

    // CARRITO
    let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    // TOTAL
    let total = 0;

    carrito.forEach(producto => {

        total +=
        producto.price * producto.cantidad;

    });

    // ID RANDOM
    const id =
    "ONM-" +
    Math.floor(Math.random() * 999999);

    // FECHA
    const fecha =
    new Date();

    const fechaFormateada =
    fecha.toLocaleDateString("es-CO");

    // MOSTRAR
    pedidoID.textContent = id;

    fechaHTML.textContent =
    fechaFormateada;

    totalHTML.textContent =
    "$" + total.toFixed(2);

    // GUARDAR PEDIDO
    const pedido = {

        id:id,

        fecha:fechaFormateada,

        total:total.toFixed(2),

        productos:carrito

    };

    let pedidos =
    JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

    pedidos.push(pedido);

    localStorage.setItem(
        "pedidos",
        JSON.stringify(pedidos)
    );

    // VACIAR CARRITO
    localStorage.removeItem("carrito");

}

if(carrito.length === 0){

    window.location.href =
    "../PAGES/carrito.html";

}


// ======================================
// INICIAR
// ======================================

cargarConfirmacion();