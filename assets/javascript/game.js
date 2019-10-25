//GLOBAL VARIABLES
//==============================================================================================================================================
//Arrays and Variables for holding data 
var wordOptions = ['phoenix', 'tucson', 'flagstaff','sedona', 'mesa', 'gilbert', 'cardinals', 'suns', 'diamondbacks', 'coyotes', 'sundevils', 'grandcanyon', 'wildcats', 'lumberjacks', 'desert', 'cactus']
var selectedWord = '';
var lettersinWord = '';
var numBlanks = 0;
var blanksAndSuccesses = []; // p _ _ _ _ _ _
var wrongLetters = [];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft= 10;

//FUNCTIONS
//==============================================================================================================================================

function startGame () {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersinWord = selectedWord.split('');
  numBlanks = lettersinWord.length;
  
  //Reset
  guessesLeft = 10;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // Populate blanksAndSuccesses with right number of blanks
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push('_');
  }

  //Change HTML to reflect round conditions
  document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
  document.getElementById('numGuesses').innerHTML = guessesLeft;
  document.getElementById('winCounter').innerHTML = winCount;
  document.getElementById('lossCounter').innerHTML = lossCount;

  //Testing / Debugging
  console.log(selectedWord);
  console.log(lettersinWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

function checkLetters(letter) {
  //Check if letter exists in word at all
  var isLetterInWord = false;
  for (i = 0; i < numBlanks; i++) {
    if(selectedWord[i]== letter) {
      isLetterInWord = true;
    }
  }

  //Check where in the word the letter exists, then populate our blanksAndSuccesses array
  if (isLetterInWord) {
    for (i = 0; i < numBlanks; i++) {
      if(selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }
    }
  }

  //Letter wasn't found
  else {
    wrongLetters.push(letter);
    guessesLeft --
  }
    
    //Testing / Debugging
    console.log(blanksAndSuccesses);
  
}

function roundComplete () {
  console.log('Win Count: ' + winCount + ' | Loss Count: ' + lossCount + ' | Guesses Left: ' + guessesLeft)
  //Update HTML to reflect the most rencet count stats
  document.getElementById('numGuesses').innerHTML = guessesLeft;
  document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
  document.getElementById('wrongGuesses').innerHTML =wrongLetters.join(' ');


  //Check if user won
  if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
    winCount ++;
    alert ('You Won!');

    //Update the win counter in HTML
    document.getElementById('winCounter').innerHTML = winCount;
    startGame();
  }
  //Check if user lost

  else if (guessesLeft == 0) {
    lossCount ++;
    alert ('You Lost!');

    //Update the loss counter in HTML
    document.getElementById('lossCounter').innerHTML = lossCount;
    startGame();
  }
}
//MAIN PROCESS
//==============================================================================================================================================

//Initiate the code the first time
startGame ();

//Register keyclicks
document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();


  //Testing/ Debugging
  console.log(letterGuessed);
}