
/* Auto Complete Component 
**Features
 *  Loading state
 *  Error state
 *  No results state
 *  Dropdown list of matching results
 *  Clear button to clear search
 *  Debounced API calls
 *  Click outside to close dropdown
 *  ESC key to close dropdown
 *  Keyboard navigation (up/down arrows) 
*/

import { useEffect, useState, useRef } from "react"

export default function AutoComplete() {

  const suggestions = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];

  const [error, setError] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false);  // as we select any item from list, list will hide
  const [searchTerm, setSearchTerm] = useState("");
  const [noResult, setNoResult] = useState(false);

  const isSelection = useRef(false);
  const ignoreApiResult = useRef(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // manage keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowList(false);
      setNoResult(false);
      setLoading(false);
      setError(null);
      ignoreApiResult.current = true;
    } else if (e.key === "ArrowDown") {
      if (showList && options.length > 0) {
        e.preventDefault();
        setActiveIndex((prevIndex) => 
          prevIndex < options.length - 1 ? prevIndex + 1 : prevIndex
        );
      }
    } else if (e.key === "ArrowUp") {
      if (showList && options.length > 0) {
        e.preventDefault();
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
      }
    } else if (e.key === "Enter") {
      if (showList && activeIndex >= 0 && activeIndex < options.length) {
        e.preventDefault();
        isSelection.current = true;
        setSearchTerm(options[activeIndex]);
        setShowList(false);
      }
    }
  };

  // handle API call 
  useEffect(() => {
    if (isSelection.current) {
      isSelection.current = false;
      return;
    }

    let isCancelled = false;
    ignoreApiResult.current = false;
    // setActiveIndex(-1);

    const fetchOptions = async() => {
      console.log('calls');
      if(searchTerm.length === 0) {
        setShowList(false);
        setNoResult(false);
        return;
      }
      setLoading(true);
      setError(null);
      setNoResult(false);
      try {

        new Promise((res) => {
          setTimeout(() => {
            res(suggestions);
          },4000)
        }).then((response) => {
        if (isCancelled) return;
        const filterOptions = response.filter((suggestion) =>  
          suggestion.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterOptions.length > 0) {
          setOptions(filterOptions);
          setLoading(false);
          if (!ignoreApiResult.current) setShowList(true);
        }else{
          setLoading(false);
          if (!ignoreApiResult.current) setNoResult(true);
          setShowList(false);
        }
      });
       
       
      } catch (error) {
        if (!isCancelled) setError(error.message);
      } 
    };
    // debounce - used to prevent excessive API calls
    const timerId = setTimeout(() => {
      fetchOptions();
    }, 300); // 300ms delay
    return () => {
      clearTimeout(timerId); 
      isCancelled = true;
    };             
  }, [searchTerm]);


  return (

    <div 
     onClick={()=>{setShowList(false); setSearchTerm("")}}
     className="autocomplete-wrapper relative p-5 bg-gray-500 h-screen w-screen flex flex-col items-center justify-center" >
      <h1 className="text-3xl font-bold text-center -mt-25 mb-8 text-white">AutoComplete Input Box</h1>
      <div 
       onClick={(e) => e.stopPropagation()}
       className="input-wrapper border-2 border-gray-800 rounded-md flex items-center justify-between py-2 px-4 w-100">
        <input 
          type="text" 
          placeholder="Search" 
          value={searchTerm} 
          onChange={(e) => {setSearchTerm(e.target.value); }} 
          onKeyDown={handleKeyDown}
          className="outline-none"
        />
        {searchTerm.length > 0 && (
          <button className="cursor-pointer" onClick={() => setSearchTerm("")}>
            ❌
          </button>
        )} 
      </div>
      {/* absolute and fix this div position so it doesn't move upper div */}
      <div 
       onClick={(e) => e.stopPropagation()}
       className="dropdown absolute top-90 left-1/2 -translate-x-1/2   border-2 border-gray-800 rounded-md mt-2 w-100 max-h-60 overflow-y-auto">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {noResult && <div>No results found</div>}
        {searchTerm.length > 0 && showList && (
          <ul>
            {options.map((option, index) => (
              <li 
                key={index} 
                onClick={() => {
                  isSelection.current = true;
                  setSearchTerm(option); 
                  setShowList(false);
                }} 
                className={`border-b border-gray-800 p-2 cursor-pointer hover:bg-gray-300 ${activeIndex === index ? 'bg-gray-300' : ''}`}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> 
  )
};

// direct adding data
    // suggestions.filter((suggestion) =>  
    //   suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    // ); 
    // setOptions(response);

// fetch api call
  //  const response = fetch("").then((res)=> res.json()).then((data) => {  setOptions(data)  })
  //         if(response.length === 0) return;

