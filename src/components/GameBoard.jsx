export default function GameBoard({onSelectSquare, board}) {
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
        {board.map((row, rowIndex) => <li key={rowIndex}>
            <ol>
                {row.map((playerSymbol, colIndex) =>
                     <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled = {playerSymbol !== null}>
                            {playerSymbol}
                        </button>
                     </li>)}
            </ol>
        </li>)}

    </ol>
}