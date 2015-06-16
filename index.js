var DEFAULT_SIZE = 10;


var cells;
var table;
var rows;
var stuff;

function initGame() {
    table = document.getElementById("grid");
    cells = Array.matrix(DEFAULT_SIZE,DEFAULT_SIZE);

    setupTable();
}

function cell() {
    var isAlive;
    var nextState;
    var cell;
    var x;
    var y;
    this.updateCell = function() {
        this.cell.innerHTML = this.isAlive ? "X" : "0";
    }
}

function doStep() {
    generateNextState();
    advanceCellStates();
    updateTable();
}

function generateNextState() {
    var neighborCount = 0;
    for (var i = 1; i < cells.length - 2; i++) {

        for (var j = 1; j < cells[i].length - 2; j++) {
            neighborCount = 0;

            if(cells[i-1][j-1].isAlive) {
                neighborCount++;
            }
            if(cells[i][j-1].isAlive) {
                neighborCount++;
            }
            if(cells[i+1][j-1].isAlive) {
                neighborCount++;
            }
            if(cells[i-1][j].isAlive) {
                neighborCount++;
            }
            if(cells[i+1][j].isAlive) {
                neighborCount++;
            }
            if(cells[i-1][j+1].isAlive) {
                neighborCount++;
            }
            if(cells[i][j+1].isAlive) {
                neighborCount++;
            }
            if(cells[i+1][j+1].isAlive) {
                neighborCount++;
            }

            if(cells[i][j].isAlive && (neighborCount == 2 || neighborCount == 3)) {
                cells[i][j].nextState = true;
            }
            else if( neighborCount == 3) {
                cells[i][j].nextState = true;
            }
        }
    }
}

function advanceCellStates() {
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            cells[i][j].isAlive = cells[i][j].nextState;
            cells[i][j].nextState = false;
        }
    }
}

function updateTable() {
    for (var i = 0; i < cells.length - 1; i++) {
        for (var j = 0; j < cells[i].length - 1; j++) {
            cells[i][j].updateCell();
        }
    }
}

function addBlinker() {
    cells[4][3].isAlive = true;
    cells[4][4].isAlive = true;
    cells[4][5].isAlive = true;
    updateTable();
}

function addCube() {
    cells[4][3].isAlive = true;
    cells[4][4].isAlive = true;
    cells[5][3].isAlive = true;
    cells[5][4].isAlive = true;
    updateTable();
}

function setupTable() {
    table.innerHTML = "";
    rows = new Array(DEFAULT_SIZE);
    var row;
    for (var i = 0; i < cells[0].length; i++) {
        row = table.insertRow(i);
        for (var j = 0; j < cells[i].length; j++) {
            cells[i][j].cell = row.insertCell(j);
            cells[i][j].cell.innerHTML = cells[i][j].isAlive ? "X" : "0";
        }
        rows[i] = row;
    }
}

function expandEast() {

    for (var i = 0; i < cells.length; i++) {
        cells[i] = cells[i].concat(new cell());
        cells[i][cells[i].length-1].cell = rows[i].insertCell(cells[i].length-1);
        cells[i][cells[i].length-1].cell.innerHTML = "0";

        cells[i][cells[i].length-1].isAlive = false;
        cells[i][cells[i].length-1].nextState = false;
        cells[i][cells[i].length-1].cell.y = i;
        cells[i][cells[i].length-1].cell.x = cells[i].length-1;

        cells[i][cells[i].length-1].cell.onclick = function() {
            flipCell(this.x, this.y);
            updateTable();
        };
    }

    updateTable();
}

function expandSouth() {

    //cells = cells.concat(new Array(cells[0].length));
    rows = rows.concat(table.insertRow(cells.length));
    var newRow = new Array(cells[0].length);

    for (var i = 0; i < cells[0].length; i++) {
        newRow[i] = new cell();
        newRow[i].cell = rows[rows.length - 1].insertCell(i);
        newRow[i].cell.innerHTML = "0";
        newRow[i].isAlive = false;
        newRow[i].nextState = false;
        newRow[i].cell.y = cells.length;
        newRow[i].cell.x = i;

        newRow[i].cell.onclick = function() {
            flipCell(this.x, this.y);
            updateTable();
        };

    }

    cells.push(newRow);
    updateTable();
}

function flipCell(x, y) {
    cells[y][x].isAlive = !cells[y][x].isAlive;
    updateTable();
}

// http://www.stephanimoroni.com/how-to-create-a-2d-array-in-javascript/
Array.matrix = function(numrows, numcols){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
        var columns = [];
        for (var j = 0; j < numcols; ++j){
            columns[j] = new cell();
            columns[j].isAlive = false;
        }
        arr[i] = columns;
    }
    return arr;
};

function printArray() {
    console.log(cells);
}











