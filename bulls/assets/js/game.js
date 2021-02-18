// calculates the amount of lives left
export function lives_left(guesses) {
  return 8 - guesses.length;
}

// returns an array of only unique values from given array
export function onlyUniqueValues(guessArr) {
  let uniqueGuesses = [];
  guessArr.forEach((c) => {
    if (!uniqueGuesses.includes(c)) {
      uniqueGuesses.push(c);
    }
  });
  return uniqueGuesses;
}

// checks whether a given array contains only numbers
export function onlyNumbers(guessArr) {
  let onlyNumbers = 1;
  for (let i = 0; i < guessArr.length; i++) {
    if (!(guessArr[i] >= "0" && guessArr[i] <= "9")) {
      onlyNumbers = 0;
    }
  }
  return onlyNumbers;
}

// calculates the number of bulls and cows in a guess
export function calcBullsCows(secret, guess) {
  // setting up arrays
  let secretStr = "" + secret[0] + secret[1] + secret[2] + secret[3];
  let guessStr = "" + guess[0] + guess[1] + guess[2] + guess[3];
  let secretArr = secretStr.split("").slice(0, 4);
  let guessArr = guessStr.split("").slice(0, 4);

  // calculate bulls
  let bulls = 0;
  for (let i = 0; i < 4; i++) {
    if (secretArr[i] === guessArr[i]) {
      bulls++;
    }
  }

  // calculate cows
  let cows = 0;
  for (let i = 0; i < 4; i++) {
    if (secretArr.includes(guessArr[i])) {
      cows++;
    }
  }
  cows = cows - bulls;

  // return bulls and cows string
  return "" + bulls + "B" + cows + "C";
}

