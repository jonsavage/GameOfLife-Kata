QUnit.test( "initGame initializes cell array to correct size", function( assert ) {
    initGame();

    assert.ok( cells.length == DEFAULT_SIZE, "Passed!", "failed" );
});

QUnit.test( "initGame initializes each element in cells with a cell", function( assert ) {

    initGame();

    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            assert.ok( typeof cells[i][j] == "cell", "Passed!", "failed" );
        }
    }
});

