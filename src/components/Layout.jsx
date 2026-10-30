import { useCallback, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router'
import { safeDecode } from '../content/links.js'
import MobileBar from './MobileBar.jsx'
import NavColumn from './NavColumn.jsx'
import NavDrawer from './NavDrawer.jsx'

export default function Layout() {
  const { pathname, hash } = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const menuButtonRef = useRef(null)

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (hash) {
      document.getElementById(safeDecode(hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return (
    <div className="app">
      <MobileBar onMenuClick={openDrawer} menuButtonRef={menuButtonRef} inert={drawerOpen} />
      <NavDrawer open={drawerOpen} onClose={closeDrawer} />
      <div className="app-body" inert={drawerOpen}>
        <aside className="nav-sidebar" aria-label="Site navigation">
          <NavColumn />
        </aside>
        <main className="app-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
