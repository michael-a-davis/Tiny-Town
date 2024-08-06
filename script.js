//Initializes variables
let tools = ["Path", "Tree", "Remove"];
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
    constructor(id, paved, tree, perimeter) {
        this.id = id;
        this.paved = paved;
        this.tree = tree;
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
    tiles.push(new Tile(i, false, false, false));

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
                }
                break;
            case "Tree":
                if (!tiles[id].tree) {
                    tiles[id].tree = true;
                    tiles[id].paved = false;
                }
                break;
            case "Remove":
                if (tiles[id].paved || tiles[id].tree) {
                    tiles[id].tree = false;
                    tiles[id].paved = false;
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
            if (!tiles[i].paved && !tiles[i].tree) {
                tile.src = "assets/grass.png";
                continue;
            }

            //Set trees
            if (tiles[i].tree) {
                tile.src = "assets/tree.png";
                console.log(tiles[i].tree);
                continue;
            }

            //Find and assess neighbor tiles to generate state array
            let neighborIds = [
                i - 1, //Left
                i - gridWidth, //Above
                i + 1, //Right
                i + gridWidth, //Below
            ]
            let neighborStates = [];
            for (j = 0; j < neighborIds.length; j++) {
                if (tiles[neighborIds[j]].paved) {
                    neighborStates.push(1);
                }
                else {
                    neighborStates.push(0);
                }
            }
            let stateArray = neighborStates.toString();

            //Set paths
            if (tiles[i].paved) {
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
                }
            //Update paths        
        }        
    }
}