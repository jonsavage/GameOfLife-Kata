var DEFAULT_SIZE = 5;


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
    for (var i = 1; i < cells[0].length - 2; i++) {

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
    for (var i = 0; i < cells[0].length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            cells[i][j].isAlive = cells[i][j].nextState;
            cells[i][j].nextState = false;
        }
    }
}

function updateTable() {
    for (var i = 0; i < cells[0].length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
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

function expandSouth() {
    expandEast();
    var newRow = new Array(cells.length);

    rows.concat(table.insertRow(cells.length));
    for (var i = 0; i < cells[0].length + 1; i++) {
        cells[i].concat(new cell());
        cells[i][cells[i].length].cell = rows[i].insertCell(cells[i].length);
        cells[i][cells[i].length].cell.innerHTML = "0";
        cells[i][cells[i].length].isAlive = false;
        cells[i][cells[i].length].nextState = false;
    }

    cells.push(newRow);
    updateTable();
}

//function expandSouth() {
//    expandEast();
//    var newRow = new Array(cells.length);
//
//    rows.concat(table.insertRow(cells.length));
//    for (var i = 0; i < cells[0].length + 1; i++) {
//        cells[i].concat(new cell());
//        cells[i][cells[i].length].cell = rows[i].insertCell(cells[i].length);
//        cells[i][cells[i].length].cell.innerHTML = "0";
//        cells[i][cells[i].length].isAlive = false;
//        cells[i][cells[i].length].nextState = false;
//    }
//
//    cells.push(newRow);
//    updateTable();
//}

function expandEast() {
    var tempCell;
    for (var i =0; i < cells[0].length; i++) {
        tempCell = new cell();
        tempCell.isAlive = false;
        tempCell.nextState = false;
        tempCell.cell = rows[i].insertCell(cells[i].length);
        tempCell.cell.innerHTML = "0";
        cells[i].concat(tempCell);

    }
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











