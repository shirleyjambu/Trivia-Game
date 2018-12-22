//Intialise
var correct=0;
var incorrect=0;
var unanswered = 10;
var isClockRunning=false;
var timelimit = 60;
var time = timelimit;
var noSubmitButton=true;
var intervalId =0;


//Functions
function setQuestion(qObj){
  var qNumber = qObj.qnum;
  var qId = qObj.id;
  var question = qObj.question;
  var arrOptions = qObj.options;
  var answer = qObj.answer;

  //Container for Question
  var $qDiv = $("<div>");
  $qDiv.addClass("container");

  //Div for Row
  var $rDiv = $("<div>");
  $rDiv.addClass("row box qnbox");

  //Div for column
  var $cDiv = $("<div>");
  $cDiv.addClass("col-12");
  
  //Div for Question
  var $sQuestion = $("<div>");
  $sQuestion.addClass("qntxtbox");
  $sQuestion.text(`${qNumber}.  ${question}`);

  //Div for options
  var $options = $("<div>");
  $options.addClass("optionList");

  for(var i=0;i<arrOptions.length;i++){
    var $radio = $("<input>");
    $radio.attr("name",qId);
    $radio.attr("id","options");
    $radio.attr("value",arrOptions[i]);
    $radio.attr("type","radio");
      
    $options.append($radio);
    $options.append(" " + arrOptions[i]+" ");
  }

  // Add all to Question Container
  $sQuestion.appendTo($cDiv);
  $options.appendTo($cDiv);
  $cDiv.appendTo($rDiv);
  $rDiv.appendTo($qDiv);
  
//  $qDiv.append($rDiv,$cDiv,$sQuestion,$options);
    
  $("#questionDiv").append($qDiv);
}
function showValue(obj){
   alert(obj);
}


function displayQuestions(){
  // Load the questions
  quArr.forEach(function(qObj){
    setQuestion(qObj);
  });
}

function setSubmitButton(){
  
  var $btn = $("<input>");
  $btn.attr("type","submit");
  $btn.attr("id","submit-form");
  $btn.attr("value","Submit Answers");
  $btn.addClass("btn");
  $("#questionDiv").append($btn);
}

function getReplayButton(){
  
  var $btn = $("<input>");
  $btn.attr("type","button");
  $btn.attr("id","replay");
  $btn.attr("value","Play Basic");
  $btn.addClass("btn");

  return $btn;
  
}

  function startClock(){
  if (!isClockRunning) {
     intervalId = setInterval(count,1000);
     isClockRunning = true;
  }
}

function count() {
  time--;
  var rTime = timeConverter(time);
  $("#clock-display").text(rTime);

  if(time === 0){
    stopClock();
    checkAnswers();
    $("#questionDiv").empty();
      
  }
}

function stopClock() {
  clearInterval(intervalId);
  isClockRunning = false;
}


function checkAnswers(){
  
  correct=0;
  incorrect=0;
  unanswered=10;
  
  for(var i=0; i < quArr.length ; i++){
    var oQ = quArr[i];
    var userAnswer = $("input[name='"+ oQ.id +"']:checked").val();

    // check truthy value
    if(userAnswer){
      if(oQ.answer === userAnswer){
        correct++;
      }else{
        incorrect++;
      }
      unanswered--;
    }
    
  }
  setResults();
}

function setResults(){
  
  //Div for Results
  var $resultDiv = $("<div>");
  $resultDiv.addClass("jumbotron d-flex flex-column align-items-center justify-content-center text-center");
  if(time === 0){
    $resultDiv.append(`<h4>Oops !! Time's Up !!</h4>`);
  }
  $resultDiv.append(`<h4>Correct: ${correct} , Incorrect: ${incorrect}, Unanswered: ${unanswered}</h4>
  `);
    
  $resultDiv.append(`<a href='triviaAdv.html'><button type="button" class="btn">Play Advanced</button></a>`)
  $resultDiv.append(`<a href='triviaBasic.html'><button type="button" class="btn">Play Basic</button></a>`)
  $resultDiv.append(`<a href='index.html'><button type="button" class="btn">Home</button></a>`)

  
  $("#result").html($resultDiv);
}

function setClockDisplay(){
  $("#clock-display").text(timeConverter(timelimit));
}

function startNewGame(){
  $("#result").empty();
  $("#question").empty();
  correct=0;
  incorrect=0;
  isClockRunning=false;
  noSubmitButton=true;
  time=timelimit;
  setClockDisplay();
  displayQuestions();   
}
//End of Functions

$(document).ready(function(){
 
startNewGame();

// When form submitted
$(document).on("click","#submit-form",function(event){
  event.preventDefault();
  
  stopClock();
   checkAnswers();
   $("#questionDiv").empty();
});
//End of form submission

//On Click of any option chosen, start clock
$(document).on("click","#options",function(){
  startClock();
  if(noSubmitButton){
    setSubmitButton();
    noSubmitButton = false;
  }
  
 });
 
// When Play Again is clicked
$(document).on("click","#replay",function(){
  startNewGame();
 });

});