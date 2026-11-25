import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlEOIVpm_LoqGJGK3SJc-Qn58dNkG5NP0",
  authDomain: "hotel-puya-raimondii-2.firebaseapp.com",
  databaseURL: "https://hotel-puya-raimondii-2-default-rtdb.firebaseio.com",
  projectId: "hotel-puya-raimondii-2",
  storageBucket: "hotel-puya-raimondii-2.firebasestorage.app",
  messagingSenderId: "573116001918",
  appId: "1:573116001918:web:ca922ad19e37a5f264722f",
  measurementId: "G-C8W10BQ6GP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Inicializamos la app de firebase
const app = initializeApp(firebaseConfig);
//Inicializamos la base de datos
const db = getDatabase(app);

//Seleccionamos los elementos del DOM donde mostraremos los datos
//y donde agregaremos nuevos datos
//Primero los  iunput para agregar nuevos clientes
let inputNombre = document.querySelector("#nombre");
let inputApellido = document.querySelector("#apellido");
let inputDni = document.querySelector("#dni");
let inputbuscar = document.querySelector("#buscar");
let inputfechas = document.querySelector("#Fechas");
let p = document.querySelector("p");
//y el boton
let btnAgregar = document.querySelector("#agregar");
let btnBuscar = document.querySelector("#btnbuscar");


btnAgregar.onclick = function () {
    //Creamos una referencia a la ubicación "clientes" en la base de datos
    //Y con el dni como clave unica
    //Esto asegura que cada estudiante se almacene bajo su dni
    let clientesRef = ref(db, 'cliente/' + inputDni.value);

    //Usamos la función "set" para escribir los datos del nuevo estudiante en la base de datos
    //Le indicamos donde almacenar los datos y qué datos almacenar

    set(clientesRef, {
        //Tomamos cada dato desde los inputs del formulario
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        DNI: 49481697,
        fechas: inputfechas.value
    })

        //Agregamos algunas alertas para indicar que los datos se han agregado correctamente
        //o si hubo un error al agregar los datos
        //Usamos la función "then" para manejar el caso exitoso
        .then(() => {
            alert("Estudiante agregado correctamente");
        })
        //Usamos la función "catch" para manejar errores
        .catch((error) => {
            alert("Error al agregar estudiante: " + error.message);
        }); 

}

btnBuscar.onclick = function(){
    let eclientesRef = ref(db, 'clientes/');
    onValue(clientesRef, (datos) => {
        console.log(datos)
        //Obtenemos la información de los clientes
        let clientes = datos.val();
        //Limpiamos la lista antes de actualizarla
        p.textContent = ''
        //Recorremos los datos obtenidos de los clientes
        for (let dni in clientes) {
        if (inputbuscar.value == dni) {
            p.textContent = 'Usuario encontrado: '+ clientes[dni].nombre
        }
            
        }
    
    })
}