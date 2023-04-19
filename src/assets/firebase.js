import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, getDocs, getDoc, updateDoc, collection, doc, deleteDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDJAZ6538pFqUTKUw03iGy7isnb2YP1Abk",
    authDomain: "proyecto-final-53b17.firebaseapp.com",
    projectId: "proyecto-final-53b17",
    storageBucket: "proyecto-final-53b17.appspot.com",
    messagingSenderId: "1053195591626",
    appId: "1:1053195591626:web:24e6a500d0d28c1a253933"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore()
const cargarBDD = async () => {
    const promise = await fetch('./json/productos.json')
    const productos = await promise.json()
    productos.forEach(async (prod) => {
        await addDoc(collection(db, "productos"), {
            nombre: prod.nombre,
            idCategoria: prod.idCategoria,
            stock: prod.stock,
            precio: prod.precio,
            img: prod.img,
        })
    })
}

const getProductos = async () => {
    const productos = await getDocs(collection(db, "productos"))
    const items = productos.docs.map(prod => {
        return {...prod.data(), id: prod.id }
    })
    return items
}

const getProducto = async (id) => {
    const producto = await getDoc(doc(db, "productos",id))
    const item = {...producto.data(), id: producto.id}
    return item
}

const updateProducto = async (id, info) => {
    const estado = await updateDoc(doc(db, "productos", id), info)
    return estado
}

const deteleProducto = async(id) => {
    const estado = await deleteDoc(doc(db, "productos", id))
    return estado
}

const createOrdenCompra = async (cliente, precioTotal, fecha) => {
    const ordenCompra = await addDoc(collection(db, "ordenCompra"),{
        nombreCompleto: cliente.nombre,
        email: cliente.email,
        dni: cliente.dni,
        direccion: cliente.direccion,
        celular: cliente.celular,
        fecha: fecha,
        precioTotal: precioTotal,
    })
    return ordenCompra
}

const getOrdenCompra = async (id) => {
    const ordenCompra = await getDoc(doc(db, "ordenCompra",id))
    const item = {...ordenCompra.data(), id: ordenCompra.id}
    return item
}


export {cargarBDD, getProductos, getProducto, updateProducto, deteleProducto, createOrdenCompra, getOrdenCompra}