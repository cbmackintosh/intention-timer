class Activity {
  constructor(category, description, minutes, seconds, completed) {
    this.category = category;
    this.description = description;
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
    this.savedMinutes = minutes;
    this.savedSeconds = seconds;
    this.completed = completed;
    this.id = Date.now();
    this.counter = this.seconds;
  };
  countdown() {
    console.log(this.counter);
    // console.log(this.seconds);
    if (this.seconds < 10) {
      timer.innerText = `${this.minutes}:0${this.seconds}`;
    } else {
      timer.innerText = `${this.minutes}:${this.seconds}`;
    };
    if (this.seconds > 0) {
      this.seconds -= 1;
    } else if (this.minutes > 0 && this.seconds === 0) {
      this.minutes -= 1;
      this.seconds = 59;
    }
    if (this.counter === 0) {
      this.completed = true;
      showElement(logActivityButton);
      showElement(newActivityButton);
      return startTimerButton.innerText = `COMPLETE!`
    } else {
      this.counter--;
    }
  };
  // markComplete() {
  // };
  // saveToStorage(card) {
  //   var activityData = JSON.stringify({
  //     card
  //   })
  //   localStorage.setItem(activityTask.value, activityData);
  // }
};
