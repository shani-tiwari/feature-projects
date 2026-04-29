import { useEffect, useRef, useState } from "react";

export default function DigitalClock() {


    //  default format
    const date = new Date();
    // eslint-disable-next-line no-unused-vars
    const [count, setCount] = useState(0);

    // scnerio - if i open the website at 12:34:50:500 - then time should be update after 1000ms but it had to update after 500ms
        useEffect(() => {
            setInterval(() => {
                setCount(c => c+1);  // just to trigger re-render after every 1 sec
            }, 1000)
        }, []);


    // optimized format
        const [time, setTime] = useState(new Date());
        useEffect(() => {
            const tick = () => {
                setTime(new Date());
                // const now = new Date();
                // const delay = 1000 - (new Date() % 1000) ;
                setTimeout(tick, 1000 - (new Date() % 1000));
            };
            const timeoutId = setTimeout(tick, 1000 - (new Date() % 1000 ));

            return () => clearTimeout(timeoutId);
        }, []);


    //  without setInterval
        const ref = useRef();
        function updateClock (){
            setTime(new Date());
            ref.current = requestAnimationFrame(updateClock);
        }
        // updating the time bases of FPS of specific screen --- sync with the refresh rate
        useEffect(() => {
            ref.current = requestAnimationFrame(updateClock);
            return () => cancelAnimationFrame(ref.current);
        });

        // manual format   
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? "PM" : "AM";
        // make it 12 hour format, if 0 then make it 12 , if single digit then add 0 in starting
        const hours12 = String(hours % 12 || 12).padStart(2, '0');


  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Digital Clock</h1>

        {/* default format */}
        {/* localeTimeString --- is a heavier task */}
        <p className="text-2xl"> 24hour-format-{date.toLocaleTimeString()}</p>  
        
        {/* optimized format */}
        <p className="text-2xl"> 24hour-optimize-format-{time.toLocaleTimeString()}</p>
        
        {/* manual format */}
        <p>12hour-format-{hours}:{minutes}:{seconds} {ampm}</p>
        <p>12hour-format-optimized-{hours12}:{minutes}:{seconds} {ampm}</p>
    </div>
  )
}
