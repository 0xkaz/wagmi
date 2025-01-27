import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// eslint-disable-next-line import/no-unresolved
import { locales } from 'nextra/locales'

const redirects: Record<string, string> = {
  '/docs/connectors/coinbase-wallet': '/docs/connectors/coinbaseWallet',
  '/docs/connectors/metamask': '/docs/connectors/metaMask',
  '/docs/connectors/walletconnect': '/docs/connectors/walletConnect',
  '/docs/migrating-to-030': '/docs/migrating-to-03', // Tweeted wrong link: https://twitter.com/awkweb/status/1518607780332122116
  '/docs/migrating-to-03': '/docs/migration-guide',
  '/docs/provider': '/docs/WagmiConfig',
}

export function middleware(request: NextRequest) {
  // Handle redirect in `_middleware.ts` because of bug using `next.config.js`
  // https://github.com/shuding/nextra/issues/384
  if (request.nextUrl.pathname in redirects) {
    const url = request.nextUrl.clone()
    const pathname = redirects[request.nextUrl.pathname] ?? '/'
    url.pathname = pathname
    return NextResponse.redirect(url)
  }

  return locales(request)
}
