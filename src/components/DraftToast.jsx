import { useEffect, useState } from 'react'
import { CloseIcon } from './icons.jsx'

const AUTO_HIDE_MS = 6000

export default function DraftToast() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), AUTO_HIDE_MS)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="toast" role="status">
      <span>
        <strong>Draft:</strong> this page is a draft and may be incomplete.
      </span>
      <button
        type="button"
        className="icon-button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss"
      >
        <CloseIcon />
      </button>
    </div>
  )
}
