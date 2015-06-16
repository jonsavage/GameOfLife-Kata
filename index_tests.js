QUnit.test( "test InitGame", function( assert ) {
    initGame();

    assert.ok( cells[0][0].isAlive == false, "Passed!", "failed" );
});

//QUnit.test( "hello test", function( assert ) {
//    var myCell = cell;
//
//    setName("jon");
//
//    assert.ok( getName() == "jon", "Passed!", "failed" );
//});

