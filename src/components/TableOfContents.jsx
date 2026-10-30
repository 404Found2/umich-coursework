function TocList({ headings, activeId }) {
  return (
    <ul>
      {headings.map((heading) => (
        <li key={heading.id} className={`toc-level-${heading.level}`}>
          <a href={`#${heading.id}`} className={heading.id === activeId ? 'is-active' : undefined}>
            {heading.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function TableOfContents({ headings, activeId, variant }) {
  if (variant === 'mobile') {
    return (
      <details className="toc toc-mobile">
        <summary>On this page</summary>
        <TocList headings={headings} activeId={activeId} />
      </details>
    )
  }

  return (
    <aside className="toc toc-desktop" aria-label="On this page">
      <p className="toc-title">On this page</p>
      <TocList headings={headings} activeId={activeId} />
    </aside>
  )
}
