# 🔐 Step 14: SSR 인증과 인가 (Server-Side Auth & Middleware)

> **핵심 키워드**: `@supabase/ssr`, `Server Component`, `Middleware(미들웨어)`, `cookies()`, `권한 분업화 패턴`

## 1. 원리 이해 (개념)

앞선 Step 10에서는 브라우저(`use client`)에서 `localStorage`를 이용해 로그인 정보를 기억했습니다. 하지만 **SEO(검색엔진 최적화)**가 필요하거나 초기 로딩 속도를 높이려면 페이지 결과물을 브라우저가 아닌 **서버 컴포넌트(Server Component)**에서 미리 렌더링해야 합니다.

**문제점:** 서버(Node.js)는 사용자의 브라우저 로컬 스토리지에 접근할 수 없습니다!
**해결책:** 클라이언트가 서버로 웹 페이지를 요청할 때, 브라우저가 알아서 챙겨 보내는 **쿠키(Cookie)**를 꺼내어 인증 정보를 확인해야 합니다. 이를 돕는 도구가 바로 `@supabase/ssr` 패키지입니다.

---

## 2. 🌟 실무 정석: 미들웨어 + 서버 클라이언트 "분업화" 패턴

실무에서 Next.js App Router로 로그인/권한 체계를 잡을 때 단일 파일에서 모든 걸 처리하지 않습니다. **미들웨어(Middleware)**와 **서버 컴포넌트(Server Client)** 역할을 완벽하게 가르는 것이 핵심입니다.

### 🛡️ 1차 관문: 미들웨어 (문지기 역할)
* **목적**: 사용자가 보호된 페이지(`/studio` 등)에 접근할 때, 페이지를 그리기도 전에 컷(Redirect)합니다.
* **장점**: 모든 페이지마다 일일이 "이 사람 로그인했나?" 검사하는 중복 코드를 방지하고 속도를 높입니다. 유저의 토큰(쿠키)이 만료되기 직전에 갱신해 주는 역할도 미들웨어가 자동으로 수행합니다.

### 📦 2차 관문: 서버 클라이언트 (데이터 조달 역할)
* **목적**: 미들웨어를 무사히 통과해 페이지 안으로 들어왔다면, 이제 화면을 예쁘게 그려야 합니다. 이때 화면에 띄울 "내 정보"나 `leodev901.user_roles` 같은 **구체적인 권한 데이터를 DB에서 안전하게 꺼내옵니다.**
* **장점**: `use client` 없이 서버 단에서 DB를 직접 찌르기 때문에(통신) 렌더링 속도가 매우 빠르고 크롤러(봇)도 그 데이터를 읽을 수 있습니다(SEO).

---

## 3. 핵심 문법 및 실습 코드 리뷰

이 세션에서 나눈 3가지 핵심 코드 조각들을 모아보았습니다.

### **(1) 서버 전용 클라이언트 만들기 (`src/app/lib/supabase-server.ts`)**
가장 먼저, 쿠키를 해석할 수 있는 특수 Supabase 클라이언트를 만들어 둡니다.

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// 💡 서버 환경(Server Components, API 등) 전용 클라이언트
export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
           // 💡 서버 컴포넌트 내에서는 쿠키를 강제로 구울(Set) 수 없으므로 무시하는 처리를 합니다.
           // (쿠키 쓰기는 아래 미들웨어나 Server Actions에서만 담당합니다)
        }
      },
      db: { schema: 'leodev901' } // 우리가 구성한 커스텀 스키마 고정
    }
  )
}
```

### **(2) 미들웨어 입구컷 설정 (`src/middleware.ts`)**
루트 경로에 `middleware.ts`를 만들어서 문지기를 세웁니다.

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 응답 객체를 미리 만들어 둡니다 (쿠키를 굽기 위해 필요)
  let supabaseResponse = NextResponse.next({ request });

  // 미들웨어 전용 클라이언트 생성
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          // 💡 미들웨어에서는 쿠키를 갱신(Set)할 수 있습니다!
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 현재 유저 정보 가져오기
  const { data: { user } } = await supabase.auth.getUser();

  // 🚫 만약 /studio 경로로 가는데 로그인 유저가 없다면 로그인 페이지로 강제 이동!
  if (!user && request.nextUrl.pathname.startsWith('/studio')) {
    const url = request.nextUrl.clone();
    // 💡 기존 '/learning/auth' 대신, 방금 새로 만든 쿠키 셋업 전용 SSR 로그인 페이지로 보냅니다!
    url.pathname = '/learning/ssr-auth/login';
    return NextResponse.redirect(url);
  }

  // 통과했다면 정상적인 페이지로 응답
  return supabaseResponse;
}

// 미들웨어가 감시할 경로 설정 (예: /studio 하위 모든 파일)
export const config = {
  matcher: ['/studio/:path*'],
};
```

### **(3) 서버 컴포넌트에서 데이터 연속 조회하기 (`src/app/learning/ssr-auth/page.tsx`)**
미들웨어를 통과해 진입한 페이지 안에서는 권한에 따라 구체적인 요소를 렌더링합니다.

