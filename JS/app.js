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
    var carrito = document.getElementsByClassName("carrito")[0];

    if(carrito.style.visibility == "visible"){
        carrito.style.visibility = "hidden";
    }else{
        carrito.style.visibility = "visible";
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

    productsArray = [...productsArray, productObj]

    productsHtml();
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
        prodPrice.textContent = `$${price.toFixed(2)}`;
        tdPrice.appendChild(prodPrice);

        const tdQuantity = document.createElement("td");
        const prodQuantity = document.createElement("input");
        prodQuantity.type = "number";
        prodQuantity.min = "1";
        prodQuantity.value = quantity;
        prodQuantity.dataset.id = id;
        tdQuantity.appendChild(prodQuantity)

        const tdDalete = document.createElement("td");
        const prodDalete = document.createElement("button");
        prodDalete.type = "button";
        prodDalete.textContent = "x";
        tdDalete.appendChild(prodDalete);



        tr.append(tdImg, tdTitle, tdPrice, tdQuantity, tdDalete);
        
        productCarrito.appendChild(tr)
        
    })
}

function cleanHtml(){
    productCarrito.innerHTML = ""
}