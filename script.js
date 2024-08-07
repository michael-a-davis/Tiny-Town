//Initializes variables
let tools = ["Path", "Tree", "Water", "Remove"];
let gridWidth = 10; //Visible grid width is gridWdith - 2
let gridHeight = 14; //Visible grid height is gridHeight - 2
let currentTool = "Path";
let tiles = [];
let gridSize = gridWidth * gridHeight;
let gridWidthId = gridWidth - 1;
let lastTileId = gridSize - 1;
const toolBox = document.getElementById('toolBox');
const townGrid = document.getElementById('townGrid');
townGrid.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
townGrid.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;

//Tile class
class Tile {
    constructor(id, paved, tree, water, perimeter) {
        this.id = id;
        this.paved = paved;
        this.tree = tree;
        this.water = water;
        this.perimeter = perimeter;
    }
}

//Generates the Tool Box elements
for (i = 0; i < tools.length; i++) {
    const toolGroup = document.createElement('div');
    toolGroup.classList.add('tool-group');
    const toolButton = document.createElement('input');
    toolButton.classList.add('radio-buttons');
    toolButton.type = "radio";
    toolButton.name = "tool";
    toolButton.value = tools[i];

    if (i == 0) {
        toolButton.checked = true;
    }

    toolButton.addEventListener("click", function() {
        currentTool = toolButton.value;
        console.log(currentTool);
    })

    const toolLegend = document.createElement('legend');
    toolLegend.innerHTML = tools[i];
    toolGroup.append(toolButton, toolLegend);
    toolBox.append(toolGroup);
}

//This loop builds the grid of tiles
for (i = 0; i < gridSize; i++) {
    //Creates DOM element and pushes new tile state
    const tile = document.createElement('img');
    tile.classList.add('tile');
    tile.id = i;
    tile.src = "assets/grass.png"
    tiles.push(new Tile(i, false, false, false, false));

    //Series of conditions to detect perimeter
    if (tile.id < gridWidth ||
        tile.id % gridWidth == 0 ||
        tile.id % gridWidth == gridWidthId ||
        tile.id > lastTileId - gridWidthId ||
        tile.id == 0 ||
        tile.id == gridWidthId ||
        tile.id == lastTileId - gridWidthId ||
        tile.id == lastTileId) {
        tiles[i].perimeter = true;
    }

    //Hides perimeter tiles, otherwise add event listener
    if (tiles[i].perimeter) {
        tiles[i].paved = true;
        tiles[i].water = true;
        tile.classList.add('hidden');
    } else {
        tile.addEventListener('click', function(){
            UseTool(tile.id);
        });
    }

    //Appends tile to the DOM
    townGrid.appendChild(tile);
}

//UseTool applies a state to a clicked tile dependent on current tool
function UseTool(id) {
    if (!tiles[id].perimeter)
        switch(currentTool) {
            case "Path":
                if (!tiles[id].paved) {
                    tiles[id].tree = false;
                    tiles[id].paved = true;
                    tiles[id].water = false;
                }
                break;
            case "Tree":
                if (!tiles[id].tree) {
                    tiles[id].tree = true;
                    tiles[id].paved = false;
                    tiles[id].water = false;
                }
                break;
            case "Water":
                if (!tiles[id].water) {
                    tiles[id].tree = false;
                    tiles[id].paved = false;
                    tiles[id].water = true;
                }
                break;
            case "Remove":
                if (tiles[id].paved || tiles[id].tree || tiles[id].water) {
                    tiles[id].tree = false;
                    tiles[id].paved = false;
                    tiles[id].water = false;
                }
                break;
        }
        console.log(tiles[id]);
        UpdateTiles();
}

