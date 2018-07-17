
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const BLOC_SIZE = 30;

var HEIGHT;
var WIDTH;

var GAME_SPEED = 300;
var POSITIONS = [{x:3,y:1},{x:2,y:1},{x:1,y:1}];
var LAST_DIRECTION = "RIGHT";
var DIRECTION = "RIGHT"; // TOP, BOTTOM, RIGHT, LEFT
var TIMER = null;
var APPLE = null;
var SCORE = 0;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function init(){
    initBoard();
    drawBoard();
    initSnake();    
}
init();

function initBoard(){
    context.font="22px Agency FB";
    drawAction("- PRESS SPACE TO PLAY -");
    drawScore();
    WIDTH = Math.floor(SCREEN_WIDTH / BLOC_SIZE);
    HEIGHT = Math.floor(SCREEN_HEIGHT / BLOC_SIZE) - 2;
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
    generateApple();
    moveSnake();
}

function initSnake(){
    for(let index in POSITIONS){
        drawPos(POSITIONS[index]);
    }
}

function moveSnake(){
    // Je vérifie si il a mangé une pomme
    if(isAppleEaten()){
       eatApple();
    }

    // Je dessine le snake
   drawSnake();

    // Je vérifie s'il n'a pas mordu sa queue
    if(isSnakeEatItSelf()){
        gameOver();
    }
}

function drawSnake(){
    // Je supprime le dernier
    clearPos(POSITIONS[POSITIONS.length - 1]);
    // Je calcule mes nouvelles positions
    computePositions();
    // J'affiche la première position
    drawPos(POSITIONS[0]);
}

function isSnakeEatItSelf(){
    for(let i = 1; i < POSITIONS.length; i++){
        if(POSITIONS[i].x == POSITIONS[0].x && POSITIONS[i].y == POSITIONS[0].y){
            return true
        }
    }
    return false;
}

function gameOver(){
    pauseOrStart();
    console.log("- GAME OVER -");
}

function isAppleEaten(){
    return POSITIONS[0].x == APPLE.x && POSITIONS[0].y == APPLE.y
}

function eatApple(){
    APPLE = null;
    SCORE+=1;
    drawScore();
    POSITIONS.push(POSITIONS[POSITIONS.length - 1]);
    GAME_SPEED = GAME_SPEED - GAME_SPEED * 0.05;
    clearInterval(TIMER);
    TIMER = setInterval(function(){ onEachTic() }, GAME_SPEED);
}

function drawScore(){
    context.fillStyle = '#FFFFFF';
    context.fillRect(10, SCREEN_HEIGHT - 50, 120, 30);
    context.fillStyle = '#000000';
    context.textAlign="left";
    context.fillText("SCORE : "+ SCORE, 10, SCREEN_HEIGHT - 30);
}

function drawAction(action){
    context.fillStyle = '#FFFFFF';
    context.fillRect(SCREEN_WIDTH/2 - 100, SCREEN_HEIGHT - 50, 200, 30);
    context.fillStyle = '#000000';
    context.textAlign="center";
    context.fillText(action, SCREEN_WIDTH/2, SCREEN_HEIGHT - 30);
}

function drawPos(pos){
    context.fillRect(pos.x * BLOC_SIZE + 4, pos.y * BLOC_SIZE + 4, BLOC_SIZE - 8, BLOC_SIZE - 8);
}

function clearPos(pos){
    context.clearRect(pos.x * BLOC_SIZE + 4, pos.y * BLOC_SIZE + 4, BLOC_SIZE - 8, BLOC_SIZE - 8);
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
            y = pos.y <= 0 ? HEIGHT - 1 : pos.y - 1;  
            break;
        case "BOTTOM":
            x = pos.x;
            y = pos.y >= HEIGHT - 1 ? 0 : pos.y + 1; 
            break;
        case "RIGHT":
            x = pos.x >= WIDTH - 1 ? 0 : pos.x + 1;
            y = pos.y; 
            break;
        case "LEFT":
            x = pos.x <= 0 ? WIDTH - 1 : pos.x - 1;
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
        TIMER = setInterval(function(){ onEachTic() }, GAME_SPEED);
        drawAction("- PRESS SPACE TO PAUSE -");
    }else{
        clearInterval(TIMER);
        TIMER = null;
        drawAction("- PRESS SPACE TO START -");
    }
}

function generateApple(){
    if(APPLE == null){
        let x = random(0, WIDTH - 1);
        let y = random(0, HEIGHT - 1);
        APPLE = {x:x, y:y};
        drawApple(x,y);
    }
}

function drawApple(x, y){
    context.fillRect(x * BLOC_SIZE + 8, y * BLOC_SIZE + 8, BLOC_SIZE - 16, BLOC_SIZE - 16);
}

function random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



