
export default function Step1({firstName, lastName, onChange = () => {}}) {

    function handleChange(e) {
        // onChange(e.target.name, e.target.value);
         onChange({name: e.target.id, value: e.target.value});
    };

    //  debounce for 200ms
    // const debounce = (func, delay) => {
    //     let timeout;
    //     return (...args) => {
    //         clearTimeout(timeout);
    //         timeout = setTimeout(() => func(args), delay);
    //     };
    // };

  return (
    // form with 2 fields, first name last name 
    <>
      {/* header */}
      <div className="flex flex-row justify-between">
        <div className="text-white" >1. Personal Information</div>
      </div>

      {/* fields */}
      <div className="flex flex-col mt-4">
        <label htmlFor="firstName">First Name</label>
        <input 
          value={firstName} 
        //   onChange={(e) => debounce(handleChange(e), 200)} 
          onChange={handleChange} 
          className="p-2 rounded-xl text-white bg-zinc-900/70 focus:outline-none focus:ring focus:ring-blue-500" 
          type="text" 
          id="firstName" 
          placeholder="Shani"
        />
      </div>
      
      <div className="flex flex-col mt-4">
        <label htmlFor="lastName">Last Name</label>
        <input 
          value={lastName} 
          onChange={handleChange} 
          className="p-2 rounded-xl text-white bg-zinc-900/70 focus:outline-none focus:ring focus:ring-blue-500" 
          type="text" 
          id="lastName" 
          placeholder="tiwari"
        />
      </div>

      
    </>
  )
}
