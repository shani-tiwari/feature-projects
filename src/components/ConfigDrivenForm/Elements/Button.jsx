// 

export default function Button({variant = "submit", label, onClick, type, className}) {
  return (
    <button 
      className={`px-3 py-1 rounded-md border-none outline-none text-sm ${variant === "submit" ? "bg-indigo-500" : "bg-red-500"} cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
    >
        {label}
    </button>
  )
}