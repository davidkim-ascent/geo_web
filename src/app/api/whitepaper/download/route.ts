import { NextResponse } from 'next/server'
import { WHITEPAPER_DOWNLOAD_TOKEN_PARAM, WHITEPAPER_STORAGE_BUCKET, WHITEPAPER_STORAGE_OBJECT_PATH, WHITEPAPER_DOWNLOAD_FILENAME } from '@/lib/whitepaper-download'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get(WHITEPAPER_DOWNLOAD_TOKEN_PARAM)

  if (!token) {
    return NextResponse.redirect(new URL('/whitepaper/denied', url.origin), 302)
  }

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('whitepaper_downloads')
    .select('id')
    .eq('download_token', token)
    .maybeSingle()

  if (error || !data) {
    return NextResponse.redirect(new URL('/whitepaper/denied', url.origin), 302)
  }

  const { data: fileData, error: downloadError } = await supabase.storage
    .from(WHITEPAPER_STORAGE_BUCKET)
    .download(WHITEPAPER_STORAGE_OBJECT_PATH)

  if (downloadError || !fileData) {
    console.error('[whitepaper] storage download error:', downloadError)
    return NextResponse.redirect(new URL('/whitepaper/denied', url.origin), 302)
  }

  const encodedFilename = encodeURIComponent(WHITEPAPER_DOWNLOAD_FILENAME)
  return new NextResponse(fileData, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename*=UTF-8''${encodedFilename}`,
    },
  })
}
