

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const HEIGHT = 20;
const WIDTH = 30;
const PADDING = 10;
const BLOC_SIZE = 30;
const TIC = 500;

var POSITIONS = [{x:10,y:10},{x:10,y:11},{x:10,y:12}];
var DIRECTION = "TOP"; // TOP, BOTTOM, RIGHT, LEFT
var TIMER = null;

function init(){
    drawBoard();
    pauseOrStart();
}
init();

function drawBoard(){
    for (var x = 0; x <= WIDTH * BLOC_SIZE; x += BLOC_SIZE) {
        context.moveTo(x, 0);
        context.lineTo(x, HEIGHT * BLOC_SIZE);
    }
    
    for (var y = 0; y <= HEIGHT * BLOC_SIZE; y += BLOC_SIZE) {
        context.moveTo(0, y);
        context.lineTo(WIDTH * BLOC_SIZE, y);
    }
    
    context.strokeStyle = "#ddd";
    context.stroke();
}

function onEachTic(){
    clearSnake();
    computePositions();
    drawSnake();
}

function drawSnake(){
    context.fillStyle="#FF0000";
    var pos;
    var index;
    for(index in POSITIONS){
        pos = POSITIONS[index];
        context.fillRect(pos.x * BLOC_SIZE + 4, pos.y * BLOC_SIZE + 4, BLOC_SIZE - 8, BLOC_SIZE - 8);
    }
}

function clearSnake(){
    var pos;
    var index;
    for(index in POSITIONS){
        pos = POSITIONS[index];
        context.clearRect(pos.x * BLOC_SIZE + 4, pos.y * BLOC_SIZE + 4, BLOC_SIZE - 8, BLOC_SIZE - 8);
    }
}

function computePositions(){
    // Supprimer dernier élément 
    POSITIONS.splice(-1,1);

    // Ajouter le premier élément
    pos = POSITIONS[0];
    var x;
    var y;

    switch(DIRECTION) {
        case "TOP":
            x = pos.x;
            y = pos.y - 1; 
            break;
        case "BOTTOM":
            x = pos.x;
            y = pos.y + 1; 
            break;
        case "RIGHT":
            x = pos.x + 1;
            y = pos.y; 
            break;
        case "LEFT":
            x = pos.x - 1;
            y = pos.y; 
            break;
    }

    POSITIONS.unshift({x:x,y:y});
}

// Gestion des touches
document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        changeDirection("TOP");
    }
    else if (e.keyCode == '40') {
        changeDirection("BOTTOM");
    }
    else if (e.keyCode == '37') {
        changeDirection("LEFT");
    }
    else if (e.keyCode == '39') {
        changeDirection("RIGHT");
    }
    else if(e.keyCode == '32'){
        pauseOrStart();
    }
}

function changeDirection(direction){
    switch(direction) {
        case "TOP":
            DIRECTION = DIRECTION == "BOTTOM" ? "BOTTOM" : "TOP";
            break;
        case "BOTTOM":
            DIRECTION = DIRECTION == "TOP" ? "TOP" : "BOTTOM";
            break;
        case "RIGHT":
            DIRECTION = DIRECTION == "LEFT" ? "LEFT" : "RIGHT"; 
            break;
        case "LEFT":
            DIRECTION = DIRECTION == "RIGHT" ? "RIGHT" : "LEFT";
            break;
    }
}

function pauseOrStart(){
    if(TIMER == null){
        TIMER = setInterval(function(){ onEachTic() }, TIC);
    }else{
        clearInterval(TIMER);
        TIMER = null;
    }
}



