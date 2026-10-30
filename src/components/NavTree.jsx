import { NavLink, useLocation } from 'react-router'
import { courses } from '../content/courses.js'

export default function NavTree({ onNavigate }) {
  const { pathname } = useLocation()
  const currentCourseId = pathname.split('/')[1]

  return (
    <nav className="nav-tree" aria-label="Courses">
      <NavLink to="/" end className="nav-link nav-page" onClick={onNavigate}>
        Home
      </NavLink>

      <p className="nav-section-label">Courses</p>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <NavLink to={course.route} className="nav-link nav-course" onClick={onNavigate}>
              <span>
                {course.title}
                {course.meta.name && <span className="nav-course-name">{course.meta.name}</span>}
              </span>
            </NavLink>

            {course.id === currentCourseId && (
              <ul className="nav-pages">
                <li>
                  <NavLink to={course.route} end className="nav-link nav-page" onClick={onNavigate}>
                    Overview
                  </NavLink>
                </li>
                {course.projects.map((project) => (
                  <li key={project.slug}>
                    <NavLink to={project.route} className="nav-link nav-page" onClick={onNavigate}>
                      {project.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
