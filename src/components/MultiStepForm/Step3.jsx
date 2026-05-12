
export default function Step3({salary, bankNo, onChange = () => {}}) {
    function handleChange(e) {
        onChange({ name: e.target.id, value: e.target.value});
    }
  return (
    // 2 fields --- salary & bank no.
    <>
        <div className="flex flex-row justify-between">
            <div className="text-white" >3. Financial Information</div>
        </div>
      
        <div className="flex flex-col mt-4">
            <label htmlFor="salary">Salary</label>
            <input 
              value={salary} 
              onChange={handleChange} 
              className="p-2 rounded-xl text-white bg-zinc-900/70 focus:outline-none focus:ring focus:ring-blue-500" 
              type="text" 
              id="salary" 
              placeholder="50000"
            />
        </div>
      
        <div className="flex flex-col mt-4">
            <label htmlFor="bankNo">Bank Account Number</label>
            <input 
              value={bankNo} 
              onChange={handleChange} 
              className="p-2 rounded-xl text-white bg-zinc-900/70 focus:outline-none focus:ring focus:ring-blue-500" 
              type="text" 
              id="bankNo" 
              placeholder="1234567890"
            />
        </div>

    </>
  )
}
