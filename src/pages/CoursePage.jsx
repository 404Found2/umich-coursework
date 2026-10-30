import { useParams } from 'react-router'
import DocLayout from '../components/DocLayout.jsx'
import MarkdownRenderer from '../components/MarkdownRenderer.jsx'
import ProjectCards from '../components/ProjectCards.jsx'
import { getCourse } from '../content/courses.js'
import NotFound from './NotFound.jsx'

const PROJECTS_MARKER = /<!--\s*projects\s*-->/i

export default function CoursePage() {
  const { courseId } = useParams()
  const course = getCourse(courseId)

  if (!course) return <NotFound />

  const [before, ...rest] = course.body.split(PROJECTS_MARKER)
  const hasMarker = rest.length > 0
  const after = rest.join('')
  const hasProjects = course.projects.length > 0

  return (
    <DocLayout key={course.route}>
      <title>{`${course.title} · UMich Coursework`}</title>
      <MarkdownRenderer source={before} file={course.file} />
      {!hasMarker && hasProjects && <h2 id="projects">Projects</h2>}
      {(hasMarker || hasProjects) && <ProjectCards projects={course.projects} />}
      {after && <MarkdownRenderer source={after} file={course.file} />}
    </DocLayout>
  )
}
