import DigitalClock from './components/DigitalClock'
import AutoComplete from './components/AutoComplete'
import Tablist from './components/TabList'
import Traffic_light from './components/TrafficLight/Traffic_light'
import Accordian from './components/Accordian'
import CDForm from './components/ConfigDrivenForm/CDForm'
import Form from './components/ConfigDrivenForm/Form'
import OL_Circle from './components/overlapping-circle/OL_Circle'
import MSForm from './components/MultiStepForm/MSForm'

export default function App() {
  return (
    <>
      <main className='bg-zinc-700 w-screen min-h-screen flex items-center justify-center'>
        {/* <DigitalClock/> */}
        {/* <AutoComplete/> */}
        {/* <Tablist/> */}
        {/* <Traffic_light /> */}
        {/* <Accordian/> */}
        
        {/* config driven form component */}
        {/* <Form/>   */}

        {/* <OL_Circle/> */}

        <MSForm />
      </main>
    </>
  )
}
