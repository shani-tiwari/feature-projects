/*
 * Tablist Component
 ** Features:
 *   - Tabs
 *   - Click to select tab
 *   - Keyboard accessibility
 *   - Screen Reader Support
 *   - No Component found state(if there is no component for the active tab)
 
 not done ---- you can help me out with that
 *   - extra features -- caching, without each component render on selection each time 
*/

import { useState, memo } from "react";
import Tabs from "./Tabs";


export default function Tablist() {

    const tablist = [
      {
        id: 0,
        label: "Apple",
        component: FirstTab
      },
      {
        id: 1,
        label: "Banana",
        component: SecondTab
      },
      {
        id: 2,
        label: "Cherry",
        component: null
      }
    ];
    const [activeTab, setActiveTab] = useState(0);    

  return (
    <div 
        role="region" 
        aria-label="tab list"
        className="p-4 bg-zinc-600 w-96 h-96 rounded-lg flex flex-col gap-4 items-center"
    >
        <h1 role="heading" aria-level="1" className="text-white text-xl">Tablist Component</h1>
        {/* memoize each tab component to not render when switching tabs and hence component is rendered only once when first selected. */}
        {/* for caching, use useMemo, useCalllback, and React.memo to prevent re-renders*/}

        <Tabs tablist={tablist} activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}

// memoize these functions to not render when switching tabs and hence component is rendered only once when first selected
const FirstTab = memo(() => {
  console.log('re-mount 1st')
    return (
        <div>
            <h1> first Tab </h1>
        </div>
    )
})

const SecondTab = memo(() => {
  console.log('re-mount 2nd')

    return (
        <div>
            <h1> Second Tab </h1>
        </div>
    )
})

const ThirdTab = memo(() => {
  console.log('re-mount 3rd')

    return (
        <div>
            <h1> third Tab </h1>
        </div>
    )
})
