// use preload.js to bridge node modules to this runtime for security

const startButton = document.getElementById('start');
const lapButton = document.getElementById('lap');
const pauseButton = document.getElementById('pause');
const finishButton = document.getElementById('finish');
const copyButton = document.getElementById('copyButton');
const showLapsButton = document.getElementById('showlaps');

const modalLapTimes = document.getElementById('modalLapTimes');
const lapsCounter = document.getElementById('lapsCounter');
const modal = document.getElementById('modal');
const timeDisplay = document.getElementById('time');

let startTime, elapsed = 0, timerInterval, lapTimes = [];

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

function updateTimeDisplay() {
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    const seconds = Math.floor((elapsed % 60000) / 1000);
    const milliseconds = elapsed % 1000;
    timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
}

function logLap(optionalSuffix = '') {
    const lapTime = timeDisplay.textContent + optionalSuffix;
    lapTimes.push(lapTime);
    lapsCounter.innerHTML = `Laps Recorded: ${lapTimes.length}`;
}

function resetStopwatch() {
    stopTimer();
    startTime = undefined;
    elapsed = 0;
    updateTimeDisplay();
    lapsCounter.innerHTML = 'Laps recorded: 0';
}

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
    if (!lapTimes || lapTimes.length < 1) return;
    stopTimer();
    logLap(' (fin)');
    showModal();
    resetStopwatch();
});

showLapsButton.addEventListener('click', () => {
    if (lapTimes.length > 0)
        showModal();
    else
        alert('No previous laps exist!');
});

// lap time modal addition

function showModal() {
    modal.style.display = "block";
    // TODO: this should just be Laps to Copy: X
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

// Example usage
copyButton.addEventListener('click', copyLapTimes);
