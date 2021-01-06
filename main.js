
// input fields for activity, minutes, and seconds
// collect that information on submit, with guards against anything other than numbers in the two latter

// start activity button is submit -- update data model with instance of activity class
// Activity class needs category, description, minutes, seconds, completed, id
// on click of start activity, hide form and show timer view -- circle on timer should have same color as category
// will need to create timer view in html

// error handling for button -- don't let user submit if not all info is complete, but only clear
// fields if submit is performed

var activityTask = document.getElementById('activity-task');
var activityMinutes = document.getElementById('activity-minutes');
var activitySeconds = document.getElementById('activity-seconds');
var startActivityButton = document.querySelector('.start-activity');
var startStopButton = document.querySelector('.start-stop-button');

startActivityButton.addEventListener('click', function(e) {
  e.preventDefault();

  var slug = slugify(activityTask.value)
  console.log(activityTask.value)

  // put this into an array for cards on the past activities section
  var newActivity = new Activity('study', activityTask.value, activityMinutes.value, activitySeconds.value, false, slug)
  console.log(newActivity)

  document.querySelector('.activity-status').innerHTML = `Current Activity`;
  document.querySelector('.new-activity').classList.toggle('hidden');

  document.querySelector('.current-activity').classList.toggle('hidden');

});

startStopButton.addEventListener('click', function(e) {
  e.preventDefault();

  console.log('START STOP BUTTON IS FUNCTIONAL')
})

function slugify(str) {
  return str.split(' ').join('-')
}
