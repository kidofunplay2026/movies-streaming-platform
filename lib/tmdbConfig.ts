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
  originalImage(imgPath: any) {
    return originalImage(imgPath)
  },
  w500Image(imgPath: any) {
    return w500Image(imgPath)
  },
  logoImage(imgPath: any, width = 500) {
    return logoImage(imgPath, width)
  },
  w300Image(imgPath: any) {
    return w300Image(imgPath)
  },
  w185Image(imgPath: any) {
    return w185Image(imgPath)
  },
}

const EMPTY_PIXEL =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

const withImagePath = (imgPath: any, build: any) =>
  imgPath ? build(imgPath) : EMPTY_PIXEL

const originalImage = (imgPath: any) =>
  withImagePath(imgPath, (path: any) =>
    buildWsrvURL(`/original${path}`, 2560, 82, null)
  )

const w500Image = (imgPath: any) =>
  withImagePath(imgPath, (path: any) =>
    buildWsrvURL(`/w500${path}`, undefined, undefined, null)
  )

const logoImage = (imgPath: any, width = 500) =>
  withImagePath(imgPath, (path: any) =>
    buildWsrvURL(`/w${width}${path}`, undefined, undefined, null)
  )

const w185Image = (imgPath: any) =>
  withImagePath(imgPath, (path: any) =>
    buildWsrvURL(`/w185${path}`, undefined, undefined, 80)
  )

const w300Image = (imgPath: any) =>
  withImagePath(imgPath, (path: any) =>
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
  output: any = 'webp'
) {
  const w = width ?? widthFromPath(path)
  const widthParam = w ? `&w=${w}` : ''
  const q = quality ?? WSRV_DEFAULT_QUALITY
  const outputParam = output ? `&output=${output}` : ''
  return `https://images.weserv.nl/?url=image.tmdb.org/t/p${path}${widthParam}&q=${q}${outputParam}&we`
}

function buildWsrvPlaceholderURL(path?: any) {
  if (!path) return EMPTY_PIXEL
  return buildWsrvURL(path, 30, 20, 'webp')
}

function extractTMDBPath(src?: any): string {
  if (!src) return ''
  const marker = 'image.tmdb.org/t/p'
  const idx = src.indexOf(marker)
  if (idx !== -1) {
    return src.substring(idx + marker.length)
  }
  return src
}

function isWsrvURL(src?: any): boolean {
  return !!src && src.includes('images.weserv.nl')
}

const demoteFromPrimary = (..._args: any[]) => {}
const getNextImageFallback = (url?: any) => url || EMPTY_PIXEL
const isPrimaryImageHostDown = (..._args: any[]) => false
const markPrimaryImageHostDown = (..._args: any[]) => {}
const subscribePrimaryImageHost = (..._args: any[]) => () => {}
const handleImageFallbackError = (..._args: any[]) => {}

const movieType = {
  movie: 'movie',
  now_playing: 'now_playing',
  trending: 'trending',
  top_rated: 'top_rated',
  popular: 'popular',
}

const tvType = {
  tv: 'tv',
  trending: 'trending',
  popular: 'popular',
  top_rated: 'top_rated',
}

export {
  apiConfig,
  originalImage,
  w500Image,
  logoImage,
  w185Image,
  w300Image,
  buildWsrvURL,
  buildWsrvPlaceholderURL,
  extractTMDBPath,
  isWsrvURL,
  demoteFromPrimary,
  getNextImageFallback,
  isPrimaryImageHostDown,
  markPrimaryImageHostDown,
  subscribePrimaryImageHost,
  handleImageFallbackError,
  movieType,
  tvType,
}
