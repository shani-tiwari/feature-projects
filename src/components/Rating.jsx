import { useState } from "react";

export default function Rating({value = 0, onChange, maxRating=5}){

    const [hoverIdx, setHoverIdx] = useState(null);
    const [clickIdx, setClickIdx] = useState(value-1);


    function handleClick(i){
        /* curry function, so it doesn't call infinite times */
        return () => {
            setClickIdx(i)
            onChange(i+1);
        };
    };

    function handleHover(i){
        return() => {
            setHoverIdx(i);
        }
    };


    return <>
        <div className="flex  text-6xl cursor-pointer gap-2"> 
            {
                Array.from({length: maxRating}).map((_, i)=>{
                    let className = '';
                    if(i <= clickIdx){
                        className = 'text-yellow-500'
                    }else{
                        className = 'text-gray-500'
                    }
                    if(i <= hoverIdx){
                        className += ' text-yellow-500';
                    }
                    return (
                        <button key={i} 
                          onClick={handleClick(i)}
                          onMouseEnter={handleHover(i)}
                        >
                            <Star className={className} /> 
                        </button>
                    )
                })
            }
        </div>
    </>
};


function Star({className, onClick}){
    return <div onClick={onClick} className={className}>
        ★
    </div>
}
