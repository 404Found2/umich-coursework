import { MenuIcon } from './icons.jsx'
import SiteTitle from './SiteTitle.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function MobileBar({ onMenuClick, menuButtonRef, inert }) {
  return (
    <header className="mobile-bar" inert={inert}>
      <button
        ref={menuButtonRef}
        type="button"
        className="icon-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <MenuIcon />
      </button>
      <SiteTitle />
      <div className="mobile-bar-actions">
        <ThemeToggle />
      </div>
    </header>
  )
}
