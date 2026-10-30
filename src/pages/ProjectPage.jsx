import { useParams } from 'react-router'
import DocLayout from '../components/DocLayout.jsx'
import DraftToast from '../components/DraftToast.jsx'
import MarkdownRenderer from '../components/MarkdownRenderer.jsx'
import { getCourse, getProject } from '../content/courses.js'
import NotFound from './NotFound.jsx'

export default function ProjectPage() {
  const { courseId, slug } = useParams()
  const project = getProject(courseId, slug)

  if (!project) return <NotFound />

  const course = getCourse(courseId)

  return (
    <>
      <DocLayout key={project.route}>
        <title>{`${project.title} · ${course.title} · UMich Coursework`}</title>
        <MarkdownRenderer source={project.body} file={project.file} />
      </DocLayout>
      {project.draft && <DraftToast key={project.route} />}
    </>
  )
}
