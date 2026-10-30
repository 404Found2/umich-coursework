const ROOT = '../assets/courses/'

const assetUrls = Object.fromEntries(
  Object.entries(
    import.meta.glob('../assets/courses/**/*.{png,jpg,jpeg,gif,svg,webp}', {
      query: '?url',
      import: 'default',
      eager: true,
    }),
  ).map(([key, url]) => [key.slice(ROOT.length), url]),
)

export function toRelativeFile(globKey) {
  return globKey.slice(ROOT.length)
}

export function isExternal(url) {
  return /^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith('//')
}

export function safeDecode(value) {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

function splitHash(url) {
  const index = url.indexOf('#')
  return index === -1 ? [url, ''] : [url.slice(0, index), url.slice(index)]
}

// Resolves `relPath` against the folder containing `fromFile` (both relative to
// the courses root). Returns null if the path climbs above the courses root.
export function resolvePath(fromFile, relPath) {
  const segments = fromFile.split('/').slice(0, -1)
  for (const part of relPath.split('/')) {
    if (part === '' || part === '.') continue
    if (part === '..') {
      if (segments.length === 0) return null
      segments.pop()
    } else {
      segments.push(part)
    }
  }
  return segments.join('/')
}

export function routeForMdPath(file) {
  const parts = file.replace(/\.md$/, '').split('/')
  if (parts.at(-1) === 'main') parts.pop()
  return '/' + parts.join('/')
}

// Returns an in-app route for links to other markdown files, or null if the
// link should be rendered as a plain anchor.
export function resolveMdLink(fromFile, href) {
  if (isExternal(href)) return null
  if (href.startsWith('/')) return href
  const [path, hash] = splitHash(href)
  if (!path.endsWith('.md')) return null
  const resolved = resolvePath(fromFile, safeDecode(path))
  return resolved === null ? null : routeForMdPath(resolved) + hash
}

export function resolveAsset(fromFile, src) {
  if (!src || isExternal(src) || src.startsWith('/')) return src
  const resolved = resolvePath(fromFile, safeDecode(src))
  return assetUrls[resolved] ?? src
}
