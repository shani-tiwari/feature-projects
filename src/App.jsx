import DigitalClock from './components/DigitalClock'
import AutoComplete from './components/AutoComplete'
import Tablist from './components/TabList'

export default function App() {
  return (
    <>
      <main className='bg-zinc-700 w-screen h-screen flex items-center justify-center'>
        {/* <DigitalClock/> */}
        {/* <AutoComplete/> */}
        <Tablist/>
      </main>
    </>
  )
}
