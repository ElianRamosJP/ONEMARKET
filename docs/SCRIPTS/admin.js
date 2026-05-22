// ======================================
// VALIDAR ADMIN
// ======================================

const usuarioActivo =
JSON.parse(
    localStorage.getItem("usuarioActivo")
);

if(!usuarioActivo){

    window.location.href =
    "../PAGES/login.html";

}

// SOLO ADMINS
if(usuarioActivo.rol !== "admin"){

    alert("Acceso denegado");

    window.location.href =
    "../index.html";

}

// ======================================
// HTML
// ======================================

const tablaUsuarios =
document.getElementById("tablaUsuarios");

const tablaProductos =
document.getElementById("tablaProductos");

const totalUsuarios =
document.getElementById("totalUsuarios");

const usuariosActivos =
document.getElementById("usuariosActivos");

const totalProductos =
document.getElementById("totalProductos");

const inventario =
document.getElementById("inventario");

const adminName =
document.getElementById("adminName");

// ======================================
// MOSTRAR ADMIN
// ======================================

adminName.textContent =
usuarioActivo.usuario;


// ======================================
// CARGAR USUARIOS
// ======================================

function cargarUsuarios(){

    let usuarios =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    tablaUsuarios.innerHTML = "";

    usuarios.forEach((user,index) => {

        tablaUsuarios.innerHTML += `

            <div class="fila">

                <span>
                    ${user.usuario}
                </span>

                <span>
                    ${user.email}
                </span>

                <span>
                    ${user.ciudad}
                </span>

                <span>

                    <span class="estado activo">

                        Activo

                    </span>

                </span>

                <span>

                    <button
                    class="btn-delete"
                    onclick="eliminarUsuario(${index})">

                        Eliminar

                    </button>

                </span>

            </div>

        `;

    });

    totalUsuarios.textContent =
    usuarios.length;

    usuariosActivos.textContent =
    usuarios.length;

}


// ======================================
// ELIMINAR USUARIO
// ======================================

function eliminarUsuario(index){

    let usuarios =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];

    usuarios.splice(index,1);

    localStorage.setItem(

        "usuarios",

        JSON.stringify(usuarios)

    );

    cargarUsuarios();

}


// ======================================
// API PRODUCTOS
// ======================================

async function cargarProductos(){

    try{

        const respuesta =
        await fetch(
            "https://fakestoreapi.com/products"
        );

        const productos =
        await respuesta.json();

        tablaProductos.innerHTML = "";

        let totalInventario = 0;

        productos.forEach(producto => {

            totalInventario += producto.price;

            tablaProductos.innerHTML += `

                <div class="fila">

                    <span>
                        ${producto.title.slice(0,20)}...
                    </span>

                    <span>
                        ${producto.category}
                    </span>

                    <span>
                        $${producto.price}
                    </span>

                    <span>
                        ${Math.floor(Math.random()*50)}
                    </span>

                    <span>

                        <button
                        class="btn-delete">

                            Eliminar

                        </button>

                    </span>

                </div>

            `;

        });

        totalProductos.textContent =
        productos.length;

        inventario.textContent =
        "$" + totalInventario.toFixed(2);

    }

    catch(error){

        console.log(error);

    }

}


// ======================================
// CERRAR SESION
// ======================================

function cerrarSesion(){

    localStorage.removeItem(
        "usuarioActivo"
    );

    window.location.href =
    "../PAGES/login.html";

}


// ======================================
// INICIAR
// ======================================

cargarUsuarios();

cargarProductos();