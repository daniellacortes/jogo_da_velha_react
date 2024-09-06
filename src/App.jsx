import { useEffect, useState } from 'react';

function Square({id, value, onSquareClick, winner }) {
  if (winner){
    console.log ("Winner 1", winner[1]);
  }
  
  return (
    winner && (id==winner[1] || id==winner[2] || id==winner[3]) ? <button
      className="square squareWinner"
      onClick={onSquareClick}>
      {value}
    </button>: 
    <button
      className="square"
      onClick={onSquareClick}>
      {value}
    </button>
    )
}

function Board({ xIsNext, squares, onPlay, history}) {
  const winner = calculateWinner(squares);
  let status;
  let divArray = new Array(3).fill(null);
  let squaresArray = new Array(3).fill(null);

  let divMap = divArray.map((item, id) => (
    <div key={id} className="board-row">
      {squaresArray.map((item, id2) => (
        <Square key={id * 3 + id2} value={squares[id * 3 + id2]} onSquareClick={() => handleClick(id * 3 + id2)} winner={winner} id={id * 3 + id2}/>
      ))}
    </div>));

  if (winner) {
    status = "Winner: " + winner[0];

  } else if (history.length==10){
    status = "Tie";
  }
  else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    } else {
      console.log ("i = ", i)
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares, i);
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
      const winnerArray = [squares[a], a, b, c]
      return winnerArray;
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([{square: Array(9).fill(null), id:null}]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].square;
  let descriptionCurrentMove = 'Current move: #' + (currentMove + 1);
  const [movesOrder, setMovesOrder] = useState(false);

  function handlePlay(nextSquares, i) {
    const nextHistory = [...history.slice(0, currentMove + 1), {square: nextSquares, id: i}];
    console.log("NextHistory", nextHistory);


    // let historyAndId = (
    //   id: i,
    //   nextHistory: nextHistory);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log("next", nextSquares);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  let moves = history.map((squares, move) => {
    let start = false;
    let desc = "";
    let player = "X";
    let squareId = squares.id;
    console.log(squareId);
    let col = (squareId%3)+1; 
    let row = (Math.floor(squareId/3))+1;

    if (move > 0) {
      start = true;

      if(move%2===0){
        player="O";
      } else {
        player="X";
      }
    } 

    start? desc=player + " = Col " + col + " Row = " + row : desc = 'Go to game start';

    return <li key={move}>
      <button onClick={() => jumpTo(move)}>{desc}</button>
    </li>;
  });

  let movesArray = movesOrder? moves.reverse() : moves;

  function Order() {

    movesOrder? setMovesOrder(false) : setMovesOrder(true);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} history={history} />
      </div>
      <div className="game-info">
        <ol>{movesArray}</ol>
        <button onClick={Order} >Alterar Ordem</button>
        <p>{descriptionCurrentMove}
        </p>
      </div>
    </div>
  );
}
