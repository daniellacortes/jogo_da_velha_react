import { useCallback, useEffect, useMemo, useState } from 'react';

import {ListHistory} from './components/ListHistory'

function Square ({ value, onSquareClick}){

  return (
    <button 
    className="square" 
    onClick={onSquareClick}>
      {value}
    </button>)
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);  
  let status;
  let divArray = new Array(3).fill(null);
  let squaresArray = new Array(3).fill(null);

  let divMap = divArray.map((item, id) => (
    <div key={id} className="board-row"> 
    {squaresArray.map((item, id2) => (
    <Square key={id*3+id2}  value={squares[id*3+id2]} onSquareClick={() => handleClick(id*3+id2)}/>
  ))}
    </div>));
  
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    // setCurrentMoveOrder(moveOrder);
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  return (
    <>
    <div className="status">{status}</div>
    <div className="board-row">
    {divMap}
    </div>

    {/* <div className="board-row">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>      
    </div>
    <div className="board-row">
    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>       
    </div>
    <div className="board-row">
    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>       
    </div> */}
    </>
  )
  
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [movesOrder, setMovesOrder] = useState(null);
  const [updateScreen, setUpdateScreen] = useState(false)
  
  const currentSquares = history[currentMove];
  let descriptionCurrentMove = 'Current move: #' + (currentMove+1);
  const xIsNext = currentMove % 2 === 0;  

  const handlerOnClick = () => {
    setMovesOrder([...movesOrder.reverse()])
  };
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setMovesOrder(nextHistory)
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }



  return (
    <div className="game">
      <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">

        {/* Primeiro eu isolei esse component ... esse arquivo esta muito grande  */}
      <ListHistory listArr={movesOrder || []} />
       
      <p>{descriptionCurrentMove}
      </p>
      </div>
    </div>
  );
}
