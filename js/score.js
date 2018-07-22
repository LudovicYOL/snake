
class Score {
      constructor() {
        this.score = 0;
      }

      draw(){
        context.clearRect(10, SCREEN_HEIGHT - 50, 120, 30);
        context.fillStyle = '#363236';
        context.textAlign="left";
        context.fillText("SCORE : "+ this.score, 10, SCREEN_HEIGHT - 30);
    }

    reset(){
      this.score = 0;
    }

    increment(){
      this.score++;
      this.draw();
    }
  }