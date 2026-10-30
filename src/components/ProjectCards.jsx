import { Link } from 'react-router'

export default function ProjectCards({ projects }) {
  if (projects.length === 0) {
    return <p className="project-cards-empty">No projects yet.</p>
  }

  return (
    <ul className="project-cards">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link to={project.route} className="project-card">
            <div className="project-card-header">
              <h3 className="project-card-title">{project.title}</h3>
              {project.draft && <span className="badge">Draft</span>}
            </div>
            {project.description && <p className="project-card-desc">{project.description}</p>}
            {project.tags.length > 0 && (
              <div className="project-card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
