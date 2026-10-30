import { setTheme, useTheme } from '../theme.js'
import { MoonIcon, SunIcon } from './icons.jsx'

export default function ThemeToggle({ variant = 'icon' }) {
  const theme = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'
  const label = `${nextTheme === 'dark' ? 'Dark' : 'Light'} mode`
  const icon = theme === 'dark' ? <SunIcon /> : <MoonIcon />

  if (variant === 'button') {
    return (
      <button type="button" className="theme-button" onClick={() => setTheme(nextTheme)}>
        {icon}
        {label}
      </button>
    )
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {icon}
    </button>
  )
}
