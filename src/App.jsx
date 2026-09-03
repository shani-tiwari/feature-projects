/* eslint-disable no-unused-vars */

import VirtualList from "./components/VirtualList/VirtualList";



export default function App() {

  return (
    <>
      <main className='bg-zinc-700 relative w-screen min-h-dvh flex items-center justify-center gap-4'>
        <VirtualList
            data={data}
            renderRow={(row) => {
              // pass custom JSX - as per your requirement
              return (
                <div className=" bg-white/40 w-28 text-center mb-px h-10">
                  row - {row}
                </div>
              );
            }}
          />
      </main>
    </>
  )
};

const data = Array.from({length: 400}, (_, i) => i+1);



function handleRatingVhange(value){
  console.log("rating is", value);
}


// function handleOTPComplete(otp){
//   console.log("otp", otp);
// }
