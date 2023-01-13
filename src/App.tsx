import './App.css'
// Importamos el Store.
import {useCounterStore} from '../src/store/counterStore'
import shallow from 'zustand/shallow'


function App() {
  
  /**
   * De este modo importaremos los estados, llamando a la 
   * funcion "useCounterStore" que es como hemos llamado a
   * la store en este caso y pasando como parametro state
   * para posteriormente sacar la informacion del estado que
   * estamos buscando, en este caso "count".
   */
  const count = useCounterStore((state) => state.count);
  const title = useCounterStore((state) => state.title);

  /**
   * Como hemos visto anteriormente, del modo en el que
   * declarabamos los estados que posteriormente queriamos
   * mostrar generabamos código repetido. Con lo cual para
   * almacenar distintos estados declarando una única vez
   * la funcion de "useCounterStore" lo haremos del siguiente
   * modo.
   * 
   * Tambien podemos declararlo haciendo destructuring para
   * acceder direcatamente a los datos sin tener que poner
   * previamente el nombre de la constante.estado
   */

  // const {count, title, contador} = useCounterStore((state) => ...)
  const CounterStore = useCounterStore((state) => ({
      // Podríamos renombrar los nombres de las declaraciones ya que aquí lo único 
      // que estamos haciendo es asignarle el valor del estado que queremos a un atributo
      // dentro de un objeto.

      //Ejemplo: (Si ahora en el return ponemos {CounterStore.contador} nos devolvera lo mísmo que {CounterStore.count}).
      contador: state.count,

      // Se pueden renombrar los atributos pero es una buena práctica mantenerlos igual que
      // en el "Store" para favorezer la legibilidad del código
      count: state.count,
      title: state.title,
      posts: state.posts,
  }), shallow)
  // Shallow se define para poder comunicar los valores originales del Store
  // con los que podamos modificamos en este componente.

  /**
   * Otro modo de declarar los estados, en este caso haremos destructuring
   * pero esta vez sin pasarle los parametros a la funcion store "useCounterStore"
   */
  const {increment, multiply, getPostData, clearStore } = useCounterStore();
  
  return (
    <div className="App">
    <h1> {title} </h1>
    <h2> Counter: {CounterStore.contador} </h2> 
    
    {/* Creamos un boton que al hacer click incremente el valor de {state.count} en 2 */}
    <button onClick={() => increment(2)} style={{marginRight: "20px"}}> Suma dos al contador! </button>
    
    {/* Creamos un boton que al hacer click multiplique el valor de {state.count} en 2 */}
    <button onClick={() => multiply(2)} style={{marginRight: "20px"}}> Multiply count x2!</button>
    
    {/* Creamos un boton que al hacer click rellene el estado de Posts y se muestre debajo.*/}
    <button onClick={() => getPostData()} style={{marginRight: "20px"}}> Press the button for fill the array! </button>
    
    {/* Creamos un boton que al hacer click limpie los datos de todos los estados.*/}
    <button onClick={() => clearStore()} style={{backgroundColor: "red", color: "white"}}> ¡Clear data!  </button>

    <hr />

    {JSON.stringify(CounterStore.posts)} {/** Utilizamos el metodo JSON.stringify para pasar el .json a un String y poder mostrarlo */}

    </div>
  )
}

export default App
