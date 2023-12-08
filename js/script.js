let remainingTime;
let countdownInterval;
let isTimerRunning = false;

function displayInstructions() {
    const instructionsContainer = document.getElementById('instructions-container');
    instructionsContainer.style.display = 'block';
}

function updateTimer() {
    // Calculate the remaining days, hours, minutes, and seconds
    const remainingDays = Math.floor(remainingTime / (24 * 60 * 60));
    const remainingHours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
    const remainingMinutes = Math.floor((remainingTime % (60 * 60)) / 60);
    const remainingSeconds = remainingTime % 60;

    // Update the display boxes with the remaining time
    document.getElementById('display-days').innerHTML = '<div>' + remainingDays.toString().padStart(2, '0') + '<span>days</span></div>';
    document.getElementById('display-hours').innerHTML = '<div>' + remainingHours.toString().padStart(2, '0') + '<span>hours</span></div>';
    document.getElementById('display-minutes').innerHTML = '<div>' + remainingMinutes.toString().padStart(2, '0') + '<span>minutes</span></div>';
    document.getElementById('display-seconds').innerHTML = '<div>' + remainingSeconds.toString().padStart(2, '0') + '<span>seconds</span></div>';

    // If the remaining time reaches zero, stop the timer
    if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        if (isTimerRunning) {
            alert('Countdown completed.');
            isTimerRunning = false;
        }
        resetTimer();
    } else {
        remainingTime--; // Decrease the remaining time by 1 second
    }
}

function setTimer() {
    const daysInput = parseInt(document.getElementById('input-days').value) || 0;
    const hoursInput = parseInt(document.getElementById('input-hours').value) || 0;
    const minutesInput = parseInt(document.getElementById('input-minutes').value) || 0;
    const secondsInput = parseInt(document.getElementById('input-seconds').value) || 0;

    // Calculate the total remaining time in seconds
    remainingTime = ((daysInput * 24 + hoursInput) * 60 + minutesInput) * 60 + secondsInput;

    clearInterval(countdownInterval);
    updateTimer(); // Update the timer immediately
}

function startTimer() {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(updateTimer, 1000); // Update the timer every second
    isTimerRunning = true;
}

function pauseTimer() {
    clearInterval(countdownInterval);
    isTimerRunning = false;
}

function resetTimer() {
    clearInterval(countdownInterval);
    remainingTime = 0;
    document.getElementById('input-days').value = '';
    document.getElementById('input-hours').value = '';
    document.getElementById('input-minutes').value = '';
    document.getElementById('input-seconds').value = '';
    updateTimer(); // Update the timer immediately
    isTimerRunning = false;
}

document.getElementById('setTimer').addEventListener('click', setTimer);
document.getElementById('start-resume').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);