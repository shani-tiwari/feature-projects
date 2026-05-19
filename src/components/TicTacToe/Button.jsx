
export default function Button({i, icon,  onClick}) {
  return (
    <button 
      key={i}
      onClick={onClick} 
      className="bg-white/10 rounded-md border border-black/15 cursor-pointer hover:bg-white/15 flex items-center justify-center font-medium text-zinc-900 text-3xl leading-none"
    >
        {icon}
    </button>
  )
}
