//Url del Api
const urlApi = "https://fakestoreapi.com/products"

let dataApi = []; // Aquí guardamos todos los productos originales

//Visualización del api en el html
fetch(urlApi)
.then(response => response.json())
.then(data => {   
    dataApi = data; // Guardamos todos los productos en dataApi
    mostrarProductos(dataApi);
})

function mostrarProductos(productos){
    for (let i = 0; i < productos.length; i++){
        const contenedor = document.getElementById(`producto${i + 1}`)
        const producto = productos[i];

        if(contenedor && producto){
            contenedor.innerHTML = `
                <img class="img-productos" src="${producto.image}">
                <h2 class="title">${producto.title}</h2>
                <p class="precio">$${producto.price}</p>
                <button class="btn-carrito" data-id="${producto.id}">Añadir</button>
            `;
        }
    }
}
function mostarCarito(){
    var carrito = document.getElementById("container-carrito");

    if(carrito.style.display === "block"){
        carrito.style.display = "none";
    }else{
        carrito.style.display = "block";
    }
}

const todosProductos = document.getElementById("todosProductos");
const productCarrito = document.getElementById("proctCarrito");
const buscador = document.getElementById("buscarProducto");

let productsArray = [];

document.addEventListener("DOMContentLoaded", function(){
    eventListener();
})

function eventListener() {
    todosProductos.addEventListener("click", getDataElements);

    const loadProduct = localStorage.getItem("products")
    if(loadProduct) {
        productsArray = JSON.parse(loadProduct);
        productsHtml();
        upDateCartCount();
        updateTotal();
    }else{
        productsArray = [];
    }
}

function upDateCartCount(){
    const conteo = document.getElementById("numeroCarrito");
    conteo.textContent = productsArray.length;
}

function updateTotal(){
    const total = document.getElementById("total")
    let totalProducto = productsArray.reduce((total, prod) => total + (prod.price * prod.quantity), 0);
    total.textContent = `$${totalProducto.toFixed(2)}`
}

function getDataElements(e){
    if (e.target.classList.contains("btn-carrito")){
        const elementHtml = e.target.parentElement;
        selectData(elementHtml);
    }
}

function selectData(prod){
    const productObj = {
        img: prod.querySelector("img").src,
        title: prod.querySelector("h2").textContent,
        price: parseFloat(prod.querySelector("p").textContent.replace("$", "")),
        id: parseInt(prod.querySelector(".btn-carrito").dataset.id, 10),
        quantity: 1
    }

    const exists = productsArray.some(prod => prod.id === productObj.id);

    if(exists){
        showAlert("El producto ya esta en el carrito", "error")
        return
    }

    productsArray = [...productsArray, productObj]
    
    productsHtml();

    showAlert("EL producto fue agregado correctamente", "success")
    upDateCartCount()
    updateTotal()
}

function productsHtml(){
    cleanHtml()
    productsArray.forEach(prod =>{
        const { img, title, price, quantity, id } = prod;
        
        const tr = document.createElement("tr");
        tr.classList.add("tr-produc");


        const tdImg = document.createElement("td");
        const prodImg = document.createElement("img");
        prodImg.src = img;
        prodImg.alt = "image product";
        prodImg.classList.add("img-produc");
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement("td");
        const prodTitle = document.createElement("p");
        prodTitle.textContent = title;
        prodTitle.classList.add("p-title");
        tdTitle.appendChild(prodTitle);

        const tdPrice = document.createElement("td");
        const prodPrice = document.createElement("p");
        prodPrice.textContent = `$${price.toFixed(2) * quantity}`;
        prodPrice.classList.add("p-price");
        tdPrice.appendChild(prodPrice);

        const tdQuantity = document.createElement("td");
        const prodQuantity = document.createElement("input");
        prodQuantity.type = "number";
        prodQuantity.min = "1";
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        prodQuantity.classList.add("quatity-car")
        prodQuantity.oninput = updateQuantity;
        tdQuantity.appendChild(prodQuantity);

        const tdDalete = document.createElement("td");
        const prodDalete = document.createElement("button");
        prodDalete.type = "button";
        prodDalete.textContent = "x";
        prodDalete.classList.add("delete-car")
        prodDalete.onclick = () => borrarProducto(id);
        tdDalete.appendChild(prodDalete);



        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDalete);
        
        productCarrito.appendChild(tr)
        
    })
    saveLocalStorage()
}

function saveLocalStorage(){
    localStorage.setItem("products", JSON.stringify(productsArray));
}

function updateQuantity(e){
    const neeQuantity = parseInt(e.target.value, 10);
    const idProd = parseInt(e.target.dataset.id, 10);

    const product = productsArray.find(prod => prod.id === idProd);
    if(product && neeQuantity > 0){
        product.quantity = neeQuantity;
    }

    productsHtml();
    updateTotal();
    sa
}

function borrarProducto(idProd){
    productsArray = productsArray.filter(prod => prod.id !== idProd);
    showAlert("EL producto fue eliminado correctamente", "success")
    productsHtml();
    upDateCartCount();
    updateTotal();
    saveLocalStorage();
}

function showAlert(mensaje, type){
    const noRepetirAlert = document.querySelector(".alert");
    if(noRepetirAlert) noRepetirAlert.remove();
    const div = document.createElement("div");
    div.classList.add("alert", type)
    div.textContent = mensaje;

    document.body.appendChild(div);

    setTimeout(() => div.remove(), 5000);
}

function cleanHtml(){
    productCarrito.innerHTML = ""
}

document.addEventListener("DOMContentLoaded", function(){
    eventListener();

    const btnBorrarTodo = document.getElementById("btn-borrar-todo");
    if(btnBorrarTodo){
        btnBorrarTodo.addEventListener("click", borrarTodo);
    }
});

function borrarTodo(){
    if(productsArray.length === 0){
        showAlert("No hay productos en el carrito", "error");
        return;
    }

    productsArray = [];
    productsHtml();
    upDateCartCount();
    updateTotal();
    saveLocalStorage();
    showAlert("Se borró todo el carrito correctamente", "success");
}

buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const filtrados = dataApi.filter(prod => 
        prod.title.toLowerCase().includes(texto)
    );

    // Limpiar todos los contenedores antes de mostrar
    for(let i = 1; i <= 20; i++){
        const contenedor = document.getElementById(`producto${i}`);
        if(contenedor) contenedor.innerHTML = "";
    }

    mostrarProductos(filtrados);
});

const filtroCategoria = document.getElementById("filtroCategoria");

filtroCategoria.addEventListener("change", () => {
    const categoria = filtroCategoria.value;

    let filtrados;
    if(categoria === "all"){
        filtrados = dataApi; // todas
    } else {
        filtrados = dataApi.filter(prod => prod.category === categoria);
    }

    // limpiar contenedores antes de renderizar
    for(let i = 1; i <= 20; i++){
        const contenedor = document.getElementById(`producto${i}`);
        if(contenedor) contenedor.innerHTML = "";
    }

    mostrarProductos(filtrados);
});