```tsx
// 방금 만든 서버 클라이언트 헬퍼를 가져옵니다.
import { createClient } from "@/app/lib/supabase-server"; 

export default async function SSRAuthPage() {
    const supabase = await createClient();
    
    // 1. 쿠키에서 auth.user 정보 가져오기 (고유 UID 획득 목적)
    const { data: { user } } = await supabase.auth.getUser();

    // (미들웨어가 있다면 아래의 비로그인 체크 코드는 생략 가능합니다)
    if (!user) return <div>로그인 하세요!</div>;

    // 2. ✨가장 중요한 부분✨ 
    // 얻어낸 UID로 leodev901 스키마의 user_roles 테이블 권한(Role)을 연달아 조회!
    const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id) // 내 아이디와 일치하는 열만!
        .single();
    
    const role = roleData?.role || 'user'; // DB 값이 없으면 기본값 'user'

    // 3. 인가(Authorization) 처리: role이 admin이 아니면 튕겨내기
    if (role !== 'admin') {
        return <div>페이지 접근 제한: 관리자 권한이 필요합니다.</div>
    }

    // 4. 모든 것을 통과한 어드민 전용 렌더링 화면
    return (
        <div>
           <h1>관리자 님, 환영합니다!</h1>
           <p>접속 계정: {user.email}</p>
        </div>
    );
}
```

### **(4) 클라이언트 로그인 폼과 SSR 동기화 (`src/app/lib/supabase-browser.ts`)**
서버(SSR)에서 쿠키를 제대로 읽기 위해서는, 애초에 사용자가 로그인 화면에서 로그인 버튼을 누를 때 **'쿠키'를 제대로 구워주는 녀석**이 필요합니다. Step 10에서 쓰던 오리지널 `supabase-js` 대신, `@supabase/ssr` 패키지의 `createBrowserClient`를 사용해 브라우저 전용 헬퍼를 따로 만듭니다.

```typescript
import { createBrowserClient } from '@supabase/ssr'

// 💡 클라이언트 컴포넌트(use client) 전용 인증 헬퍼!
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: 'leodev901' } }
  )
}
```

새로 만든 `src/app/learning/ssr-auth/login/page.tsx` 페이지에서 위 헬퍼를 불러와 `signInWithPassword()`를 실행하면, **로그인과 동시에 서버가 읽을 수 있는 HTTP 쿠키가 자동으로 세팅**됩니다! 이제 미들웨어나 서버 컴포넌트에서 이 유저의 신원을 완벽하게 파악할 수 있게 되었습니다.

---

## 4. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. 보통 SEO 최적화를 하는 페이지들은 미들웨어랑 서버 클라이언트 중 뭘 쓰나요? 하나만 쓰나요?**
*   **A.** **정답은 "둘 다 쓴다" 입니다! (철저한 분업화)** 
미들웨어는 페이지가 그려지기도 전에 빠른 "입구컷(권한 없음 리다이렉트)"을 담당하는 문지기입니다. 반면, 서버 컴포넌트 내부의 클라이언트는 진입을 허가받은 유저의 상세 정보나 권한 데이터를 DB에서 직접 조달해 실제 화면(HTML) 뼈대를 조립하는 요리사 역할을 합니다.

**Q. 굳이 나눴을 때 장점이 뭔가요? `page.tsx`에서 리다이렉트까지 다 하면 안 되나요?**
*   **A.** 물론 가능합니다만, 나중에 보호해야 할 페이지가 수십 개로 늘어나면 모든 페이지마다 로그인 체크 함수를 붙여 넣어야 합니다. 미들웨어를 쓰면 `matcher`에 경로 한 줄만 추가하면 모든 보호 처리가 중앙 문지기에서 치워집니다.

**Q. 서버 컴포넌트인데 왜 굳이 쿠키 관련 코드를 작성하나요?**
*   **A.** 서버는 사용자의 브라우저(로컬 스토리지)에 저장된 값을 볼 수 있는 초능력이 없습니다. 그 대신 사용자가 링크를 누르거나 새로고침 할 때, 브라우저가 알아서 "HTTP 쿠키(Cookie)"라는 가방에 인증 토큰을 담아 서버로 전송해 줍니다. `@supabase/ssr` 패키지는 개발자 대신 이 쿠키를 뜯어서 올바른 인증인지 단번에 검사해 주는 고마운 도구입니다.

**Q. 제일 궁금했던 `auth.user` 정보와 커스텀 권한 테이블(`user_roles`)을 동시에 쓰는 방법은 뭔가요?**
*   **A.** **"연속 타격(Await) 쿼리 패러다임"**을 사용하시면 깔끔합니다. 
`supabase.auth.getUser()`로 신뢰할 수 있는 내 고유 `id(UUID)`를 먼저 얻어낸 즉시, 코드를 미루지 말고 `.from('user_roles').select('*').eq('user_id', user.id)`로 연달아 조회 쿼리를 날립니다! 서버 컴포넌트 안에서는 백엔드끼리 통신하는 것과 진배없어서, 이런 연속 쿼리도 병목 없이 엄청나게 빠르게 처리됩니다.
