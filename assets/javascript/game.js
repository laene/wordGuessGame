//object of arrays for word list
var wins = 0;
var losses = 0;
var complete = false;
var letterGuess = " "
var badGuesses = [];
var newWord = "";
var chanceCounter = 5;

var wordList = ["alligator", "gumbo", "beignets", "jazz", "hurricane", "daquiri", "parades", "crawfish", "magnolia", "jambalaya", "lagniappe"]
var current = 0;

//Yay! I used correct syntax for my first word!
console.log(wordList[current]);

//This needs to print __ for each letter. Ex: alligator = _ _ _ _ _ _ _ _ _ 
function printBlanks() {
    console.log(wordList);
    for (var i = 0; i < wordList[current].length; i++) {
        console.log("_");
        newWord = newWord + "_ ";
    };
    document.getElementById("wordWrapper").innerHTML = newWord;
}

function remainingGuesses() {
    chanceCounter -= 1;
    document.getElementById("remaining").innerText = "Remaining Chances: " + chanceCounter;
    if (chanceCounter === 0) {
        gameOver();
    }
}

function gameOver() {
    if (complete === true) {
        wins++;
        console.log("New Score: " + wins + " wins!");
        document.getElementById("wins").innerText = "Wins: " + wins;
    }
    else if (complete === false) {
        losses++;
        console.log("New Score: " + losses + " losses!");
        document.getElementById("losses").innerText = "Losses: " + losses;
    }
    complete = false;
    current++;
    newWord = "";
    badGuesses = [];
    chanceCounter=5;
    printBlanks();
    document.getElementById("guessedLetters").innerText = "You Already Guessed: " + badGuesses;
    document.getElementById("remaining").innerText = "Remaining Chances: " + chanceCounter;

    if (current === wordList.length) {
        current = 0;
    }
};

onkeyup = function () {
    printBlanks(wordList);
    onkeyup = function () {
        letterGuess = event.key;
        var n = wordList[current].indexOf(letterGuess);

        if (n >= 0) {
            console.log("yay!")
            var pos = 0;
            var oldWord = newWord;
            for (var i = 0; i < wordList[current].length; i++) {
                l = wordList[current].charAt(i);
                if (l == letterGuess) {
                    console.log(i);
                    // var pos = newWord.charAt(i);
                    pos = i * 2;
                    newWord = oldWord.substr(0, pos) + l + " " + oldWord.substr(pos + 2, oldWord.length + 1);
                    oldWord = newWord;
                    console.log(l);
                    console.log(newWord)
                }

            };
            document.getElementById("wordWrapper").innerHTML = newWord;
        }
        else {
            if (badGuesses.indexOf(letterGuess) < 0) {
                console.log("boo :(")
                badGuesses.push(letterGuess);
                document.getElementById("guessedLetters").innerText = "You Already Guessed: " + badGuesses;
                remainingGuesses();
            }
        }
        if (newWord.indexOf("_") < 0) {
            complete = true;
            gameOver();
        }
    }

}



//This is to make sure my JS isn't running before the browser loads the html.
window.onload = function now() {
    document.getElementById("wins").innerText = "Wins: " + wins;
    document.getElementById("losses").innerText = "Losses: " + losses;
    document.getElementById("guessedLetters").innerText = "You Already Guessed: " + badGuesses;
    document.getElementById("remaining").innerText = "Remaining Chances: " + chanceCounter;
};


