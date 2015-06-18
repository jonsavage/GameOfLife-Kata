var grid;

var runButton;
var stopButton;
var timer;

function init() {
    initDOMElements();
    setupScrolling();
    setupButtonStates();
    setupSlider();

    initGame(grid);
}

function setupScrolling() {

    if (grid.addEventListener) {
        grid.addEventListener("mousewheel", MouseWheelHandler, false); // IE9, Chrome, Safari, Opera
        grid.addEventListener("DOMMouseScroll", MouseWheelHandler, false); // Firefox
    }
    // IE 6/7/8
    else grid.attachEvent("onmousewheel", MouseWheelHandler);
}

function setupButtonStates() {
    disableStopButton();
}

function initDOMElements() {
    grid = document.getElementById("grid");
    stopButton = document.getElementById("stopButton");
    runButton = document.getElementById("runButton")
}

// Mouse wheel zoom magic
// http://www.sitepoint.com/html5-javascript-mouse-wheel/
function MouseWheelHandler(e) {
    e.preventDefault();
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    grid.style.width = grid.offsetWidth + SCROLL_RATE * delta + "px";
    grid.style.height = grid.offsetWidth + SCROLL_RATE * delta + "px";
    return false;
}

function stepButtonPressed() {
    step();
}

function runButtonPushed() {
    timer = window.setInterval(function() {
        step();
    }, timerIntervalMultiplier * TIMER_INTERVAL);
    disableRunButton();
    enableStopButton();
}

function stopButtonPushed() {
    window.clearInterval(timer);
    timer = null;
    enableRunButton();
    disableStopButton();
}

function enableStopButton() {
    stopButton.disabled = false;
}

function disableStopButton() {
    if(stopButton) {
        stopButton.disabled = true;
    }
}

function disableRunButton() {
    runButton.disabled = true;
}

function enableRunButton() {
    runButton.disabled = false;
}

function expandTableButtonPushed() {
    expand();
}

// http://loopj.com/jquery-simple-slider/
function setupSlider() {
    if(document.getElementById("speedSlider")) {

        $("#speedSlider").bind("slider:changed", function (event, data) {
            timerIntervalMultiplier = data.value;

            if(timer) {
                stopButtonPushed();
                runButtonPushed();
            }
        });
    }
}