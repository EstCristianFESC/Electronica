let seleCompuerta = null;
// Función para seleccionar compuerta
function seleccionarCompuerta() {
    document.querySelectorAll('.compuertas button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                seleCompuerta = null;
            } else {
                document.querySelectorAll('.compuertas button').forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                seleCompuerta = this.getAttribute('dataCompuertas');
            }
        });
    });
}

let seleEntrada = null;
// Función para seleccionar número de entradas
function seleccionarEntradas() {
    document.querySelectorAll('.entradas button').forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                seleEntrada = null;
            } else {
                document.querySelectorAll('.entradas button').forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
                seleEntrada = parseInt(this.getAttribute('dataEntradas'));
            }
        });
    });
}

// Función para generar la tabla de verdad
function generarTablaDeVerdad() {
    // Verificar si se ha seleccionado una compuerta y el número de entradas
    if (!seleCompuerta && !seleEntrada) {
        alert("Por favor selecciona una compuerta lógica y el número de entradas.");
        return;
    }

	if (!seleCompuerta) {
        alert("Por favor selecciona una compuerta lógica.");
        return;
    }

    if (!seleEntrada) {
        alert("Por favor selecciona el número de entradas.");
        return;
    }

    // Limpiar la tabla existente
    const tabla = document.getElementById('tablaVerdad');
    tabla.innerHTML = "";

    // Crear la cabecera de la tabla
    const filaEncabezado = document.createElement('tr');
    for (let i = 0; i < seleEntrada; i++) {
        const th = document.createElement('th');
        th.textContent = `E${i + 1}`;
        filaEncabezado.appendChild(th);
    }
    const salidaTh = document.createElement('th');
    salidaTh.textContent = "Salida";
    filaEncabezado.appendChild(salidaTh);
    tabla.appendChild(filaEncabezado);

    // Generar las combinaciones de entradas
    const combinaciones = generarCombinacionesEntradas();

    // Crear filas de la tabla y calcular la salida
    combinaciones.forEach(entradas => {
        const fila = document.createElement('tr');
        // Añadir las entradas a la fila
        entradas.forEach(input => {
            const td = document.createElement('td');
            td.textContent = input;
            fila.appendChild(td);
        });

        // Calcular la salida de la compuerta
        const salida = calcularSalidaCompuerta(entradas);

        // Añadir la salida a la fila
        const salidaTd = document.createElement('td');
        salidaTd.textContent = salida;
        fila.appendChild(salidaTd);

        // Añadir la fila a la tabla
        tabla.appendChild(fila);
    });

    // Actualizar la imagen de la compuerta
    actualizarImagenCompuerta();
}

// Función para actualizar la imagen de la compuerta
function actualizarImagenCompuerta() {
    const imagenCompuerta = document.getElementById('imagenCompuerta');
    const rutaImagenes = `Imagenes/Entradas/${seleCompuerta.toLowerCase()}-${seleEntrada}.svg`;
    imagenCompuerta.src = rutaImagenes;
    imagenCompuerta.alt = `Compuerta ${seleCompuerta} con ${seleEntrada} entradas`;
    imagenCompuerta.style.display = "block";
}

// Función para generar combinaciones de entradas
function generarCombinacionesEntradas() {
    const totalfilas = Math.pow(2, seleEntrada);
    const combinaciones = [];

    for (let i = 0; i < totalfilas; i++) {
        const entradas = [];
        for (let j = seleEntrada - 1; j >= 0; j--) {
            const valorEntradas = (i >> j) & 1;
            entradas.push(valorEntradas);
        }
        combinaciones.push(entradas);
    }

    return combinaciones;
}

// Función para calcular la salida de la compuerta
function calcularSalidaCompuerta(entradas) {
    let salida;
    switch (seleCompuerta) {
        case 'AND':
            salida = entradas.reduce((acc, val) => acc && val, 1);
            break;
        case 'OR':
            salida = entradas.reduce((acc, val) => acc || val, 0);
            break;
        case 'NOR':
            salida = !entradas.reduce((acc, val) => acc || val, 0);
            break;
        case 'NAND':
            salida = !entradas.reduce((acc, val) => acc && val, 1);
            break;
        default:
            salida = "Error";
    }
    return salida ? 1 : 0;
}

// Iniciar las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    seleccionarCompuerta();
    seleccionarEntradas();
});