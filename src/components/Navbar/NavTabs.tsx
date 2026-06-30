'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  className?: string
}

export function NavTabs() {
 
  const pathname = usePathname()

  const navigationItems: NavItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Team', href: '#' },
    { label: 'Projects', href: '#' },
    {
      label: 'Temporadas',
      href: '/temporadas',
      className: 'hidden md:inline-flex',
    },
  ]

  return (
    <div className="flex items-center gap-1.5 mt-1">
      {navigationItems.map(item => {
       const isActive = pathname === item.href

        return (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setActiveTab(item.label)}
            className={`
              px-3 py-1.5 rounded-md text-[13px] font-medium
              transition-all duration-150
              ${item.className || ''}
              ${
                isActive
                  ? 'bg-[#1c2541] text-white shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-[#1c2541]/40'
              }
            `}
          >
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}
