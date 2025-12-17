interface NoPosterProps {
  title: string
  variant?: 'default' | 'minimal' | 'colorful'
}

export default function NoPoster({ title, variant = 'default' }: NoPosterProps) {
  const variants = {
    default: 'bg-gradient-to-br from-gray-800 to-gray-900',
    minimal: 'bg-gray-800',
    colorful: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900'
  }
  return (
    <div className={`w-full aspect-[2/3] ${variants[variant]} flex flex-col items-center justify-center p-6 text-center`}>
      <div className="text-7xl mb-4 opacity-50">🎬</div>
      <p className="text-white font-bold text-lg leading-tight mb-2 line-clamp-3">
        {title}
      </p>
      <div className="w-16 h-px bg-gray-600 my-2" />
      <p className="text-gray-400 text-xs uppercase tracking-wider">
        No Poster Available
      </p>
    </div>
  )
}
