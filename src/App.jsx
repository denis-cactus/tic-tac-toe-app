import "./App.css";
import { useState } from "react";

function Square({ count, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {count}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(index) {
    const nextSquares = squares.slice();
    nextSquares[index] = "X";
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="board-row">
        <Square count={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square count={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square count={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square count={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square count={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square count={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square count={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square count={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square count={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
