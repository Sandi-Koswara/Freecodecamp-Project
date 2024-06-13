// JavaScript for convert decimal to roman
const convertButton = document.getElementById("convert-btn");
const output = document.getElementById("output");

const convertToRoman = (num) => {
  const ref = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  const res = [];

  ref.forEach(function (arr) {
    while (num >= arr[1]) {
      res.push(arr[0]);
      num -= arr[1];
    }
  });

  return res.join("");
};

const checkUserInput = (str, int) => {
  let errText = "";

  if (!str || str.match(/[e.]/g)) {
    errText = "Please enter a valid number";
  } else if (int < 1) {
    errText = "Please enter a number greater than or equal to 1";
  } else if (int > 3999) {
    errText = "Please enter a number less than or equal to 3999";
  } else {
    return true;
  }

  output.innerText = errText;

  return false;
};

convertButton.addEventListener("click", () => {
  convert();
});

const convert = () => {
  const numStr = document.getElementById("number").value;
  const int = parseInt(numStr, 10);

  if (checkUserInput(numStr, int)) {
    output.innerText = convertToRoman(int);
  }
};

// JavaScript for making the container draggable
const container = document.getElementById("moving-div-container");
const dragableArea = document.getElementById("dragable-area");

function dragElement(container) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  if (dragableArea) {
    // If present, the header is where you move the DIV from:
    dragableArea.addEventListener("mousedown", dragMouseDown);
  } else {
    // Otherwise, move the DIV from anywhere inside the DIV:
    container.addEventListener("mousedown", dragMouseDown);
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // Get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.addEventListener("mouseup", closeDragElement);
    // Call a function whenever the cursor moves:
    document.addEventListener("mousemove", elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    // Calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // Set the element's new position:
    container.style.top = container.offsetTop - pos2 + "px";
    container.style.left = container.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    /* Stop moving when mouse button is released:*/
    document.removeEventListener("mouseup", closeDragElement);
    document.removeEventListener("mousemove", elementDrag);
  }
}

dragElement(container);
