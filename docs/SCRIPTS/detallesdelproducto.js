// ====================================
// VARIABLES
// ====================================

const imagen = document.getElementById("producto-imagen");

const titulo = document.getElementById("titulo");

const categoria = document.getElementById("categoria");

const precio = document.getElementById("precio");

const descripcion = document.getElementById("descripcion");

const relacionados = document.querySelector(
    ".relacionados-contenedor"
);

const btnCarrito = document.querySelector(
    ".btn-carrito"
);

const contadorHTML = document.querySelector(
    ".contador-carrito"
);

// ====================================
// CARRITO
// ====================================

let carrito = JSON.parse(
    localStorage.getItem("carrito")
) || [];

contadorHTML.textContent = carrito.length;

// ====================================
// OBTENER ID
// ====================================

const params = new URLSearchParams(
    window.location.search
);

const id = params.get("id");

// ====================================
// API
// ====================================

async function cargarProducto(){

    try{

        const respuesta = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );

        const producto = await respuesta.json();

        mostrarProducto(producto);

        cargarRelacionados(producto.category);

    }catch(error){

        console.log(error);

    }

}

// ====================================
// MOSTRAR PRODUCTO
// ====================================

function mostrarProducto(producto){

    imagen.src = producto.image;

    titulo.textContent = producto.title;

    categoria.textContent = producto.category;

    precio.textContent = `$${producto.price}`;

    descripcion.textContent = producto.description;

    // ===== CARRITO =====

    btnCarrito.addEventListener("click", ()=>{

        carrito.push(producto);

        localStorage.setItem(
            "carrito",
            JSON.stringify(carrito)
        );

        contadorHTML.textContent =
        carrito.length;

        alert("Producto agregado 🛒");

    });

}

// ====================================
// RELACIONADOS
// ====================================

async function cargarRelacionados(categoriaProducto){

    const respuesta = await fetch(
        "https://fakestoreapi.com/products"
    );

    const productos = await respuesta.json();

    const filtrados = productos.filter(producto =>

        producto.category === categoriaProducto

        &&

        producto.id != id

    );

    relacionados.innerHTML = "";

    filtrados.slice(0,4).forEach(producto => {

        relacionados.innerHTML += `

        <div class="card"
            onclick="
            window.location.href=
            'detallesdelproducto.html?id=${producto.id}'
            "
        >

            <img src="${producto.image}">

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
                Ver producto
            </button>

        </div>

        `;

    });

}

// ====================================
// INICIAR
// ====================================

cargarProducto();