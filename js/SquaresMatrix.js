
function SquaresMatrix(columns, rows) {

    this.columns = columns < 0 ? 0 : columns;
    this.rows = rows < 0 ? 0 : rows;

    this.squaresMatrix = new Array(this.columns); 
    for(var col = 0; col < this.columns; col++) { 
        this.squaresMatrix[col] = new Array(this.rows); 
        for(var row = 0; row < this.rows; row++) { 
            this.squaresMatrix[col][row] = null; 
        }
    }
}

SquaresMatrix.prototype.getWidth = function() { return this.columns; }

SquaresMatrix.prototype.getHeight = function() { return this.rows; }

SquaresMatrix.prototype.insertSquare = function(square) {
    var x = square.getX();
    var y = square.getY();
    this.squaresMatrix[x][y] = square;
    return this;
}

SquaresMatrix.prototype.insertSquareAt = function(x, y, square) {
    square.setX(x);
    square.setY(y);
    this.squaresMatrix[x][y] = square;
    return this;
}

SquaresMatrix.prototype.getSquares = function() {
    return this.squaresMatrix;
}

SquaresMatrix.prototype.arePositionsAvailable = function(positions) {
    if(!(positions instanceof Array) || positions.length == 0)
        return false;

    for(var i = 0; i < positions.length; i++) {
        var coordinates = positions[i];
        var x = coordinates[0];
        var y = coordinates[1];
        if(x < 0 || x >= this.getWidth() || y < 0 || y >= this.getHeight())
            return false;
        if(this.squaresMatrix[x][y] instanceof Square)
            return false;
    }

    return true;
}

SquaresMatrix.prototype.packColumn = function(xConstant, y) {
    for( ; y > 0; y--) { /* bottom to top */
        var currentSquare = this.squaresMatrix[xConstant][y];
        if(! (currentSquare instanceof Square)) {
            var upperIndex = y;
            var upperSquare;
            do {
                upperIndex--; /* reason for: for( y > 0) */
                upperSquare = this.squaresMatrix[xConstant][upperIndex];
            } while(! (upperSquare instanceof Square) && upperIndex > 0);

            if(upperSquare instanceof Square) { /* found an upper Square? */
                this.squaresMatrix[xConstant][upperIndex] = null;
                this.insertSquareAt(xConstant, y, upperSquare);
            }
        }
    }
}

/* EOF */
