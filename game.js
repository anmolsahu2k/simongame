var gamePattern=[];
var userClickedPattern=[];
var buttonColors=["red", "blue", "green", "yellow"];
var level =-1;
var started=false;
var index=0;


//Start the game by pressing A
$(document).on("keypress",function(event){
	if(event.key=='a' && started==false){
		nextSequence();
		started=true;
	}
});

$(".btn").on("click",function(event){
	var userChosenColor= event.target.id;
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePress(userChosenColor);
	checkAnswer(index);
	index++;
});



function nextSequence()
{
	var randNum=Math.floor(Math.random()*4);
	var randomChosenColour=buttonColors[randNum];
	gamePattern.push(randomChosenColour);
	$("#"+randomChosenColour).fadeOut(100).fadeIn(100);
	playSound(randomChosenColour);
	level++;
	$("h1").text("Level "+level);
	userClickedPattern=[];
	index=0;
}

function playSound(name)
{
	var audio=new Audio("sounds/"+name+".mp3");
	audio.play();
}

function animatePress(currentColour){
	$("#"+currentColour).addClass("pressed");
	setTimeout(function () { 
	    $("#"+currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(index)
{
	console.log(index);
	if(userClickedPattern[index]==gamePattern[index])
	{
		console.log("success");
		if(level==index)
		{
			setTimeout(function () { 
			    nextSequence();
			}, 1000);
		}	
		
	}
	else
	{
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () { 
		    $("body").removeClass("game-over");
		}, 200);		
		$("h1").text("Game Over, Press Any Key to Restart");
		started=false;
		startOver();
	}
} 

function startOver()
{
	gamePattern=[];
	level =-1;
	index=0;
}