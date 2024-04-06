// reminder: require has no god in this world
const lapsCounter = document.getElementById('lapsCounter');
const timeDisplay = document.getElementById('time');

const startButton = document.getElementById('start');
const lapButton = document.getElementById('lap');
const pauseButton = document.getElementById('pause');
const finishButton = document.getElementById('finish');
const showLapsButton = document.getElementById('showlaps');

const modal = document.getElementById('modal');
const modalLapTimes = document.getElementById('modalLapTimes');
const modalLapCopyBtn = document.getElementById('modalCopyBtn');
const modalCloseBtn = document.getElementById('modalCloseBtn');

let startTime, elapsed = 0, timerInterval, lapTimes = [];

// supporting functions
function updateTimeDisplay() {
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = elapsed % 1000;
    timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}
function resetStopwatch() {
    stopTimer();
    elapsed = 0;
    updateTimeDisplay();
    lapTimes = []
    lapsCounter.innerHTML = 'Laps recorded: 0';
}

// core functionality of a stopwatch that doesnt suck
function startTimer() {
    startTime = Date.now() - elapsed;
    timerInterval = setInterval(() => {
        elapsed = Date.now() - startTime;
        updateTimeDisplay();
    }, 10);
    startButton.style.display = 'none';
    pauseButton.style.display = 'block';
}
function stopTimer() {
    clearInterval(timerInterval);
    pauseButton.style.display = 'none';
    startButton.style.display = 'block';
}
function logLap(optionalSuffix = '') {
    const lapTime = timeDisplay.textContent + optionalSuffix;
    lapTimes.push(lapTime);
    lapsCounter.innerHTML = `Laps Recorded: ${lapTimes.length}`;
}
function finishTiming() {
    if (!lapTimes || lapTimes.length < 1) return;
    logLap(' // fin');
    showLapCopyPrompt();
    if (lapTimes[0]) console.log(lapTimes.join("\n"));
    resetStopwatch();
}

// lap time modal code
function showLapCopyPrompt() {
    modal.style.display = "block";
    modalLapTimes.textContent = `Laps to Copy: ${lapTimes.length}`;
}
function hideModal() {
    modal.style.display = "none";
}
function copyLapTimes() {
    navigator.clipboard.writeText(lapTimes.join('\n')).then(() => {
        alert('Lap times copied to clipboard!');
        hideModal();
    }, () => {
        alert('Failed to copy lap times.');
    });
}

// UI element callbacks for simple usage
startButton.addEventListener('click', () => {
    startTimer();
});
pauseButton.addEventListener('click', () => {
    stopTimer();
});
lapButton.addEventListener('click', () => {
    logLap();
});
finishButton.addEventListener('click', () => {
    finishTiming();
});
showLapsButton.addEventListener('click', () => {
    if (lapTimes.length > 0)
        showLapCopyPrompt();
    else
        alert('No previous laps exist!');
});
modalLapCopyBtn.addEventListener('click', () => {
    copyLapTimes();
});
modalCloseBtn.addEventListener('click', () => {
    hideModal();
});

// Listen to preload hooks for msgs from main (global hotkey activation)
window.pocketwatch.onLapKey(() => {
    logLap();
    console.log('rend: lapkey received');
})
// window.pocketwatch.onStartKey(startTimer)
// window.pocketwatch.onPauseKey(stopTimer)
// window.pocketwatch.onFinishKey(yourMom)