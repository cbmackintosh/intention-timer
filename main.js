
var currentActivity;
var activityCards = [];
var formContainer = document.querySelector('.form-container');
var timerPage = document.querySelector('.timer-page');

var allCategoryButtons = document.querySelector('.category-buttons');
var studyButton = document.querySelector('.icon-study');
var exerciseButton = document.querySelector('.icon-exercise');
var meditateButton = document.querySelector('.icon-meditate');

var activityTask = document.querySelector('.activity-task');
var activityMinutes = document.querySelector('.activity-minutes');
var activitySeconds = document.querySelector('.activity-seconds');
var startActivityButton = document.querySelector('.start-activity');
var startStopButton = document.querySelector('.start-stop-button');

//var activityErrorMessage = document.querySelector('.activity-error'); delete?
var buttonError = document.querySelector('.button-error');
var activityError = document.querySelector('.activity-error');
var minutesError = document.querySelector('.minutes-error');
var secondsError = document.querySelector('.seconds-error');

var lineError = document.querySelector('.warning-line');

var timerActivityDescription = document.querySelector('.timer-activity-description');
var timer = document.querySelector('.time');
var startTimerButton = document.querySelector('.timer-circle-copy');
var logActivityButton = document.querySelector('.timer-log-button')
var newActivityButton = document.querySelector('.create-new-activity-button')

var pastActivityCards = document.querySelector('.past-activity-log')

window.addEventListener('load', checkLocalStorage);
startActivityButton.addEventListener('click', startActivityFunc);
startTimerButton.addEventListener('click', startTimer);
logActivityButton.addEventListener('click', saveActivityToLocalStorage)
newActivityButton.addEventListener('click', resetForm);

function resetForm() {
  formContainer.classList.remove('hidden');
  timerPage.classList.add('hidden');
  activityTask.value = '';
  activityMinutes.value = '';
  activitySeconds.value = '';
  deselectButton('exercise');
  deselectButton('meditate');
  deselectButton('study');
}


allCategoryButtons.addEventListener('click', function (event) {
  if (event.target.className === 'icon-study' || event.target.className === 'icon study') {
    selectButton('study');
    deselectButton('exercise');
    deselectButton('meditate');
  } else if (event.target.className === 'icon-exercise' || event.target.className === 'icon exercise') {
    deselectButton('study');
    selectButton('exercise');
    deselectButton('meditate');
  } else if (event.target.className === 'icon-meditate' || event.target.className === 'icon meditate') {
    deselectButton('study');
    deselectButton('exercise');
    selectButton('meditate');
  }
});


function selectButton(activity) {
  document.querySelector(`img.${activity}`).classList.add('hidden');
  document.querySelector(`img.${activity}-active`).classList.remove('hidden');
  document.querySelector(`.icon-${activity}`).classList.add(`icon-${activity}-active`);
  currentActivity = activity;
};

function deselectButton(activity) {
  document.querySelector(`img.${activity}`).classList.remove('hidden');
  document.querySelector(`img.${activity}-active`).classList.add('hidden');
  document.querySelector(`.icon-${activity}`).classList.remove(`icon-${activity}-active`);
};

function startActivityFunc() {
  if (!currentActivity || !activityTask.value || !activityMinutes.value || !activitySeconds.value) {
    buttonErrorMessage();
    activityErrorMessage();
    minutesErrorMessage();
    secondsErrorMessage();
  } else {
    currentActivity = new Activity(currentActivity, activityTask.value, activityMinutes.value, activitySeconds.value, false);
    displayTimerPage();
  }
};

function buttonErrorMessage() {
  if (!currentActivity) {
    showElement(buttonError);
  } else {
    hideElement(buttonError);
  }
};

function activityErrorMessage() {
  if (!activityTask.value) {
    showElement(activityError);
    activityTask.classList.add('warning-line')
  } else {
    hideElement(activityError);
    activityTask.classList.remove('warning-line')
  }
};

function minutesErrorMessage() {
  if (!activityMinutes.value) {
    showElement(minutesError);
    activityMinutes.classList.add('warning-line')
  } else {
    hideElement(minutesError);
    activityMinutes.classList.remove('warning-line')
  }
};

function secondsErrorMessage() {
  if (!activitySeconds.value) {
    showElement(secondsError);
    activitySeconds.classList.add('warning-line')
  } else {
    hideElement(secondsError);
    activitySeconds.classList.remove('warning-line')
  }
};

function displayTimerPage() {
  startTimerButton.disabled = false;
  startTimerButton.innerText = 'START';
  formContainer.classList.add('hidden');
  timerPage.classList.remove('hidden');
  logActivityButton.classList.add('hidden');
  newActivityButton.classList.add('hidden');
  timerActivityDescription.innerText = activityTask.value;
  if (activitySeconds.value < 10) {
    timer.innerText = `${activityMinutes.value}:0${activitySeconds.value}`;
  } else {
    timer.innerText = `${activityMinutes.value}:${activitySeconds.value}`;
  }
  changeTimerColor()
};

function changeTimerColor() {
  if (currentActivity.category === 'study') {
    document.querySelector('.timer-circle-outline').classList.add('study-color');
  } else if (currentActivity.category === 'exercise') {
    document.querySelector('.timer-circle-outline').classList.add('exercise-color');
  } else if (currentActivity.category === 'meditate') {
    document.querySelector('.timer-circle-outline').classList.add('meditate-color');
  }
};

function startTimer() {
  startTimerButton.disabled = true;
  var interval = setInterval(function () {
    if (currentActivity.completed === false) {
      currentActivity.countdown()
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

function saveActivityToLocalStorage() {
  activityCards.push(currentActivity)
  localStorage.setItem('activityCards', JSON.stringify(activityCards));
  pastActivityCards.innerHTML = '';
  showMyLog();
};

function showMyLog() {
  var cards = JSON.parse(localStorage.getItem('activityCards'));
  if (cards != null) {
    for (i = 0; i < cards.length; i++) {
      pastActivityCards.innerHTML += `
      <div class='card-container'>
        <div class='card-header'>
          <p class='card-category'>${cards[i].category}</p>
          <p class="card-duration">${cards[i].savedMinutes} MIN : ${adjustSeconds(cards[i].savedSeconds)} SEC</p>
          <p class="card-body">${cards[i].description}</p>
        </div>
          <div class = "sliver sliver-${cards[i].category}"></div>
        </div>
      </div>
      `
    }
  }
};

function checkLocalStorage() {
  if (!JSON.parse(localStorage.getItem('activityCards'))) {
    activityCards = [];
  } else {
    activityCards = JSON.parse(localStorage.getItem('activityCards'));
    showMyLog();
  }
}

function adjustSeconds(seconds) {
  if (seconds < 10) {
    return '0'+ seconds
  } else {
    return seconds;
  }
};

function hideElement(element) {
  element.classList.add('hidden');
};

function showElement(element) {
  element.classList.remove('hidden');
};
