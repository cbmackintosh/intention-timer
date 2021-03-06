var currentActivity;
var activityCards = [];

var formContainer = document.querySelector(".form-container");
var timerPage = document.querySelector(".timer-page");
var allCategoryButtons = document.querySelector(".category-buttons");
var studyButton = document.querySelector(".icon-study");
var exerciseButton = document.querySelector(".icon-exercise");
var meditateButton = document.querySelector(".icon-meditate");
var activityTask = document.querySelector(".activity-task");
var activityMinutes = document.querySelector(".activity-minutes");
var activitySeconds = document.querySelector(".activity-seconds");
var startActivityButton = document.querySelector(".start-activity");
var buttonError = document.querySelector(".button-error");
var activityError = document.querySelector(".activity-error");
var minutesError = document.querySelector(".minutes-error");
var secondsError = document.querySelector(".seconds-error");
var timerActivityDescription = document.querySelector(".timer-activity-description");
var timer = document.querySelector(".time");
var startTimerButton = document.querySelector(".timer-circle-copy");
var logActivityButton = document.querySelector(".timer-log-button");
var newActivityButton = document.querySelector(".create-new-activity-button");
var pastActivityCards = document.querySelector(".past-activity-log");
var emptyLog1 = document.querySelector('.empty-log1');
var emptyLog2 = document.querySelector('.empty-log2');

window.addEventListener("load", checkLocalStorage);
window.addEventListener("load", deselectAllCategoryButtons);
startActivityButton.addEventListener("click", startActivityFunc);
startTimerButton.addEventListener("click", startTimer);
logActivityButton.addEventListener("click", saveActivityToLocalStorage);
newActivityButton.addEventListener("click", resetForm);

allCategoryButtons.addEventListener("click", function (event) {
  if (event.target.className === "icon-study" || event.target.className === "icon study") {
    selectButton("study");
    deselectButton("exercise");
    deselectButton("meditate");
  } else if (event.target.className === "icon-exercise" || event.target.className === "icon exercise") {
    deselectButton("study");
    selectButton("exercise");
    deselectButton("meditate");
  } else if (event.target.className === "icon-meditate" || event.target.className === "icon meditate") {
    deselectButton("study");
    deselectButton("exercise");
    selectButton("meditate");
  }
})

function resetForm() {
  showElement(formContainer);
  hideElement(timerPage);
  formContainer.reset();
  hideErrorMessages();
  deselectAllCategoryButtons();
}

function selectButton(activity) {
  document.querySelector(`img.${activity}`).classList.add("hidden");
  document.querySelector(`img.${activity}-active`).classList.remove("hidden");
  document.querySelector(`.icon-${activity}`).classList.add(`icon-${activity}-active`);
  document.querySelector(`.icon-${activity}`).disabled = true;
}

function deselectButton(activity) {
  document.querySelector(`img.${activity}`).classList.remove("hidden");
  document.querySelector(`img.${activity}-active`).classList.add("hidden");
  document.querySelector(`.icon-${activity}`).classList.remove(`icon-${activity}-active`);
  document.querySelector(`.icon-${activity}`).disabled = false;
}

function deselectAllCategoryButtons() {
  deselectButton("exercise");
  deselectButton("meditate");
  deselectButton("study");
}

function findSelectedCategory() {
  if (studyButton.disabled === true) {
    return "study";
  } else if (exerciseButton.disabled === true) {
    return "exercise";
  } else if (meditateButton.disabled === true) {
    return "meditate";
  } else {
    return null;
  }
}

function startActivityFunc() {
  if (findSelectedCategory() === null || !activityTask.value || !activityMinutes.value || !activitySeconds.value || (activityMinutes.value === '0' && activitySeconds.value === '0')) {
    buttonErrorMessage();
    activityErrorMessage();
    minutesErrorMessage();
    secondsErrorMessage();
  } else {
    currentActivity = new Activity(findSelectedCategory(), activityTask.value, activityMinutes.value, activitySeconds.value, false);
    displayTimerPage();
  }
}

function buttonErrorMessage() {
  if (findSelectedCategory() === null) {
    showElement(buttonError);
  } else {
    hideElement(buttonError);
  }
}

