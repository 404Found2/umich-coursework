import { useSyncExternalStore } from 'react'

const root = document.documentElement

function subscribe(callback) {
  const observer = new MutationObserver(callback)
  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
  return () => observer.disconnect()
}

function getTheme() {
  return root.dataset.theme === 'dark' ? 'dark' : 'light'
}

export function setTheme(theme) {
  root.dataset.theme = theme
  try {
    localStorage.setItem('theme', theme)
  } catch {
    // Storage can be unavailable (e.g. private mode); the theme still applies for this visit.
  }
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme)
}
