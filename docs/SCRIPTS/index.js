// ======================================
// VARIABLES
// ======================================

const grid =
document.querySelector(".grid");

const buscador =
document.querySelector(".search");

const contadorHTML =
document.querySelector(".contador-carrito");

const URL =
"https://fakestoreapi.com/products";

let productos = [];


// ======================================
// CARGAR PRODUCTOS API
// ======================================

async function cargarProductos() {

    try {

        const respuesta =
        await fetch(URL);

        productos =
        await respuesta.json();

        mostrarProductos(productos);

        actualizarContador();

    } catch(error) {

        console.log(
            "ERROR API:",
            error
        );

    }

}


// ======================================
// MOSTRAR PRODUCTOS
// ======================================

function mostrarProductos(lista) {

    grid.innerHTML = "";

    lista.forEach(producto => {

        const card =
        document.createElement("div");

        card.classList.add("card");

        // HTML CARD
        card.innerHTML = `

            <img
            src="${producto.image}"
            alt="${producto.title}">

            <h3>
                ${producto.title}
            </h3>

            <p>
                $${producto.price}
            </p>

            <span class="brand">
                ${producto.category}
            </span>

            <button>
                Agregar al carrito
            </button>

        `;

        // CLICK CARD -> DETALLES
        card.addEventListener("click", () => {

            verProducto(producto.id);

        });

        // BOTON CARRITO
        const boton =
        card.querySelector("button");

        boton.addEventListener("click", (e) => {

            e.stopPropagation();

            agregarAlCarrito(producto);

        });

        // INSERTAR CARD
        grid.appendChild(card);

    });

}


// ======================================
// AGREGAR AL CARRITO
// ======================================

function agregarAlCarrito(producto) {

    let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    // VERIFICAR SI EXISTE
    const existe =
    carrito.find(item =>

        item.id === producto.id

    );

    // SI EXISTE
    if(existe){

        existe.cantidad =
        Number(existe.cantidad || 0) + 1;

    } else {

        carrito.push({

            id: producto.id,

            title: producto.title,

            price: producto.price,

            image: producto.image,

            category: producto.category,

            cantidad: 1

        });

    }

    // GUARDAR
    localStorage.setItem(

        "carrito",

        JSON.stringify(carrito)

    );

    actualizarContador();

    alert("Producto agregado 🛒");

}


// ======================================
// ACTUALIZAR CONTADOR
// ======================================

function actualizarContador() {

    let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    let total = 0;

    carrito.forEach(producto => {

        total += Number(producto.cantidad) || 0;

    });

    contadorHTML.textContent = total;

}


// ======================================
// BUSCADOR
// ======================================

buscador.addEventListener("keyup", () => {

    const texto =
    buscador.value.toLowerCase();

    const filtrados =
    productos.filter(producto =>

        producto.title
        .toLowerCase()
        .includes(texto)

        ||

        producto.category
        .toLowerCase()
        .includes(texto)

    );

    mostrarProductos(filtrados);

});


// ======================================
// VER PRODUCTO
// ======================================

function verProducto(id) {

    window.location.href =

    `PAGES/detallesdelproducto.html?id=${id}`;

}

localStorage.clear()


// ======================================
// INICIAR
// ======================================

cargarProductos();