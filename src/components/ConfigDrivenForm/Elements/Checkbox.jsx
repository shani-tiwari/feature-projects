
export default function Checkbox({name, type, category,id, checked, ...props }) {
  function handleChange(){
    props.onChange(id, !checked, type, name, category); 
  };

  return (
    <div className="flex items-center space-x-2 text-white justify-center">
        <input 
          id={id} 
          name={name}
          checked={checked}
          type={type}
          disabled={props.disabled}
          readOnly={props.readOnly}
          onChange={handleChange}
          className={`w-4 h-4 cursor-pointer accent-blue-500`}
        /> 
        <label 
          htmlFor={id} 
          className="text-sm text-zinc-100 "
        >
          {props.label} {props.required ? <span className="text-red-500">*</span> : null}
        </label>
    </div>
  )
}
