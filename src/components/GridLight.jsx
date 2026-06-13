import { useState } from "react";

const config = [
    [1, 1, 0],
    [0, 1, 1],
    [1, 0, 1]
];

export default function GridLight(){

    const [stack, setStack] = useState(new Map()); // work like an object with, insertion order preserve

    function handleClick(row, cell){
        return () => {
            const newStack = structuredClone(stack);
            const key = `${row}-${cell}`;

            if(newStack.get(key) || !config[row][cell]){
                return;
            }
            newStack.set(key, true);
            setStack(newStack);

            const selected = config.flat().reduce((acc, curr) => {
                return acc + curr
            }, 0);

            if(selected === newStack.size){
                setTimeout(startRollBack, 1000);
            }
        }
    };

    function startRollBack(){

        const interval = setInterval(() => {
            setStack(prev => {
                const key = Array.from(prev.keys()).pop();
                const newStack = structuredClone(prev);
                newStack.delete(key);
                if(newStack.size === 0){
                    clearInterval(interval);
                }
                return newStack;
            });
        }, 1000);

    }


    return (
        <div className='grid grid-cols-3 gap-2'>
            {
                config.map((row, i) => {
                    return <div key={i} className='grid grid-cols-3 gap-2'>
                        {row.map((cell, j) => {
                            const key = `${i}-${j}`;
                            if(stack.has(key)){
                                return <div className="w-10 h-10 bg-green-500" key={key} /> 
                            }
                            return <div 
                            className={`w-10 h-10 ${cell ? 'bg-red-500' : 'bg-blue-500'}`}
                            onClick={handleClick(i, j)}
                            key={key} 
                            />
                        })}
                        <br/>
                    </div>
                })
            }
        </div>
    )
}