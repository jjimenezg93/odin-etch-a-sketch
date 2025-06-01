const boardSize = 1024;
const minGridSize = 8;
const maxGridSize = 100;

let gridSize = 16;
let gridElement = document.querySelector("#grid");
gridElement.style.maxWidth = `${boardSize}px`;
gridElement.style.maxHeight = `${boardSize}px`;

function resetGrid() {
  let gridSizeRaw = prompt(
    `Please enter grid size (${minGridSize}-${maxGridSize})`,
    8
  );

  if (gridSizeRaw < minGridSize || gridSizeRaw > maxGridSize) {
    alert(
      `Invalid grid size ${gridSizeRaw}. Please use a grid size between ${minGridSize} and ${maxGridSize}`
    );
    return;
  }

  if (gridSizeRaw != gridSize) {
    gridSize = gridSizeRaw;
    buildGrid();
  } else {
    clearGrid();
  }
}

function clearGrid() {
  let cells = document.querySelectorAll("li");
  for (const cell of cells) {
    cell.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
  }
}

function buildGrid() {
  while (gridElement.firstChild) {
    gridElement.firstChild.remove();
  }

  // total pixels / # of cells per row / half padding - 2 border pixels
  const cellSideSize = boardSize / gridSize / 2 - 2;

  for (let colIdx = 0; colIdx < gridSize; ++colIdx) {
    let row = document.createElement("ul");
    for (let rowIdx = 0; rowIdx < gridSize; rowIdx++) {
      let cell = document.createElement("li");
      cell.style.padding = `${cellSideSize}px`;
      cell.style.backgroundColor = "rgba(255, 255, 255, 1.0)";
      cell.classList.add("grid-cell");
      cell.addEventListener("mouseenter", onCellHovered.bind(null, cell));
      row.append(cell);
    }
    gridElement.append(row);
  }
}

function getRandomColor() {
  const max = 255;
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Matches both rgb(...) and rgba(...) values
const reRGB = /rgba?\((\d*), (\d*), (\d*)(?:, )?((\d*\.\d+)|\d+)?\)/;

function onCellHovered(cell) {
  let match = reRGB.exec(cell.style.backgroundColor);
  let prevAlpha;
  if (match && match[4]) {
    prevAlpha = parseFloat(match[4]);
  } else {
    prevAlpha = 1.0;
  }
  alpha = Math.max(0.0, Math.min(1.0, prevAlpha - 0.1));

  // Apply updated color
  cell.style.backgroundColor = `rgba(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()}, ${alpha})`;
}

buildGrid();
