
export default function Step2({phone, city, onChange = () => {}}) {
    function handleChange(e) {
        onChange({name: e.target.id, value: e.target.value});
    }
  return (
    // 2 fields --- phone & city
    <>
        <div className="flex flex-row justify-between">
            <div className="text-white" >2. Contact Information</div>
        </div>
      
        <div className="flex flex-col mt-4">
            <label htmlFor="phone">Phone</label>
            <input 
              value={phone} 
              onChange={handleChange} 
              className="p-2 rounded-xl text-white bg-zinc-900/70 focus:outline-none focus:ring focus:ring-blue-500" 
              type="number" 
              id="phone" 
              placeholder="1234567890"
            />
        </div>
      
        <div className="flex flex-col mt-4">
            <label htmlFor="city">City</label>
            <input 
              value={city} 
              onChange={handleChange} 
              className="p-2 rounded-xl text-white bg-zinc-900/70 focus:outline-none focus:ring focus:ring-blue-500" 
              type="text" 
              id="city" 
              placeholder="Lucknow"
            />
        </div>

    </>
  )
}
