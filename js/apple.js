class Apple {
    constructor() {
        this.coordonnees = null;
    }

    reset(){
        this.coordonnees = null;
    }

    generer(){
        if(this.coordonnees == null){
            let generated = false;
            while(!generated)
            {
                let x = random(0, board.width - 1);
                let y = random(0, board.height - 1);
                if(!snake.contains(x,y)){
                    this.coordonnees = {x:x, y:y};
                    this.draw();
                    generated = true;
                }
            }
        }
    }
    
    draw(){
        let x = this.coordonnees.x;
        let y = this.coordonnees.y;
        context.fillRect(x * BLOC_SIZE + 10, y * BLOC_SIZE + 5, BLOC_SIZE - 20, 5); // HAUT
        context.fillRect(x * BLOC_SIZE + 10, y * BLOC_SIZE + BLOC_SIZE - 10, BLOC_SIZE - 20, 5); // BAS
        context.fillRect(x * BLOC_SIZE + 5, y * BLOC_SIZE + 10, 5, BLOC_SIZE - 20); // GAUCHE
        context.fillRect(x * BLOC_SIZE + BLOC_SIZE - 10, y * BLOC_SIZE + 10, 5, BLOC_SIZE - 20); // DROITE
    }
}