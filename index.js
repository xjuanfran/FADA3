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

// Delete operation
const deleteNode = () => {
  let value = parseInt(document.getElementById("value-node").value);
  if (!isNaN(value)) {
    root = deleteFromTree(root, value);
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

// Delete operation
const deleteFromTree = (root, value) => {
  if (root === null) {
    return root;
  }
  if (value < root.value) {
    root.left = deleteFromTree(root.left, value);
  } else if (value > root.value) {
    root.right = deleteFromTree(root.right, value);
  } else {
    if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }
    root.value = findMinValue(root.right);
    root.right = deleteFromTree(root.right, root.value);
  }
  return root;
};

const drawTree = () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

  if (root === null) {
    return;
  }

  const radius = 15;
  const levelHeight = 150;
  let contador=0;


  // Función recursiva para calcular las posiciones de los nodos y dibujarlos en el canvas
  const drawNode = (node, x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
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
      drawNode(node.left, leftX, leftY);
    }


    if (node.right) {
      let rightX = x + levelHeight;
      let rightY = y + levelHeight;
      connectNodes(x, y + radius, rightX, rightY - radius);
      drawNode(node.right, rightX, rightY);
    }
  };

  drawNode(root, canvas.width / 2, 30); // Dibujar el nodo raíz centrado en la parte superior del canvas

  function connectNodes(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};

