var buttonColors = [ "red", "blue", "green", "yellow" ];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0 ;

$(document).keypress( function(){

    if(!started){

        $("#level-title").text("Level " + level ) ;
        nextSequence();
        started = true ;
    }
});

$(".btn").click( function(){
    
    var userChosenColor = this.id;

    playSound(userChosenColor);

    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3" );
    audio.play();
}

function nextSequence(){


    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level ) ;

    var randomNumber = Math.floor( Math.random() * 4 ) ;

    var randomChosenColor = buttonColors[randomNumber] ;
    
    gamePattern.push( randomChosenColor );

    //Animation with same randomChosenColor

    $("#" +  randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //playing sound depends upon randomChosenColor
 
    playSound(randomChosenColor);

}

function animatePress(currentValue){

    $("#" + currentValue).addClass("pressed");

    setTimeout( function() {

        $("#" + currentValue).removeClass("pressed");

    }, 100 );
}

function checkAnswer(currentLevel){
       if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
           console.log("right");

           if(userClickedPattern.length===gamePattern.length){

            setTimeout(function()  {
                nextSequence();
            }, 1000);
           }

       }else{
           
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over");

            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);

            $("#level-title").text("Game over , press any key to continue");
            startOver();

       }
}

function startOver(){
    level= 0 ;
    gamePattern = [];
    started = false;
}
