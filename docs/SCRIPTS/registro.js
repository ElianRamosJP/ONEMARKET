// ======================================
// FORMULARIO
// ======================================

const form =
document.getElementById("formRegistro");


// ======================================
// REGISTRO
// ======================================

form.addEventListener("submit", (e) => {

    e.preventDefault();

    // DATOS
    const email =
    document.getElementById("email").value;

    const usuario =
    document.getElementById("username").value;

    const password =
    document.getElementById("password").value;

    const nombre =
    document.getElementById("firstname").value;

    const apellidos =
    document.getElementById("lastname").value;

    const telefono =
    document.getElementById("phone").value;

    const calle =
    document.getElementById("street").value;

    const numero =
    document.getElementById("number").value;

    const ciudad =
    document.getElementById("city").value;

    const zipcode =
    document.getElementById("zipcode").value;


    // TRAER USUARIOS
    let usuarios =
    JSON.parse(
        localStorage.getItem("usuarios")
    ) || [];


    // VALIDAR SI EXISTE
    const existe =
    usuarios.find(user =>

        user.usuario === usuario

    );

    if(existe){

        alert("Ese usuario ya existe");

        return;

    }


    // NUEVO USUARIO
    const nuevoUsuario = {

        usuario,
        email,
        password,
        nombre,
        apellidos,
        telefono,
        calle,
        numero,
        ciudad,
        zipcode,

        // ROL
        rol:
        usuario === "admin"
        ? "admin"
        : "user"

    };


    // GUARDAR
    usuarios.push(nuevoUsuario);

    localStorage.setItem(

        "usuarios",

        JSON.stringify(usuarios)

    );

    alert("Cuenta creada correctamente");


    // REDIRIGIR
    window.location.href =
    "../PAGES/login.html";

});