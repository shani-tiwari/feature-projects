/** Progress Bar
 ** Features:
 * increase/decrease based on progress
 * explore native options - 'progress'
 * performance
 * progress events(onStart, onComplete) 
 * Accessibility (ARIA attributes)
 * 
 */

 
/** Learning:
 * 1.
 * when width changes dynamically, browser will re-calculate the layout of whole page - which may create an overhead 
 * so, don't use 'width' for animation, use 'transform' or 'animation' property instead
 * UI paints can be checked in network tab
 * 
 * 2.
 ** Progress Native Element
  * states - indeterminate, determinate 
  * 
  * 3.
  * User agent shadow dom - option in inspect setting let's you see the default styling of any element browsers does for them by their own. 
  * those are called 'shadow-dom' components.
  * and we can override it too - using ::-webkit-progress-bar, ::-webkit-progress-bar etc 
  * 
 */

import { useEffect, useState } from "react";


export default function ProgressBar(){

    const [currentVal, setCurrentVal] = useState(0.1);

      useEffect(() => {
        if(currentVal === 1.0){
            onComplete();
            return;
        }
        // onStart();
        const timer = setInterval(() => {
            setCurrentVal((prev)=> prev + 0.1);
        }, 1000)

        return () => clearInterval(timer);
    }, [currentVal]);

    return(
        <>
            <progress 
              value={currentVal} 
              max={1.0} 
              className="w-96 h-7 appearance-none rounded-full bg-cyan-400"

                //   accessibility
                aria-label="Progress bar"
                aria-valuetext={`Be Patient, we will be ready soon - ${currentVal}`}
                // aria-valuenow={currentVal}
                aria-valuemin={0}
                aria-valuemax={1.0}
            /> 
            <span aria-live="polite" role="status" id="status" className="hidden"></span>
        </>
    )
}







// not preferred way to build an progress bar 

const max_val = 100;

function onStart(){
    console.log('started');
};

 function onComplete(){
    console.log('completed');
 };

function ProgressBarBadWay() {
    const [currentVal, setCurrentVal] = useState(0);

    useEffect(() => {
        // if current value is 100, don't run the effect
        if(currentVal === max_val){
            onComplete();
            return;
        }
        onStart();
        const timer = setInterval(() => {
            setCurrentVal((prev)=> prev + 10);
        }, 1000)

        // if(currentVal === max_val){
        //     onComplete();
        //     clearInterval(timer);
        // }
        
        return () => clearInterval(timer);
    }, [currentVal]);

  return (
    <div className="w-[50%] mx-auto bg-zinc-500 rounded-2xl p-6 flex gap-4 flex-col">
        <h1 className="p-2 text-center text-3xl">Progress Bar</h1>
        <div className="w-96 h-7 mx-auto p-0.5 bg-gray-200 rounded-full overflow-hidden relative">

            <div
                role="progressbar"
                aria-valuenow={currentVal}
                aria-valuemin={0}
                aria-valuemax={max_val}
                aria-valuetext={`${currentVal} out of ${max_val}`}
                aria-busy={false}
                style={{
                    transform: `translateX(${currentVal}%)`,
                }}
                className="-translate-x-full h-full w-95 z-100 bg-cyan-500 rounded-full origin-left transition-all ease-in-out duration-500"
            >

            </div>

        </div>
    </div>
  )
}

