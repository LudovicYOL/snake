
class Snake {
    constructor() {
      this.positions = [];
    }

    reset(){
        this.positions = [{x:3,y:1},{x:2,y:1},{x:1,y:1}];
    }

    init(){
        for(let index in this.positions){
            this.drawPos(this.positions[index]);
        }
    }

    grow(){
        this.positions.push(this.positions[this.positions.length - 1]);
    }

    draw(){
            // Je supprime le dernier
        this.clearPos(this.positions[this.positions.length - 1]);
        // Je calcule mes nouvelles positions
        this.computePositions();
        // J'affiche la première position
        this.drawPos(this.positions[0]);
    }

    computePositions(){
        // Supprimer dernier élément 
        this.positions.splice(-1,1);
    
        // Calculer la position du premier élément
        let pos = this.positions[0];
        let x;
        let y;
    
        switch(controller.direction) {
            case DirectionEnum.TOP:
                x = pos.x;
                y = pos.y <= 0 ? board.height - 1 : pos.y - 1;  
                break;
            case DirectionEnum.BOTTOM:
                x = pos.x;
                y = pos.y >= board.height - 1 ? 0 : pos.y + 1; 
                break;
            case DirectionEnum.RIGHT:
                x = pos.x >= board.width - 1 ? 0 : pos.x + 1;
                y = pos.y; 
                break;
            case DirectionEnum.LEFT:
                x = pos.x <= 0 ? board.width - 1 : pos.x - 1;
                y = pos.y; 
                break;
        }
    
        // Ajouter le premier élément
        this.positions.unshift({x:x,y:y});
    }

    drawPos(pos){
        context.fillRect(pos.x * BLOC_SIZE + 4, pos.y * BLOC_SIZE + 4, BLOC_SIZE - 8, BLOC_SIZE - 8);
    }
    
    clearPos(pos){
        context.clearRect(pos.x * BLOC_SIZE + 4, pos.y * BLOC_SIZE + 4, BLOC_SIZE - 8, BLOC_SIZE - 8);
    }

    contains(x, y){
        for(let index in this.positions)
        {
            let pos = this.positions[index];
            if(pos.x == x && pos.y == y){
                return true;
            }
        }
        return false;
    }

    isEatingApple(apple){
        return this.positions[0].x == apple.coordonnees.x && this.positions[0].y == apple.coordonnees.y;
    }

    isEatingHimself(){
        for(let i = 1; i < this.positions.length; i++){
            if(this.positions[i].x == this.positions[0].x && this.positions[i].y == this.positions[0].y){
                return true
            }
        }
        return false;
    }

    move(){
        // Je vérifie si il a mangé une pomme
        if(this.isEatingApple(apple)){
            apple.reset();
            score.increment();
            this.grow();
            board.updateGameSpeed();
        }
    
        // Je dessine le snake
       this.draw();
    
        // Je vérifie s'il n'a pas mordu sa queue
        if(this.isEatingHimself()){
            board.gameOver();
        }
    }
}