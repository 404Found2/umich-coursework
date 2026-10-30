import NavTree from './NavTree.jsx'
import SiteTitle from './SiteTitle.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function NavColumn({ onNavigate }) {
  return (
    <div className="nav-column">
      <SiteTitle onClick={onNavigate} />
      <NavTree onNavigate={onNavigate} />
      <div className="nav-footer">
        <ThemeToggle variant="button" />
      </div>
    </div>
  )
}
