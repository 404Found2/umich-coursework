import frontMatter from 'front-matter'
import { routeForMdPath, toRelativeFile } from './links.js'

const rawFiles = import.meta.glob('../assets/courses/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function firstHeading(body) {
  return body.match(/^#\s+(.+?)\s*#*\s*$/m)?.[1]
}

function toTags(tags) {
  if (Array.isArray(tags)) return tags.map(String)
  if (typeof tags === 'string') {
    return tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
  }
  return []
}

function byOrder(a, b) {
  const orderA = a.meta.order ?? Infinity
  const orderB = b.meta.order ?? Infinity
  return orderA - orderB || a.title.localeCompare(b.title)
}

function parseFile(file, raw) {
  const { attributes, body } = frontMatter(raw)
  return { file, route: routeForMdPath(file), meta: attributes ?? {}, body }
}

let home = parseFile('main.md', '')
const courseMap = new Map()

function getOrCreateCourse(id) {
  if (!courseMap.has(id)) {
    courseMap.set(id, { ...parseFile(`${id}/main.md`, ''), id, projects: [] })
  }
  return courseMap.get(id)
}

for (const [key, raw] of Object.entries(rawFiles)) {
  const file = toRelativeFile(key)
  const parts = file.split('/')

  if (parts.length === 1) {
    if (file === 'main.md') home = parseFile(file, raw)
    continue
  }
  if (parts.length !== 2) continue

  const [courseId, name] = parts
  const page = parseFile(file, raw)
  const course = getOrCreateCourse(courseId)

  if (name === 'main.md') {
    course.meta = page.meta
    course.body = page.body
  } else {
    const slug = name.slice(0, -'.md'.length)
    course.projects.push({
      ...page,
      courseId,
      slug,
      title: page.meta.title ?? firstHeading(page.body) ?? slug,
      description: page.meta.description ?? '',
      tags: toTags(page.meta.tags),
      draft: page.meta.draft === true,
    })
  }
}

for (const course of courseMap.values()) {
  course.title = course.meta.title ?? firstHeading(course.body) ?? course.id.toUpperCase()
  course.projects.sort(byOrder)
}

home.title = home.meta.title ?? 'UMich Coursework'

export { home }

export const courses = [...courseMap.values()].sort(byOrder)

export function getCourse(courseId) {
  return courseMap.get(courseId)
}

export function getProject(courseId, slug) {
  return courseMap.get(courseId)?.projects.find((project) => project.slug === slug)
}
