// Based on an interview question -- 
// 1 hour attempt to create a wordle app in React


import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const answer = "TACOT";
let answerMap = new Map();
answer.split("").forEach((charAtIndex, index) => {
  let indices = answerMap.get(charAtIndex) || [];
  indices.push(index);
  answerMap.set(charAtIndex, indices);
});

function App() {
  const [turns, setTurns] = useState([]);
  const [playable, setPlayable] = useState(true);
  const [guess, setGuess] = useState("");
  const GuessHandler = (e) => {
    setGuess(e.target.value);
  };

  return (
    <div className="App">
      {turns.map((turn) => (
        <Board turn={turn}></Board>
      ))}
      turns left:: {5 - turns.length}
      {playable && (
        <InputGuess
          guess={guess}
          updateGuess={GuessHandler}
          clickHandler={() =>
            SubmitHandler(guess, turns, setTurns, setPlayable)
          }
        ></InputGuess>
      )}
    </div>
  );
}

function Board({ turn }) {
  console.log("turn0", turn[0]);
  return (
    <div className="Board">
      {turn[0].split("").map((char, index) => {
        console.log("asdf");
        return (
          <div className={turn[1][index].toLowerCase()}>
            {char.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
}

function InputGuess({ updateGuess, clickHandler, guess }) {
  return (
    <div>
      <label htmlFor="guess-input">Enter Guess:</label>
      <input
        type="text"
        id="guess-input"
        onChange={updateGuess}
        value={guess}
      ></input>
      <button onClick={clickHandler}>Submit</button>
    </div>
  );
}

function SubmitHandler(guess, turns, setTurns, setPlayable) {
  let result = validate(guess);
  console.log(result);
  let newTurns = [...turns, [guess, result]];
  setTurns(newTurns);

  if (
    turns.length === 5 ||
    (result && !result.includes("GREY") && !result.includes("YELLOW"))
  ) {
    console.log("setting playable to false");
    console.log(turns);
    setPlayable(false);
  }

  function validate(guess) {
    let result = new Array(5).fill("GREY");
    guess.split("").forEach((char, index) => {
      console.log(char, index);
      if (answerMap.has(char)) {
        if (answerMap.get(char).includes(index)) {
          result[index] = "GREEN";
        } else {
          result[index] = "YELLOW";
        }
      } else {
        result[index] = "GREY";
      }
    });

    return result;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
