var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameOn = false;
var level = 0;
$(".btn").click(function (){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function (){
  // alert("pressed");
  if (!gameOn) {
    // alert("inloop");
    $('h1').text("Level "+level);
    nextSequence();
    gameOn = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('h1').text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  // alert(gamePattern);
}

function playSound(colour) {
  var audio = new Audio('sounds/'+colour+'.mp3');
  audio.play();
}

function animatePress (currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout(function (){
    $("#"+currentColour).removeClass("pressed");
  },100);
}
function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]) {
    console.log("success");
    if (currentLevel===(gamePattern.length-1)) {nextSequence();}
  } else {
    console.log("wrong");
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    },200);
    $('h1').text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  gamePattern = [];
  gameOn = false;
  level = 0;
}
