var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var canClick = false

document.addEventListener("keydown", function () {
    if (started === false) {
        started = true;
        nextSequence();

    };
})
function nextSequence() {
    canClick = false
    userClickedPattern = [];
    level += 1;
    var header = document.querySelector("#level-title")
    header.textContent = "Level " + level
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    showPattern()
}

var flashDuration = 300;
var transitionDuration = 150;
var timerIds = [];

function showPattern() {
    for (let i = 0; i < gamePattern.length; i++) {

        var timerId1 = setTimeout(function () {
            var currentColour = gamePattern[i];
            var selectedButton = document.querySelector("#" + currentColour);
            selectedButton.style.transition = "opacity " + transitionDuration + "ms";
            selectedButton.style.opacity = 0.3;
            playSound(currentColour);

            var timerId2 = setTimeout(function () {
                selectedButton.style.opacity = 1;
            }, flashDuration);
            timerIds.push(timerId2)
        }, (i+1) * 1000 );
        timerIds.push(timerId1);

    }
     var timerId3= setTimeout(function () {
        canClick = true;
    }, gamePattern.length * 1000 + flashDuration + transitionDuration);
            timerIds.push(timerId3);

}



function playSound(colour) {
    var audio = new Audio("./sounds/" + colour + ".mp3");
    audio.play();
}
function animatePress(colour) {
    var userselectedButton = document.querySelector("#" + colour);
    userselectedButton.classList.add("pressed");
    var timerId5 = setTimeout(function () {
        userselectedButton.classList.remove("pressed");

    }, 100)
                timerIds.push(timerId5);

}


var buttons = document.querySelectorAll(".btn");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function (event) {
        if (canClick === false) {
            return
        }

        var userChosenColour = this.id
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour)
        var lastIndex = userClickedPattern.length - 1;
        checkAnswer(lastIndex);

    })
}

function checkAnswer(index) {
    console.log("Click:", canClick);
    if (userClickedPattern[index] === gamePattern[index]) {
        if (userClickedPattern.length === gamePattern.length) {
            canClick = false;
            console.log("Level Completed");
            var timecheck = setTimeout(function () {
                nextSequence();
            }, 1000);
            timerIds.push(timecheck)
        }
        else {
            console.log("Correct");


        }
        ;
    }
    else {
        gameOver();
        playSound("wrong");

    }
}
function gameOver() {
    document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart";
    document.body.classList.add("game-over");
    var timerId4 = setTimeout(function () {
        document.body.classList.remove("game-over");

    }, 200)
            startOver()

            timerIds.push(timerId4);

}

function startOver() {
    cancelTimers();
     buttons.forEach(function(button) {
        button.classList.remove("pressed");
        button.style.transition = "none";
        button.style.opacity = 1;
    });
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    canClick = false;
    console.log("After Reset:", canClick);

}
function cancelTimers() {
    for (let i = 0; i < timerIds.length; i++) {
        clearTimeout(timerIds[i]);
    }
    timerIds = [];
}








