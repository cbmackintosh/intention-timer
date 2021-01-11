
var currentActivity;
var currentCategory; 

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

var timerActivityDescription = document.querySelector('.timer-activity-description');
var timer = document.querySelector('.time');
var startTimerButton = document.querySelector('.timer-circle-copy');
var logActivityButton = document.querySelector('.timer-log-button')
var newActivityButton = document.querySelector('.create-new-activity-button')

var pastActivityCards = document.querySelector('.past-activity-log')

logActivityButton.addEventListener('click', showMyLogs)
startActivityButton.addEventListener('click', startActivityFunc);
startTimerButton.addEventListener('click', startTimer);

formContainer.addEventListener('click', function(event) {
  if (event.target.className === 'timer-log-button') {
    showMyLogs()
  }
});


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
  currentCategory = activity;
};

function deselectButton(activity) {
  document.querySelector(`img.${activity}`).classList.remove('hidden');
  document.querySelector(`img.${activity}-active`).classList.add('hidden');
  document.querySelector(`.icon-${activity}`).classList.remove(`icon-${activity}-active`);
};

function startActivityFunc() {
  if (!currentCategory || !activityTask.value || !activityMinutes.value || !activitySeconds.value) {
    buttonErrorMessage();
    activityErrorMessage();
    minutesErrorMessage();
    secondsErrorMessage();
  } else {
    console.log(currentCategory,'cat');
    currentActivity = new Activity(currentCategory, activityTask.value, activityMinutes.value, activitySeconds.value, false);
    displayTimerPage();
    activityCards.push(currentActivity)
    // console.log(activityCards, 'this is a new card');
    // console.log(currentActivity);
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
  } else {
    hideElement(activityError);
  }
};

function minutesErrorMessage() {
  if (!activityMinutes.value) {
    showElement(minutesError);
  } else {
    hideElement(minutesError);
  }
};

function secondsErrorMessage() {
  if (!activitySeconds.value) {
    showElement(secondsError);
  } else {
    hideElement(secondsError);
  }
};

function displayTimerPage() {
  startTimerButton.disabled = false; 
  formContainer.classList.add('hidden');
  timerPage.classList.remove('hidden');
  timerActivityDescription.innerText = activityTask.value;
  if (activitySeconds.value < 10) {
    timer.innerText = `${activityMinutes.value}:0${activitySeconds.value}`;
  } else {
    timer.innerText = `${activityMinutes.value}:${activitySeconds.value}`;
  }
  changeTimerColor()
};

function changeTimerColor() {
  if (currentCategory === 'study') {
    document.querySelector('.timer-circle-outline').classList.add('study-color');
  } else if (currentCategory === 'exercise') {
    document.querySelector('.timer-circle-outline').classList.add('exercise-color');
  } else if (currentCategory === 'meditate') {
    document.querySelector('.timer-circle-outline').classList.add('meditate-color');
  }
};

function startTimer() {
  startTimerButton.disabled = true;
  setInterval(function () {
    if (currentActivity.completed === false) {
      currentActivity.countdown()   
    }
  }, 1000)
};

function showMyLogs() {
  for (var i = 0; activityCards.length; i++) {
    var card = activityCards[i];
    pastActivityCards.innerHTML = `
    <div class="card-container">
    <div class="card-header">
    <p class="card-category">${card.category}</p>
    <p class="card-duration">${card.minutes} MIN   :   ${card.seconds} SEC</p>
    <p class="card-body">${card.description}</p>
    </div>
    <div class="sliver sliver-${card.category}"></div>
    </div>
    `
  }
  // showElement(pastActivityCards) 
  // currentActivity.saveToStorage()
};


function hideElement(element) {
  element.classList.add('hidden');
};

function showElement(element) {
  element.classList.remove('hidden');
};

