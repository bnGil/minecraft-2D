const grid = document.querySelector(".grid");
import mapArray from "./maps.js";

drawMap(mapArray);

function drawMap(mapArray) {
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[i].length; j++) {
      const gridItem = document.createElement("div");
      gridItem.classList.add("grid-item");
      grid.appendChild(gridItem);
      gridItem.classList.add(classByNum(mapArray[i][j]));
    }
  }
}

function classByNum(num) {
  switch (num) {
    case 0:
      return "sky";
    case 1:
      return "grass";
    case 2:
      return "dirt";
    case 3:
      return "cloud";
    case 4:
      return "log";
    case 5:
      return "leaf";
    case 6:
      return "stone";
  }
}
