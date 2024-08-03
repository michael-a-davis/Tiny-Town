const townGrid = document.getElementById('townGrid');
let tileStates = [];
let gridWidth = 9;
let gridHeight = 12;
let totalTiles = (gridWidth * gridHeight);
let gridWidthId = gridWidth - 1;
let totalTileId = totalTiles - 1;
townGrid.style.gridTemplateColumns = `repeat(${gridWidth}, 1fr)`;
townGrid.style.gridTemplateRows = `repeat(${gridHeight}, 1fr)`;

class TileState {
    constructor(id, paved, perimeter) {
        this.id = id;
        this.paved = paved;
        this.perimeter = perimeter;
    }
}

//This loop builds the grid of tiles
for (i = 0; i < totalTiles; i++) {
    //Creates DOM element and pushes new tile state
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.id = i;
    tileStates.push(new TileState(i, false, null));

    //Series of if statements to detect perimeter
    if (tile.id < gridWidth) {
        tileStates[i].perimeter = "top";
    }
    if (tile.id % gridWidth == 0 ) {
        tileStates[i].perimeter = "left";
    }
    if (tile.id % gridWidth == gridWidthId) {
        tileStates[i].perimeter = "right";
    }
    if (tile.id > totalTileId - gridWidthId) {
        tileStates[i].perimeter ="bottom"
    }
    if (tile.id == 0) {
        tileStates[i].perimeter = "top left corner";
    }
    if (tile.id == gridWidthId) {
        tileStates[i].perimeter = "top right corner";
    }
    if (tile.id == totalTileId - gridWidthId) {
        tileStates[i].perimeter = "bottom left corner";
    }
    if (tile.id == totalTileId) {
        tileStates[i].perimeter = "bottom right corner";
    }

    //Adds event listeners
    tile.addEventListener('click', function(){
        AdjustTile(tile.id)
    });

    //Appends tile to the DOM
    townGrid.appendChild(tile);
}


function AdjustTile(x) {
    let id = Number(x);

    //Toggle paved state
    if (!tileStates[id].paved) {
        tileStates[id].paved = true;
    } else {
        tileStates[id].paved = false;
    }

    //Iterates through each tile and updates them
    for (i = 0; i < tileStates.length; i++) {
        const tile = document.getElementById(i);
        //Set unpaved tiles as grass
        if (!tileStates[i].paved) {
            tile.style.backgroundImage = "url(assets/grass.png)";
            continue;
        }

        let above = i - gridWidth;
        let right = i + 1;
        let below = i + gridWidth;
        let left = i - 1;

        //If tiles is surrounded by pavement, make it a cross
        if (tileStates[above].paved &&
            tileStates[below].paved &&
            tileStates[right].paved &&
            tileStates[left].paved) {
            tile.style.backgroundImage = "url(assets/path-cross.png)";
        }
        
        //Up Right Down
        else if (tileStates[above].paved && tileStates[right].paved && tileStates[below].paved) {
            tile.style.backgroundImage = "url(assets/path-URD.png)";
        }

        //Up Left Down
        else if (tileStates[above].paved && tileStates[left].paved && tileStates[below].paved) {
            tile.style.backgroundImage = "url(assets/path-ULD.png)";
        } 
        
        //Left Right Down
        else if (tileStates[left].paved && tileStates[right].paved && tileStates[below].paved) {
            tile.style.backgroundImage = "url(assets/path-LDR.png)";
        }

        //Left Right Up
        else if (tileStates[left].paved && tileStates[right].paved && tileStates[above].paved) {
            tile.style.backgroundImage = "url(assets/path-LUR.png)";
        }

        //Up Left
        else if (tileStates[above].paved && tileStates[left].paved) {
            tile.style.backgroundImage = "url(assets/path-leftup.png)";
        }

        //Up Right
        else if (tileStates[above].paved && tileStates[right].paved) {
            tile.style.backgroundImage = "url(assets/path-upright.png)";
        }

        //Down Left
        else if (tileStates[below].paved && tileStates[left].paved) {
            tile.style.backgroundImage = "url(assets/path-downleft.png)";
        }

        //Down Right
        else if (tileStates[below].paved && tileStates[right].paved) {
            tile.style.backgroundImage = "url(assets/path-rightdown.png)";
        }

        //Up Down
        else if (tileStates[above].paved && tileStates[below].paved) {
            tile.style.backgroundImage = "url(assets/path-updown.png)";
        }

        //Left Right
        else if (tileStates[left].paved && tileStates[right].paved) {
            tile.style.backgroundImage = "url(assets/path-leftright.png)";
        }

        //Up only
        else if (tileStates[above].paved) {
            tile.style.backgroundImage = "url(assets/path-uponly.png)";
        }

        //Down only
        else if (tileStates[below].paved) {
            tile.style.backgroundImage = "url(assets/path-downonly.png)";
        }

        //Right Only
        else if (tileStates[right].paved) {
            tile.style.backgroundImage = "url(assets/path-rightonly.png)";
        }

        //Left only
        else if (tileStates[left].paved) {
            tile.style.backgroundImage = "url(assets/path-leftonly.png)";
        }
        //Alone
        else {
            tile.style.backgroundImage = "url(assets/path-alone.png)";
        }
        
    }
}