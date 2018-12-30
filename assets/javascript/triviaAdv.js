// Variables
var timelimit = 10;
var time = timelimit;
var tOut = 3;
var isClockRunning = false;
var intervalId = 0;
var questionCounter = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var qAvlbl = quArr.length;

// Functions
function setStart() {
  $startBtn = getButton("Start Game", "start");

  $("#content").html(`<p>Click to start. Enjoy the Game !</p>`);
  $("#content").append($startBtn);

}

function getButton(text, id) {

  var $btn = $("<input>");
  $btn.attr("type", "button");
  $btn.attr("id", id);
  $btn.attr("value", text);
  $btn.addClass("btn");

  return $btn;
}

function setQuestions(quIndex) {

  var quObj = quArr[quIndex];
  var question = quObj.number +"). "+ quObj.question;
  var options = quObj.options;
  var qId = quObj.id;


  // create article card
  var $card = $("<div class='card'>");

  // article header
  //Time Left : <span id="clock-display">00:00</span>
  var $cardHeader = $("<h4 class='card-header'>").html(question).appendTo($card);


  // article body
  var $cardBody = $("<div class='card-body'>");
  for (var i = 0; i < options.length; i++) {
    $cardBody
      .append(`<div class="card-title"><a class="option-link" id="${qId}" href="#" data-value="${options[i]}">${options[i]}</a></div>`);
  }

  $cardBody.appendTo($card);

  $("#content").empty();
  $("#content").append($card);

}

function checkAnswer(userAns) {

  var quObj = quArr[questionCounter];
  var answer = quObj.answer;
  var imgSearchTxt = quObj.imgText;

  var userMsg = "";
  if(userAns === "noAns"){
    userMsg = "<h6>Oops! Time's Up. Here is the answer :'" + answer + "'.</h6>";
    unanswered++;
  }else{
    if (userAns === answer) {
      userMsg = "<h6>You got that right.</h6>";
      correct++;
    } else {
      userMsg = "<h6>Better Luck Next time. The answer is :'" + answer + "'.</h6>";
      incorrect++;
    }
  }
  
  $("#content").empty();
  $("#content").append(userMsg);

  //Get Image and add in content
  getImg(imgSearchTxt);

  // A setTimeout to run questionTracker after 5 second.
  setTimeout(questionTracker,(1000 * tOut));
}

function getImg(sText) {
  //set the Query URL
  var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + sText;
  console.log(queryURL);
  //Ajax call with queryurl
  $.ajax({
      url: queryURL,
      method: "GET"
    })

    //once you get the response
    .then(function (response) {
      //console.log(console);
      //get the url of the image from the response
      var imageUrl = response.data.image_original_url;

      //create a image 
      var $img = $("<img>");

      //set the src of image to the one got from response
      $img.attr("src", imageUrl);
      $img.attr("alt", sText);
      $img.addClass("gifImg");

      $("#content").append($img);

      //Set Next Button
      //setNextButton();

    });
}

function displayResults() {
  var $resultDiv = $("<div>");
  $resultDiv.addClass("d-flex flex-column align-items-center justify-content-center text-center");
  $resultDiv.append(`<h4>Game Over !!</h4>`);
  $resultDiv.append(`<h4>Correct: ${correct} , Incorrect: ${incorrect}, Unanswered: ${unanswered}</h4>
  `);
  $resultDiv.append(`<a href='triviaAdv.html'><button type="button" class="btn">Play Advanced</button></a>`)
  $resultDiv.append(`<a href='triviaBasic.html'><button type="button" class="btn">Play Basic</button></a>`)
  $resultDiv.append(`<a href='index.html'><button type="button" class="btn">Home</button></a>`)
  $("#content").html($resultDiv);
}

/*function setNextButton() {
  var $nextBtn = getButton("Next", "next");
  $("#content")
    .append($("<div>"))
    .append($nextBtn);
}*/

function startGame() {
  setQuestions(questionCounter);
  startClock();
}

function startClock() {
  if (!isClockRunning) {
    time = timelimit;
    setClockDisplay();
    intervalId = setInterval(count, 1000);
    isClockRunning = true;
  }
}

function count() {
  time--;
  var rTime = timeConverter(time);
  $("#clock-display").text(rTime);

  if (time === 0) {
    stopClock();
    checkAnswer("noAns");
    //displayResults();
  }
}

function stopClock() {
  clearInterval(intervalId);
  isClockRunning = false;
}

function questionTracker(){
  questionCounter++;
    
    if (questionCounter < qAvlbl) {
       setQuestions(questionCounter);
       startClock();
    } else {
      stopClock();
      displayResults();
    }
}

// Event Handlers
$(document).ready(function () {

  // Set the start button
  setStart();

  // On Start of Game
  $(document).on("click", "#start", function () {
    startGame();
  });

  // When an option is chosen
  $(document).on("click", ".option-link", function (event) {
    stopClock();
    var answer = $(this).attr("data-value");
    checkAnswer(answer);
  });

  // When next button
  /*$(document).on("click", "#next", function (event) {
    questionTracker();
  });*/

});