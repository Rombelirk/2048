


class GameController {

    constructor(gameField) {
        this.gameField = gameField;
        this.tiles = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];
        this.init();
    }

    redrawGameField() {
        this.gameField.innerHTML = "";
        this.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex)=> {
                var tileDomNode = document.createElement("div");
                tileDomNode.className = "tile" + " " + "color" + tile;
                if (tile !== 0) {
                    tileDomNode.innerHTML = tile;
                }
                this.gameField.appendChild(tileDomNode);
            })
        })
    }

    init() {
        this.addListeners()
        this.placeTwoOnRandomeTile()
        this.redrawGameField()
       
    }

    addListeners() {
        const that = this;
        document.addEventListener("keydown", e => {
            if (e.keyCode === 37) {
                that.move("left")
            }
            if (e.keyCode === 38) {
                that.move("up")
            }
            if (e.keyCode === 39) {
                that.move("right")
            }
            if (e.keyCode === 40) {
                that.move("down")
            }
        })

        
    }

    placeTwoOnRandomeTile() {
        var freeTiles = [];
        this.tiles.forEach((row, rowIndex) => {
            row.forEach((tile, tileIndex) => {
                if (tile === 0) {
                    freeTiles.push({rowIndex, tileIndex})
                } 
            })
           
        });

        if (freeTiles.length === 0) return;

        const random = freeTiles[Math.floor(Math.random()*freeTiles.length)];
        this.tiles[random.rowIndex][random.tileIndex] = 2;
    }

    move(direction) {
    
        if (direction === "right") {
           for (var i = 3; i>=0; i--) {
              var changeMade = true;
              var mergedCells = [];
               while (changeMade) {

                changeMade = false;
                    for (var j = 3; j>=0; j--) {
                        if (this.tiles[i][j] === 0 && this.tiles[i][j - 1] && this.tiles[i][j - 1] !== 0) {
                        this.tiles[i][j] = this.tiles[i][j - 1];
                        this.tiles[i][j - 1] = 0;
                        changeMade = true;
                        } else if (!mergedCells.includes(j) && !mergedCells.includes(j-1) && this.tiles[i][j] !== 0 && this.tiles[i][j - 1] && this.tiles[i][j - 1] === this.tiles[i][j]) {
                        this.tiles[i][j] *= 2;
                        this.tiles[i][j - 1] = 0;
                        mergedCells.push(j);
                        changeMade = true;
                        } 
                    }
                }
            }
        }

        if (direction === "left") {
           
                for (var i = 0; i<4; i++) {
                   var changeMade = true;
                   var mergedCells = [];
                    while (changeMade) {
     
                     changeMade = false;
                         for (var j = 0; j<4; j++) {
                             if (this.tiles[i][j] === 0 && this.tiles[i][j + 1] && this.tiles[i][j + 1] !== 0) {
                             this.tiles[i][j] = this.tiles[i][j + 1];
                             this.tiles[i][j + 1] = 0;
                             changeMade = true;
                             } else if (!mergedCells.includes(j) && !mergedCells.includes(j+1) && this.tiles[i][j] !== 0 && this.tiles[i][j + 1] && this.tiles[i][j + 1] === this.tiles[i][j]) {
                             this.tiles[i][j] *= 2;
                             this.tiles[i][j + 1] = 0;
                             mergedCells.push(j);
                             changeMade = true;
                             } 
                         }
                     }
                 }
            
        }

        if (direction === "down") {
            for (var i = 3; i>=0; i--) {
                var changeMade = true;
                var mergedCells = [];
                while (changeMade) {
                    changeMade = false;
                    for (var j = 3; j>=0; j--) {
                        if (this.tiles[j][i] === 0 && this.tiles[j-1] && this.tiles[j-1][i] && this.tiles[j-1][i] !== 0) {
                            this.tiles[j][i] = this.tiles[j-1][i];
                            this.tiles[j-1][i] = 0;
                            changeMade = true;
                            } else if (!mergedCells.includes(j) && !mergedCells.includes(j-1) && this.tiles[j][i] !== 0 && this.tiles[j-1] && this.tiles[j-1][i] && this.tiles[j-1][i] === this.tiles[j][i]) {
                            this.tiles[j][i] *= 2;
                            this.tiles[j-1][i] = 0;
                            mergedCells.push(j);
                            changeMade = true;
                            } 
                
                    }
                }
                
            }
        }

        if (direction === "up") {
            for (var i = 0; i<4; i++) {
                var changeMade = true;
                var mergedCells = [];
                while (changeMade) {
                    changeMade = false;
                    for (var j = 0; j<4; j++) {
                        if (this.tiles[j][i] === 0 && this.tiles[j+1] && this.tiles[j+1][i] && this.tiles[j+1][i] !== 0) {
                            this.tiles[j][i] = this.tiles[j+1][i];
                            this.tiles[j+1][i] = 0;
                            changeMade = true;
                            } else if (!mergedCells.includes(j) && !mergedCells.includes(j+1) && this.tiles[j][i] !== 0 && this.tiles[j+1] && this.tiles[j+1][i] && this.tiles[j+1][i] === this.tiles[j][i]) {
                            this.tiles[j][i] *= 2;
                            this.tiles[j+1][i] = 0;
                            mergedCells.push(j);
                            changeMade = true;
                            } 
                
                    }
                }
                
            }
        }

        this.placeTwoOnRandomeTile();
        this.redrawGameField();
        
    }


}

var game = new GameController(document.querySelector(".game-field"))