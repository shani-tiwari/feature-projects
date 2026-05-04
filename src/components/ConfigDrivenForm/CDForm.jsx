

/* Config Driven FORM 
  ** Description: 
    - get data like text, checkbox, radio from api -- return the UI of form dynamically 
    - submit, reset control will be on parent via functions - data sender component
 ** Features: 
 * getting all data for form via api
 * on submit - console fields values
 * on cancel - clear the form
 * handle different types of controls
 * show more controls based on categories (info - 3 controls, address - 2 controls)
 * add-on auto complete suggestion 
 * screen reader accessible - role, status, aria-live, aria-invalid, aria-errormessage
 */

import Button from "./Elements/Button";
import Checkbox from "./Elements/Checkbox";
import Textfiels from "./Elements/Textfiels";



export default function CDForm({formData, handleInputChange, handleSubmit, handleReset, onBlur /* disableSubmit */}) {

    function onSubmit(e){
        e.preventDefault();
        handleSubmit();
    };
  return (
    <div className="space-y-6 bg-zinc-900 rounded-lg p-6 w-[500px] shadow-lg shadow-zinc-800">
        <h1 className="text-xl text-white text-center">sign up form</h1>
        <form onSubmit={onSubmit} className="wrapper bg-slate-900 p-6 rounded-lg flex flex-col gap-4 w-[400px] justify-center items-center mx-auto">
            {  formData &&  Object.keys(formData).length > 0  ? (
                    Object.keys(formData).map((key) => {
                        const data = formData[key].inputs;
                        return (
                            <fieldset key={key} className="flex flex-col gap-2 w-full bg-slate-700/40 p-2 rounded-xl border border-gray-400/50 border-dashed"> 
                                <legend className="text-white font-medium">{formData[key].name}</legend>
                                {
                                    data.map((input)=> { 
                                        if(input.type === "text"){
                                            return <Textfiels category={key} {...input} onChange={handleInputChange} onBlur={onBlur}/>
                                        }else if(input.type === "checkbox"){
                                            return <Checkbox category={key} {...input} onChange={handleInputChange} onBlur={onBlur}/>
                                        }else{ 
                                            return <Textfiels category={key} {...input} onChange={handleInputChange} onBlur={onBlur}/>
                                        }
                                    })
                                }
                            </fieldset>
                        )
                    })
                ) : (
                    <p>Loading form...</p>  
                )
            }
            <div className="buttons flex gap-2">
                <Button /*disabled={disableSubmit}*/ variant="submit" label="submit" type="submit" />
                <Button variant="reset" label="reset" onClick={handleReset} type="reset" /> 
            </div>
        </form>
    </div>
  )
}
