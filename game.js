const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animations");
const ghostFrames = document.getElementById("ghosts");

let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;

let map = [
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
    [1,2,2,2,2, 2,2,2,2,2, 1,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2,2, 1,1,1,2,2, 2,1,1,2,2, 2,2,2,2,2, 1],
    [1,2,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,2, 1,1,1,1,1,2, 2,2,2,2,1, 2,2,2,2,1, 2,1,1,1,2, 1],
    [1,2,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,2, 1,2,2,2,1,2, 1,1,2,1,1, 2,2,1,2,1, 2,2,2,2,2, 1],
    [1,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 1,2,1,2,1,2, 2,1,2,2,1, 1,2,1,2,1, 2,2,2,2,2, 1],
    [1,2,1,1,1, 2,1,2,1,1, 1,1,1,2,1, 2,1,1,1,2, 1,2,1,2,2,2, 2,1,1,2,1, 2,2,1,2,1, 1,1,2,1,2, 1],
    [1,2,2,2,2, 2,1,2,2,2, 1,2,2,2,1, 2,2,2,2,2, 1,2,1,1,1,1, 2,1,1,2,1, 2,1,1,2,2, 2,2,2,2,2, 1],
    [1,1,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,1, 1,2,2,2,2,2, 2,2,2,2,2, 2,2,1,2,1, 2,1,1,1,2, 1],
    [0,0,0,0,1, 2,1,2,2,2, 2,2,2,2,1, 2,1,0,0,0, 1,2,1,1,1,2, 1,1,1,1,1, 1,2,2,2,1, 2,2,2,2,2, 1],
    [1,1,1,1,1, 2,1,2,1,1, 2,1,1,2,1, 2,1,1,1,1, 1,2,1,1,1,2, 1,2,2,2,2, 1,2,1,2,1, 1,2,1,1,2, 1],
    [1,2,2,2,2, 2,2,2,1,2, 2,2,1,2,2, 2,2,2,2,2, 2,2,2,2,2,2, 2,2,1,1,2, 2,2,1,2,1, 2,2,2,1,2, 1],
    [1,2,1,1,1, 2,1,2,1,2, 2,2,1,2,1, 2,1,1,1,2, 1,1,1,2,1,2, 1,2,2,2,2, 1,2,2,2,2, 2,1,2,2,2, 1],
    [1,2,2,0,1, 2,1,2,1,1, 1,1,1,2,1, 2,1,0,0,2, 2,2,1,2,1,2, 2,2,1,1,2, 2,2,1,2,1, 2,1,2,1,2, 1],
    [1,2,2,0,1, 2,1,2,2,2, 2,2,2,2,1, 2,1,0,0,2, 2,2,1,2,1,2, 1,2,2,2,2, 1,1,1,2,1, 2,1,2,1,2, 1],
    [1,2,1,1,1, 2,2,2,1,1, 1,1,1,2,2, 2,1,1,1,2, 1,1,1,2,1,2, 1,1,2,1,2, 2,2,1,2,1, 2,2,2,1,2, 1],
    [1,2,2,2,2, 2,2,2,2,2, 1,2,2,2,2, 2,2,2,2,2, 2,2,2,2,1,2, 2,2,2,2,2, 1,2,2,2,1, 2,1,1,1,2, 1],
    [1,2,1,1,1, 2,1,1,1,2, 1,2,1,1,1, 2,1,1,1,2, 1,1,1,1,1,2, 1,2,1,2,2, 2,2,1,2,2, 2,2,2,2,2, 1],
    [1,2,2,2,1, 2,2,2,2,2, 2,2,2,2,2, 2,1,2,2,2, 2,2,2,2,1,2, 1,2,1,2,2, 1,1,1,2,1, 1,2,1,1,2, 1],
    [1,1,2,2,1, 2,1,2,1,1, 1,1,1,2,1, 2,1,2,2,1, 1,2,1,2,1,2, 2,2,1,1,2, 1,2,2,2,1, 2,2,2,1,2, 1],
    [1,2,2,2,2, 2,1,2,2,2, 1,2,2,2,1, 2,2,2,2,2, 1,2,1,2,1,2, 1,2,2,1,2, 2,2,1,2,1, 1,2,1,1,2, 1],
    [1,2,1,1,1, 1,1,1,1,2, 1,2,1,1,1, 1,1,1,1,2, 1,2,1,2,2,2, 1,1,2,1,1, 1,1,1,2,1, 2,2,2,1,2, 1],
    [1,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,1,2, 2,2,2,2,2, 2,2,2,2,2, 2,2,2,2,2, 1],
    [1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1,1,1,1,1, 1],
];

