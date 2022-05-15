const producto = document.getElementsByClassName("producto");
var element = document.getElementById("product");
var ribbon = document.getElementById("ribbo");

let carrito = {
  id: "default",
  img: "deefault",
  des: "default",
  precio: 0.0,
  cantidad: 0,
};
let precioTotal = 0;
let compraImg;
let compraDes;

function anadirCarrito(id, img, des, precio, cantidad) {
  carrito.id = id;
  carrito.img = img;
  carrito.des = des;
  carrito.precio = parseFloat(precio);
  carrito.cantidad = parseInt(cantidad);
}

for (var i = 0; i < producto.length; i++) {
  document.getElementsByClassName("producto")[i].onclick = function () {
    this.classList.add("border");

    this.firstElementChild.classList.add("ribbon", "uil-check");
    // ribbon.classList.add('ribbon', 'uil-check')
    this.dataset.cantidad++;
    anadirCarrito(
      this.dataset.idproducto,
      this.dataset.img,
      this.dataset.des,
      this.dataset.precio,
      this.dataset.cantidad
    );
    precioTotal = precioTotal + carrito.precio;

    document.getElementById("precioTotal").innerHTML =
      "Total: B/." + precioTotal.toFixed(2);
    if (this.dataset.cantidad <= 1) {
      var compra = document.createElement("div");
      compra.setAttribute("id", carrito.id);
      document.getElementById("carritoDeCompras").appendChild(compra);
      agregarElementos(this.dataset.cantidad);
    } else {
      agregarElementos();
    }
  };
}

function actualizador() {
  padre = document.createElement("div");
  padre.setAttribute("class", "pay");

  compraImg = document.createElement("img");
  compraImg.setAttribute("src", carrito.img);
  document.getElementById(carrito.id).appendChild(compraImg);
  compraImg.style.display = "none";

  compraDes = document.createElement("button");
  padre.appendChild(compraDes);
  compraDes.setAttribute("class", "mas");
  compraDes.setAttribute("id", "mas" + carrito.id);
  compraDes.setAttribute("onclick", "sumar(this.id)");
  compraDes.innerHTML = "+";
  document.getElementById(carrito.id).appendChild(compraDes);

  compraDes = document.createElement("p");
  compraDes.setAttribute("class", "cantidad");
  compraDes.innerHTML = carrito.cantidad;
  document.getElementById(carrito.id).appendChild(compraDes);

  compraDes = document.createElement("button");
  compraDes.setAttribute("class", "menos");
  compraDes.setAttribute("id", "menos" + carrito.id);
  compraDes.setAttribute("onclick", "restar(this.id)");
  compraDes.innerHTML = "-";
  document.getElementById(carrito.id).appendChild(compraDes);

  compraDes = document.createElement("p");
  compraDes.setAttribute("class", "cantidad");
  compraDes.innerHTML = "Cantidad: ";
  document.getElementById(carrito.id).appendChild(compraDes);

  compraDes = document.createElement("h2");
  compraDes.innerHTML = "Producto: " + carrito.id;
  document.getElementById(carrito.id).appendChild(compraDes);

  compraDes = document.createElement("p");
  compraDes.innerHTML = carrito.des;
  document.getElementById(carrito.id).appendChild(compraDes);

  compraDes = document.createElement("h3");
  compraDes.innerHTML = "Precio: " + carrito.precio;
  document.getElementById(carrito.id).appendChild(compraDes);
}

function agregarElementos() {
  if (carrito.cantidad != 1) {
    for (i = 0; i < 8; i++) {
      document
        .getElementById(carrito.id)
        .removeChild(document.getElementById(carrito.id).childNodes[0]);
    }
  }
  actualizador();
}

function eliminarElementos() {
  if (carrito.cantidad == 0) {
    document
      .getElementById("carritoDeCompras")
      .removeChild(document.getElementById(carrito.id));
  } else {
    for (i = 0; i < 8; i++) {
      document
        .getElementById(carrito.id)
        .removeChild(document.getElementById(carrito.id).childNodes[0]);
    }
    actualizador();
  }
}

function sumar(idBoton) {
  for (var j = 0; j < document.getElementsByClassName("producto").length; j++) {
    if (
      document.getElementById(idBoton).parentNode.id ==
      document.getElementsByClassName("producto")[j].dataset.idproducto
    ) {
      break;
    }
  }
  var nuevaData = document.getElementsByClassName("producto")[j].dataset;
  nuevaData.cantidad++;
  anadirCarrito(
    nuevaData.idproducto,
    nuevaData.img,
    nuevaData.des,
    nuevaData.precio,
    nuevaData.cantidad
  );
  agregarElementos(carrito.cantidad);
  precioTotal = precioTotal + carrito.precio;

  document.getElementById("precioTotal").innerHTML =
    "Total: B/." + precioTotal.toFixed(2);
}

function restar(idBoton) {
  for (var j = 0; j < document.getElementsByClassName("producto").length; j++) {
    if (
      document.getElementById(idBoton).parentNode.id ==
      document.getElementsByClassName("producto")[j].dataset.idproducto
    ) {
      break;
    }
  }
  var nuevaData = document.getElementsByClassName("producto")[j].dataset;
  nuevaData.cantidad--;

  anadirCarrito(
    nuevaData.idproducto,
    nuevaData.img,
    nuevaData.des,
    nuevaData.precio,
    nuevaData.cantidad
  );
  eliminarElementos(carrito.cantidad);
  precioTotal = precioTotal - carrito.precio;

  document.getElementById("precioTotal").innerHTML =
    "Total: B/." + precioTotal.toFixed(2);
}
