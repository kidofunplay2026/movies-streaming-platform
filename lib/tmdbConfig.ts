// @ts-nocheck

const apiConfig = {
  baseUrl() {
    return "https://api.themoviedb.org/3"
  },
  apiKey() {
    return "b4ca5b0106124722f8d8b39fff20be05"
  },
  headerKey() {
    return "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNGNhNWIwMTA2MTI0NzIyZjhkOGIzOWZmZjIwYmUwNSIsInN1YiI6IjY2MjBlNzI5ZjkzNjIwMGMzZmYmZzImIic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.BGYRS_5p23pV-cOVZF1QKmHOWLI6iMsNOQrmvEFkpT8"
  },
  originalImage(imgPath: string | null | undefined) {
    return originalImage(imgPath)
  },
  w500Image(imgPath: string | null | undefined) {
    return w500Image(imgPath)
  },
  logoImage(imgPath: string | null | undefined, width = 500) {
    return logoImage(imgPath, width)
  },
  w300Image(imgPath: string | null | undefined) {
    return w300Image(imgPath)
  },
  w185Image(imgPath: string | null | undefined) {
    return w185Image(imgPath)
  },
}

const EMPTY_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const withImagePath = (
  imgPath: string | null | undefined,
  build: (path: string) => string
) => (imgPath ? build(imgPath) : EMPTY_PIXEL)

const originalImage = (imgPath: string | null | undefined) =>
  withImagePath(imgPath, (path) =>
    buildWsrvURL(`/original${path}`, 2560, 82, null)
  )

const w500Image = (imgPath: string | null | undefined) =>
  withImagePath(imgPath, (path) =>
    buildWsrvURL(`/w500${path}`, undefined, undefined, null)
  )

const logoImage = (imgPath: string | null | undefined, width = 500) =>
  withImagePath(imgPath, (path) =>
    buildWsrvURL(`/w${width}${path}`, undefined, undefined, null)
  )

const w185Image = (imgPath: string | null | undefined) =>
  withImagePath(imgPath, (path) =>
    buildWsrvURL(`/w185${path}`, undefined, undefined, 80)
  )

const w300Image = (imgPath: string | null | undefined) =>
  withImagePath(imgPath, (path) =>
    buildWsrvURL(`/w300${path}`, undefined, undefined, null)
  )

function widthFromPath(path: string): number | undefined {
  const m = path.match(/^\/(?:original|w(\d+))/)
  if (!m) return undefined
  if (m[1]) return Number(m[1])
  return 3072
}

const WSRV_DEFAULT_QUALITY = 70

function buildWsrvURL(
  path: string,
  width?: number,
  quality?: number,
  output: 'webp' | 'jpg' | null = 'webp'
) {
  const w = width ?? widthFromPath(path)
  const widthParam = w ? `&w=${w}` : ''
  const q = quality ?? WSRV_DEFAULT_QUALITY
  const outputParam = output ? `&output=${output}` : ''
  return `https://images.weserv.nl/?url=image.tmdb.org/t/p${path}${widthParam}&q=${q}${outputParam}&we`
}

export {
  apiConfig,
  originalImage,
  w500Image,
  logoImage,
  w185Image,
  w300Image,
  buildWsrvURL,
}
