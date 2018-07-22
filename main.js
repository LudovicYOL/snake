
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

let snake = new Snake();
let score = new Score();
let action = new Action();
let apple = new Apple();
let controller = new Controller();
let board = new Board();

document.onkeydown = checkKey;
function checkKey(){
    board.checkKey();
    controller.checkKey();
}

function init(){
    // Canvas en Full Screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    board.init();
    board.reset();
    snake.init(); 
}
init();







