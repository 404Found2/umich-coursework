import { useMemo } from 'react'
import Markdown from 'react-markdown'
import { Link } from 'react-router'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { isExternal, resolveAsset, resolveMdLink } from '../content/links.js'

const remarkPlugins = [remarkGfm]

const rehypePlugins = [
  rehypeRaw,
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      behavior: 'append',
      properties: { className: ['heading-anchor'], ariaHidden: true, tabIndex: -1 },
      content: { type: 'text', value: '#' },
    },
  ],
]

function createComponents(file) {
  return {
    // eslint-disable-next-line no-unused-vars
    a({ node, href = '', children, ...props }) {
      if (href.startsWith('#')) {
        return (
          <a href={href} {...props}>
            {children}
          </a>
        )
      }
      const route = resolveMdLink(file, href)
      if (route) {
        return (
          <Link to={route} {...props}>
            {children}
          </Link>
        )
      }
      const opensNewTab = isExternal(href) && /^(https?:)?\/\//i.test(href)
      return (
        <a
          href={href}
          {...(opensNewTab && { target: '_blank', rel: 'noopener noreferrer' })}
          {...props}
        >
          {children}
        </a>
      )
    },
    // eslint-disable-next-line no-unused-vars
    img({ node, src, alt = '', ...props }) {
      return <img src={resolveAsset(file, src)} alt={alt} loading="lazy" {...props} />
    },
    // eslint-disable-next-line no-unused-vars
    table({ node, ...props }) {
      return (
        <div className="table-scroll">
          <table {...props} />
        </div>
      )
    },
  }
}

export default function MarkdownRenderer({ source, file }) {
  const components = useMemo(() => createComponents(file), [file])

  return (
    <Markdown remarkPlugins={remarkPlugins} rehypePlugins={rehypePlugins} components={components}>
      {source}
    </Markdown>
  )
}
