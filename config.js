//Configurables
let tools = ["Path", "Remove"];
let gridWidth = 12; //Actual grid width is gridWdith - 2
let gridHeight = 16; //Actual grid height is gridHeight - 2

//Do Not mess with these variables -- will break the code
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
    constructor(id, paved, water, perimeter) {
        this.id = id;
        this.paved = paved;
        this.water = water;
        this.perimeter = perimeter;
    }
}