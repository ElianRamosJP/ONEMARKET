const grid = document.querySelector(".grid");

const URL = "https://fakestoreapi.com/products";

async function obtenerProductos(){

    try{

        const response = await fetch(URL);

        const productos = await response.json();

        productos.forEach(producto => {

            grid.innerHTML += `

            <div class="card">

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

            </div>

            `;

        });

    }catch(error){

        console.log("Error:", error);

    }

}

obtenerProductos();
