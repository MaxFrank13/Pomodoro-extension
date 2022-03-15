// Selectors

const main = document.querySelector("main");

// Button
const studyBtn = document.querySelector(".study");
const breakBtn = document.querySelector(".break");
const resetBtn = document.querySelector(".reset");

// Timer
const timer = document.querySelector(".timer");

// Interval & Cycle
let countdown;
let currentCycle;

// Button Listeners
studyBtn.addEventListener("click", (e) => {
  if (!countdown) {
    currentCycle = {
      name: "study",
      duration: 25,
    };
    init(currentCycle);
  }
});
breakBtn.addEventListener("click", (e) => {
  if (!countdown) {
    currentCycle = {
      name: "break",
      duration: 5,
    };
    init(currentCycle);
  }
});
resetBtn.addEventListener("click", (e) => {
  main.classList.remove("on-break", "on-study");
  clearInterval(countdown);
  countdown = null;
  timer.innerHTML = `
    <div class="minutes">
        <h3>25</h3>
        <span>min</span>
    </div>
    <div class="seconds">
        <h3>00</h3>
        <span>sec</span>
    </div>`;
});

// Initialize Timing System
function init(cycle) {
  switch (cycle.name) {
    case "study":
      main.classList.remove("on-break");
      main.classList.add("on-study");
      startTimer(cycle.duration);
      break;
    case "break":
      main.classList.remove("on-study");
      main.classList.add("on-break");
      startTimer(cycle.duration);
      break;
  }
}

function startTimer(cycleDuration) {
  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();
  let tempHours = tempDate.getHours();
  let tempMinutes = tempDate.getMinutes();
  let tempSeconds = tempDate.getSeconds();

  const futureDate = new Date(
    tempYear,
    tempMonth,
    tempDay,
    tempHours,
    tempMinutes + cycleDuration,
    tempSeconds
  );
  const futureTime = futureDate.getTime();

  function getRemaining() {
    const today = new Date().getTime();

    const t = futureTime - today;

    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    if (minutes < 0) {
      clearInterval(countdown);
      currentCycle.name === "study"
        ? (currentCycle = {
            name: "break",
            duration: 5,
          })
        : (currentCycle = {
            name: "study",
            duration: 25,
          });
      init(currentCycle);
    } else {
      timer.innerHTML = `
                <div class="minutes">
                    <h3>${minutes}</h3>
                    <span>min</span>
                </div>
                <div class="seconds">
                    <h3>${seconds}</h3>
                    <span>sec</span>
                </div>`;
    }
  }
  getRemaining();
  countdown = setInterval(getRemaining, 1000);
}
