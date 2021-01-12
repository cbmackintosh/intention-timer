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
    if (this.seconds > 0) {
      this.seconds -= 1;
    } else if (this.minutes > 0 && this.seconds === 0) {
      this.minutes -= 1;
      this.seconds = 59;
    } else if (this.minutes === 0 && this.seconds === 0) {
      var applause = new Audio("assets/applause.mp3");
      applause.play();
      this.markComplete()
      showElement(logActivityButton);
      showElement(newActivityButton);
      showComplete();
      return;
    }
    formatTimer(this.minutes, this.seconds);
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {
    activityCards.push(this)
    localStorage.setItem('activityCards', JSON.stringify(activityCards));
    clearPastActivityCards();
    showMyLog();
  }
}
