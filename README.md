# ✨REM - Red Eye Model💫

# 🛒 FakeStore Shop

Aplicación web que consume productos de la [Fake Store API](https://fakestoreapi.com/products), los muestra dinámicamente en el DOM y permite al usuario interactuar con un **carrito de compras** con persistencia en `localStorage`.  

Incluye funcionalidades de **búsqueda, filtros y ordenamiento**, así como un diseño responsivo y amigable para diferentes dispositivos.

---

## 🚀 Funcionalidades
### **Consumo de API**  
- Los productos se obtienen con `fetch()` desde la Fake Store API.  
- Manejo correcto de asincronía con `async/await` y promesas.

### **DOM Dinámico**  
- Renderizado de productos en tarjetas con imagen, nombre, precio y categoría.  
- Botón para agregar productos al carrito.  

### **Carrito de Compras**  
- Almacena productos seleccionados en un objeto JS.  
- Calcula y muestra el total.  
- Permite eliminar productos.  
- Persistencia en `localStorage` (el carrito se conserva al recargar la página).    

### **Eventos implementados**  
- `click`: agregar/quitar productos del carrito.  
- `change`: aplicar filtros y ordenamiento.    

### **Diseño Responsivo**  
- Adaptación a escritorio, tablet y móvil.  
- Grid flexible y tarjetas adaptables.  

##  Estructura del visual Studio Code
    📂 PROYECTO JS
    ┣ 📂 css
    ┃ ┗ pagina 1.css
    ┣ 📂 HTML
    ┃ ┗📂html secundarios
    ┃ ┃ ┣ accesorios.hmtl
    ┃ ┃ ┣ hombre.html
    ┃ ┃ ┣ mujer.html
    ┃ ┃ ┗ tecnologia.hmtl
    ┃ ┗ Pagina Principal.html
    ┣ 📂 img
    ┃  ┣ accesorios card.jpg
    ┃  ┣ hombre card.jpg
    ┃  ┣ mujer card2.jpg
    ┃  ┗ tecnologia card.jpg
    ┣ 📂 js
    ┃  ┗ app.js
    ┗ README.md

## Link del diseño en canva
### https://www.canva.com/design/DAGxGPCurgw/hKaS0E4P-Gu8IipdbNEY2A/edit?utm_content=DAGxGPCurgw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton