const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const BLOC_SIZE = 30;

var HEIGHT;
var WIDTH;

var GAME_SPEED = 400;
var LAST_DIRECTION = "RIGHT";
var DIRECTION = "RIGHT"; // TOP, BOTTOM, RIGHT, LEFT
var TIMER = null;
var GAME_STATE = "INIT"; // INIT, START, PAUSE, CONTINUE, GAME_OVER

let snake = new Snake();
let score = new Score();
let action = new Action();
let apple = new Apple();

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function reset(){
    context.clearRect(0,0,SCREEN_WIDTH, SCREEN_HEIGHT);
    
    LAST_DIRECTION = "RIGHT";
    DIRECTION = "RIGHT";
    APPLE = null;
    
    GAME_SPEED = 400;

    score.reset();
    snake.reset();
    apple.reset();
}

function init(){
    reset();
    initBoard();
    snake.init();    
}
init();

function initBoard(){
    WIDTH = Math.floor(SCREEN_WIDTH / BLOC_SIZE);
    HEIGHT = Math.floor(SCREEN_HEIGHT / BLOC_SIZE) - 2;

    context.font="22px Agency FB";
    action.draw("- PRESS SPACE TO PLAY -");
    score.draw();
    // drawBoard();
}

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
    changeDirection(LAST_DIRECTION);
    apple.generer(snake);
    moveSnake();
}

function moveSnake(){
    // Je vérifie si il a mangé une pomme
    if(snake.isEatingApple(apple)){
        apple.reset();
        score.increment();
        score.draw();
        snake.grow();
        GAME_SPEED = 1 / (score.score/300) + 50;
    
        clearInterval(TIMER);
        TIMER = setInterval(function(){ onEachTic() }, GAME_SPEED);
    }

    // Je dessine le snake
   snake.draw();

    // Je vérifie s'il n'a pas mordu sa queue
    if(snake.isEatingHimself()){
        gameOver();
    }
}

function gameOver(){
    changeGameStatus("GAME_OVER");
}
// Gestion des touches
document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        LAST_DIRECTION = "TOP";
    }
    else if (e.keyCode == '40') {
        LAST_DIRECTION = "BOTTOM";
    }
    else if (e.keyCode == '37') {
        LAST_DIRECTION = "LEFT";
    }
    else if (e.keyCode == '39') {
        LAST_DIRECTION = "RIGHT";
    }
    else if(e.keyCode == '32'){
        manageSpacebar();
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

function manageSpacebar(){
    switch(GAME_STATE)
    {
        case "INIT":
            changeGameStatus("START");
            break;
        case "START":
            changeGameStatus("PAUSE"); 
            break;
        case "PAUSE":
            changeGameStatus("START");
            break;
        case "GAME_OVER":
            changeGameStatus("INIT");
            break;
        default:
            break;
    }
}

function changeGameStatus(newStatus){
    switch(newStatus)
    {
        case "INIT":
            reset();
            action.draw("- PRESS SPACE TO START -");
            break;
        case "START":
            TIMER = setInterval(function(){ onEachTic() }, GAME_SPEED);
            action.draw("- PRESS SPACE TO PAUSE -");   
            break;
        case "PAUSE":
            clearInterval(TIMER);
            action.draw("- PRESS SPACE TO CONTINUE -");
            break;
        case "GAME_OVER":
            clearInterval(TIMER);
            action.draw("- GAME OVER -");
            break;
        default:
            break;
    }
    GAME_STATE = newStatus;
}





