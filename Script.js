
// HTML elements
const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapList = document.getElementById("lapList");

// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let timer = null;
let lapCount = 0;

// Time format function
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 60000) % 60);
    const hours = Math.floor(time / 3600000);

    return (
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0") + "." +
        String(milliseconds).padStart(2, "0")
    );
}

// Update stopwatch display
function updateDisplay() {
    const currentTime = elapsedTime + (timer ? performance.now() - startTime : 0);
    display.textContent = formatTime(currentTime);
}

// Start stopwatch
function startStopwatch() {
    if (timer !== null) return;

    startTime = performance.now();

    timer = setInterval(updateDisplay, 10);

    updateDisplay();
}

// Pause stopwatch
function pauseStopwatch() {
    if (timer === null) return;

    elapsedTime += performance.now() - startTime;

    clearInterval(timer);
    timer = null;

    updateDisplay();
}

// Reset stopwatch
function resetStopwatch() {
    clearInterval(timer);

    timer = null;
    startTime = 0;
    elapsedTime = 0;
    lapCount = 0;

    display.textContent = "00:00:00.00";
    lapList.innerHTML = "";
}

// Record lap time
function recordLap() {
    if (timer === null) return;

    const currentTime = elapsedTime + (performance.now() - startTime);

    lapCount++;

    const lapItem = document.createElement("li");

    const lapName = document.createElement("span");
    lapName.textContent = "Lap " + lapCount;

    const lapTime = document.createElement("span");
    lapTime.textContent = formatTime(currentTime);

    lapItem.appendChild(lapName);
    lapItem.appendChild(lapTime);

    lapList.prepend(lapItem);
}

// Button events
startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", recordLap);