let fps = 30;
let oneBlockSize = 20; 
let wallColor = "#342DCA";
let wallSpaceWidth = oneBlockSize / 1.5;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";
let foodColor = "#FEB897";
let ghosts = [];
let ghostLocations = [
    {x: 0, y: 0},
    {x: 176, y: 0},
    {x: 0, y: 121},
    {x: 176, y: 121},
]
let ghostCount = 4;

let randomTargetsForGhosts = [
    {x: 1 * oneBlockSize, y: 1 * oneBlockSize},
    {x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize},
    {x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize},
    {x: (map[0].length - 2) * oneBlockSize, y: (map.length - 2) * oneBlockSize}
]


let gameLoop = () => {
    update();
    draw();
    for(let i = 0; i < ghosts.length; i++){
        ghosts[i].moveProcess();
    }
};

let update = () => {
    pacman.moveProcess()
    pacman.eat();
    if(pacman.checkGhostCollision()){
        location.reload();
    }
};



let drawFoods = () => {
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[0].length; j++) {
            if(map[i][j] == 2) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3, 
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 3,
                    oneBlockSize / 3,
                    foodColor)
            }
        }
    }
}

let drawGhosts = () => {
    for(let i = 0; i < ghosts.length; i++){
        ghosts[i].draw();
    }
}

let draw = () => {
    createRect(0, 0, canvas.width, canvas.height, "black");
    drawWalls();
    drawFoods();
    pacman.draw();
    drawGhosts();
};

let gameInterval = setInterval(gameLoop, 1000 / fps);

let drawWalls = () => {
    for(let i = 0; i < map.length; i++){
        for(let j = 0; j < map[0].length; j++){
            if(map[i][j] == 1){
                createRect(
                    j * oneBlockSize, 
                    i * oneBlockSize, 
                    oneBlockSize, 
                    oneBlockSize, 
                    wallColor
                );
                    if(j > 0 && map[i][j - 1] == 1){
                        createRect(
                            j * oneBlockSize, 
                            i * oneBlockSize + wallOffset, 
                            wallSpaceWidth + wallOffset, 
                            wallSpaceWidth, 
                            wallInnerColor);
                    }
                    if(j < map[0].length - 1 && map[i][j + 1] == 1) {
                        createRect(
                            j * oneBlockSize + wallOffset, 
                            i * oneBlockSize + wallOffset, 
                            wallSpaceWidth + wallOffset, 
                            wallSpaceWidth, 
                            wallInnerColor
                        );
                    }
                    if(i > 0 && map[i - 1][j] == 1){
                        createRect(
                            j * oneBlockSize + wallOffset, 
                            i * oneBlockSize, 
                            wallSpaceWidth, 
                            wallSpaceWidth + wallOffset, 
                            wallInnerColor);
                    }
                    if(i < map.length - 1 && map[i + 1][j] == 1) {
                        createRect(
                            j * oneBlockSize + wallOffset, 
                            i * oneBlockSize + wallOffset, 
                            wallSpaceWidth, 
                            wallSpaceWidth + wallOffset, 
                            wallInnerColor
                        );
                    }
            };
        }
    }
};

let createNewPacman = () => {
    pacman = new Pacman(
        oneBlockSize, 
        oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    );
}

let createGhosts = () => {
    ghosts = [];
    for(let i = 0; i < ghostCount; i++){
        let newGhost = new Ghost(
            9 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            10 * oneBlockSize + (i % 2 == 0 ? 0 : 1) * oneBlockSize,
            oneBlockSize,
            oneBlockSize,
            pacman.speed / 2,
            ghostLocations[i % 4].x,
            ghostLocations[i % 4].y,
            124,
            116,
            6 + i
        );
        ghosts.push(newGhost);
    }
}

createNewPacman();
createGhosts();
gameLoop();

window.addEventListener("keydown", (event) => {
    let k = event.keyCode;
    setTimeout(() => {
        if(k == 37 || k == 65) {
            pacman.nextDirection = DIRECTION_LEFT;
        } else if (k == 38 || k == 87) {
            pacman.nextDirection = DIRECTION_UP;
        } else if (k == 39 || k == 68) {
            pacman.nextDirection = DIRECTION_RIGHT;
        } else if (k == 40 || k == 83) {
            pacman.nextDirection = DIRECTION_BOTTOM;
        }
    }, 1)
})