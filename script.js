document.addEventListener('DOMContentLoaded', function(){
    const contenedor1 = document.querySelector('.contenedor1');
    const bloque1 = document.querySelector('.bloque1');
    const contenedor2 = document.querySelector('.contenedor2');
    const contenedor3 = document.querySelector('.contenedor3');
    const contenedor4 = document.querySelector('.contenedor4');
    const contenedor5 = document.querySelector('.contenedor5');
    const contenedor6 = document.querySelector('.contenedor6');
    const contenedor7 = document.querySelector('.contenedor7');

    //Funcion para mostrar la fotos 
    const imagen_principal = document.querySelector('.imagen_principal');
    const cerrar = document.querySelector('.cerrar');
    //Funcion para mostrar cantidad del carrito vacio
    const carrito = document.querySelector('.carrito');
    //Funcion para mostrar cantidad de producto
    const boton = document.querySelector('.boton');
    //Funcion para eliminar la compra
    const eliminar = document.querySelector('.eliminar');
    //Funcion para comprar producto
    const checkout = document.querySelector('.checkout');
    //Funcion cambiar imagen principal
    const imagenPrincipal = document.querySelector('.imagen_principal img');
    const subimagenes = document.querySelectorAll('.subimagen img');
    //Funcion cambiar foto principal
    const fotoPrincipal = document.querySelector('.foto_principal img');
    const subfotos = document.querySelectorAll('.subfoto img');  
    //Funcion para avanzar y retroceder foto
    const botonAtras = document.querySelector('.atras');
    const botonAdelante = document.querySelector('.adelante');
    const imagenes = [
        'images/image-product-1.jpg',
        'images/image-product-2.jpg',
        'images/image-product-3.jpg',
        'images/image-product-4.jpg',
    ];
    //Funcion contar la cantidad de productos
    const botonAnterior = document.querySelector('.anterior');
    const botonPosterior = document.querySelector('.posterior');
    const numero = document.querySelector('.numero p');
    const contadorProducto = document.querySelector('.contador p');
    //Funcion operacion para productos
    const cantidadProducto = document.querySelector('.cantidad_producto');
    const precioDescuento = document.querySelector('.precio_descuento');
    const resultado = document.querySelector('.resultado');


    //Crear un media query si es menor a 375px
    const mediaQuery = window.matchMedia("(max-width: 375px)");

    //Botones para el mobil
    const iconoMenu = document.querySelector('.icono_menu');
    const aspaNuevo = document.querySelector('.cerrar_nuevo');

//Funcion para mostrar la fotos 
    const mostrarFotos = function(){
        contenedor2.style.display = "block"
        contenedor3.style.display = "none"
        contenedor4.style.display = "none"
        contenedor5.style.display = "none"
    }

    const cerrarFotos = function(){
        contenedor2.style.display = "none"
    }

    // Asignar los eventos de clic
    imagen_principal.addEventListener("click", mostrarFotos);
    cerrar.addEventListener("click", cerrarFotos);

//Funcion para mostrar cantidad del carrito vacio
    const carritoVacio = function(){
        if(contenedor3.style.display === "block"){
            contenedor3.style.display = "none"
        }else{
            contenedor3.style.display = "block"
        }
    }
    //Asignar los eventos de clic
    carrito.addEventListener("click", carritoVacio);

//Funcion mostrar cantidad de producto
    const mostrarCantidadProducto = function(){
        const cantidad = parseInt(numero.textContent);
        if (cantidad === 0){
            contenedor5.style.display = "none";
        }else{
            contenedor5.style.display = "block";
        }
    };
    //Asignar los eventos de clic
    boton.addEventListener("click", mostrarCantidadProducto);

//Funcion mostrar detalle de compra
    const mostrarDetalleCompra = function(){
        if(contenedor3.style.display === "block" && contenedor4.style.display === "block"){
            contenedor3.style.display = "none"
            contenedor4.style.display = "none"
        }else{
            contenedor3.style.display = "block"
            contenedor4.style.display = "block"
            operacion();
        }
    }
    //Asignar los eventos de clic
    contenedor5.addEventListener("click", mostrarDetalleCompra);

//Funcion eliminar producto
    const eliminarCompra = function(){
        contenedor4.style.display = "none"
        contenedor5.style.display = "none"
    }
    //Asignar los eventos de clic
    eliminar.addEventListener("click", eliminarCompra);

//Funcion compra producto
    const comprarProducto = function(){
        location.reload();
    }
    //Asignar los eventos de clic
    checkout.addEventListener("click", comprarProducto);

//Funcion cambiar foto principal
    subimagenes.forEach((img, index) => {
        img.addEventListener("click", ()=>{
            imagenPrincipal.src = `images/image-product-${index + 1}.jpg`;
            subimagenes.forEach(subImg => subImg.classList.remove('seleccionado1'));
            img.classList.add('seleccionado1');
        });
    });

//Funcion para avanzar, retroceder y seleccionar foto
    let indiceActual = 0;

    const actualizarImagen = () => {
        fotoPrincipal.src = imagenes[indiceActual];
        subfotos.forEach(subImg => subImg.classList.remove('seleccionado1'));
        subfotos.forEach((subImg) => subImg.classList.remove('seleccionado2'));
        subfotos[indiceActual].classList.add('seleccionado2');
    };

    subfotos.forEach((img, index) =>{
        img.addEventListener("click", ()=>{
            indiceActual = index;
            actualizarImagen();
        });
    });

    botonAtras.addEventListener("click", ()=>{
        indiceActual = (indiceActual - 1 + imagenes.length) % imagenes.length;
        actualizarImagen();
    });

    botonAdelante.addEventListener("click", ()=>{
        indiceActual = (indiceActual + 1) % imagenes.length;
        actualizarImagen();
    });

//Funcion contar la cantidad de productos
    let contador = 0;

    const actualizarNumero = ()=>{
        numero.textContent = contador;
        contadorProducto.textContent = contador;
        cantidadProducto.textContent = contador;
    };

    botonAnterior.addEventListener("click", ()=>{
        if(contador > 0){
            contador--;
            actualizarNumero();
        }
    });

    botonPosterior.addEventListener("click", ()=>{
        contador++;
        actualizarNumero();
    });

    actualizarNumero();
//Funcion operacion para productos
    const operacion = function(){
        const cantidad = parseFloat(cantidadProducto.textContent.trim()) || 0;
        const precio = parseFloat(precioDescuento.textContent.replace('$','').trim()) || 0;
        const total = cantidad * precio;
        resultado.textContent = `$${total.toFixed(2)}`;
    };

//PARTE MOBIL
//Funcion para mobil
    mediaQuery.addEventListener("change", function(){
        if(mediaQuery.matches){
            bloque1.style.display = "grid";
            contenedor2.style.display = "block";
            contenedor3.style.display = "none";
            contenedor4.style.display = "none";
            contenedor5.style.display = "none";
            contenedor6.style.display = "none";
            contenedor7.style.display = "none";
            iconoMenu.style.display = "block";
        }else{
            contenedor1.style.display = "block";
            contenedor2.style.display = "none";
            contenedor3.style.display = "none";
            contenedor4.style.display = "none";
            contenedor5.style.display = "none";
            contenedor6.style.display = "none";
            contenedor7.style.display = "none";
            iconoMenu.style.display = "none"
        }
    });

    if(mediaQuery.matches){
        bloque1.style.display = "grid";
        contenedor2.style.display = "block";
        contenedor3.style.display = "none";
        contenedor4.style.display = "none";
        contenedor5.style.display = "none";
        contenedor6.style.display = "none";
        contenedor7.style.display = "none";
        iconoMenu.style.display = "block";
    }else{
        contenedor1.style.display = "block";
        contenedor2.style.display = "none";
        contenedor3.style.display = "none";
        contenedor4.style.display = "none";
        contenedor5.style.display = "none";
        contenedor6.style.display = "none";
        contenedor7.style.display = "none";
        iconoMenu.style.display = "none"
    }

//Funcion para ver menu
    const verMenu = function(){
        contenedor6.style.display = "block";
        contenedor7.style.display = "block";
        iconoMenu.style.display = "none";
        aspaNuevo.style.display = "block";
    }
    iconoMenu.addEventListener("click", verMenu);

    const cerrarMenu = function(){
        contenedor6.style.display = "none";
        contenedor7.style.display = "none";
        iconoMenu.style.display = "block";
        aspaNuevo.style.display = "none";
    }
    aspaNuevo.addEventListener("click", cerrarMenu)

});