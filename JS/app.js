const miFormulario = document.getElementById("forms");
const contacto = document.getElementById("contacto");
const nombre = document.getElementById("name");
const mail = document.getElementById("mail");
const passw = document.getElementById("passw");
const bienvenida = document.querySelector(".placer");

miFormulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const datosIng = [
    {
      nom: nombre.value,
      email: mail.value,
      password: passw.value,
    },
  ];
  const [a] = datosIng;
  for (dato in a) {
    sessionStorage.setItem("datos", `${a[dato]}`);
    JSON.stringify(sessionStorage.getItem("datos"));
    let stringNombre = a.nom;
    bienvenida.innerText = `¡Es un placer tenerte aquí ${stringNombre}!`;
  }
  Swal.fire({
    title: "Exito",
    text: "Te has suscripto correctamente",
    icon: "success",
    confirmButtonText: "Genial!",
  });
  contacto.remove();
});

const btn = document.querySelectorAll("#btnAgregar");
const productosMostrados = document.getElementById("compra");
const nombreProducto = document.querySelectorAll(".articulo");
const carrito = document.querySelector("button p");
let contador = 0;
const precios = document.querySelectorAll(".precio");

class Pedido {
  constructor(producto, precio, cantidad) {
    (this.producto = producto),
      (this.precio = precio),
      (this.cantidad = cantidad),
      (this.total = 0);
  }
  calcularTotal() {
    return (this.total = this.precio * this.cantidad);
  }
}
let valorBool = false;
let sumaTotal;
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", (e) => {
    e.preventDefault();
    const articulo = nombreProducto[i].innerText;
    if (btn[i].innerText == "Agregar") {
      btn[i].innerText = "1";
      var contadorItems = 1;
    } else {
      contadorItems = parseInt(btn[i].innerText) + 1;
      btn[i].innerText = contadorItems;
    }
    contador = contador + 1;
    carrito.innerText = `${contador} Carrito`;
    const valor = parseInt(precios[i].innerText.replace("$", ""));

    function nuevoPedido() {
      const paramsPedido = new Pedido(articulo, valor, contadorItems);
      return paramsPedido;
    }
    const pedido = nuevoPedido();
    function agregaCarrito(booleano) {
      const { precio, cantidad } = pedido;
      if (booleano) {
        sumaTotal = sumaTotal + precio;
      } else {
        sumaTotal = cantidad * precio;
        valorBool = true;
      }
    }
    agregaCarrito(valorBool);
    carrito.innerText = `${contador} - $${sumaTotal} `;
  });
}
