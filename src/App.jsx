import { useEffect, useState } from 'react';

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
  const xIsNext = currentMove % 2 === 0;  
  const currentSquares = history[currentMove];
  let descriptionCurrentMove = 'Current move: #' + (currentMove+1);
  const [movesOrder, setMovesOrder] = useState([]);

  const reversedMove = () => history.reverse();
  // const handlerOnClick = () => {setMovesOrder(reversedMove)};
  
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(history);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

    let moves = history.map((squares, move) => {
      let description;
    
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
  
      return <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>;});

    let movesArray = moves;
    // setMovesOrder (movesArray);


    function Order (){

      setHistory(history.reverse());


      console.log ("Tá entrando aqui", history);

      // return movesArray.reverse();
     }
    // console.log("array = ", movesArray);
    // movesArray.reverse();
    // console.log("array ordenada = ", movesArray);


    // setMovesOrder ("OI");

  return (
    <div className="game">
      <div className="game-board">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
      <ol>{history.map((squares, move) => {
      let description;
    
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
  
      return <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>;})}</ol>
      <button onClick={Order} >Ordenar</button>      
      <p>{descriptionCurrentMove}
      </p>
      </div>
    </div>
  );
}
