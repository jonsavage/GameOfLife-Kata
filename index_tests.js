QUnit.test( "initGame initializes cell array to correct size", function( assert ) {
    initGame(document.getElementById("grid"));

    assert.ok( cells.length == DEFAULT_SIZE, "Passed!", "failed" );
});

QUnit.test( "initGame initializes each element in cells with a cell", function( assert ) {
    initGame(document.getElementById("grid"));

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            assert.ok(typeof cells[i][j] != "undefined", "Passed!", "failed");
        }
    }
});

QUnit.test( "Dead cells with zero neighbors stay dead", function( assert ) {
    initGame(document.getElementById("grid"));

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            assert.ok(cells[i][j].isAlive == false, "Passed!", "failed");
        }
    }

    step();

    for (i = 0; i < cells.length; i++) {
        for (j = 0; j < cells[i].length; j++) {
            assert.ok(cells[i][j].isAlive == false, "Passed!", "failed");
        }
    }
});

QUnit.test( "Dead cells with two neighbors stay dead", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[5][4].isAlive = true;
    cells[5][6].isAlive = true;

    step();

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            assert.ok(cells[i][j].isAlive == false, "Passed!", "failed");
        }
    }
});

QUnit.test( "Dead Cells with three neighbors become alive", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == true, "Passed!", "failed");
});

QUnit.test( "Dead Cells with four neighbors stays dead", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[4][5].isAlive = true;
    cells[4][5].isAlive = true;
    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Dead Cells with five neighbors stays dead", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;

    cells[4][5].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Dead Cells with six neighbors stays dead", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;
    cells[3][7].isAlive = true;

    cells[4][5].isAlive = true;
    cells[4][7].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][7].isAlive = true;


    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Dead Cells with seven neighbors stays dead", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;
    cells[3][6].isAlive = true;

    cells[4][5].isAlive = true;
    cells[4][7].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Dead Cells with eight neighbors stays dead", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;
    cells[3][6].isAlive = true;
    cells[3][7].isAlive = true;

    cells[4][5].isAlive = true;
    cells[4][7].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Alive Cells with one neighbor die", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;

    step();

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            assert.ok(cells[i][j].isAlive == false, "Passed!", "failed");
        }
    }
});

QUnit.test( "Alive Cells with two neighbors stay alive", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[5][6].isAlive == true, "Passed!", "failed");

});

QUnit.test( "Alive Cells with three neighbors stay alive", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[6][5].isAlive = true;
    cells[6][6].isAlive = true;

    step();

    assert.ok(cells[5][5].isAlive == true, "Passed!", "failed");
});

QUnit.test( "Alive Cells with four neighbors die", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[6][5].isAlive = true;
    cells[6][6].isAlive = true;
    cells[6][7].isAlive = true;


    step();

    assert.ok(cells[5][5].isAlive == true, "Passed!", "failed");

});

QUnit.test( "Alive cells with five neighbors die", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;

    cells[4][5].isAlive = true;
    cells[4][6].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Alive cells with six neighbors die", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;
    cells[3][7].isAlive = true;

    cells[4][5].isAlive = true;
    cells[4][6].isAlive = true;
    cells[4][7].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][7].isAlive = true;


    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Alive cells with seven neighbors die", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;
    cells[3][6].isAlive = true;

    cells[4][5].isAlive = true;
    cells[4][6].isAlive = true;
    cells[4][7].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Alive cells with eight neighbors die", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[3][5].isAlive = true;
    cells[3][6].isAlive = true;
    cells[3][7].isAlive = true;

    cells[4][5].isAlive = true;
    cells[4][6].isAlive = true;
    cells[4][7].isAlive = true;

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == false, "Passed!", "failed");
});

QUnit.test( "Test Stepping with blinker pattern", function( assert ) {
    initGame(document.getElementById("grid"));

    cells[5][5].isAlive = true;
    cells[5][6].isAlive = true;
    cells[5][7].isAlive = true;

    step();

    assert.ok(cells[4][6].isAlive == true, "Passed!", "failed");
    assert.ok(cells[5][6].isAlive == true, "Passed!", "failed");
    assert.ok(cells[6][6].isAlive == true, "Passed!", "failed");

    step();

    assert.ok(cells[5][5].isAlive == true, "Passed!", "failed");
    assert.ok(cells[5][6].isAlive == true, "Passed!", "failed");
    assert.ok(cells[5][7].isAlive == true, "Passed!", "failed");

});





