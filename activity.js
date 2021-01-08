class Activity {
  constructor(category, description, minutes, seconds, completed) {
    this.category = category;
    this.description = description;
    this.minutes = parseInt(minutes);
    this.seconds = parseInt(seconds);
    this.completed = completed;
    this.id = Date.now();
  }

  countdown() {
    console.log(this.minutes, this.seconds);
    setInterval(function() {
      if (this.seconds > 0) {
        this.seconds -= 1;
        if (this.seconds < 10) {
          this.seconds = '0' + this.seconds;
        }
      } else if (this.minutes > 0 && this.seconds === 0) {
        this.minutes -= 1;
        this.seconds = 59;
      } else if (this.minutes === 0 && this.seconds === 0) {
        alert('done');
        this.completed = true;
        return;
      }
    }, 1000);
    timer.innerText = `${this.minutes}:${this.seconds}`;
  }

  markComplete() {

  }

  saveToStorage() {

  }
};

//module.exports = Activity;
