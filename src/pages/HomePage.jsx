import MarkdownRenderer from '../components/MarkdownRenderer.jsx'
import { home } from '../content/courses.js'

export default function HomePage() {
  return (
    <article className="markdown-body home-page">
      <title>{home.title}</title>
      <MarkdownRenderer source={home.body} file={home.file} />
    </article>
  )
}
