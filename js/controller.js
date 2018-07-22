

class Controller{
    constructor() {
        this.lastDirection = DirectionEnum.RIGHT;
        this.direction = DirectionEnum.RIGHT;
    }

    reset(){
        this.lastDirection = DirectionEnum.RIGHT;
        this.direction = DirectionEnum.RIGHT;
    }

    // Gestion des touches
    checkKey(e) {
        e = e || window.event;

        if (e.keyCode == '38') {
            controller.lastDirection = DirectionEnum.TOP;
        }
        else if (e.keyCode == '40') {
            controller.lastDirection = DirectionEnum.BOTTOM;
        }
        else if (e.keyCode == '37') {
            controller.lastDirection = DirectionEnum.LEFT;
        }
        else if (e.keyCode == '39') {
            controller.lastDirection = DirectionEnum.RIGHT;
        }
    }

    changeDirection(){
        switch(this.lastDirection) {
            case DirectionEnum.TOP:
                this.direction = this.direction == DirectionEnum.BOTTOM ? DirectionEnum.BOTTOM : DirectionEnum.TOP;
                break;
            case DirectionEnum.BOTTOM:
                this.direction = this.direction == DirectionEnum.TOP ? DirectionEnum.TOP : DirectionEnum.BOTTOM;
                break;
            case DirectionEnum.RIGHT:
                this.direction = this.direction == DirectionEnum.LEFT ? DirectionEnum.LEFT : DirectionEnum.RIGHT; 
                break;
            case DirectionEnum.LEFT:
                this.direction = this.direction == DirectionEnum.RIGHT ? DirectionEnum.RIGHT : DirectionEnum.LEFT;
                break;
        }
    }
}