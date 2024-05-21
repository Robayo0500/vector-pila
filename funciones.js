function aleatorio(x) {
  return Math.floor(Math.random() * x);
}

class Nodo {
  constructor(info, ant, sig) {
    this.data = info;
    this.prev = ant;
    this.next = sig;
  }
}

// Definición de la clase ListaDobleCircular
class ListaDobleCircular {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  addHead(info) {
    const newNodo = new Nodo(info, null, null);
    if (!this.head) {
      this.head = newNodo;
      this.tail = newNodo;
      newNodo.next = newNodo;
      newNodo.prev = newNodo;
    } else {
      newNodo.next = this.head;
      newNodo.prev = this.head.prev;
      this.head.prev.next = newNodo;
      this.head.prev = newNodo;
      this.head = newNodo;
    }
    this.size++;
  }

  addTail(info) {
    const newNodo = new Nodo(info, null, null);
    if (!this.head) {
      this.head = newNodo;
      this.tail = newNodo;
      newNodo.next = newNodo;
      newNodo.prev = newNodo;
    } else {
      newNodo.next = this.head;
      newNodo.prev = this.tail;
      this.tail.next = newNodo;
      this.head.prev = newNodo;
      this.tail = newNodo;
    }
    this.size++;
  }

  addAt(info, pos) {
    if (pos <= 0) {
      this.addHead(info);
    } else if (pos >= this.size) {
      this.addTail(info);
    } else {
      let actual = this.head;
      for (let i = 0; i < pos - 1; i++) {
        actual = actual.next;
      }
      const newNodo = new Nodo(info, actual, actual.next);
      actual.next.prev = newNodo;
      actual.next = newNodo;
      this.size++;
    }
  }

  // Método para eliminar el nodo al inicio de la lista
  delHead() {
    if (!this.head) return null;
    else if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head.next.prev = this.tail;
      this.tail.next = this.head.next;
      this.head = this.head.next;
    }
    this.size--;
  }

  // Método para eliminar el nodo al final de la lista
  delTail() {
    if (!this.tail) return null;
    else if (this.size === 1) this.delHead();
    else {
      this.tail.prev.next = this.head;
      this.head.prev = this.tail.prev;
      this.tail = this.tail.prev;
    }
    this.size--;
  }

  // Método para eliminar el nodo en una posición específica de la lista
  delAt(pos) {
    // Verifica si la lista está vacía
    if (!this.head) return null;

    // Avanza al nodo en la posición deseada
    let actual = this.head;
    for (let i = 0; i < pos; i++) actual = actual.next;

    // Actualiza los enlaces para omitir el nodo en la posición deseada
    actual.prev.next = actual.next;
    actual.next.prev = actual.prev;
    // Si se elimina el primer nodo, actualiza la referencia de la cabeza
    if (pos === 0) this.head = actual.next;

    // Reduce el tamaño de la lista
    this.size--;
  }
}
// Instanciación de la lista
var ObLista = new ListaDobleCircular();

// Función para mostrar la lista en el HTML
function mostrar() {
  let k,
    vect,
    tv,
    tmp = "";
  vect = document.getElementById("store");
  let dato = ObLista.head;
  for (k = 0; k < ObLista.size && dato; k++) {
    tmp += "<p>" + k + "[" + dato.data + "]</p>";
    dato = dato.next;
  }
  vect.innerHTML = tmp;
  tv = document.getElementById("Msg0");
  tv.innerHTML = "Tamaño: " + ObLista.size;
}

// Función para agregar un nodo al inicio de la lista
function addInicio() {
  ObLista.addHead(aleatorio(50));
  mostrar();
}

// Función para agregar un nodo en una posición específica de la lista
function addPosicion() {
  let ps = prompt("Ingrese la posición: ");
  ObLista.addAt(aleatorio(50), parseInt(ps));
  mostrar();
}

// Función para agregar un nodo al final de la lista
function addFinal() {
  ObLista.addTail(aleatorio(50));
  mostrar();
}

//este es para eliminar al inicio con lista circular
function delInicio() {
  // Verifica si la lista está vacía
  if (!ObLista.head) return null;
  // Caso especial: si la lista tiene solo un elemento
  else if (ObLista.size === 1) {
    ObLista.head = null;
    ObLista.tail = null;
  } else {
    // Si la lista tiene más de un elemento
    // Actualiza los enlaces para eliminar el primer nodo
    ObLista.head.next.prev = ObLista.tail;
    ObLista.tail.next = ObLista.head.next;
    ObLista.head = ObLista.head.next;
  }
  // Reduce el tamaño de la lista
  ObLista.size--;
  // Muestra la lista actualizada
  mostrar();
}

//este es para eliminar al final con lista circular
function delFinal() {
  // Verifica si la lista está vacía
  if (!ObLista.tail) return null;
  // Caso especial: si la lista tiene solo un elemento
  else if (ObLista.size === 0)
    delHead(); // Llama a la función delHead para eliminar el único nodo
  else {
    // Si la lista tiene más de un elemento
    // Actualiza los enlaces para eliminar el último nodo
    ObLista.tail.prev.next = ObLista.head;
    ObLista.head.prev = ObLista.tail.prev;
    ObLista.tail = ObLista.tail.prev;
  }
  // Reduce el tamaño de la lista
  ObLista.size--;
  // Muestra la lista actualizada
  mostrar();
}
function delPosicion() {
  let p = prompt("Ingrese la posición: ");
  if (p < 0 || p >= ObLista.size) {
    alert("Posición no válida!!");
  } else {
    ObLista.delAt(parseInt(p));
    mostrar();
  }
}

// Función para iniciar la lista
function iniciar() {
  mostrar();
}

// Asignación de eventos onload
window.onload = iniciar;
