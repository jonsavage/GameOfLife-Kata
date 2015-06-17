var DEFAULT_SIZE = 5;
var ALIVE_CLASSNAME = "alive";
var DEAD_CLASSNAME = "dead";

var cells;
var table;
var rows;
var stuff;

function initGame() {
    table = document.getElementById("grid");
    cells = Array.matrix(DEFAULT_SIZE,DEFAULT_SIZE);

    setupTable();
    updateTable();
}

function cell() {
    var isAlive;
    var nextState;
    var cell;
    var x;
    var y;
    this.updateCell = function() {
        this.cell.className = this.isAlive ? ALIVE_CLASSNAME : DEAD_CLASSNAME;
    }
}

function doStep() {
    generateNextState();
    advanceCellStates();
    updateTable();
}

function generateNextState() {
    var neighborCount = 0;
    for (var i = 0; i < cells.length - 1; i++) {
        for (var j = 0; j < cells[i].length - 1; j++) {


            if(i == 0 && j == 0) {
                if(cells[1][0].isAlive && (cells[0][1].isAlive && cells[1][1].isAlive)) {
                    cells[0][0].isAlive = true;
                    expandWest();
                    expandNorth();
                    generateNextState();
                    return;
                }
            }

            //else if(i == 0 && i < cells[i].length) {
            //    if(cells[1][0].isAlive && (cells[0][1].isAlive && cells[1][1].isAlive)) {
            //        expandEast();
            //        expandNorth();
            //        generateNextState();
            //        return;
            //    }
            //}
            neighborCount = countNeighbors(i,j);

            if(cells[i][j].isAlive && (neighborCount == 2 || neighborCount == 3)) {
                cells[i][j].nextState = true;
            }
            else if( neighborCount == 3) {
                cells[i][j].nextState = true;
            }
        }
    }
}

function countNeighbors(i, j) {
    var neighborCount = 0;
    if(typeof cells[i-1] == "undefined")
        return 0;
    if(typeof cells[i+1] == "undefined")
        return 0;
    if(typeof cells[i][j-1] == "undefined")
        return 0;
    if(typeof cells[i][j+1] == "undefined")
        return 0;
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
    return neighborCount;
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
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            cells[i][j].updateCell();
        }
    }
}

function setupTable() {
    table.innerHTML = "";
    rows = new Array(cells.length);
    var row;
    for (var i = 0; i < cells.length; i++) {
        row = table.insertRow(i);
        for (var j = 0; j < cells[i].length; j++) {
            cells[i][j].cell = row.insertCell(j);
            cells[i][j].cell.x = j;
            cells[i][j].cell.y = i;

            cells[i][j].cell.onclick = function() {
                flipCell(this.x, this.y);
                updateTable();
            };
        }
        rows[i] = row;
    }
}


function expandEast() {

    for (var i = 0; i < cells.length; i++) {
        cells[i] = cells[i].concat(new cell());
        cells[i][cells[i].length-1].cell = rows[i].insertCell(cells[i].length-1);

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

function expandWest() {

    for (var i = 0; i < cells.length; i++) {
        cells[i] = cells[i].reverse();

        cells[i] = cells[i].concat(new cell());
        cells[i][cells[i].length-1].cell = rows[i].insertCell(cells[i].length-1);

        cells[i][cells[i].length-1].isAlive = false;
        cells[i][cells[i].length-1].nextState = false;
        cells[i] = cells[i].reverse();
    }
    setupTable();
    updateTable();
}

function expandNorth() {
    var newRow = new Array(cells[0].length);
    cells = cells.reverse();
    cells.push(newRow);
    cells = cells.reverse();
    //var rev1 = cells.reverse().push(newRow);
    for (var i = 0; i < cells[0].length; i++) {
        cells[0][i] = new cell();
        cells[0][i].isAlive = false;
        cells[0][i].nextState = false;
    }

    setupTable();
    updateTable();
}

function expandSouth() {

    //cells = cells.concat(new Array(cells[0].length));
    rows = rows.concat(table.insertRow(cells.length));
    var newRow = new Array(cells[0].length);

    for (var i = 0; i < cells[0].length; i++) {
        newRow[i] = new cell();
        newRow[i].cell = rows[rows.length - 1].insertCell(i);
        //newRow[i].cell.innerHTML = "0";
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










