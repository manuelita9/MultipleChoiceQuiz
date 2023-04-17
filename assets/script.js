class Question {
    constructor(question, choices, answer) {
    this.question = question
    this.choices = choices
    this.answer = answer
    }
}

let timeRemaining = 60;

let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    timeRemaining--;
    updateTimer();
    if (timeRemaining <= 0) {
      endQuiz();
    }
  }, 1000);
}

function updateTimer() {
  const timerElement = document.getElementById("timer");
  timerElement.innerText = `Time remaining: ${timeRemaining} seconds`;
}
  function startQuiz() {
    quiz.reset();
  timeRemaining = 60;
  updateTimer();
  score = 0;
  updateScore();
    document.getElementById("start-button").style.display = "none";
    document.getElementById("high-scores-button").style.display = "none"
    document.getElementById("quiz").style.display = "block";
    document.getElementById("high-scores").style.display = "none";
    startTimer();
    showCurrentQuestion();
  }
  
  function showHighScores() {
    document.getElementById("start-button").style.display = "block";
    document.getElementById("high-scores-button").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("high-scores").style.display = "block";
    updateHighScores();
  }


const question1 = new Question (
    'How do you add style to a group of elements? ',
    ['Setting a style to the group of elements', 'Setting a style for each element individually', 'Setting a style for a tag', 'All of the above'],
    'Setting a style for each element individually'
)

const question2 = new Question (
    'Why do we use style tags?',
    ['They are fun', 'They allow us to style multiple elements at the same time', 'Because I want to', 'They are useful when there is not enough space for the style attribute'],
    'They allow us to style multiple elements at the same time'
)

const question3 = new Question (
    'How do we add multiple declarations to a CSS rule?',
    ['Adding a lot of declarations at once', 'One declaration after another on the same line', 'By adding a colon at the end of a declaration', 'By adding a semicolon at the end of a declaration'],
    'By adding a semicolon at the end of a declaration'
)


class Quiz {
    constructor(questions) {
      this.questions = questions;
      this.currentIndex = 0;
    }
  
    getCurrentQuestion() {
      return this.questions[this.currentIndex];
    }
  
    nextQuestion() {
      this.currentIndex++;
    }
  
    hasEnded() {
      return this.currentIndex >= this.questions.length;
    }
    reset() {
        this.currentIndex = 0;
      }
  }
   
  let quiz = new Quiz([question1, question2, question3])

  function showCurrentQuestion() {
    const question = quiz.getCurrentQuestion();
    const questionElement = document.getElementById("question");
    questionElement.innerText = question.question;
  
    const choices = question.choices;
    for (let i = 0; i < choices.length; i++) {
      const choiceElement = document.getElementById(`choice${i}`);
      choiceElement.innerText = choices[i];
    }
  }

  
  let score = 0;

  function checkAnswer(selectedChoice) {
    if (selectedChoice === quiz.getCurrentQuestion().answer) {
      score += 12.5;
    } else {
      score -= 8;
      timeRemaining -= 10;
    }
    updateTimer();
    showNextQuestion();
    updateScore();
  }
  
  function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.innerText = `Score: ${score}`;
  }
  
  function showNextQuestion() {
    quiz.nextQuestion();
    if (quiz.hasEnded()) {
      endQuiz();
    }
    showCurrentQuestion();
  }
  

  function endQuiz() {
    clearInterval(timerInterval);
    const initials = prompt("Enter your initials:");
    if (initials) {
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials, score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
    }
    alert("Quiz ended!");
    document.getElementById("high-scores-button").style.display = "block";
  }

  function updateHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.sort((a, b) => b.score - a.score);
    const highScoresElement = document.getElementById("high-scores");
    highScoresElement.innerHTML = "";
    for (const { initials, score } of highScores) {
      const li = document.createElement("li");
      li.innerText = `${initials}: ${score}`;
      highScoresElement.appendChild(li);
    }
  }
  