// ======================================
// FORM LOGIN
// ======================================

const loginForm =
document.getElementById("loginForm");


// ======================================
// LOGIN
// ======================================

loginForm.addEventListener("submit", (e) => {

    e.preventDefault();

    // DATOS
    const usuario =
    document.getElementById("usuario").value;

    const password =
    document.getElementById("password").value;


    // TRAER USUARIOS
    let usuarios =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];


    // BUSCAR USUARIO
    const usuarioEncontrado =
    usuarios.find(user =>

        user.usuario === usuario &&
        user.password === password

    );


    // VALIDAR
    if(!usuarioEncontrado){

        alert(
            "Usuario o contraseña incorrectos"
        );

        return;

    }


    // ======================================
    // GUARDAR SESION
    // ======================================

    localStorage.setItem(

        "usuarioActivo",

        JSON.stringify(usuarioEncontrado)

    );


    // DEBUG
    console.log(
        "USUARIO GUARDADO:",
        usuarioEncontrado
    );


    alert(
        "Bienvenido " +
        usuarioEncontrado.usuario
    );


    // ADMIN
    if(usuarioEncontrado.rol === "admin"){

        window.location.href =
        "../PAGES/admin.html";

    }

    // USER
    else{

        window.location.href =
        "../PAGES/perfil.html";

    }

});