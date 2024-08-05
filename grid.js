//This loop builds the grid of tiles
for (i = 0; i < gridSize; i++) {
    //Creates DOM element and pushes new tile state
    const tile = document.createElement('img');
    tile.classList.add('tile');
    tile.id = i;
    tile.src = "/assets/grass.png"
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
        UpdateTiles(tile.id);
        });
    }

    //Appends tile to the DOM
    townGrid.appendChild(tile);
}

//This function is called whenever a tile is changed
function UpdateTiles(x) {
    let id = Number(x);

    //Iterates through each tile and updates them
    for (i = 0; i < tiles.length; i++) {
        const tile = document.getElementById(i);

        // Find adjacent tiles
        let upLeft = (i - gridWidth) - 1;
        let above = i - gridWidth;
        let upRight = (i - gridWidth) + 1;
        let right = i + 1;
        let downRight = (i + gridWidth) + 1;
        let below = i + gridWidth;
        let downLeft = (i + gridWidth) - 1;
        let left = i - 1;

        if (!tiles[i].perimeter) {
            switch(currentTool) {
                case "Path":
                    //Set tile state
                    if (!tiles[id].paved) {
                        tiles[id].water = false;
                        tiles[id].paved = true;
                    }
                    //Set grass
                    if (!tiles[i].paved && !tiles[i].water) {
                        tile.src = "assets/grass.png";
                        continue;
                    }
                    //All directions
                    if (tiles[above].paved && tiles[below].paved && tiles[right].paved && tiles[left].paved) {
                        tile.src = "assets/path-cross.png";
                    }
                    //Up Right Down
                    else if (tiles[above].paved && tiles[right].paved && tiles[below].paved) {
                        tile.src = "assets/path-URD.png";
                    }
                    //Up Left Down
                    else if (tiles[above].paved && tiles[left].paved && tiles[below].paved) {
                        tile.src = "assets/path-ULD.png";
                    } 
                    //Left Right Down
                    else if (tiles[left].paved && tiles[right].paved && tiles[below].paved) {
                        tile.src = "assets/path-LDR.png";
                    }
                    //Left Right Up
                    else if (tiles[left].paved && tiles[right].paved && tiles[above].paved) {
                        tile.src = "assets/path-LUR.png";
                    }
                    //Up Left
                    else if (tiles[above].paved && tiles[left].paved) {
                        tile.src = "assets/path-leftup.png";
                    }
                    //Up Right
                    else if (tiles[above].paved && tiles[right].paved) {
                        tile.src = "assets/path-upright.png";
                    }
                    //Down Left
                    else if (tiles[below].paved && tiles[left].paved) {
                        tile.src = "assets/path-downleft.png";
                    }
                    //Down Right
                    else if (tiles[below].paved && tiles[right].paved) {
                        tile.src = "assets/path-rightdown.png";
                    }
                    //Up Down
                    else if (tiles[above].paved && tiles[below].paved) {
                        tile.src = "assets/path-updown.png";
                    }
                    //Left Right
                    else if (tiles[left].paved && tiles[right].paved) {
                        tile.src = "assets/path-leftright.png";
                    }
                    //Up only
                    else if (tiles[above].paved) {
                        tile.src = "assets/path-uponly.png";
                    }
                    //Down only
                    else if (tiles[below].paved) {
                        tile.src = "assets/path-downonly.png";
                    }
                    //Right Only
                    else if (tiles[right].paved) {
                        tile.src = "assets/path-rightonly.png";
                    }
                    //Left only
                    else if (tiles[left].paved) {
                        tile.src = "assets/path-leftonly.png";
                    }
                    //Alone
                    else {
                        tile.src = "assets/path-alone.png";
                    }
                    break;
                case "Remove":
                    //Set tile state
                    if (tiles[id].paved || tiles[id].water) {
                        tiles[id].water = false;
                        tiles[id].paved = false;
                    }
                    //Set grass
                    if (!tiles[i].paved && !tiles[i].water) {
                        tile.src = "assets/grass.png";
                        continue;
                    }
            }             
        }  
    }
}