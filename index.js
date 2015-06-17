var DEFAULT_SIZE = 10;
var ALIVE_CLASSNAME = "alive";
var DEAD_CLASSNAME = "dead";
var SCROLL_RATE = 60;

var timer;
var cells;
var table;
var rows;

function initGame() {
    initDOMElements();
    setupScrolling();
    setupButtonStates();

    cells = Array.matrix(DEFAULT_SIZE,DEFAULT_SIZE);

    setupTable();
    updateTable();
}

function setupScrolling() {
    if (table.addEventListener) {
        table.addEventListener("mousewheel", MouseWheelHandler, false); // IE9, Chrome, Safari, Opera
        table.addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Firefox
    }
    // IE 6/7/8
    else table.attachEvent("onmousewheel", MouseWheelHandler);
}

function doStep() {
    generateNextState();
    advanceCellStates();
    updateTable();
}

function generateNextState() {
    var neighborCount = 0;
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {

            if(i == 0 && j == 0) { // top left corner auto expand
                if(cells[1][0].isAlive && (cells[0][1].isAlive && cells[1][1].isAlive)) {
                    cells[i][j].nextState = true;
                    expandWest();
                    expandNorth();
                    continue;
                }
            }

            else if(i == 0 && j < cells[i].length - 2) { // top row auto expand
                if(cells[i+1][j-1].isAlive && (cells[i+1][j].isAlive && cells[i+1][j+1].isAlive)) {
                    cells[i][j].nextState = true;
                    expandNorth();
                    continue;
                }
            }

            else if(i == 0 && j == cells[i].length - 1) { // top right corner auto expand
                if(cells[i][j-1].isAlive && (cells[i+1][j-1].isAlive && cells[i+1][j].isAlive)) {
                    cells[i][j].nextState = true;
                    expandNorth();
                    expandEast();
                    continue;
                }
            }

            else if(i == cells.length - 1 && j == cells[i].length - 1) { // bottom right corner auto expand
                if(cells[i][j-1].isAlive && (cells[i-1][j-1].isAlive && cells[i-1][j].isAlive)) {
                    cells[i][j].nextState = true;
                    expandEast();
                    expandSouth();
                    continue;
                }
            }

            else if(j == cells[i].length - 1) { // rightmost column auto expand
                if(cells[i-1][j-1].isAlive && (cells[i][j-1].isAlive && cells[i+1][j-1].isAlive)) {
                    cells[i][j].nextState = true;
                    expandEast();
                    continue;
                }
            }

            else if(i == cells.length - 1 && j == 0) { // bottom left corner auto expand
                if(cells[i-1][j].isAlive && (cells[i-1][j+1].isAlive && cells[i][j+1].isAlive)) {
                    cells[i][j].nextState = true;
                    expandWest();
                    expandSouth();
                    continue;
                }
            }

            else if(i == cells.length - 1) { // bottom left corner auto expand
                if(cells[i-1][j-1].isAlive && (cells[i-1][j].isAlive && cells[i-1][j+1].isAlive)) {
                    cells[i][j].nextState = true;
                    expandSouth();
                    continue;
                }
            }

            else if(j == 0) { // bottom left corner auto expand
                if(cells[i-1][j+1].isAlive && (cells[i][j+1].isAlive && cells[i+1][j+1].isAlive)) {
                    cells[i][j].nextState = true;
                    expandWest();
                    continue;
                }
            }

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

            cells[i][j].cell.onclick = cellClickHandler;
        }
        rows[i] = row;
    }
}


function expandEast() {

    for (var i = 0; i < cells.length; i++) {
        cells[i] = cells[i].concat(new cell());
        cells[i][cells[i].length-1].cell = rows[i].insertCell(cells[i].length-1);

        cells[i][cells[i].length-1].cell.y = i;
        cells[i][cells[i].length-1].cell.x = cells[i].length-1;

        cells[i][cells[i].length-1].cell.onclick = cellClickHandler;
    }

    updateTable();
}

function expandWest() {

    for (var i = 0; i < cells.length; i++) {
        cells[i] = cells[i].reverse();

        cells[i] = cells[i].concat(new cell());
        cells[i][cells[i].length-1].cell = rows[i].insertCell(cells[i].length-1);

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
    for (var i = 0; i < cells[0].length; i++) {
        cells[0][i] = new cell();
    }

    setupTable();
    updateTable();
}

function expandSouth() {

    rows = rows.concat(table.insertRow(cells.length));
    var newRow = new Array(cells[0].length);

    for (var i = 0; i < cells[0].length; i++) {
        newRow[i] = new cell();
        newRow[i].cell = rows[rows.length - 1].insertCell(i);
        newRow[i].cell.y = cells.length;
        newRow[i].cell.x = i;
        newRow[i].cell.onclick = cellClickHandler;
    }
    cells.push(newRow);
    updateTable();
}

function cell() {
    var isAlive = false;
    var nextState = false;
    var cell;
    var x;
    var y;
    this.updateCell = function() {
        this.cell.className = this.isAlive ? ALIVE_CLASSNAME : DEAD_CLASSNAME;
    };
    this.flip = function() {
        this.isAlive = !this.isAlive;
    };
}

function runButtonPushed() {
    if (!timer) {
        timer = window.setInterval(function() { doStep() }, 500);
    }

}

function stopButtonPushed() {
    window.clearInterval(timer);
    timer = null;
}

var cellClickHandler = function() {
    cells[this.y][this.x].flip();
    if(this.x == 0) {
        expandWest();
    }
    else if(this.x == cells[0].length - 1) {
        expandEast();
    }
    if(this.y == 0) {
        expandNorth();
    }
    else if(this.y == cells.length - 1) {
        expandSouth();
    }
    updateTable();
};

// Mouse wheel zoom magic
// http://www.sitepoint.com/html5-javascript-mouse-wheel/
function MouseWheelHandler(e) {
    e.preventDefault();
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    table.style.width = table.offsetWidth + SCROLL_RATE * delta + "px";
    table.style.height = table.offsetWidth + SCROLL_RATE * delta + "px";
    return false;
}

function setupButtonStates() {
    document.getElementById("stopButton").isDisabled = true;
}

function initDOMElements() {
    table = document.getElementById("grid");
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












