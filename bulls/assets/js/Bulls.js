import React, { useState, useEffect } from "react";
import random from "lodash/random";
import {
  lives_left,
  onlyUniqueValues,
  onlyNumbers,
  calcBullsCows
} from "./game";

import { ch_join, ch_push } from './socket';

function Bulls() {

  const [state, setState] = useState({
    secret: makeSecret(),
    guesses: [],
  });

  let {secret, guesses} = state;
  let view = secret.split("");

  useEffect(() => {
    ch_join(setState);
  });

  function makeGuess(arr) {
    let guesses = arr;
    let state1 = Object.assign({}, state, {guesses});
    setState(state1);
  }

  const [bullsCows, setBullsCows] = useState([]);
  const [text, setText] = useState("");

  let lives = lives_left(guesses);

  // generates random secret number
  function makeSecret() {
    let arr = [];
    arr[0] = random(1, 9);
    let numsInArr = 1;
    while (numsInArr < 4) {
      let newNum = random(0, 9);
      let isNumUniq = 1;
      for (let n of arr) {
        if (newNum === n) {
          isNumUniq = 0;
        }
      }
      if (isNumUniq === 1) {
        arr[numsInArr] = newNum;
        numsInArr = numsInArr + 1;
      }
    }
    return arr;
  }

  // sets text to user input
  function updateText(event) {
    let vv = event.target.value;

    ch_push(vv); // used to be ch_push(Number: vv)});

//    setText(vv);                                    COMMENTED OUT FOR CH_PUSH
  }

  // displays warning from guess function
  function displayWarning(warning) {
    window.alert(warning);
  }

  // runs after user presses "enter" or hits "guess" button
  function guess() {
    let guessStr = "" + text;
    let guessArr = guessStr.split("").slice(0, 4);

    // check for duplicates from guessArr
    let uniqueGuesses = onlyUniqueValues(guessArr);

    // account for errors in input
    if (guessArr.length < 4) {
      displayWarning("Guess must 4 numbers long.");
    } else if (uniqueGuesses.length < 4) {
      displayWarning("Cannot have duplicates in your guess.");
    } else if (onlyNumbers(guessArr) === 0) {
      displayWarning("Guess must only contain numbers.");
    } else if (guessArr[0] === "0") {
      displayWarning("Guess cannot start with 0.");
    } else {
      // input looks good!

      // adds guess to guesses
      let arr = [];
      arr[0] = text;
      makeGuess(guesses.concat(arr));

      // adds bulls and cows calculation to bullsCows
      let arr2 = [];
      arr2[0] = calcBullsCows(secret, guessArr);
      setBullsCows(bullsCows.concat(arr2));

      // clears input box after guess is successfully made
      document.getElementById("input").value = "";
    }
  }

  // pressing "enter" will call function guess
  function keyPress(event) {
    if (event.key === "Enter") {
      guess();
    }
  }

  // reloads the window and restarts the game
  function reload() {
    window.location.reload();
  }

  // if the user has won the game...
  if (bullsCows[bullsCows.length - 1] === "4B0C") {
    return (
      <div className="App">
        <h1>You Win!</h1>
        <p>
          <button onClick={() => reload()}>Reset</button>
        </p>
      </div>
    );
  }
  // if the user has lost the game...
  else if (lives === 0) {
    return (
      <div className="App">
        <h1>Game Over! The correct answer was {secret}</h1>
        <p>
          <button onClick={() => reload()}>Reset</button>
        </p>
      </div>
    );
  }

  // what the game looks like while in session
  return (
    <div className="app">
      <h3>Lives Left: {lives}</h3>
      <p>
        <input
          type="text"
          name="guess"
          maxLength="4"
          id="input"
          pattern="\d{4}"
          onChange={updateText}
          onKeyPress={keyPress}
        />
        <button onClick={guess}>Guess</button>
      </p>
      <table className="GuessTable">
        <thead>
          <tr>
            <th>#</th>
            <th>Guess</th>
            <th>B & C</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{guesses[0]}</td>
            <td>{bullsCows[0]}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>{guesses[1]}</td>
            <td>{bullsCows[1]}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>{guesses[2]}</td>
            <td>{bullsCows[2]}</td>
          </tr>
          <tr>
            <td>4</td>
            <td>{guesses[3]}</td>
            <td>{bullsCows[3]}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>{guesses[4]}</td>
            <td>{bullsCows[4]}</td>
          </tr>
          <tr>
            <td>6</td>
            <td>{guesses[5]}</td>
            <td>{bullsCows[5]}</td>
          </tr>
          <tr>
            <td>7</td>
            <td>{guesses[6]}</td>
            <td>{bullsCows[6]}</td>
          </tr>
          <tr>
            <td>8</td>
            <td>{guesses[7]}</td>
            <td>{bullsCows[7]}</td>
          </tr>
        </tbody>
      </table>
      <p>
        <button onClick={() => reload()}>Reset</button>
      </p>
    </div>
  );

}

export default Bulls;
