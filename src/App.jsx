import "./App.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Square({ count, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {count}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(index) {
    if (calculateWinner(squares) || squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  useEffect(() => {
    if (winner && winner !== null) {
      toast.success(`Player ${winner} wins!`, {
        position: "top-center", // можна змінювати позицію
        autoClose: 5000, // час для автоматичного закриття
        hideProgressBar: false, // приховувати прогрес-бар
        closeOnClick: true, // закрити по кліку
        pauseOnHover: true, // пауза при наведені
      });
    }
  }, [winner]);

  return (
    <>
      <div className="status">{status}</div>

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
      <ToastContainer />
    </>
  );
}

export default function Game() {
  const [xIsNext, setXisNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currencyDisplay = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXisNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXisNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currencyDisplay}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
