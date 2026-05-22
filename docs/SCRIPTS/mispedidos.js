// ======================================
// CONTENEDOR
// ======================================

const contenedor =
document.getElementById(
    "contenedorPedidos"
);


// ======================================
// TRAER PEDIDOS
// ======================================

let pedidos =
JSON.parse(
    localStorage.getItem("pedidos")
) || [];


// ======================================
// MOSTRAR PEDIDOS
// ======================================

function mostrarPedidos(lista){

    contenedor.innerHTML = "";

    // SIN PEDIDOS
    if(lista.length === 0){

        contenedor.innerHTML = `

            <div class="sin-pedidos">

                <h2>
                    No tienes pedidos
                </h2>

                <p>
                    Compra productos para verlos aquí
                </p>

            </div>

        `;

        return;

    }

    // RECORRER
    lista.forEach((pedido,index) => {

        contenedor.innerHTML += `

            <div class="compra-card">

                <div class="compra-header">

                    <h3>

                        Compra ${index + 1}

                    </h3>

                    <span class="estado verde">

                        Completado

                    </span>

                    <span class="total-label">

                        Total

                    </span>

                </div>

                <div class="compra-body">

                    <div class="info">

                        <p>

                            ID:
                            ${pedido.id}

                        </p>

                        <p>

                            Fecha:
                            ${pedido.fecha}

                        </p>

                        <p>

                            Productos:
                            ${pedido.productos.length}

                        </p>

                    </div>

                    <div class="precio">

                        $${pedido.total}

                    </div>

                </div>

            </div>

        `;

    });

}


// ======================================
// FILTRAR FECHAS
// ======================================

function filtrarPedidos(){

    const inicio =
    document.getElementById(
        "fechaInicio"
    ).value;

    const fin =
    document.getElementById(
        "fechaFin"
    ).value;

    // SI NO HAY FECHAS
    if(!inicio || !fin){

        mostrarPedidos(pedidos);

        return;

    }

    const filtrados =
    pedidos.filter(pedido => {

        const fechaPedido =
        new Date(pedido.fecha);

        return(

            fechaPedido >= new Date(inicio)

            &&

            fechaPedido <= new Date(fin)

        );

    });

    mostrarPedidos(filtrados);

}


// ======================================
// INICIAR
// ======================================

mostrarPedidos(pedidos);