import React, { useState } from 'react'
import { cn } from '../../lib/ultis'
import { Eye, EyeOff } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  label?: string
  error?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const isPassword = type === 'password'

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={isPassword && showPassword ? 'text' : type}
            className={cn(
              'flex w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white transition-colors placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
              icon && 'pl-11',
              isPassword && 'pr-11',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className,
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
