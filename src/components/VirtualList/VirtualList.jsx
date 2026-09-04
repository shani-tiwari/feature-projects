import { useState } from "react";
import "./style.css";

const LIST_HEIGHT = 400;
const ROW_HEIGHT = 42;
const OVERSCAN = 10;

function VirtualList({ data, renderRow = () => {} }) {

  const [scrollTop, setScrollTop] = useState(0);

  const listHeight = `${LIST_HEIGHT}px`;
//   const rowHeight  = `${ROW_HEIGHT}px`;

  const startIdx = Math.max(Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN, 0);

  let renderedRowCount = Math.floor(LIST_HEIGHT / ROW_HEIGHT + 2 * OVERSCAN);
  renderedRowCount = Math.min(data?.length - startIdx, renderedRowCount);

  const endIdx = startIdx + renderedRowCount;

  function handleScroll(e) {
    // updates the visible data
    setScrollTop(e.target.scrollTop);
  };

  return (
    <>
      <div
        onScroll={handleScroll}
        style={{ height: listHeight }}
        className="infinite-scroll"
      >
        {/* add scrollable container of needed heightr*/}
        <div style={{ height: `${data.length * ROW_HEIGHT}px` }}> 

          <div style={{ transform: `translateY(${startIdx * ROW_HEIGHT}px)` }}>
            {/* slicing data- only render/add fixed no of elements in dom */}
            {
              data.slice(startIdx, endIdx).map((d, i) => {  
                return <div key={i}>{ renderRow(d) }</div>; 
                 // passed function called here, `d` value goes to `row` 
              })
            }
          </div>

        </div>
        
      </div>
      startIndex{startIdx} renderedRowCount{renderedRowCount}
    </>
  );
}

export default VirtualList;
