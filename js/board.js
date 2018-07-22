
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;
const BLOC_SIZE = 30;

class Board{
    constructor() {
        this.gameSpeed = 400;
        this.timer = null;
        this.gameState = GameStateEnum.INIT;
    }

    init(){
        context.font="22px Agency FB";

        this.width = Math.floor(SCREEN_WIDTH / BLOC_SIZE);
        this.height = Math.floor(SCREEN_HEIGHT / BLOC_SIZE) - 2;
        
        // this.draw();
    }

    reset(){
        context.clearRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);
        board.gameSpeed = 400;
    
        score.reset();
        snake.reset();
        apple.reset();
        controller.reset();
    
        action.draw("- PRESS SPACE TO PLAY -");
        score.draw();
    }

    draw(){
        for (var x = 0; x <= this.width * BLOC_SIZE; x += BLOC_SIZE) {
            context.moveTo(x, 0);
            context.lineTo(x, this.height * BLOC_SIZE);
        }
        
        for (var y = 0; y <= this.height * BLOC_SIZE; y += BLOC_SIZE) {
            context.moveTo(0, y);
            context.lineTo(this.width * BLOC_SIZE, y);
        }
        
        context.strokeStyle = "#000";
        context.stroke();
    }

    // Gestion de la touche Espace
    checkKey(e) {
        e = e || window.event;
        if(e.keyCode == '32'){
            board.manageSpacebar();
        }
    }

    manageSpacebar(){
        switch(board.gameState)
        {
            case "INIT":
                board.changeGameStatus("START");
                break;
            case "START":
                board.changeGameStatus("PAUSE"); 
                break;
            case "PAUSE":
                board.changeGameStatus("START");
                break;
            case "GAME_OVER":
                board.changeGameStatus("INIT");
                break;
            default:
                break;
        }
    }

    changeGameStatus(newStatus){
        board.gameState = newStatus;
        switch(newStatus)
        {
            case GameStateEnum.INIT:
                board.reset();
                action.draw("- PRESS SPACE TO START -");
                break;
            case GameStateEnum.START:
                board.timer = setInterval(function(){ board.onEachTic() }, board.gameSpeed);
                action.draw("- PRESS SPACE TO PAUSE -");   
                break;
            case GameStateEnum.PAUSE:
                clearInterval(board.timer);
                action.draw("- PRESS SPACE TO CONTINUE -");
                break;
            case GameStateEnum.GAME_OVER:
                clearInterval(board.timer);
                action.draw("- GAME OVER -");
                break;
            default:
                break;
        }
    }

    gameOver(){
        this.changeGameStatus(GameStateEnum.GAME_OVER);
    }

    onEachTic(){
        controller.changeDirection();
        apple.generer();
        snake.move();
    }

    updateGameSpeed(){
        this.gameSpeed = 1 / (score.score/300) + 50;
        clearInterval(this.timer);
        this.timer = setInterval(function(){ board.onEachTic() }, this.gameSpeed);
    }
    
}