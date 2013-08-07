
/* Do not access this from anywhere, except from getRandonTetrominoType() */
var _SHUFFLED_TETROMINOS = [];

function getRandomTetrominoName() {

    if(_SHUFFLED_TETROMINOS.length > 0) {
        return _SHUFFLED_TETROMINOS.pop();
    }  

    _SHUFFLED_TETROMINOS = _getShuffledTetrominoNames();

    return _SHUFFLED_TETROMINOS.pop();
}

function _getShuffledTetrominoNames() {

    /* Make a clone of TETROMINOS */
    var tNames = TETROMINO_NAMES.slice(0); 

    /* Fisher-Yates shuffle, modern version */
    for(var i = tNames.length - 1; i > 0; i--) {
       /* j ← random integer with 0 ≤ j ≤ i */
       var min = 0;
       var max = i;
       var j = Math.floor(Math.random() * (max - min + 1)) + min;
       /* exchange a[j] and a[i] */
       var tmp = tNames[j];
       tNames[j] = tNames[i];
       tNames[i] = tmp; 
    }

    return tNames;
}

function getRandomTetromino(width) {
    var rndTetrominoName = getRandomTetrominoName();                             
    /* TODO: Tetromino uses by default a +2 offset, needs to be adressed. */     
    var x = Math.floor(width / 2) - 1;                   
    var y = 0;                                                                   
    return new Tetromino(x, y, rndTetrominoName);
}

/* EOF */
