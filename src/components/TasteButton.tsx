'use client'

import { ReactElement, cloneElement, useEffect, useState } from 'react'

type IconProps = {
  className?: string
}

type TasteButtonProps = {
  active: boolean,
  onClick: () => void
  title: string
  activeColor: 'red' | 'blue' | 'yellow'
  icon: ReactElement<IconProps>
}

const colorMap = {
  red: {
    bg: 'bg-red-500/15',
    stroke: 'stroke-red-500',
    hover: 'group-hover:stroke-red-400',
    fill: 'fill-red-500',
  },
  blue: {
    bg: 'bg-blue-500/15',
    stroke: 'stroke-blue-500',
    hover: 'group-hover:stroke-blue-400',
    fill: 'fill-blue-500',
  },
  yellow: {
    bg: 'bg-yellow-500/15',
    stroke: 'stroke-yellow-500',
    hover: 'group-hover:stroke-yellow-400',
    fill: 'fill-yellow-500',
  },
}

export default function TasteButton({
  active,
  onClick,
  title,
  activeColor,
  icon,
}: TasteButtonProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const color = colorMap[activeColor]

  const iconClasses = active
    ? `${color.fill} ${color.stroke} scale-110`
    : `stroke-zinc-400 ${color.hover}`

  return (
    <button
      onClick={mounted ? onClick : undefined}
      title={title}
      aria-pressed={mounted ? active : false}
      disabled={!mounted}
      className={`
        group relative flex items-center justify-center
        w-9 h-9 rounded-full cursor-pointer
        transition-all duration-200 ease-out
        active:scale-95
        ${
          mounted && active
            ? `${color.bg} shadow-inner`
            : 'bg-zinc-800 hover:bg-zinc-700'
        }
        ${!mounted ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {cloneElement(icon, {
        className: `
          fill-current stroke-current
          transition-all duration-200
          ${
            mounted
              ? iconClasses
              : 'stroke-zinc-400'
            }
        `,
      })}
    </button>
  )
}
