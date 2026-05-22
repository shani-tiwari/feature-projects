/** Features:
 * click for reveal, open until we open another card
 * if match -- both card should be opened
 * if not match -- cards should be closed after 500ms
 * show turns user made
 * restart the game
 * on complete - win msg - restart
 */

import { useState, useRef, useEffect } from "react";
import Card from "./Card";



/* const data = ["🐱", "🐶", "🐭", "🦀", "🐼", "🦊", "🐱", "🐶", "🐭", "🦀", "🐼", "🦊"] */
// instead of having same card face twice, we can duplicate the array twice and shuffle it
const data = ["🐱", "🐶", "🐭", "🦀", "🐼", "🦊"]


export default function MemoryGame() {
    const [cards, setCards] = useState(prepareData);
    const [flippedIndices, setFlippedIndices] = useState([]);
    const [isWon, setIsWon] = useState(false);
    
    const timeoutRef = useRef(null);
    const singleCardTimeoutRef = useRef({});

    function prepareData() {
        const dup_data = [...data, ...data];
        for (let i = dup_data.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [dup_data[i], dup_data[j]] = [dup_data[j], dup_data[i]];
        }
        return dup_data.map((item) => ({ value: item, isOpen: false, isMatched: false }));
    }

    const handleCardClick = (index) => {
        // Only 2 cards can be visible at a time
        if (cards[index].isOpen || cards[index].isMatched || flippedIndices.length === 2) {
            return;
        }
        
        const newCards = [...cards];
        newCards[index].isOpen = true;
        setCards(newCards);

        const newFlipped = [...flippedIndices, index];
        setFlippedIndices(newFlipped);

        if (newFlipped.length === 1) {
            // Click on card - reveal it for 3 seconds
            singleCardTimeoutRef.current[index] = setTimeout(() => {
                setCards(prevCards => {
                    const closedCards = [...prevCards];
                    if (!closedCards[index].isMatched) {
                        closedCards[index].isOpen = false;
                    }
                    return closedCards;
                });
                setFlippedIndices(prev => {
                    if (prev.length === 1 && prev[0] === index) return [];
                    return prev;
                });
            }, 3000);
        } else if (newFlipped.length === 2) {
            const [firstIdx, secondIdx] = newFlipped;
            
            // Clear single card timeout for the first card
            if (singleCardTimeoutRef.current[firstIdx]) {
                clearTimeout(singleCardTimeoutRef.current[firstIdx]);
                delete singleCardTimeoutRef.current[firstIdx];
            }

            if (newCards[firstIdx].value === newCards[secondIdx].value) {
                // Match found
                newCards[firstIdx].isMatched = true;
                newCards[secondIdx].isMatched = true;
                setCards(newCards);
                setFlippedIndices([]);
                
                // When all matched, reset after 5 seconds
                if (newCards.every(c => c.isMatched)) {
                    setIsWon(true);
                    setTimeout(() => {
                        resetGame();
                    }, 5000);
                }
            } else {
                // Not a match, hide after 3 seconds
                timeoutRef.current = setTimeout(() => {
                    setCards(prevCards => {
                        const closedCards = [...prevCards];
                        closedCards[firstIdx].isOpen = false;
                        closedCards[secondIdx].isOpen = false;
                        return closedCards;
                    });
                    setFlippedIndices([]);
                }, 3000);
            }
        }
    };

    const resetGame = () => {
        setCards(prepareData());
        setFlippedIndices([]);
        setIsWon(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            Object.values(singleCardTimeoutRef.current).forEach(clearTimeout);
        };
    }, []);

    return (
        <div className="w-fit h-fit bg-slate-600/40 border-2 border-zinc-950/65 rounded-xl flex flex-col gap-8 p-6 items-center">
            <h2 className="text-3xl w-full text-center font-semibold tracking-wide text-white/80 text-shadow-sm text-shadow-black/50">Memory Game</h2>
            
            {isWon && <div className="text-2xl text-green-400 font-bold animate-pulse">You Won! Resetting in 5s...</div>}
            
            {/* cards container */}
            <div className="grid grid-cols-4 gap-6">
                {cards.map((item, idx) => (
                    <Card 
                        key={idx} 
                        value={item.value} 
                        isOpen={item.isOpen} 
                        isMatched={item.isMatched} 
                        onClick={() => handleCardClick(idx)} 
                    />
                ))}
            </div>
            
            <button 
                onClick={resetGame} 
                className="mt-4 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg shadow-md transition-colors"
            >
                Restart Game
            </button>
        </div>
    );
}
