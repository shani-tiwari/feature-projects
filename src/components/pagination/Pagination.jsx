import { useState } from "react";



const PAGE_SIZE = 5;
const DEFAULT_PAGE = 1;
const MAX_BTN_DISPLAY = 3;


export default function Pagination({data, renderRow, rowPerPage = PAGE_SIZE}){    


    const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
    const [pageSize, setPageSize] = useState(rowPerPage);

    const totalPages = Math.ceil(data.length/pageSize);

    /* for one page */
    const startIndex = (currentPage - 1) * pageSize;
    const lastIndex  = startIndex + pageSize;

    const currentData = data.slice(startIndex, lastIndex);

    /* change page prev/next/last */
    function changePrev(){ 
        setCurrentPage(prev => prev-1) 
    };
    function changeNext(){  
        setCurrentPage(prev=> prev+1)  
    };
    function changeLast(){
        setCurrentPage(totalPages);
    };
    function changeFirst(){
        setCurrentPage(DEFAULT_PAGE);
    };

    const pageNumbers = Array.from({length: totalPages}, (_, i) => i+1);

    const buttons = pageNumbers.slice( currentPage - 1, currentPage + MAX_BTN_DISPLAY - 1);

    return <>
    <div className="flex flex-col items-center gap-1 justify-center">
        {currentData.map((item,index)=>{
            return <div key={index} className="bg-zinc-700 text-white px-4 py-2 rounded-md w-[200px] cursor-pointer flex items-center justify-center">
                {/* RenderProp Design Pattern ----  make sure to call it */}
                {renderRow(item)} 
            </div>
        })}
        <select className="my-3" onChange={e => setPageSize(Number(e.target.value))}> 
            <option value="5">5</option>
            <option value="7">7</option>
            <option value="10">10</option>
        </select>
        <div className="flex items-center gap-4 mb-4"> 
            {buttons.map(number => {
                return <button 
                className={`px-4 py-1 rounded-lg shadow-lg ${currentPage === number ? 'bg-green-500/50' : 'bg-slate-800'}`}
                key={number}
                onClick={() => setCurrentPage(number)}
                > {number} </button>
            })}
        </div>
        <div className="flex items-center gap-4">
            <Button changePage={()=>changeFirst()} disablePage={currentPage === DEFAULT_PAGE}>First</Button>
            <Button changePage={()=>changePrev()}  disablePage={currentPage === DEFAULT_PAGE}>Previous</Button>
            <Button changePage={()=>changeNext()}  disablePage={currentPage === totalPages}>Next</Button>
            <Button changePage={()=>changeLast()}  disablePage={currentPage === totalPages}>Last</Button>
        </div>
    </div>
    </>
};


function Button({children, changePage, disablePage}){
    return <>
        <button 
         disabled={disablePage}
         onClick={()=>changePage()}
         className="bg-zinc-600 text-white px-6 py-2 antialiased rounded-lg shadow-lg cursor-pointer active:scale-98 " 
        >
            {children}
        </button>
    </>
}