function activityErrorMessage() {
  if (!activityTask.value) {
    showElement(activityError);
    activityTask.classList.add("warning-line");
  } else {
    hideElement(activityError);
    activityTask.classList.remove("warning-line");
  }
}

function minutesErrorMessage() {
  if (!activityMinutes.value || (activityMinutes.value === '0' && activitySeconds.value === '0')) {
    showElement(minutesError);
    activityMinutes.classList.add("warning-line");
  } else {
    hideElement(minutesError);
    activityMinutes.classList.remove("warning-line");
  }
}

function secondsErrorMessage() {
  if (!activitySeconds.value || (activityMinutes.value === '0' && activitySeconds.value === '0')) {
    showElement(secondsError);
    activitySeconds.classList.add("warning-line");
  } else {
    hideElement(secondsError);
    activitySeconds.classList.remove("warning-line");
  }
}

function displayTimerPage() {
  logActivityButton.disabled = false;
  logActivityButton.classList.remove('button-disabled');
  startTimerButton.disabled = false;
  startTimerButton.innerText = "START";
  hideElement(formContainer);
  showElement(timerPage);
  hideElement(logActivityButton);
  hideElement(newActivityButton);
  timerActivityDescription.innerText = activityTask.value;
  formatTimer(activityMinutes.value, activitySeconds.value);
  changeTimerColor()
}

function changeTimerColor() {
  if (currentActivity.category === "study") {
    document.querySelector(".timer-circle-outline").classList.add("study-color");
  } else if (currentActivity.category === "exercise") {
    document.querySelector(".timer-circle-outline").classList.add("exercise-color");
  } else if (currentActivity.category === "meditate") {
    document.querySelector(".timer-circle-outline").classList.add("meditate-color");
  }
}

function clearPastActivityCards() {
  pastActivityCards.innerHTML = '';
}

function showComplete() {
  startTimerButton.innerText = `COMPLETE!`
}

function startTimer() {
  startTimerButton.disabled = true;
  var clickSound = new Audio("assets/click2.mp3");
  clickSound.play();
  var interval = setInterval(function () {
    if (currentActivity.completed === false) {
      currentActivity.countdown();
    } else {
      clearInterval(interval);
    }
  }, 1000);
}

function saveActivityToLocalStorage() {
  logActivityButton.disabled = true;
  logActivityButton.classList.add('button-disabled');
  currentActivity.saveToStorage();
}

function showMyLog() {
  var cards = JSON.parse(localStorage.getItem("activityCards"));
  if (cards != null) {
    for (let i = 0; i < cards.length; i++) {
      pastActivityCards.innerHTML += `
      <div class="card-container">
        <div class="card-header">
          <p class="card-category">${cards[i].category}</p>
          <p class="card-duration">${cards[i].savedMinutes} MIN : ${adjustSeconds(cards[i].savedSeconds)} SEC</p>
          <p class="card-body">${cards[i].description}</p>
        </div>
          <div class = "sliver sliver-${cards[i].category}"></div>
        </div>
      </div>
      `
    }
  }
}

function checkLocalStorage() {
  if (!JSON.parse(localStorage.getItem("activityCards"))) {
    activityCards = [];
    showElement(emptyLog1);
    showElement(emptyLog2);
  } else {
    activityCards = JSON.parse(localStorage.getItem('activityCards'));
    hideElement(emptyLog1);
    hideElement(emptyLog2);
    showMyLog();
  }
}

function formatTimer(minutes, seconds) {
  timer.innerText = `${minutes}:${adjustSeconds(seconds)}`;
}

function adjustSeconds(seconds) {
  if (seconds < 10) {
    return '0' + seconds;
  } else {
    return seconds;
  }
}

function hideErrorMessages() {
  hideElement(buttonError);
  hideElement(activityError);
  hideElement(minutesError);
  hideElement(secondsError);
  activityTask.classList.remove('warning-line');
  activityMinutes.classList.remove('warning-line');
  activitySeconds.classList.remove('warning-line');
}

function hideElement(element) {
  element.classList.add("hidden");
}

function showElement(element) {
  element.classList.remove("hidden");
}
