import React from "react";

const Tabs = React.memo(({tablist, activeTab, setActiveTab}) => {
    // console.log(tablist[0].component)

    // way to get and render component 
    const Component = tablist[activeTab].component;

    
  return (
    <div className="flex flex-col items-center gap-2 mt-4">
        <div className="flex items-center gap-2">
            {tablist.map((tab,index) => (
            <div
                role = "tab"
                aria-selected = {activeTab === index}
                // tabIndex = {index}
                key={index}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => {
                    if (e.key === "ArrowLeft" && index > 0) setActiveTab(index - 1);
                    if (e.key === "ArrowRight" && index < tablist.length - 1) setActiveTab(index + 1)
                    
                    if (e.key === "Tab") {
                    if (index === tablist.length - 1) {
                        document.querySelector("[tabIndex='0']").focus();
                    } else {
                        document.querySelector(`[tabIndex='${index + 1}']`).focus();
                    }
                    }
                }}
                className={`${activeTab === index ? "bg-blue-500 text-white" : ""} flex px-4 py-2 rounded cursor-pointer`}
            >

                {tab.label}

            </div>
        ))}
        </div>
        <div role="tabpanel" className="mt-4">
            { // if component not found
                Component ? <Component /> : <h1>No Component Found</h1>
            }
        </div>

    </div>
  )
}
)

export default Tabs;


