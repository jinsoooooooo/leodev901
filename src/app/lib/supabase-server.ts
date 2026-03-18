import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// ====================================================================
// 🚀 서버 컴포넌트(Server Components) 전용 Supabase 클라이언트
// ====================================================================
// 이 함수는 클라이언트(브라우저)가 아닌 "서버 환경"에서 Supabase와 통신할 때 사용합니다.
// 브라우저의 localStorage 대신, 브라우저가 접속 시 서버로 알아서 보내준 '쿠키(Cookie)'를 
// 뜯어서 유저 정보와 로그인 상태를 확인하는 아주 중요한 인증 헬퍼입니다!
export async function createClient() {
    // 1. Next.js에서 제공하는 cookies 함수로 이번 접속(Request)에 담겨온 쿠키 보따리를 통째로 가져옵니다.
    const cookieStore = await cookies()

    // 2. createServerClient 함수로 서버 전용 클라이언트를 조립해서 내보냅니다.
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // (필수) 서버가 현재 접속한 유저의 인증 쿠키를 전부 읽어올 수 있게 해줍니다.
                getAll() {
                    return cookieStore.getAll()
                },
                // (선택) 서버에서 인증 토큰이 갱신되어, 새로운 쿠키를 브라우저로 구워(Set)줘야 할 때 실행됩니다.
                setAll(cookiesToSet: any[]) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // 💡 중요: 서버 컴포넌트(page.tsx, layout.tsx 등)는 쿠키를 직접 '쓰기(Set)' 할 수 없습니다!
                        // 쿠키를 새로 굽는 역할은 '미들웨어(middleware.ts)'의 몫이므로,
                        // 서버 컴포넌트 환경에서 쿠키를 구우려고 할 때 발생하는 Next.js 기본 에러를 조용히 무시(catch)해 줍니다.
                    }
                },
            },
            // 💡 꿀팁: Supabase API를 호출할 때마다 기본 `public` 스키마 대신,
            // 우리가 만든 전용 `leodev901` 스키마를 기본으로 바라보도록 설정에 아예 못을 박아둡니다!
            db: {
                schema: 'leodev901'
            }
        }
    )
}
