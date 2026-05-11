/** Overlapping Circle Problem
 ** Features - 
 * where ever i click, draw a circle
 * if new one is overlapping with other, apply different bg color to all overlapping circle and new circle 
 * add animation
 */

import { useState } from "react";


export default function OL_Circle() {

    const [circles, setCircles] = useState([]);
    // const [X, setX] = useState(0);
    // const [Y, setY] = useState(0);

    function DrawCircle(e){
        // co-ordinates of mouse pointer relative to viewport
        // console.log(" mouse position - "+ e.clientX, e.clientY);
        // const x = e.clientX; 
        // const y = e.clientY;
        
        // setX(e.clientX);
        // setY(e.clientY);
        
        // console.log(circles)
        // setCircles([...circles, {x,y}]);


        const x = e.clientX; 
        const y = e.clientY;
        const newCircle = {x, y};
        setCircles((prev) => {
            const newColor = RandomColor();
            const oldCircle = [...prev];
            
            oldCircle.forEach(c => {
                const x2 = newCircle.x;
                const y2 = newCircle.y;
                const x1 = c.x;
                const y1 = c.y;

                const distance = Math.sqrt((x2-x1)*(x2-x1) + (y2-y1)*(y2-y1));
                const radius_sum = 60;
                if(distance < radius_sum){
                    c.color = newColor;
                }
            });
            newCircle.color = newColor;
            oldCircle.push(newCircle);
            return oldCircle
        });
        
    };

    function RandomColor(){
        return `hsl(${Math.random()*360}, 50%, 50%)`;
    }

  return (
    <section onClick={DrawCircle} className="w-full h-full bg-red-300/20 flex flex-col items-center ">
        <h1 className="text-xl text-white">Overlapping Circle Question</h1>

           { circles.length > 0 ? 
             circles?.map((circle, i) => (       
                <Circle circle={circle} key={i} /> 
             )) 
             : 
             (<div>No circle drawn yet. Click somewhere to draw one.</div>)
           }
        {/*  -- as this section is taking some spave, Y value is interuptiog, and circle isn't appearing where we click. */}
        {/* section where circles can created */}
        {/* <section  className="w-full h-full bg-gray-400/40 mt-8 relative border-2 border-zinc-200 rounded-xl overflow-hidden">
        </section> */}

    </section>
  )
};



// helper component to render circle at random position

function Circle({circle}){
    const {x, y, color} = circle;
    return ( <>
        
        <style jsx>{`
            @keyframes scaleIn {
                from { transform: scale(0)}
                to   { transform: scale(1)}
            }
        `}</style>

        <div 
          className="w-15 h-15 rounded-full absolute border-2 border-gray-800/50 shadow-lg -translate-x-1/2 -translate-y-1/2" 
          style={{ 
            left: `${x}px`, 
            top: `${y}px`, 
            backgroundColor: color || 'transparent', 
            // transform: 'translateX(-50%) translateY(-50%)',
            // transition: 'all 0.3s ease-in-out',
            animation: 'scaleIn 0.5s ease-in-out forwards'
          }}
        />
   </>
    )
};
