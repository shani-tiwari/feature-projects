/* eslint-disable no-unused-vars */

/**
 ** Features:
 * user input - hour, min, sec
 * pause/reset 
 * configurable time
 * list of items to select from
 * on complete show msg, start again
 */

import { useRef, useState, useEffect } from "react"



const Config = {
    hh: {
        value: '',
        factor: 60*60*1000,
        placeholder: 'hh'
    },
    mm: {
        value: '',
        factor: 60*1000,
        placeholder: 'mm'
    },
    ss: {
        value: '',
        factor: 1000,
        placeholder: 'ss'
    }
};

export default function Timer(){

    const [completed, setCompleted] = useState('');
    const [config, setConfig] = useState(Config);
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const timeRef = useRef(0);

    // Clean up interval on unmount
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    function handleChange({key, i}){
        return (e) => {
            const val = e.target.value;
            // Only allow numbers
            if (!/^\d*$/.test(val)) return;

            const newConfig = structuredClone(config);
            newConfig[key].value = val;
            setConfig(newConfig);
        };
    };

    function handleStart(){
        if (isRunning) return;

        let timeInMs = timeRef.current;

        if (timeInMs === 0) {
            timeInMs = Object.keys(config).reduce((acc, key)=>{
                const currentVal = parseInt(config[key].value, 10) || 0;
                return acc + currentVal * config[key].factor;
            }, 0);
        }

        if (timeInMs <= 0) return;

        setIsRunning(true);
        setCompleted('');
        timeRef.current = timeInMs;
        setTime(timeInMs);

        intervalRef.current = setInterval(() => {
            timeRef.current -= 1000;
            if (timeRef.current <= 0) {
                clearInterval(intervalRef.current);
                setIsRunning(false);
                setCompleted('Timer completed!');
                setConfig(Config);
                timeRef.current = 0;
            }
            setTime(timeRef.current);
        }, 1000);
    };

    function handleReset(){
        clearInterval(intervalRef.current);
        setIsRunning(false);
        setCompleted('');
        timeRef.current = 0;
        setTime(0);
        setConfig(Config);
    };

    function handlePause(){
        clearInterval(intervalRef.current);
        setIsRunning(false);
    }

    const isTimerVisible = time > 0 || isRunning;

    return (<>

        <section className="flex flex-col">

            <main className="flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Timer
                    </h1>

                    <div className="flex justify-around gap-4 h-16 items-center">
                        {isTimerVisible ? (
                            <div className="text-4xl font-mono">
                                {String(Math.floor(time / 3600000)).padStart(2, '0')}:
                                {String(Math.floor((time % 3600000) / 60000)).padStart(2, '0')}:
                                {String(Math.floor((time % 60000) / 1000)).padStart(2, '0')}
                            </div>
                        ) : (
                            Object.keys(config).map((key, i)=>{
                                return (<>
                                    <input 
                                        key={i}
                                        type="text" 
                                        placeholder={config[key].placeholder} 
                                        value={config[key].value}
                                        onChange={handleChange({key, i})}
                                        className="border p-2 border-zinc-500 rounded-md w-16 text-center outline-none"
                                        id={`input-${key}`}
                                        list={`list-${key}`}
                                    />
                                    {/* attach to input field by 'list' attribute & provide values in options for better UX */}
                                    <datalist id={`list-${key}`}>
                                        <option value="5"/>
                                        <option value="10"/>
                                        <option value="15"/>
                                        <option value="20"/>
                                        <option value="25"/>
                                        <option value="30"/>
                                        <option value="35"/>
                                    </datalist>
                                </>) 
                            })
                        )}
                    </div>

                    {completed && <div className="text-green-500 font-bold mt-2">{completed}</div>}

                    {/* buttons */}
                    <div className="flex justify-around gap-4 p-4 mt-4">
                        <button onClick={handlePause} disabled={!isRunning} className="p-2 rounded-md bg-blue-700/60 border border-zinc-500 text-white cursor-pointer disabled:opacity-50">
                            &#x23F8; Pause
                        </button>
                        <button onClick={handleReset} className="p-2 rounded-md bg-blue-700/60 border border-zinc-500 text-white cursor-pointer">
                            &#x23FB; Reset
                        </button> 
                        <button onClick={handleStart} disabled={isRunning} className="p-2 rounded-md bg-blue-700/60 border border-zinc-500 text-white cursor-pointer disabled:opacity-50"
                        >
                            &#x23F5; {time > 0 && !isRunning ? 'Resume' : 'Start'}
                        </button>
                    </div>
                </div>
            </main>

        </section>

    </>)
};

