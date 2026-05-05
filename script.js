let startTime = 0;
let elapsedTime = 0;
let interval = null;
let lapCount = 0;

const sound = document.getElementById("clickSound");

// 🔊 phát âm thanh
function playSound() {
  sound.currentTime = 0;
  sound.play();
}

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  let milliseconds = Math.floor((ms % 1000) / 10);

  return (
    String(minutes).padStart(2, '0') + ":" +
    String(seconds).padStart(2, '0') + "." +
    String(milliseconds).padStart(2, '0')
  );
}

function updateTime() {
  elapsedTime = Date.now() - startTime;
  document.getElementById("time").innerText = formatTime(elapsedTime);
}

// ▶️ Start / Pause
function start() {
  playSound();

  if (interval) {
    clearInterval(interval);
    interval = null;
    document.getElementById("startBtn").innerText = "Start";
  } else {
    startTime = Date.now() - elapsedTime;
    interval = setInterval(updateTime, 10);
    document.getElementById("startBtn").innerText = "Stop";
  }
}

// 🔄 Reset
function reset() {
  playSound();

  clearInterval(interval);
  interval = null;
  elapsedTime = 0;
  lapCount = 0;

  document.getElementById("time").innerText = "00:00.00";
  document.getElementById("laps").innerHTML = "";
  document.getElementById("startBtn").innerText = "Start";
}

// 🧠 Lap
function lap() {
  if (!interval) return;

  playSound();

  lapCount++;
  let li = document.createElement("li");
  li.innerText = "Lap " + lapCount + " - " + formatTime(elapsedTime);

  document.getElementById("laps").prepend(li);
}