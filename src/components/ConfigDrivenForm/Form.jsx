//  we send form data from here to CDForm component via props

/**
 * TextFiels --- placeholder, label, name, value, onChange, error, disables, readonly, id, required
 * Never Disable a button - make fields require
 * error check on fields 
 */

// add checkbox group, 

import { useState } from "react";
import CDForm from "./CDForm";

const categories = {
  personal:{
    name: "personal",
    inputs: [
       {
        id: 0,
        type: "text",
        name: "firstName",
        label: "First Name",
        placeholder: "Enter your first name",
        value: "",
        disabled: false,
        readOnly: false,
        error: '',
        required: true,
      },
      {
        id: 1,
        type: "text",
        name: "lastName",
        label: "Last Name",
        placeholder: "Enter your last name",
        value: "",
        disabled: false,
        readOnly: false,
        error: '',
        required: true,
      },
    ]
  },
  contact: {
    name: "contact",
    inputs:[
      {
        id: 2,
        type: "tel",
        name: "phone",
        label: "phone number",
        placeholder: "Enter your phone number",
        value: "",
        disabled: false,
        readOnly: false,
        error: '',
        required: true,
      },
      {
        id: 3,
        type: "email",
        name: "email",
        label: "email",
        placeholder: "Enter your email",
        value: "",
        disabled: false,
        readOnly: false,
        error: '',
        required: true,
      },
    ]
  },
  extra:{
    name: "extra",
    inputs: [
      {
        id: 4,
        type: "checkbox",
        name: "terms",
        label: "terms & conditions",
        checked: false,
        disabled: false,
        readOnly: false,
        error: '',
        required: true,
      },
    ]
  }
}
 



export default function Index() {


  const [formData, setFormData] = useState(structuredClone(categories));

  const handleInputChange = (id, value, type, name, category) => {
    const prev = structuredClone(formData);
    const index = prev[category].inputs.findIndex(item => item.id === id);
    
    if(type === 'checkbox'){
      // setFormData((prev) => prev.map(item => item.id === id ? {...item, checked: checked} : item));
      // console.log(value)
      prev[category].inputs[index].checked = value;
    }else{
      prev[category].inputs[index].value = value;
    }
    prev[category].inputs[index].error = "";
    setFormData(prev);
  }

  const handleBlur = (id, value, type, name, category) => {
    const prev = structuredClone(formData);
    const index = prev[category].inputs.findIndex(item => item.id === id);
    
    if(type === 'checkbox'){
      if(!prev[category].inputs[index].checked){
        prev[category].inputs[index].error = "please check terms";
      }else{
        prev[category].inputs[index].error = "";
      }
    }else{
      if(value.trim().length < 3 && value){
        prev[category].inputs[index].error = "please enter valid input with atleast 3 characters";
      }else{
        prev[category].inputs[index].error = "";
      }
    }

    setFormData(prev);
  };

  const handleSubmit = () => {
    let isValid = true;
    const submitData = {};
    const prev = structuredClone(formData);

    Object.keys(prev).forEach((key) => {
      prev[key].inputs.forEach((input) => {
        if (input.type === 'checkbox') {
          if (input.required && !input.checked) {
            isValid = false;
            input.error = "please check terms";
          }
          submitData[input.name] = input.checked;
        } else {
          if (input.required && (!input.value || input.value.trim() === '')) {
            isValid = false;
            input.error = "this field is required";
          }
          submitData[input.name] = input.value;
        }
      });
    });

    if (isValid) {
      console.log('Form Submitted successfully:', submitData);
    } else {
      setFormData(prev);
      console.log('Submission failed: Please fill all required fields and check the terms.');
    }
  };

  const handleReset = () => {
    setFormData(structuredClone(categories));
  };

  // const disableSubmit = () => {
  //   let disable = false;
  //   disable = inputs.some(data => !data.value);
  //   return disable;
  // };


  return (
    <>
    
      <CDForm 
        formData={formData} 
        handleInputChange={handleInputChange} 
        handleSubmit={handleSubmit} 
        handleReset={handleReset}
        onBlur={handleBlur}
        // disableSubmit={disableSubmit}
      />

    </>
  );
}
