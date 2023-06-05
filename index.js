/**
 * @param {number} value - The value to be stored in the node
 * @return {Node} - The newly created node
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

let root = null; //Variable for storing the initial root of the tree

/**
 * Add a new node to the tree with the value given by the user
 * @return {void} - It doesn't return anything
 *
 */
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

/**
 *
 * @param {*} root
 * @param {*} value
 * @returns {Node} - The root of the tree after insertion
 */
const insertNode = (root, value) => {
  if (root === null) {
    //If the root is null, we create a new node with the given value and assign it as the root
    root = new Node(value);
  } else {
    if (value === root.value) {
      alert("El valor ya existe en el árbol");
      return root;
    }
    if (value < root.value) {
      // if the value is less than the root value, we insert it in the left subtree
      root.left = insertNode(root.left, value);
    } else {
      root.right = insertNode(root.right, value);
    }
  }
  return root;
};

/**
 * Remove a node from the tree with the value given by the user
 * @returns {void} - It doesn't return anything
 */
const deleteNode = () => {
  const deleteValue = parseInt(document.getElementById("delete-node").value);
  if (isNaN(deleteValue)) {
    alert("Ingrese un valor numerico");
    return; // Exit the function
  }
  root = deleteFromTree(root, deleteValue);
  drawTree();
};

/**
 *
 * @param {*} root
 * @param {*} value
 * @returns {Node} - The root of the tree after deletion
 */
const deleteFromTree = (root, value) => {
  if (root === null) {
    return root;
  }
  if (value < root.value) {
    root.left = deleteFromTree(root.left, value);
  } else if (value > root.value) {
    root.right = deleteFromTree(root.right, value);
  } else {
    if (root.left === null && root.right === null) {
      return null;
    } else if (root.left === null) {
      return root.right;
    } else if (root.right === null) {
      return root.left;
    }
    const predecessor = findMaxValue(root.left);
    root.value = predecessor.value;
    root.left = deleteFromTree(root.left, predecessor.value);
  }
  return root;
};

/**
 *
 * @param {*} node
 * @returns - The node with the maximum value in the tree
 */
const findMaxValue = (node) => {
  while (node.right !== null) {
    node = node.right;
  }
  return node;
};

/**
 *
 * @param {*} node
 * @param {*} value
 * @returns - The node with the value given by the user
 */
const search = (node, value) => {
  if (node === null) {
    return null;
  }
  if (node.value === value) {
    return node;
  }
  if (value < node.value) {
    return search(node.left, value);
  } else {
    return search(node.right, value);
  }
};

/**
 * @param {*} - It doesn't receive any parameter
 * @returns {void} - It doesn't return anything
 * @description - Search the node with the value given by the user
 */
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

/**
 *
 * @param {*} highlightNode
 * @returns - It doesn't return anything
 * @description - Draw the tree in the canvas
 */
const drawTree = (highlightNode = null) => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  if (root === null) {
    return;
  }

  const radius = 15;
  const levelHeight = 150;
  //Contador for the number of nodes in the tree (used to organize the drawing of the lines)
  let contador = 0;

  //Recursive function to calculate the positions of the nodes and draw them in the canvas
  const drawNode = (node, x, y, highlight = false) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if (highlight) {
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

    //console.log(contador);
    //console.log(levelHeight);
    if (node.left) {
      contador++;
      let leftX, leftY;
      if (contador > 1) {
        // Set the length of the connection line if counter > 1
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
      let rightX = x + levelHeight / 4;
      let rightY = y + levelHeight / 2;
      connectNodes(x, y + radius, rightX, rightY - radius);
      drawNode(node.right, rightX, rightY, highlightNode === node.right);
    }
  };

  drawNode(root, canvas.width / 2, 30, highlightNode === root); // Draw the root node centered at the top of the canvas
  function connectNodes(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
};

/**
 * @param {*} - It doesn't receive any parameter
 * @returns {void} - It doesn't return anything
 * @description - Clean the canvas and the tree and input values
 */
const clearTree = () => {
  let labelAddNode = document.getElementById("search-value");
  let labelSearchNode = document.getElementById("value-node");
  let labelDeleteNode = document.getElementById("delete-node");
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  root = null; // Reset the root of the tree to null
  labelAddNode.value = "";
  labelSearchNode.value = "";
  labelDeleteNode.value = "";
};
