import { NextResponse } from 'next/server'
import { WHITEPAPER_DOWNLOAD_TOKEN_PARAM, WHITEPAPER_STORAGE_BUCKET, WHITEPAPER_STORAGE_OBJECT_PATH } from '@/lib/whitepaper-download'
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

  const { data: signedUrlData, error: signedUrlError } = await supabase.storage
    .from(WHITEPAPER_STORAGE_BUCKET)
    .createSignedUrl(WHITEPAPER_STORAGE_OBJECT_PATH, 60)

  if (signedUrlError || !signedUrlData?.signedUrl) {
    console.error('[whitepaper] storage signed url error:', signedUrlError)
    return NextResponse.redirect(new URL('/whitepaper/denied', url.origin), 302)
  }

  return NextResponse.redirect(signedUrlData.signedUrl, 302)
}
