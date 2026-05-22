// ======================================
// TRAER USUARIO ACTIVO
// ======================================

const usuarioActivo =
JSON.parse(
    localStorage.getItem("usuarioActivo")
);


// DEBUG
console.log(usuarioActivo);


// ======================================
// VALIDAR SESION
// ======================================

if(!usuarioActivo){

    alert(
        "Debes iniciar sesión"
    );

    window.location.href =
    "../PAGES/login.html";

}


// ======================================
// MOSTRAR DATOS
// ======================================

document.getElementById("nombreUsuario")
.textContent =

usuarioActivo.usuario;


document.getElementById("email")
.textContent =

"📧 " +
usuarioActivo.email;


document.getElementById("telefono")
.textContent =

"📞 " +
usuarioActivo.telefono;


document.getElementById("direccion")
.textContent =

"📍 " +
usuarioActivo.calle +
" #" +
usuarioActivo.numero +
" - " +
usuarioActivo.ciudad;


document.getElementById("rol")
.textContent =

"Rol: " +
usuarioActivo.rol;


// ======================================
// ADMIN
// ======================================

if(usuarioActivo.rol === "admin"){

    document.getElementById("adminBtn")
    .style.display = "block";

}


// ======================================
// LOGOUT
// ======================================

function cerrarSesion(){

    localStorage.removeItem(
        "usuarioActivo"
    );

    window.location.href =
    "../PAGES/login.html";

}