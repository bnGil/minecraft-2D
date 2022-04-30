import mapArray from "./maps.js";
const grid = document.querySelector(".grid");
const tools = Array.from(document.getElementsByClassName("tool-container"));
const storage = Array.from(document.getElementsByClassName("storage-item"));
const reset = document.getElementById("reset-btn");

const map = mapArray[Math.floor(Math.random() * mapArray.length)];
drawMap(map);

reset.addEventListener("click", (e) => document.location.reload());

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
  toolDiv.dataset.toolActive = "true";
}

function activateMaterial(toolDiv) {
  const allMaterials = [...grid.children];
  allMaterials.forEach((material) => {
    if (toolDiv.dataset.material.includes(material.dataset.material)) {
      material.dataset.materialActive = "true";
    } else {
      material.dataset.materialActive = "false";
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
  return tools.some((tool) => tool.dataset.toolActive === "true");
}

function anyStorageIsSelected() {
  return storage.some((storage) => storage.dataset.storageActive === "true");
}

function pickupMaterial(material) {
  if (material.dataset.materialActive === "false") {
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
  if (tool.dataset.toolActive === "false") {
    return;
  } else {
    tool.classList.add("error");
    setTimeout(() => tool.classList.remove("error"), 1000);
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
  materialStorage.dataset.storageActive = "true";
}

function deActivateAllTools() {
  tools.forEach((tool) => (tool.dataset.toolActive = "false"));
}

function deActivateAllStorages() {
  storage.forEach((matStorage) => (matStorage.dataset.storageActive = "false"));
}

function addMaterialToMap(material) {
  if (material.dataset.material === "sky") {
    const matStorage = storage.find(
      (ele) => ele.dataset.storageActive === "true"
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
