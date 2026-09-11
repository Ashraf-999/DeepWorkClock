const goalInput = document.querySelector("#goalInput");
const rewardInput = document.querySelector("#rewardInput");
const timeInput = document.querySelector("#timeInput");
const startButton = document.querySelector("#start");
const setupScreen = document.querySelector("#setup-screen");
const timerScreen = document.querySelector("#timer-screen");
const EndScreen = document.querySelector("#complete-screen");
const goal = document.querySelector("#CurrGoal");
const reward = document.querySelector("#CurrReward");
const timeLeft = document.querySelector("#timeLeft");
const percentage = document.querySelector("#percentage");
const progressFill = document.querySelector(".progress-fill");
const endGoal = document.querySelector("#endGoal");
const endReward = document.querySelector("#endReward");
const breakCheckBox = document.querySelector("#breakToggle");
const breakDuration = document.querySelector("#breakInput");
const breakAfter = document.querySelector("#breakAfterInput");
const breakTime = document.querySelector("#breakTime");
const breakTrack = document.querySelector(".break-track");
const breakFill = document.querySelector(".break-fill");
const breakModule = document.querySelector("#breakModule");
const breakPercentage = document.querySelector("#breakPercentage");
const breakPercentageModule = document.querySelector("#breakPercentageModule");
const alarmSound = document.querySelector("#alarm");
const rewardSound = document.querySelector("#rewardSound");

let breakAfterValue;

navigator.wakeLock.request("screen");

function timer(time, var1, var2, var3, bool, var4) {
    function Break(breakDuration, timeAfterBreak) {
        breakTrack.classList.remove("hidden");
        breakModule.classList.remove("hidden");
        breakPercentageModule.classList.remove("hidden");
        timer(breakDuration, breakTime, breakPercentage, breakFill, false, timeAfterBreak);
    };

    let timeInSeconds = time;
    let totalBreakTime = Number(breakDuration.value * 60);
    let remainingTime = 0;

    if (var4 != undefined) {
        remainingTime = var4;
    }
    
    if (bool == true) {
        const totalTime = Number(timeInput.value * 60);

        timerInterval = setInterval(() => {
            timeInSeconds--;
            remainingTime = timeInSeconds;
            let minutes = Math.floor(timeInSeconds / 60);
            let seconds = timeInSeconds % 60;
            let percentageFilled = `${Math.floor(((totalTime - timeInSeconds) / totalTime) * 100)}%`;

            var1.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            var2.textContent = percentageFilled;
            var3.style.width = percentageFilled;
 
            if (timeInSeconds <= 0) {
                clearInterval(timerInterval);

                setTimeout(() => {
                    rewardSound.play();
                    timerScreen.classList.add("hidden");
                    EndScreen.classList.remove("hidden");
                    endGoal.textContent = goalInput.value;
                    endReward.textContent = rewardInput.value;
                }, 1000);
            };

            if (breakCheckBox.checked && breakAfterValue == totalTime - timeInSeconds) {
                alarmSound.play();
                breakAfterValue = breakAfterValue * 2;
                Break(breakDuration.value * 60, remainingTime);
                clearInterval(timerInterval);
            };
        }, 1000);

    };

    if (bool == false) {
        
        let timerInterval = setInterval(() => {
            timeInSeconds--;
            let minutes = Math.floor(timeInSeconds / 60);
            let seconds = timeInSeconds % 60;
            let percentageFilled = `${Math.floor(((totalBreakTime - timeInSeconds) / totalBreakTime) * 100)}%`;

            var1.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            var2.textContent = percentageFilled;
            var3.style.width = percentageFilled;

            if (timeInSeconds <= 0) {
                alarmSound.play();
                clearInterval(timerInterval);
                breakTrack.classList.add("hidden");
                breakFill.style.width = "0%";
                breakModule.classList.add("hidden");
                breakPercentageModule.classList.add("hidden");
                timer(remainingTime, timeLeft, percentage, progressFill, true)
            };
        },  1000);

    };
};


startButton.addEventListener("click", () => {
    event.preventDefault();

    alarmSound.volume = 0;

    alarmSound.play().then(() => {
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmSound.volume = 1;
    });

    rewardSound.volume = 0;

    rewardSound.play().then(() => {
        rewardSound.pause();
        rewardSound.currentTime = 0;
        rewardSound.volume = 1;
    });

    const time = Number(timeInput.value * 60);
    breakAfterValue = Number(breakAfter.value * 60);

   
    setupScreen.classList.add("hidden");
    timerScreen.classList.remove("hidden");
    goal.textContent = goalInput.value;
    reward.textContent = "LOCKED: " + "[" + rewardInput.value + "]";
    timer(time, timeLeft, percentage, progressFill, true);

    
})

