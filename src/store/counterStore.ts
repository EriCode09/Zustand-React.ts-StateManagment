// 1. Importamos el metodo create para crear el primer Store
import create from "zustand";

/**
 * Creamos el tipado de todos los datos que contendra
 * el array de los "Posts".
 */
interface Post {
    id: number,
    title: string,
    body: string,
}

/**
 * 3.Creamos una interfaz para tipar todos los datos que añadiremos
 * en el Store y así aprovechar el potencial de TS
 */
interface CounterState {
    count : number,   
    title : string, 
    posts : Post[],
    increment: (value: number) => void,
    multiply: (value: number) => void,
    getPostData:  () => Promise<void>,
    clearStore: () => void,
}

/**
 * 2. Esta sera nuestro Store, donde alamacenaremos todos los datos,
 * funciones o objetos que queramos exportar a otros componentes
 * por eso mismo al declarar la constante tambien la exportamos 
 * al mismo tiempo.
 * 
 * 3. Además le pasamos la intefaz mediante <> al declarar el metodo
 * create, para poder aplicar el tipado de todos los datos que
 * almacenaremos en nuestro store
 * 
 * La funcion Create, aparte de todo lo mencionado nos ofrece dos
 * parámetros get & set, que nos permiten tanto obtener el valor
 * de uno de nuestros datos con get, como asignar un nuevo valor 
 * con set.
 */
export const useCounterStore = create<CounterState>((set, get) => ({
    count: 10,
    title: 'Contador hecho con Zustand',
    posts: [],
    // Declaramos una funcion le pasamos los parámetros y le asignamos 
    // la funcion que deseémos (get o set) cada una para sus respectivos usos.
    increment: (value: number) => set(state => ({
        count: state.count + value
    })),

    multiply: (value: number) => {
        const {count} = get();  // Utilizamos el método get() y haciendo destructuring cogemos el estado de count
        set({count : count * value}) // y con el metodo de set() decimos que al estado count: le vamos a asignar el valor de count * value.
    },

    getPostData: async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        const posts = await response.json();
        set((state => ({
            ...state, // Actualizamos todo el estado
            // posts, <- Eso ya valdria para asignarle al estado posts el valor posts.
            posts  // Pero de este modo me es mucho más legible.
        })));
    },
    /**
     *  Funcion dedicada a borrar todos los estados.Dato a tener en cuenta para 
     *  posibles funcionalidades como eliminar todos los productos de un carrito
     *  de compra, o simplmenete para borrar los datos que tenemos asignados a un estado.
     *  En este caso al poner el {} decimos que elimine TODOS los estados.
     */
    clearStore: () => {
        set({}, true)
    }

}))