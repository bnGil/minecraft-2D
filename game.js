import mapArray from "./maps.js";
const grid = document.querySelector(".grid");
const tools = Array.from(document.getElementsByClassName("tool-container"));
const storage = Array.from(document.getElementsByClassName("storage-item"));

drawMap(mapArray);

function drawMap(mapArray) {
  for (let i = 0; i < mapArray.length; i++) {
    for (let j = 0; j < mapArray[i].length; j++) {
      createNewMaterial(mapArray[i][j]);
    }
  }
}

function createNewMaterial(num) {
  const gridItem = document.createElement("div");
  const materialName = getMaterialNameByNum(num);
  gridItem.classList.add("grid-item");
  gridItem.classList.add(materialName);
  gridItem.setAttribute("data-material", materialName);
  gridItem.setAttribute("data-activate-material", "false");
  grid.appendChild(gridItem);
  gridItem.addEventListener("click", (e) => clickOnMaterial(e.target));
}

function getMaterialNameByNum(num) {
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

tools.forEach((tool) => {
  tool.addEventListener("click", (e) => {
    activateTool(e.target);
    activateMaterial(e.target);
  });
});

function activateTool(toolDiv) {
  deActivateAllTools();
  deActivateAllStorages();
  toolDiv.dataset.activateTool = "true";
}

function activateMaterial(toolDiv) {
  const allMaterials = [...grid.children];
  allMaterials.forEach((material) => {
    if (toolDiv.dataset.material.includes(material.dataset.material)) {
      material.dataset.activateMaterial = "true";
    } else {
      material.dataset.activateMaterial = "false";
    }
  });
}

function clickOnMaterial(material) {
  if (anyToolIsSelected()) {
    pickupMaterial(material);
  } else if (anyStorageIsSelected()) {
    addMaterialToMap(material);
  }
}

function anyToolIsSelected() {
  return tools.some((tool) => tool.dataset.activateTool === "true");
}

function anyStorageIsSelected() {
  return storage.some((storage) => storage.dataset.activeStorage === "true");
}

// function clickOnMaterial(material) {
//   if (material.dataset.activateMaterial === "false") {
//     tools.forEach((tool) => wrongTool(tool));
//     return;
//   } else {
//     pickupMaterial(material);
//   }
// }

function pickupMaterial(material) {
  if (material.dataset.activateMaterial === "false") {
    tools.forEach((tool) => wrongTool(tool));
  } else {
    const materialName = material.dataset.material;
    material.classList.remove(materialName);
    material.classList.add("sky");
    material.dataset.material = "sky";
    addToStorage(materialName);
  }
}

function wrongTool(tool) {
  if (tool.dataset.activateTool === "false") {
    return;
  } else {
    // make it red for two seconds
  }
}

function addToStorage(materialStr) {
  storage.forEach((matStorage) => {
    if (matStorage.children[0].dataset.material === materialStr) {
      const newAmount = Number(matStorage.children[0].innerHTML) + 1;
      matStorage.children[0].innerHTML = newAmount.toString();
    }
  });
}

storage.forEach((materialStorage) => {
  materialStorage.addEventListener("click", (e) => {
    activateMaterialStorage(e.target);
  });
});

function activateMaterialStorage(materialStorage) {
  deActivateAllTools();
  deActivateAllStorages();
  materialStorage.dataset.activeStorage = "true";
  // activateSkyOnly();
}

function deActivateAllTools() {
  tools.forEach((tool) => (tool.dataset.activateTool = "false"));
}

function deActivateAllStorages() {
  storage.forEach((matStorage) => (matStorage.dataset.activeStorage = "false"));
}

function addMaterialToMap(material) {
  if (material.dataset.material === "sky") {
    const matStorage = storage.find(
      (ele) => ele.dataset.activeStorage === "true"
    );
    const materialName = matStorage.children[0].dataset.material;
    const currAmout = Number(matStorage.children[0].innerHTML);
    if (currAmout > 0) {
      material.classList.remove("sky");
      material.classList.add(materialName);
      material.dataset.material = materialName;
      removeFromStorage(matStorage);
    }
  }
}

function removeFromStorage(matStorage) {
  const newAmount = Number(matStorage.children[0].innerHTML) - 1;
  matStorage.children[0].innerHTML = newAmount.toString();
}
