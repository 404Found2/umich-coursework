import { Link } from 'react-router'
import { courses } from '../content/courses.js'

export default function NotFound() {
  return (
    <article className="markdown-body not-found">
      <title>Page not found · UMich Coursework</title>
      <h1>Page not found</h1>
      <p>That page doesn&apos;t exist. Try one of these instead:</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={course.route}>{course.title}</Link>
            {course.meta.name && ` (${course.meta.name})`}
          </li>
        ))}
      </ul>
    </article>
  )
}
