const gridContainer = document.querySelector(".grid-container");
const COLUMNS = 6;
const ROWS = 6;

// for (let i = 0; i < ROWS; i++) {
//   for (let j = 0; j < COLUMNS; j++) {
//     const gridItem = document.createElement("div");
//     gridItem.classList.add("grid-item");
//     gridContainer.appendChild(gridItem);
//   }
// }

const mapArray = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
];

function drawMap(mapArray) {
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[i].length; j++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      gridContainer.appendChild(gridItem);
      if (mapArray[i][j] === 0) {
        gridItem.classList.add("sky");
      } else if (mapArray[i][j] === 1) {
        gridItem.classList.add("grass");
      }
    }
  }
}

drawMap(mapArray);
