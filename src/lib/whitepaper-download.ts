import path from 'node:path'

export const WHITEPAPER_DOWNLOAD_ROUTE = '/api/whitepaper/download'
export const WHITEPAPER_DOWNLOAD_FILENAME = 'GEOサービス紹介資料.pdf'
export const WHITEPAPER_STORAGE_BUCKET = 'whitepaper-assets'
export const WHITEPAPER_STORAGE_OBJECT_PATH = 'whitepaper.pdf'
export const WHITEPAPER_DOWNLOAD_TOKEN_PARAM = 'token'
export const WHITEPAPER_PDF_SOURCE_FILENAME = '[アセントネットワークス]GEOサービス紹介資料 .pdf'

export function getWhitepaperDownloadUrl(baseUrl: string) {
  return new URL(WHITEPAPER_DOWNLOAD_ROUTE, baseUrl).toString()
}

export function getWhitepaperPdfPath() {
  return path.join(process.cwd(), 'docs', WHITEPAPER_PDF_SOURCE_FILENAME)
}
