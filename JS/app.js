//Url del Api
const urlApi = "https://fakestoreapi.com/products"

//Visualización del api en el html
fetch(urlApi)
.then(response => response.json())
.then(data => {
    for (let i = 0; i <= 20; i++){
        const contenedor = document.getElementById(`producto${i + 1}`)
        const producto = data[i];

        if(contenedor && producto){
            contenedor.innerHTML = `
                <img class="img-productos" src="${producto.image}">
                <h2 class="title">${producto.title}</h2>
                <p class="precio">$${producto.price}</p>
                <button>Añadir</button>
            `;
        }
    }
})

function mostarCarito(){
    var carrito = document.getElementsByClassName("carrito")[0];

    if(carrito.style.visibility == "hidden"){
        carrito.style.visibility = "visible";
    }else{
        carrito.style.visibility = "hidden";
    }
}