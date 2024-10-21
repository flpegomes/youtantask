'use client'

import { ThemeSwitcher } from './theme-switcher'

export function Header() {
  return (
    <div className="mx-auto flex max-w-[1300px] items-center justify-between mb-20">
      <div className="text-lg">
        <span>YOUTAN</span>
        <span className="font-bold text-[#00A0B9]">TASKS</span>
      </div>
      <ThemeSwitcher />
    </div>
  )
}
