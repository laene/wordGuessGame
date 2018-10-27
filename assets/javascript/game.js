//object of arrays for word list
var wins = 0;
var losses = 0;
var success = true;
var letterGuess = " "
var badGuesses = [];

var wordList = {
    1: ["a", "l", "l", "i", "g", "a", "t", "o", "r"]
}

//Yay! I used correct syntax for my first word!
console.log(wordList[1]);

//This needs to print __ for each letter. Ex: alligator = _ _ _ _ _ _ _ _ _ 
//Now it prints _,_,_,_,_,_ but I don't want commas. Also I can't figure out append w/o Jquery
function printBlanks() {
    console.log(wordList);
    var newWord = "";
    wordList[1].forEach(function (element) {
        console.log("_");
        newWord = newWord + "_ ";
    });
    document.getElementById("wordWrapper").innerHTML = newWord;
}

function trackScore() {
    if (success === true) {
        wins++;
        console.log("New Score: " + wins + " wins!");
    }
    else if (success === false) {
        losses++;
        console.log("New Score: " + losses + " losses!");
    }
};

onkeyup = function () {
    printBlanks(wordList);
    onkeyup = function () {
        letterGuess = event.key;
        var n = wordList[1].indexOf(letterGuess);

        if (n >= 0) {
            console.log("yay!")
        }
        else {
            console.log("boo :(")
        }
    }

}



//This is to make sure my JS isn't running before the browser loads the html.
window.onload = function now() {
    document.getElementById("wins").innerText = "Wins: " + wins;
    document.getElementById("losses").innerText = "Losses: " + losses;
    document.getElementById("guessedLetters").innerText = "You Already Guessed: " + badGuesses;
};


