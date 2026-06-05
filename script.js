let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

function formatTime(ms) {
    let hrs = Math.floor(ms / 3600000);
    let mins = Math.floor((ms % 3600000) / 60000);
    let secs = Math.floor((ms % 60000) / 1000);
    let centiseconds = Math.floor((ms % 1000) / 10);

    return (
        (hrs < 10 ? "0" : "") + hrs + ":" +
        (mins < 10 ? "0" : "") + mins + ":" +
        (secs < 10 ? "0" : "") + secs + "." +
        (centiseconds < 10 ? "0" : "") + centiseconds
    );
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startPauseBtn.addEventListener('click', () => {
    if (!isRunning) {
        // Start state
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Updates roughly every 10ms
        
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.className = 'btn pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
        isRunning = true;
    } else {
        // Pause state
        clearInterval(timerInterval);
        startPauseBtn.textContent = 'Start';
        startPauseBtn.className = 'btn start';
        isRunning = false;
    }
});

lapBtn.addEventListener('click', () => {
    lapCount++;
    const li = document.createElement('li');
    li.innerHTML = `<span class="lap-number">Lap ${lapCount}</span> <span>${formatTime(elapsedTime)}</span>`;
    lapsList.prepend(li); // Adds the newest lap to the top of the list
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    lapCount = 0;
    
    display.textContent = "00:00:00.00";
    startPauseBtn.textContent = 'Start';
    startPauseBtn.className = 'btn start';
    
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapsList.innerHTML = ''; // Clear lap records
});