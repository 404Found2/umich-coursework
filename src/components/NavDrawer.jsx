import { useEffect, useRef } from 'react'
import { CloseIcon } from './icons.jsx'
import NavColumn from './NavColumn.jsx'

export default function NavDrawer({ open, onClose }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return

    panelRef.current?.querySelector('button, a')?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div className={`drawer${open ? ' drawer--open' : ''}`} inert={!open}>
      <div className="drawer-backdrop" onClick={onClose} />
      <div
        ref={panelRef}
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
      >
        <div className="drawer-header">
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close menu">
            <CloseIcon />
          </button>
        </div>
        <NavColumn onNavigate={onClose} />
      </div>
    </div>
  )
}
