export default function Card({ value, isOpen, isMatched, onClick }) {
    return (
        <div className="flex flex-col items-center justify-center">
            {/* container for card */}
            <div 
                onClick={onClick}
                className={`w-[72px] h-24 sm:w-20 sm:h-28 border border-white/20 p-1.5 relative text-4xl rounded-xl select-none shadow-sm shadow-black/40 cursor-pointer transition-colors duration-300 ${isMatched ? 'bg-green-600/80' : 'bg-zinc-900/60'}`}
            >
                <div className="relative flex items-center justify-center h-full w-full transition-all duration-300 ease-in-out">
                    {(isOpen || isMatched) ? (
                        <div className="absolute rounded-2xl h-full w-full flex items-center justify-center shadow-sm shadow-black/40 text-shadow-sm text-shadow-black/80">
                            {value}
                        </div>
                    ) : (
                        <div className="absolute rounded-2xl h-full w-full bg-zinc-500/40 flex items-center justify-center shadow-sm shadow-black/40">
                            {/* Hidden face */}
                        </div>
                    )}
                </div>
            </div>
            {/* win msg */}
            <div className={`text-green-400 font-bold text-sm mt-1 h-5 transition-opacity duration-300 ${isMatched ? 'opacity-100' : 'opacity-0'}`}>
                Match
            </div>
        </div>
    );
}