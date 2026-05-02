/* eslint-disable no-unused-vars */
/* Traffic Light
 ** Features: 
 * UI should be configurable
 * display order of lights can be configured
 * light order can be configured
 * each light have specific time frame
*/

import { useEffect, useState } from 'react';

export default function Traffic_light() {
  const lights = [
    {id: 1, color: "red", time: 1000, order: 4, displayOrder: 1},  
    {id: 2, color: "yellow", time: 1000, order: 2, displayOrder: 2},  
    {id: 3, color: "green", time: 1000, order: 1, displayOrder: 3},   
  ];

  const dataToShow = getSortedDisplayOrder(lights);
  const LightOrder = getSortedOrder(lights);
  
  const [LightInDsplayOrder, setLightInDsplayOrder ] = useState(dataToShow);
  const [LightInOrder, setLightInOrder ] = useState(LightOrder);
  const [ActiveLight, setActiveLight ] = useState(LightOrder[0]);

  function getSortedDisplayOrder(randomOrder){
    return randomOrder.toSorted((a,b) => a.displayOrder - b.displayOrder)
  };

  function getSortedOrder(randomOrder){
    return randomOrder.toSorted((a,b) => a.order - b.order)
  };

  useEffect(() => {
    if (!ActiveLight) return; 
    
    const timeoutId = setTimeout(() => {
      // change the active light
      const currentLightIndex = LightInOrder.findIndex(
        (light) => light.id === ActiveLight.id
      );
      const nextIndex = (currentLightIndex + 1) % LightInOrder.length;
      setActiveLight(LightInOrder[nextIndex]);
    }, ActiveLight.time);

    return () => {
      clearTimeout(timeoutId)
    }
  }, [ActiveLight,LightInOrder ])


  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='text-3xl font-bold mb-8'>Trafic Light</div>
        <div className="flex flex-col items-center justify-center border-4 border-zinc-900 rounded-xl p-2 bg-zinc-600">
          {LightInDsplayOrder.map((light) => (
            <Light key={light.id} color={light.color} activeLightColor={ActiveLight.color} />
          ))}
        </div>
    </div>
  )
};



/** Light
 ** Features: 
 * color
 * Time
 * Order
 * Display Order
 */

 // Light = {id: 1, color: "red", time: 5, order: 1, displayOrder: 1}  

function Light({color, activeLightColor}) {
  return (
    <div style={{backgroundColor: color === activeLightColor ? color : "#fff"}} className={`w-15 h-15 m-4 rounded-full border-4 border-zinc-500`} ></div>
  )
}
