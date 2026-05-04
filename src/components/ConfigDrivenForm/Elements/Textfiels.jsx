
export default function Textfiels({ category, name, type, id, error, ...props }) {

  function handleChange(e){
    props.onChange(id, e.target.value, type, name, category);
  };

  function handleBlur(e){
    props.onBlur(id, e.target.value, type, name, category);
  }

  return (
    <div className="flex flex-col gap-1 text-white">
        <label htmlFor={id}>{props.label} {props.required ? <span className="text-red-500">*</span> : null} </label>
        <input 
          type={type} 
          placeholder={props.placeholder}
          name={name}
          value={props.value}
          onChange={handleChange}
          onBlur={handleBlur}
          id={id}
          required={props.required}
          // disabled={props.disabled}   never make any field disable for - SRO
          aria-disabled={props.disabled}   // screen reader support 
          readOnly={props.readonly}
          className={`p-2 rounded-md border-none outline-none text-sm bg-black/20 placeholder:text-zinc-200/70 focus:bg-black/30 ${props.className}`}
          aria-describedby={error ? id : undefined}
          aria-invalid={!!error}
          aria-errormessage="test-error"
          autoComplete="off"
        />
        {/* if you want the content to be read by screen reader then it can't be conditionally rendered, elem shpuld present in DOM */}
        {/* Use status instead of alert as it is a live update */}
        <span role="status" aria-live="polite" className="text-red-500 text-sm" id="test-error">{error}</span>
    </div>
  )
}
