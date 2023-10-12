$(document).ready(function(){
  var currentQuestion;
  var interval;
  var timeLeft = 10;
  var score = 0;
  
  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  };
  
  var score = 0;
var highScore = 0;

var updateScore = function (amount) {
  score += amount;
  if (score > highScore) {
    highScore = score;
  }
  $('#score').text(score);
  $('#high-score').text('High Score: ' + highScore);
};
  
  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);  
    }
  };
  
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  };
  
  var questionGenerator = function () {
    var question = {};
    // Get the selected max number from HTML input
    var maxNumber = parseInt($('#max-number').val()); 
    var num1 = randomNumberGenerator(maxNumber);
    var num2 = randomNumberGenerator(maxNumber);
  
    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2) + " = ";
  
    return question;
  };
  
  var renderNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);  
  };
  
  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      renderNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  };
  
  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
  
  renderNewQuestion();
});


    var renderNewQuestion = function () {
      currentQuestion = randomQuestionGenerator();
      $('#equation').text(currentQuestion.equation);  
    };
    
    var checkAnswer = function (userInput, answer) {
      if (userInput === answer) {
        renderNewQuestion();
        $('#user-input').val('');
        updateTimeLeft(+1);
        updateScore(+1);
      }
    };
    
    $('#user-input').on('keyup', function () {
      startGame();
      checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    
    renderNewQuestion();


  
  

  