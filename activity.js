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
  }
  countdown() {
    console.log(this.minutes);
    console.log(this.seconds);
    if (this.seconds > 0) {
      this.seconds -= 1;
    } else if (this.minutes > 0 && this.seconds === 0) {
      this.minutes -= 1;
      this.seconds = 59;
    } else if (this.minutes === 0 && this.seconds === 0) {
      var audioYay = new Audio("assets/yayyy.mp3");
      var applause = new Audio("assets/applause.mp3");
      applause.play();
      this.completed = true;
      showElement(logActivityButton);
      showElement(newActivityButton);
      return startTimerButton.innerText = `COMPLETE!`
    }
    if (this.seconds < 10) {
      timer.innerText = `${this.minutes}:0${this.seconds}`;
    } else {
      timer.innerText = `${this.minutes}:${this.seconds}`;
    }
  }
  markComplete() {
  }

  saveToStorage() {
  }
};
