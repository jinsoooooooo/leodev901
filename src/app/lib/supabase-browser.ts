import { createBrowserClient } from '@supabase/ssr'

// ====================================================================
// 🌐 브라우저(Client Components) 환경 전용 SSR 동기화 클라이언트
// ====================================================================
// Step 14 (SSR 인증) 전용 헬퍼입니다!
// 기존 Step 10의 supabase-js 클라이언트와 달리, 이 녀석은 브라우저에서 로그인할 때
// 서버 컴포넌트가 바로 알아읽을 수 있도록 알아서 "HTTP 쿠키(Cookie)"를 구워(Set)줍니다.
export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            db: { schema: 'leodev901' } // 우리가 사용하는 커스텀 스키마
        }
    )
}
