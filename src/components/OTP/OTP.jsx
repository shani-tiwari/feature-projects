import { useRef, useState } from "react";

/** OTP Form 
 ** Features:
 * Handle tab & arrow keys
 * handle backspace
 * switch between inputs based on requirements
 * 
 * Masking
 * Moving cursor from back of digit to front
 * handle paste event
 * Switch focus on text input select if Previous or next is empty on click and on select
 * Length use it with caution 
 * How to complete one time code 
 * autofill using otp credential for reference  --- should be on https
 */
export default function OTP({count, onOTPComplete, }) {

  // const [otp, setOtp] = useState([]);
  const [otp, setOtp] = useState(new Array(count).fill(""));
  const [masking, setMasking] = useState(new Array(count).fill("")); 

  
  const handleOtpChange = (e,index) => {
    // allowing only numbers to enter
    if(e.target.value && !/^[0-9]$/.test(e.target.value)){
      return
    };

    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // if(inputRefs.current[index+1]){
    //   inputRefs.current[index+1].focus();
    // }
  }; 
  
  const handleKeyUp = (e, index) => {

    const prevOtp = [...otp];
    const newMasking = [...masking];

    // handle backspace - check which key pressed
    // when pressing backspace - if current input empty - shift to prev input
    if(e.key === "Backspace" ){
      prevOtp[index] = '';   // empty the box
      newMasking[index] = '';

      moveFocusLeft(index);
      setMasking(newMasking);
      setOtp(prevOtp);
      return;
    };

    // handle arrow keys to shift focus from one input to another
    if(e.key === 'ArrowRight'){
      moveFocusRight(index, prevOtp);
      return;
    }
    
    if(e.key === 'ArrowLeft'){
      moveFocusLeft(index);
      return;
    }
    
    // allowing only numbers to enter
    if(e.key && !/^[0-9]$/.test(e.key)){
      return
    };

    prevOtp[index] = e.key;
    newMasking[index] = '*';
    setMasking(newMasking);
    setOtp(prevOtp);

    // shift focus on next box, if available
    moveFocusRight(index, prevOtp);

    // send successful otp, when all the input are filled
    const otpSend = prevOtp.every((value)=>value !== "");
    if(otpSend && otpSend.length === count){
      onOTPComplete(otpSend);
    };

  };

  function handlePaste(e){
    const pasteData = e.clipboardData.getData("text").slice(0, 4);
    if(!isNaN(pasteData)) {
      setOtp(prev => prev.map((val,i) => i < pasteData.length ? pasteData[i] : val));
      setMasking(prev => prev.map((_,i) => i < pasteData.length ? "*" : ""));
      // onOTPComplete(pasteData.split(""));

    //   const otpSend = prevOtp.every((value)=>value !== "");
    // if(otpSend && otpSend.length === count){
    //   onOTPComplete(otpSend);
    // }
    };  


    // get current input length
    // const inputLength = pasteData.length; 
    // const currentOtp = [...otp];
    // const currentMasking = [...masking];
    
  }

  // to move focus on right side if the text is already present in the input
  function handleClick(e, index){
    // if the cursor is at the end - move to right, else move to left
    if(e.target.selectionStart === 1){
      moveFocusRight(index);
    } 
    // else{
    //   moveFocusLeft(index);
    // }
  }

  function moveFocusRight(index, prevOtp){
    if(inputRefs.current[index+1]){
      // find the index of empty box
      if(prevOtp){
        const temp = [...prevOtp];
        const trimed = temp.fill("*", 0, index);
        const empty = trimed.indexOf("");
        inputRefs.current[empty]?.focus();
      }else{
        inputRefs.current[index+1].focus();
      }


      // const empty = prevOtp.indexOf("");
      // if(empty !== -1) inputRefs.current[empty].focus();

      // if(prevOtp[index+1] === ""){
      //   inputRefs.current[index+1].focus();
      // } else {
      //   moveFocusRight(index+1, prevOtp);
      // }
    }
  }

  function moveFocusLeft(index){
    if(inputRefs.current[index-1]){
      inputRefs.current[index-1].focus();
    }
  }
  
  // ref --- ref list feature
  const inputRefs = useRef([]);

  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-bold mb-4">Please enter OTP</p>
      <div className="flex justify-center">
        {  // to loop over an number
          Array.from({length:count}).map((_,index) => {
            return <input 
              type="text"
              className="w-15 h-15 bg-slate-600/80 outline-none border text-white/90 border-black rounded-md text-center m-2 text-2xl"
              key={index} 
              // to get every elem reference, not only the last one coz of map
              ref={(ref) => inputRefs.current[index] = ref}
              onClick={(e)=>handleClick(e,index)}
              onKeyUp={(e)=>handleKeyUp(e,index)}
              onChange={(e)=>handleOtpChange(e,index)}
              // value={otp[ index ] ?? ""}
              value={masking[index] ?? ""}
              // inout mode numeric for mobile 
              inputMode="numeric"
              maxLength={1} 
              autoComplete="one-time-code" // get suggestion to fill field with OTP - tell browser, that's an otp field
              onPaste={(e)=>handlePaste(e,index)}
            />
          })
        }
      </div>
    </div>
  )
}
