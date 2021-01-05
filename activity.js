class Activity {
  constructor(category, description, minutes, seconds, completed, id) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = completed;
    this.id = id;
  }

  countdown(minutes, seconds) {
    // get minutes and seconds from form
    // use those in setInterval
  }

  markComplete() {

  }

  saveToStorage() {

  }
};

module.exports = Activity;
