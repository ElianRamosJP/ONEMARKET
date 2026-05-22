// =====================================
// VARIABLES
// =====================================

const grid = document.querySelector(".grid");

const buscador = document.querySelector(".search");

const botonesFiltro = document.querySelectorAll(".filter-btn");

const contadorHTML = document.querySelector(".contador-carrito");

const URL = "https://fakestoreapi.com/products";

let productos = [];

// =====================================
// CARRITO LOCALSTORAGE
// =====================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

actualizarContador();

// =====================================
// CARGAR API
// =====================================

async function cargarProductos() {

    try {

        const respuesta = await fetch(URL);

        productos = await respuesta.json();

        mostrarProductos(productos);

    } catch(error) {

        console.log("ERROR API:", error);

        grid.innerHTML = `
            <p class="error">
                Error al cargar productos
            </p>
        `;

    }

}

// =====================================
// MOSTRAR PRODUCTOS
// =====================================

function mostrarProductos(lista) {

    grid.innerHTML = "";

    lista.forEach(producto => {

        grid.innerHTML += `

        <div class="card" data-id="${producto.id}">

            <img 
                src="${producto.image}" 
                alt="${producto.title}"
            >

            <h3>
                ${producto.title}
            </h3>

            <p>
                $${producto.price}
            </p>

            <span class="brand">
                ${producto.category}
            </span>

            <button 
                class="agregar-carrito"
                data-id="${producto.id}"
            >
                Agregar al carrito
            </button>

        </div>

        `;

    });

    activarEventos();

}

// =====================================
// EVENTOS
// =====================================

function activarEventos() {

    // ===== ABRIR DETALLE =====

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const id = card.dataset.id;

            window.location.href =
                `../PAGES/detallesdelproducto.html?id=${id}`;

        });

    });

    // ===== AGREGAR AL CARRITO =====

    const botones = document.querySelectorAll(".agregar-carrito");

    botones.forEach(boton => {

        boton.addEventListener("click", (e) => {

            e.stopPropagation();

            const id = boton.dataset.id;

            const producto = productos.find(p => p.id == id);

            carrito.push(producto);

            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito)
            );

            actualizarContador();

            alert("Producto agregado al carrito 🛒");

        });

    });

}

// =====================================
// ACTUALIZAR CONTADOR
// =====================================

function actualizarContador() {

    contadorHTML.textContent = carrito.length;

}

// =====================================
// FILTROS
// =====================================

botonesFiltro.forEach(boton => {

    boton.addEventListener("click", () => {

        botonesFiltro.forEach(btn => {

            btn.classList.remove("active");

        });

        boton.classList.add("active");

        const categoria = boton.dataset.category;

        if(categoria === "all") {

            mostrarProductos(productos);

            return;

        }

        const filtrados = productos.filter(producto =>

            producto.category === categoria

        );

        mostrarProductos(filtrados);

    });

});

// =====================================
// BUSCADOR
// =====================================

buscador.addEventListener("keyup", () => {

    const texto = buscador.value.toLowerCase();

    const filtrados = productos.filter(producto =>

        producto.title.toLowerCase().includes(texto)

        ||

        producto.category.toLowerCase().includes(texto)

    );

    mostrarProductos(filtrados);

});

// =====================================
// INICIAR APP
// =====================================

cargarProductos();