//This function iterates through each tile and updates them
function UpdateTiles() {
    for (i = 0; i < tiles.length; i++) {
        const tile = document.getElementById(i);

        if (!tiles[i].perimeter) {
            //Set grass
            if (!tiles[i].paved && !tiles[i].tree && !tiles[i].water) {
                tile.src = "assets/grass.png";
                continue;
            }

            //Set trees
            if (tiles[i].tree) {
                tile.src = "assets/tree.png";
                console.log(tiles[i].tree);
                continue;
            }

            //Set paths
            if (tiles[i].paved) {
                let stateArray = AssessNeighbors("Path", i);
                switch(stateArray) {
                    case "0,0,0,0":
                        tile.src = "assets/path/alone.png";
                        break;
                    case "0,0,0,1":
                        tile.src = "assets/path/D.png";
                        break;
                    case "0,0,1,0":
                        tile.src = "assets/path/R.png";
                        break;
                    case "0,0,1,1":
                        tile.src = "assets/path/RD.png";
                        break;
                    case "0,1,0,0":
                        tile.src = "assets/path/U.png";
                        break;
                    case "0,1,0,1":
                        tile.src = "assets/path/UD.png";
                        break;
                    case "0,1,1,0":
                        tile.src = "assets/path/UR.png";
                        break;
                    case "0,1,1,1":
                        tile.src = "assets/path/URD.png";
                        break;
                    case "1,0,0,0":
                        tile.src = "assets/path/L.png";
                        break;
                    case "1,0,0,1":
                        tile.src = "assets/path/LD.png";
                        break;
                    case "1,0,1,0":
                        tile.src = "assets/path/LR.png";
                        break;
                    case "1,0,1,1":
                        tile.src = "assets/path/LRD.png";
                        break;
                    case "1,1,0,0":
                        tile.src = "assets/path/LU.png";
                        break;
                    case "1,1,0,1":
                        tile.src = "assets/path/LUD.png";
                        break;
                    case "1,1,1,0":
                        tile.src = "assets/path/LUR.png";
                        break;
                    case "1,1,1,1":
                        tile.src = "assets/path/cross.png";
                        break;
                }
                continue;
            }
                
                //Set Water
                if (tiles[i].water) {
                    let stateArray = AssessNeighbors("Water", i);
                    switch(stateArray) {
                        case "0,0,0,0":
                            tile.src = "assets/water/alone.png";
                            break;
                        case "0,0,0,1":
                            tile.src = "assets/water/D.png";
                            break;
                        case "0,0,1,0":
                            tile.src = "assets/water/R.png";
                            break;
                        case "0,0,1,1":
                            tile.src = "assets/water/RD.png";
                            break;
                        case "0,1,0,0":
                            tile.src = "assets/water/U.png";
                            break;
                        case "0,1,0,1":
                            tile.src = "assets/water/UD.png";
                            break;
                        case "0,1,1,0":
                            tile.src = "assets/water/UR.png";
                            break;
                        case "0,1,1,1":
                            tile.src = "assets/water/URD.png";
                            break;
                        case "1,0,0,0":
                            tile.src = "assets/water/L.png";
                            break;
                        case "1,0,0,1":
                            tile.src = "assets/water/LD.png";
                            break;
                        case "1,0,1,0":
                            tile.src = "assets/water/LR.png";
                            break;
                        case "1,0,1,1":
                            tile.src = "assets/water/LRD.png";
                            break;
                        case "1,1,0,0":
                            tile.src = "assets/water/LU.png";
                            break;
                        case "1,1,0,1":
                            tile.src = "assets/water/LUD.png";
                            break;
                        case "1,1,1,0":
                            tile.src = "assets/water/LUR.png";
                            break;
                        case "1,1,1,1":
                            tile.src = "assets/water/cross.png";
                            break;
                }
            } 
        }        
    }
}

function AssessNeighbors(tool, i) {
    let neighborIds = [
        i - 1, //Left
        i - gridWidth, //Above
        i + 1, //Right
        i + gridWidth, //Below
    ]
    let neighborStates = [];

    switch(tool) {
        case "Path":
            for (j = 0; j < neighborIds.length; j++) {
                if (tiles[neighborIds[j]].paved) {
                    neighborStates.push(1);
                }
                else {
                    neighborStates.push(0);
                }
            }
            return neighborStates.toString();
        case "Water":
            for (j = 0; j < neighborIds.length; j++) {
                if (tiles[neighborIds[j]].water) {
                    neighborStates.push(1);
                }
                else {
                    neighborStates.push(0);
                }
            }
            return neighborStates.toString();
    }
}