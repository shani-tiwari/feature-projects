import { useState } from "react";
import Button from "./Button";

// Storing Player's turns in an object
const players = { A: 0, B: 1 };
const playerIcon = {
    // dynamic object syntax
    [players.A]: '✖️',
    [players.B]: '〇' 
};
const defaultTurns = {
    [players.A]: [],
    [players.B]: [],
};

const winningPattern = ['012', '345', '678', '036', '147', '258', '048', '246']; 

export default function TicTacToe() {

    // Array.from() -- requires by which you want to make an array -- or what should be inside the array
    const buttons = Array.from(new Array(9));

    // const [player, setPlayer] = useState({ A: 0, B: 1});
    const [activePlayer, setActivePlayer] = useState(players.A);
    
    // Storing player's turns bt structured clone(deep cloning) otherwise when we modift playerTurn, defaultTurn will also change (due to call by reference)
    const [playerTurn, setPlayerTurn] = useState(structuredClone(defaultTurns));

    const [msg, setMsg] = useState('')

    
    // changing player's turn
    function handleTurn(index){
        /* used Currying --- to return a function, runs on only click event, coz we called it directly at map() earlier */
        return () => {
            const newPlayer = activePlayer === players.A ? players.B : players.A;

            // player turns
            const playerA = playerTurn[players.A];
            const playerB = playerTurn[players.B];

            /* Check if cell is already occupied */
            if(playerA.join('').includes(String(index)) || playerB.join('').includes(String(index))) return;

            /* Add new turn */
            const newPlayerTurn = structuredClone(playerTurn);
            newPlayerTurn[activePlayer].push(String(index));
            
            const isWinner = checkWinner(newPlayerTurn[activePlayer]);
            setPlayerTurn(newPlayerTurn);
            if(isWinner) {
                setMsg(`${activePlayer === players.A ? playerIcon[players.A] : playerIcon[players.B]} wins`); 
                // setTimeout(()=> reset(), 1500);
                return;
            };
            
            // setPlayerTurn(newPlayerTurn);
            setActivePlayer(newPlayer);
        };
    };

    function checkWinner(playerTurns){
        const turnsStr = playerTurns.sort((a,b)=> Number(a)- Number(b)).join('');
        return winningPattern.some((pattern)=> turnsStr.includes(pattern));
    };

    // const playerSymbol = playerIcon[activePlayer];

    function reset(){
        setActivePlayer(players.A);
        setPlayerTurn(structuredClone(defaultTurns));
        setMsg('');
    };

    return (
    <div className="w-96 h-[70vh] bg-zinc-500 border-2 border-zinc-950/55 rounded-xl flex flex-wrap p-4">
        <h2 className="text-3xl w-full text-center font-semibold tracking-wide text-white/80">Tic Tac Toe</h2>

        {/* Board */}
        <div className="w-full h-[70%] rounded-xl grid grid-cols-3 grid-rows-3 gap-2 bg-white/20 border border-white/15 mt-4 p-4"> 
            {
                buttons.map((_,i)=>{
                    const currentPlayerTurn = playerTurn[activePlayer];
                    const prevPlayerTurn = playerTurn[activePlayer === players.A ? players.B : players.A];
                    let icon = '';
                    if(currentPlayerTurn.join('').includes(String(i))){
                        icon = playerIcon[activePlayer];
                    } else if(prevPlayerTurn.join('').includes(String(i))){ 
                        icon = playerIcon[activePlayer === players.A ? players.B : players.A];
                    };

                    // as we called onclick directly, we will curry the function, so it won't get called during rendering
                    return <Button key={i} i={i} icon={icon} onClick={handleTurn(i)}/>
                })
            }
        </div>

        {/* Message and Reset Button */}
            {
                msg && 
                    <div className="w-full h-[10%] bg-white/20 border border-white/15 rounded-md p-2 flex justify-between items-center">
                        <h3 className="text-2xl w-fit text-center font-semibold tracking-wide text-white/80">{msg}</h3>
                        <button className=" bg-white/20 border border-white/15 rounded-md px-4 py-0.5 text-white/80 cursor-pointer hover:bg-white/30" onClick={reset}>Reset</button>
                    </div>
            }

    </div>
  );
};
