var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern =[];
var level = 0;
var userClickedPattern = [];
var canClick = false;
var started = false;
$(document).on("keydown", function(){
    if ( started === false) {
        started = true ;
        nextSequence();
        
    };
       
})
function nextSequence() {
canClick = false;
userClickedPattern = [];
level += 1 ;
var header  =  $("#level-title")
header.text("Level "+level)
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
showPattern();
}

var flashDuration = 300;
var transitionDuration = 150;
var timerIds = [];
function showPattern() {
for ( let i = 0 ; i < gamePattern.length ; i++ ){
        var timerId1 =setTimeout(function() {
        var currentColour = gamePattern[i];
        var selectedButton = $("#"+currentColour);
        selectedButton.css("transition","opacity " +transitionDuration+"ms");
        selectedButton.css("opacity",0.3);
        var timerId2 =setTimeout(function() {
        selectedButton.css("opacity",1);
        }, flashDuration);
        timerIds.push(timerId2)}, (i+1)*1000);
  timerIds.push(timerId1)
}
    var timerId3 = setTimeout(function(){
        canClick = true ; 

    },((gamePattern.length)*1000 + transitionDuration + flashDuration))  
    timerIds.push(timerId3)
   }


var buttons = $(".btn");
buttons.on("click",function(event){
    var userChosenColour = this.id
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour)
    var lastIndex = userClickedPattern.length -1
    checkAnswer (lastIndex)
   console.log(userClickedPattern)
       
})
function playSound(colour){
       var audio = new Audio("./sounds/"+colour+".mp3");
       audio.play();}

function animatePress(colour) {
                 var userselectedButton = $("#"+colour);
                 userselectedButton.addClass("pressed");
var timerId4 = setTimeout (function(){
                 userselectedButton.removeClass("pressed");

},100) }
    timerIds.push(timerId4)


function checkAnswer (index){
    if (userClickedPattern[index]===gamePattern[index]) {
         if (userClickedPattern.length === gamePattern.length) {
        console.log("Level Completed");
        canClick = false;
        setTimeout(function() {
        nextSequence();    }, 1000);                                }
        else {
                    console.log("Correct");

        }
        ;}
        else {
                   gameOver();
                   startOver();

        }
    
}
function gameOver() {
    $("#level-title").text("Game Over, Press Any Key to Restart");
   $("body").addClass("game-over");
    var timerId5 = setTimeout( function(){
                $("body").removeClass("game-over");

    },200)
    timerIds.push(timerId5)

}
function startOver(){
     cancelTimers();       
        level = 0;
     gamePattern=[];
     userClickedPattern=[];
     started = false;
     canClick = false;

}

function cancelTimers() {
    for (let i = 0; i < timerIds.length; i++) {
        clearTimeout(timerIds[i]);
    }
    timerIds = [];
}




