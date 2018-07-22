class Action {
    constructor() {
        this.message = "";
    }

    draw(action){
        context.clearRect(SCREEN_WIDTH/2 - 100, SCREEN_HEIGHT - 50, 200, 30);
        context.fillStyle = '#363236';
        context.textAlign="center";
        context.fillText(action, SCREEN_WIDTH/2, SCREEN_HEIGHT - 30);
    }
}