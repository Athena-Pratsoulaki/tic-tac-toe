
const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

export default function GameBoard({onSelectSquare, turns}) {
    let gameBoard = initialGameBoard;
    for (const turn of turns) {
        const {square,player} = turn;
        const {row, col} = square;
        gameBoard[row][col] = player;
    }
    // commenting this out to lift state up to App.jsx because a new function will be written in order to have as much info as I need for Log Component
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);

    // function handleSelectSquare(rowIndex,colIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedBpard = [...prevGameBoard.map((innerArray) => [...innerArray])];
    //         updatedBpard[rowIndex][colIndex] = activePlayerSymbol;
    //         return updatedBpard;


    //     });
    //     onSelectSquare();
    // }

    return <ol id="game-board">
        {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) =>
                     <li key={colIndex}>
                     <button onClick={() => onSelectSquare(rowIndex,colIndex)} >{playerSymbol}</button>
                     </li>)}
            </ol>
        </li>)}

    </ol>
}