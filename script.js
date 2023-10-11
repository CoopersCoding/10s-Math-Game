$(document).ready(function(){
    var currentQuestion;
    var interval;
    var timeLeft = 10;
    var score = 0;
    
    var updateTimeLeft = function (amount) {
      timeLeft += amount;
      $('#time-left').text(timeLeft);
    };
    
    var updateScore = function (amount) {
      score += amount;
      $('#score').text(score);
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
      var num1 = randomNumberGenerator(10);
      var num2 = randomNumberGenerator(10);
      var operator = Math.ceil(Math.random() * 4);
      if (operator === 1) {
        question.operator = "+";
      } else if (operator === 2) {
        question.operator = "-";
      } else if (operator === 3) {
        question.operator = "*";
      } else {
        question.operator = "/";
      }
      question.equation = num1 + question.operator + num2;
      
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

  
  

  