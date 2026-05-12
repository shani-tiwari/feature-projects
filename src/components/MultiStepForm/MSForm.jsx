import { useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

/** MultiStep Form
 ** Description:
   -  A form that collects information from users in multiple steps. 
   -  Keep data and all 3 form access at one place with logoc of showing one form at a time 
 */


const pages = {
    Step1: 1,
    Step2: 2,
    Step3: 3
};
const final_step = pages.Step3;

export default function MSForm() {

    /* state to store the current step */
    const [currentStep, setCurrentStep] = useState(pages.Step1);

    /* states to store data for all 3 steps 
        const [step1, setStep1] = useState({firstName: "", lastName: ""});
        const [step2, setStep2] = useState({phone: "", city: ""});
        const [step3, setStep3] = useState({salary: "", bankNo: ""});
    */
    /* nested state to store data for all 3 steps */
    const [inputs, setInputs] = useState({
        step1: {
            firstName: "",
            lastName: ""
        },
        step2: {
            phone: "",
            city: ""
        },
        step3: {
            salary: "",
            bankNo: ""
        }
    });

    // object to store the steps with page numbers as keys and step components as values
    const steps = {
        [pages.Step1]: Step1,
        [pages.Step2]: Step2,
        [pages.Step3]: Step3
    };

    // getting the current step component
    const Component = steps[currentStep];

    // submit text based on current step
    const submitText = final_step === currentStep ? "Submit" : "Next";

    // handle next button click
    function handleNext() {
        if(final_step === currentStep) {
            // TODO: call submit api
            alert("Form submitted successfully");
            setInputs({
                step1: {
                    firstName: "",
                    lastName: ""
                },
                step2: {
                    phone: "",
                    city: ""
                },
                step3: {
                    salary: "",
                    bankNo: ""
                }
            });
            setCurrentStep(pages.Step1);
        } else {
            // move to next form
            setCurrentStep(currentStep + 1);
        }
    };

    // handle back button click
    function handleBack(){
        if(currentStep > 1){
            setCurrentStep(currentStep-1);
        }
        else{
            alert("Already at the first step");
        }
    };

    function handleChange({name, value}){
        setInputs({
            ...inputs,
            [`step${currentStep}`]: {
                ...inputs[`step${currentStep}`],
                [name]: value
            }
        });
    };

    return (
        <>
            <div className="p-8 rounded-xl border-2 border-white w-[600px] mx-auto flex flex-col gap-4">
                <h2 className="text-2xl font-semibold text-white pb-2 mb-2">Multi Step Form</h2>
                <div className="p-4 rounded-xl border-2 border-white w-2/3 mx-auto">

                    {/* as we direct destructuring values without using 'inputs' key, they won't working properly in react 
                        if we use '...' key, then it will directly destructure the values from 'inputs' object and keys also
                    */}
                    {/* <Component inputs={`{inputs.step${currentStep}}`} />  */}
                    <Component {...inputs[`step${currentStep}`]} onChange={handleChange} /> 
                    
                    <div className="flex flex-row justify-end gap-2 mt-4">
                        { currentStep > pages.Step1 && (
                            <button onClick={handleBack} className="border-2 border-white text-white bg-red-500/80 px-4 py-1.5 rounded-xl cursor-pointer hover:bg-red-500" >
                                Back
                            </button>
                        )}
                        <button  className="border-2 border-white text-white bg-red-500/80 px-4 py-1.5 rounded-xl cursor-pointer hover:bg-red-500" >
                            Cancel
                        </button>
                        <button onClick={handleNext} className="border-2 border-white text-white bg-blue-500/80 px-4 py-1.5 rounded-xl cursor-pointer hover:bg-blue-500" >
                            {submitText}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
