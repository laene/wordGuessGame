// These global variables track the score
var wins = 0;
var losses = 0;
var complete = false;

// This global variable is for the user input guess and will be constantly changed as game is played
var letterGuess = ""

//This empty array will store user guesses that are not found in the current word string
var badGuesses = [];

//This string =  "_ _ _" at the start of each round, and is updated as user guesses correctly
//In other words, newWord stores all the blanks.
var newWord = "";

//This variable is used to track how many wrong guesses remain. 
var chanceCounter = 8;

// This is my array of strings! It stores all the words I will be using.
var wordList = ["alligator", "gumbo", "beignets", "jazz", "floats", "parades", "crawfish", "pralines", "jambalaya", "lagniappe"]

//This variable will be used to progress through the wordList array each round.
var current = 0;

//This function prints _  for each letter in the current string. Will overwrite itself as needed. 
//Ex: alligator = _ _ _ _ _ _ _ _ _ 
function printBlanks() {
    for (var i = 0; i < wordList[current].length; i++) {
        newWord = newWord + "_ ";
    };
    document.getElementById("word").innerHTML = newWord;
}

//This function is just a counter tracker thingamajig. With each wrong guess, it subtracts one.
//Prints new number of chances remaining to the "remaining" p div.
function remainingGuesses() {
    chanceCounter -= 1;
    document.getElementById("remaining").innerText = chanceCounter;
    if (chanceCounter === 0) {
        gameOver();
    }
}

//This function tracks the wins/losses score when called in Game Over!
//It also prints the updated score to the corresponding p divs on the screen.
function trackScore() {
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
}

//This function prints the answer when called! That's all. :) 
//This function is where I want to add code for showing the images.
function printAnswer() {
    document.getElementById("previousWord").innerText = wordList[current];
}

//This function resets the game each round!
function gameOver() {
    printAnswer();
    trackScore();
    complete = false;
    current++;
    newWord = "";
    badGuesses = [];
    chanceCounter = 8;
    document.getElementById("remaining").innerText = chanceCounter;
    document.getElementById("guessedLetters").innerText = badGuesses;
    //This part of the function restarts the game if it runs out of words.
    if (current === wordList.length) {
        current = 0;
    }
    printBlanks();
};

//This function is the meat and potatoes of the game! Here's where the action happens!
function correctGuess() {
    //This part updates the blanks in newWord for each guessed letter.
    var pos = 0;
    var oldWord = newWord;
    for (var i = 0; i < wordList[current].length; i++) {
        //This part will store the character value at a specific point in the string of the current word
        l = wordList[current].charAt(i);
        if (l == letterGuess) {
            //Because newWord is made up of _ and spaces, you have to multiply by two to find corresponding character in the current word string.
            pos = i * 2;
            //Substring function goes to a specific coordinate in the "_ _ _" to replace _ with l.
            //This part took some serious guessing and checking!
            newWord = oldWord.substr(0, pos) + l + " " + oldWord.substr(pos + 2, oldWord.length + 1);
            //This makes sure to reset oldWord to the new "_ l _" word. 
            //This is useful for when a letter appears twice.
            oldWord = newWord;
        }
        //Now it prints the new blanks and letter combination to the screen.
    };
    document.getElementById("word").innerHTML = newWord;
}

function incorrectGuess() {
    //BOO! Now it tracks wrong guesses.
    if (badGuesses.indexOf(letterGuess) < 0) {
        //Adds incorrect guesses to array.
        badGuesses.push(letterGuess);
        //Prints updated array to the corresponding p tag on screen;
        document.getElementById("guessedLetters").innerText = badGuesses;
        //Calls remaining guesses function and can end the game.
        remainingGuesses();
    }
}

function guessingTime() {
    //Gets user guess, and assigns a value to that guess.
    //If the guess is found in the string (which can be kind of treated like an array), n will have a positive integer value.
    letterGuess = event.key;
    letterGuess = letterGuess.toLowerCase();
    var n = wordList[current].indexOf(letterGuess);
    //Determines if user guess IS in the character string, and what to do next.
    if (n >= 0) {
        //YAY! Calls the correct guess function to print letters.
        correctGuess();
    }
    //User guess is NOT in the string.
    else {
        incorrectGuess();
    }
    //Defines winning condition and can end the game
    if (newWord.indexOf("_") < 0) {
        complete = true;
        gameOver();
    }
}

//GAME CODE!!
onkeyup = function () {
    printBlanks(wordList);
    onkeyup = function () {
        guessingTime();
    }

}



//This is to make sure my JS isn't running before the browser loads the html.
window.onload = function now() {
    document.getElementById("wins").innerText = "Wins: " + wins;
    document.getElementById("losses").innerText = "Losses: " + losses;
    document.getElementById("guessedLetters").innerText = badGuesses;
    document.getElementById("remaining").innerText = chanceCounter;
};


