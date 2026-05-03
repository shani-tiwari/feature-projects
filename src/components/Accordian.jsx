/** Accordian 
 ** Features:
 * expand/collapse with smooth animation effect and aware browser about it
 * try to do it by - Native HTML element ?
 * WCAG compliant - accessibility
 * if two elements is connected like this with property,  they should connected by "aria" attributes
 * auto focus on dynamically added content
 * visually indication of expanding / collapsing content
 * open all or one at a time
 */

import { useState } from "react"
import {ArrowDown} from "lucide-react"

export default function Accordian() {
    const [openIds, setOpenIds] = useState([]);
    const [enableMulti, setEnableMulti] = useState(false);

    const items = [
        {
            id: 1,
            title: "Item 1",
            content: "Content 1",
        },
        {
            id: 2,
            title: "Item 2",
            content: "Content 2",
        },
        {
            id: 3,
            title: "Item 3",
            content: "Content 3",
        },
    ];

    function toggleItem(id) {
        setOpenIds((prev) => {
            if (prev.includes(id)) {
                return prev.filter(itemId => itemId !== id);
            } else {
                if (enableMulti) {
                    return [...prev, id];
                } else {
                    return [id];
                }
            }
        });
    }

    function openAll() {
        setEnableMulti(true); // Automatically enable multi-select to keep them all open
        setOpenIds(items.map(item => item.id));
    }

    function closeAll() {
        setOpenIds([]);
    }

  return (
    <div className=" bg-zinc-600 p-10 rounded-lg flex flex-col items-center justify-center transition-all duration-300">
        <h1 className="text-2xl font-semibold mb-4">Accordian</h1>
        {/* Open all / close all buttons */}
            <div className="flex gap-2 mt-2">
                <button 
                    onClick={openAll}
                    className="text-xs px-1 py-0.5 bg-green-500/70 text-white rounded cursor-pointer"
                >
                    Open All
                </button>
                <button 
                    onClick={closeAll}
                    className="text-xs px-1 py-0.5 bg-red-500/80 text-white rounded cursor-pointer"
                >
                    Close All
                </button>
            </div>
        {/* we have to re-render it, when our isOpen change - to reflect changes on UI, 
        why ? because without re-render it will not call AccordionItem component again, 
        and hence it will not update the UI */}
        {
            items.map(item => (
                <AccordionItem 
                    key={item.id} 
                    item={item} 
                    isOpen={openIds.includes(item.id)} 
                    onToggle={() => toggleItem(item.id)} 
                />
            ))
        }

    </div>
  )
};

// helper component
function AccordionItem({item, isOpen, onToggle}) {
    return (
        <div className={`wrapper max-h-10 overflow-hidden bg-stone-400 p-2 m-2 w-[200px] rounded-lg transition-all duration-300 ${
            isOpen ? "max-h-56" : "max-h-10"
        }`}>
            <div className="top flex justify-between items-center ">
                <div className="head text-md font-medium text-zinc-900">
                    {item.title}
                    <span aria-hidden="true" id={`content-${item.id}`}></span>
                </div>
                <button 
                  onClick={onToggle}
                  aria-expanded={isOpen}
                  aria-controls={`panel-${item.id}`}
                  className={`p-0.5 rounded-full bg-white/60 text-black cursor-pointer transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ArrowDown className="w-5 h-5" />  
                </button>
            </div>

  

            <div 
              aria-hidden={!isOpen} 
              id={`panel-${item.id}`}
              role="region"
              aria-labelledby={`header-${item.id}`}
              tabIndex={0}
              className="bottom bg-stone-400 flex justify-between items-center mt-2 p-2 rounded"
            >
                <div 
                  id={`content-${item.id}`}
                  aria-labelledby={`content-${item.id}`}
                  className="content text-md text-zinc-800">
                    {item.content}
                </div>
            </div>
        </div>
    )
}
