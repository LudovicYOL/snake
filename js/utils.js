// Enum
DirectionEnum = {
    RIGHT : "RIGHT",
    LEFT : "LEFT",
    TOP : "TOP",
    BOTTOM : "BOTTOM"
}

GameStateEnum = {
     INIT : "INIT", 
     START : "START", 
     PAUSE : "PAUSE", 
     CONTINUE : "CONTINUE", 
     GAME_OVER : "GAME_OVER"
}

// Fonctions
function random(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}