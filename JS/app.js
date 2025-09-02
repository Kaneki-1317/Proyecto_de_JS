//Url del Api
const urlApi = "https://fakestoreapi.com/products"

//Visualización del api en el html
fetch(urlApi)
.then(response => response.json())
.then(data => {
    const contenedor = document.getElementById("productos")
    const producto = data[0];
    contenedor.innerHTML =`
        <h2>${producto.title}</h2>
        <p>${producto.description}</p>
        <p><b>Precio:</b> $${producto.price}</p>
        <img src="${producto.image}" class="producto-imagen">
    `

    //esta forma se puede hacer multiplicar esto 20 veces pero no es optimizado.
})