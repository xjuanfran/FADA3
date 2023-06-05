// Lógica JavaScript para construir el árbol y manejar la interactividad
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root = null; // Variable para almacenar la raíz inicial del árbol

const addNode = () => {
  let value = parseInt(document.getElementById("value-node").value);
  if (!isNaN(value)) {
    root = insertNode(root, value);
    // console.log("Nodo agregado:", value);
    // console.log("Árbol actual:", root);
    drawTree();
  } else {
    alert("Ingrese un valor numerico");
  }
};

const insertNode = (root, value) => {
  if (root === null) {
    // Si la raíz es nula, creamos un nuevo nodo con el valor dado y lo asignamos como la raíz
    root = new Node(value);
  } else {
    if (value === root.value) {
      alert("El valor ya existe en el árbol");
      return root;
    }
    if (value < root.value) {
      // Si el valor es menor que el valor de la raíz, lo insertamos en el subárbol izquierdo
      root.left = insertNode(root.left, value);
    } else {
      // Si el valor es mayor o igual que el valor de la raíz, lo insertamos en el subárbol derecho
      root.right = insertNode(root.right, value);
    }
  }
  return root;
};

const search = (node, value) => {
  if (node.value === value || node === null) {
    return node;
  }
  if (value < node.value) {
    return search(node.left, value);
  } else {
    return search(node.right, value);
  }
};

const searchNode = () => {
  let value = parseInt(document.getElementById("search-value").value);
  let node = search(root, value);
  if (node === null) {
    alert("El valor no existe en el árbol");
  } else {
    alert(`El valor existe en el árbol en el nodo con valor: ${node.value}`);
    drawTree(node);
  }
};

const drawTree = (highlightNode = null) => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

  if (root === null) {
    return;
  }

  const radius = 15;
  const levelHeight = 150;
  let contador = 0;

  // Función recursiva para calcular las posiciones de los nodos y dibujarlos en el canvas
  const drawNode = (node, x, y, highlight = false) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if(highlight) {
      ctx.fillStyle = "red";
    } else {
      ctx.fillStyle = "white";
      ctx.stroke();
    }
    ctx.fill();

    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    ctx.fillText(node.value, x, y);

    console.log(contador);
    //console.log(levelHeight);

    if (node.left) {
      contador++;
      let leftX, leftY;

      if (contador > 1) {
        // Ajustar la longitud de la línea de conexión si contador > 1
        leftX = x - levelHeight / 4;
        leftY = y + levelHeight / 2;
      } else {
        leftX = x - levelHeight;
        leftY = y + levelHeight;
      }

      connectNodes(x, y + radius, leftX, leftY - radius);
      drawNode(node.left, leftX, leftY, highlightNode === node.left);
    }

    if (node.right) {
      let rightX = x + levelHeight;
      let rightY = y + levelHeight;
      connectNodes(x, y + radius, rightX, rightY - radius);
      drawNode(node.right, rightX, rightY, highlightNode === node.right);
    }
  };

  drawNode(root, canvas.width / 2, 30, highlightNode === root); // Dibujar el nodo raíz centrado en la parte superior del canvas

  function connectNodes(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};

const clearTree = () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  root = null; // Restablecer la raíz del árbol a null
};
