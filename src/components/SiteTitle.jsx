import { Link } from 'react-router'

export default function SiteTitle({ onClick }) {
  return (
    <Link to="/" className="site-title" onClick={onClick}>
      <span className="site-title-accent">UMich</span> Coursework
    </Link>
  )
}
