// ======================================
// VARIABLES
// ======================================

const contenedor =
document.querySelector(".carrito-productos");

const totalHTML =
document.querySelector(".total");


// ======================================
// CARGAR CARRITO
// ======================================

function cargarCarrito() {

    let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    // SI ESTA VACIO
    if(carrito.length === 0){

        contenedor.innerHTML = `

            <div class="carrito-vacio">

                <h2>
                    Tu carrito está vacío 🛒
                </h2>

                <p>
                    Agrega productos para comenzar
                </p>

            </div>

        `;

        totalHTML.textContent = "$0";

        return;

    }

    // LIMPIAR
    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach(producto => {

        total +=
        producto.price * producto.cantidad;

        contenedor.innerHTML += `

            <div class="carrito-card">

                <img
                src="${producto.image}"
                alt="${producto.title}">

                <div class="info">

                    <h3>
                        ${producto.title}
                    </h3>

                    <p>
                        Precio:
                        $${producto.price}
                    </p>

                    <p>
                        Cantidad:
                        ${producto.cantidad}
                    </p>

                </div>

                <button
                onclick="eliminarProducto(${producto.id})">

                    Eliminar

                </button>

            </div>

        `;

    });

    totalHTML.textContent =
    "$" + total.toFixed(2);

}


// ======================================
// ELIMINAR PRODUCTO
// ======================================

function eliminarProducto(id){

    let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    carrito =
    carrito.filter(producto =>

        producto.id !== id

    );

    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

    cargarCarrito();

}



// ======================================
// FINALIZAR COMPRA
// ======================================

function finalizarCompra(){

    let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    // VALIDAR
    if(carrito.length === 0){

        alert(
            "Tu carrito está vacío 🛒"
        );

        return;

    }

    // USUARIO ACTIVO
    const usuarioActivo =
    JSON.parse(
        localStorage.getItem(
            "usuarioActivo"
        )
    );

    // VALIDAR LOGIN
    if(!usuarioActivo){

        alert(
            "Debes iniciar sesión"
        );

        window.location.href =
        "../PAGES/login.html";

        return;

    }

    // PEDIDOS
    let pedidos =
    JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

    // TOTAL
    let total = 0;

    carrito.forEach(producto => {

        total +=
        producto.price *
        producto.cantidad;

    });

    // CREAR PEDIDO
    const pedido = {

        id: Date.now(),

        usuario:
        usuarioActivo.usuario,

        productos: carrito,

        total:
        total.toFixed(2),

        fecha:
        new Date()
        .toLocaleDateString()

    };

    // GUARDAR PEDIDO
    pedidos.push(pedido);

    localStorage.setItem(

        "pedidos",

        JSON.stringify(pedidos)

    );

    // BORRAR CARRITO
    localStorage.removeItem(
        "carrito"
    );

    // MENSAJE
    alert(
        "Compra realizada correctamente ✅"
    );

    // REDIRECCIONAR
    window.location.href =
    "../PAGES/comfirmaciondecompra.html";

}



// ======================================
// INICIAR
// ======================================

cargarCarrito();