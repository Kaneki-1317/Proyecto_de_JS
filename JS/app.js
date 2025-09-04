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
                <button class="btn-carrito" data-id="${producto.id}">Añadir</button>
            `;
        }
    }
})

function mostarCarito(){
    var carrito = document.getElementById("proctCarrito");

    if(carrito.style.display === "block"){
        carrito.style.display = "none";
    }else{
        carrito.style.display = "block";
    }
}

const todosProductos = document.getElementById("todosProductos");
const productCarrito = document.getElementById("proctCarrito")

let productsArray = [];

document.addEventListener("DOMContentLoaded", function(){
    eventListener();
})

function eventListener() {
    todosProductos.addEventListener("click", getDataElements);
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


        const tdImg = document.createElement("td");
        const prodImg = document.createElement("img");
        prodImg.src = img;
        prodImg.alt = "image product";
        tdImg.appendChild(prodImg);

        const tdTitle = document.createElement("td");
        const prodTitle = document.createElement("p");
        prodTitle.textContent = title;
        tdTitle.appendChild(prodTitle);

        const tdPrice = document.createElement("td");
        const prodPrice = document.createElement("p");
        prodPrice.textContent = `$${price.toFixed(2) * quantity}`;
        tdPrice.appendChild(prodPrice);

        const tdQuantity = document.createElement("td");
        const prodQuantity = document.createElement("input");
        prodQuantity.type = "number";
        prodQuantity.min = "1";
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        prodQuantity.oninput = updateQuantity;
        tdQuantity.appendChild(prodQuantity);

        const tdDalete = document.createElement("td");
        const prodDalete = document.createElement("button");
        prodDalete.type = "button";
        prodDalete.textContent = "x";
        prodDalete.onclick = () => borrarProducto(id);
        tdDalete.appendChild(prodDalete);



        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDalete);
        
        productCarrito.appendChild(tr)
        
    })
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
}

function borrarProducto(idProd){
    productsArray = productsArray.filter(prod => prod.id !== idProd);
    showAlert("EL producto fue eliminado correctamente", "success")
    productsHtml();
    upDateCartCount()
    updateTotal()
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