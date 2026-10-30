import { useEffect, useRef, useState } from 'react'
import TableOfContents from './TableOfContents.jsx'

const MIN_TOC_HEADINGS = 2

function headingText(element) {
  return [...element.childNodes]
    .filter((node) => !node.classList?.contains('heading-anchor'))
    .map((node) => node.textContent)
    .join('')
    .trim()
}

// Renders page content with a table of contents built from its h2/h3 headings.
// Remount (via `key`) when the page changes so headings are re-collected.
export default function DocLayout({ children }) {
  const articleRef = useRef(null)
  const [headings, setHeadings] = useState([])
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const elements = articleRef.current.querySelectorAll('h2[id], h3[id]')
    setHeadings(
      [...elements].map((element) => ({
        id: element.id,
        text: headingText(element),
        level: Number(element.tagName[1]),
      })),
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-72px 0px -70% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  const showToc = headings.length >= MIN_TOC_HEADINGS

  return (
    <div className={`doc${showToc ? ' doc--with-toc' : ''}`}>
      <article ref={articleRef} className="markdown-body">
        {showToc && <TableOfContents headings={headings} activeId={activeId} variant="mobile" />}
        {children}
      </article>
      {showToc && <TableOfContents headings={headings} activeId={activeId} variant="desktop" />}
    </div>
  )
}
