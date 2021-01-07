
// input fields for activity, minutes, and seconds
// collect that information on submit, with guards against anything other than numbers in the two latter

// start activity button is submit -- update data model with instance of activity class
// Activity class needs category, description, minutes, seconds, completed, id
// on click of start activity, hide form and show timer view -- circle on timer should have same color as category
// will need to create timer view in html

// error handling for button -- don't let user submit if not all info is complete, but only clear
// fields if submit is performed

var currentActivity;

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

var timerActivityDescription = document.querySelector('.timer-activity-description');
var timer = document.querySelector('.time');

startActivityButton.addEventListener('click', startActivityFunc)

// event listener for buttons (change color of font and change image)
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
})

function selectButton(activity) {
  document.querySelector(`img.${activity}`).classList.add('hidden');
  document.querySelector(`img.${activity}-active`).classList.remove('hidden');
  document.querySelector(`.icon-${activity}`).classList.add(`icon-${activity}-active`);
  currentActivity = activity;
}

function deselectButton(activity) {
  document.querySelector(`img.${activity}`).classList.remove('hidden');
  document.querySelector(`img.${activity}-active`).classList.add('hidden');
  document.querySelector(`.icon-${activity}`).classList.remove(`icon-${activity}-active`);
}

function startActivityFunc() {
  var activity = new Activity(currentActivity, activityTask.value, activityMinutes.value, activitySeconds.value, false);
  displayTimerPage();
}

function displayTimerPage() {
  formContainer.classList.add('hidden');
  timerPage.classList.remove('hidden');
  timerActivityDescription.innerText = activityTask.value;
  if (activitySeconds.value < 10) {
    timer.innerText = `${activityMinutes.value}:0${activitySeconds.value}`;
  } else {
    timer.innerText = `${activityMinutes.value}:${activitySeconds.value}`;
  }
}

/*
// ======================================
startActivityButton.addEventListener('click', function(e) {
  e.preventDefault();
  console.log(e)

  var slug = slugify(activityTask.value)
  console.log(activityTask.value)

  // put this into an array for cards on the past activities section
  // var newActivity = new Activity('study', activityTask.value, activityMinutes.value, activitySeconds.value, false, slug)
  // console.log(newActivity)

  document.querySelector('.activity-status').innerHTML = `Current Activity`;
  document.querySelector('.new-activity').classList.toggle('hidden');

  document.querySelector('.current-activity').classList.toggle('hidden');

  document.querySelector('.current-activity').innerHTML = `
    <section class="current-container">
      <h3>${activityTask.value}</h3>
      <h1>${activityMinutes.value}:${activitySeconds.value}</h1>

      <button class="start-stop-button" type="submit">START</button>
    </section>
  `

});
*/




/*
startActivityButton.addEventListener('click', function(event) {
  if (event.target.className === 'start-stop-button') {
    console.log('START STOP BUTTON IS FUNCTIONAL')
  }
*/

/*
})

function slugify(str) {
  return str.split(' ').join('-').toLowerCase();
}
*/
