/* eslint-disable no-unused-vars */
import DigitalClock from './components/DigitalClock'
import AutoComplete from './components/AutoComplete'
import Tablist from './components/TabList'
import Traffic_light from './components/TrafficLight/Traffic_light'
import Accordian from './components/Accordian'
import CDForm from './components/ConfigDrivenForm/CDForm'
import Form from './components/ConfigDrivenForm/Form'
import OL_Circle from './components/overlapping-circle/OL_Circle'
import MSForm from './components/MultiStepForm/MSForm'
import OTP from './components/OTP/OTP'
import ProgressBar from './components/ProgressBar/ProgressBar'
import TicTacToe from './components/TicTacToe/TicTacToe'
import MemoryGame from './components/MemoryGame/MemoryGame'
import Timer from './components/Timer'
import Modal from './components/Modal'
import Pagination from './components/pagination/Pagination'
import Rating from './components/Rating'

export default function App() {

  return (
    <>
      <main className='bg-zinc-700 relative w-screen min-h-dvh flex items-center justify-center gap-4'>
        {/* <DigitalClock/> */}
        {/* <AutoComplete/> */}
        {/* <Tablist/> */}
        {/* <Traffic_light /> */}
        {/* <Accordian/> */}
        
        {/* config driven form component */}
        {/* <Form/>   */}

        {/* <OL_Circle/> */}

        {/* <MSForm /> */}

        {/* <OTP count={4} onOTPComplete={handleOTPComplete} /> */}
        {/* <ProgressBar/> */}

        {/* <TicTacToe/> */}
        {/* <MemoryGame /> */}
        {/* <Timer/> */}

        {/* <Modal /> */}

        {/*  renderProp Design Pattern */}
        {/* <Pagination data={data} renderRow={function(item){   // passing callback function --- 
        // ! i'm able to add but not multiple  ---  coz i was sending an string 
          return <div className="text-white/80"> {item} --- hellp from app </div>
        }} /> */}

        {/* Rating component */}
        <Rating value={0} onChange={handleRatingVhange} maxRating={5}  />
      </main>
    </>
  )
};

function handleRatingVhange(value){
  console.log("rating is", value);
}


// ! const data = Array.from({length: 100}, (_, i) => `${i+1} element`); --- string won't be multiplied
const data = Array.from({length: 30}, (_, i) => i+1);


// function handleOTPComplete(otp){
//   console.log("otp", otp);
// }
