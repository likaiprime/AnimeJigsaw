import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 获取当前请求的路径
  const path = request.nextUrl.pathname

  // 创建响应头
  const headers = new Headers(request.headers)
  
  // 设置一些基本的安全响应头
  const response = NextResponse.next({
    request: {
      headers,
    },
  })

  // 添加安全相关的响应头
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )
  
  // 设置 CSP (Content Security Policy)
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob:;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s+/g, ' ').trim()
  )

  return response
}

// 配置中间件匹配的路径
export const config = {
  matcher: [
    /*
     * 匹配所有路径除了:
     * - api (API 路由)
     * - _next/static (静态文件)
     * - _next/image (图片优化 API)
     * - favicon.ico (浏览器图标)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
