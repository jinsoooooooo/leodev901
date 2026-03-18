# 📘 Step 15: 레이아웃 분리와 Route Groups 활용하기

이번 스텝에서는 복잡한 구조를 가진 "대시보드"와 "전체화면 에디터"를 하나의 경로(`/studio`) 하위에서 충돌 없이 깔끔하게 분리하는 방법을 학습합니다.

## 1. 문제 상황 (Problem)

기본적으로 Next.js App Router에서는 폴더 안에 `layout.tsx` 파일을 두면 하위의 모든 페이지(`page.tsx`)가 그 레이아웃의 영향을 받습니다. 
만약 `src/app/studio/layout.tsx` 에 "사이드바"와 "헤더"를 넣어두면 어떻게 될까요?
하위 경로인 `/studio/editor` (글작성 페이지) 에 접속해도 거대한 사이드바가 튀어나오게 됩니다.

하지만 우리는 에디터 화면에서는 사이드바 없이 오직 **글 작성에만 집중할 수 있는 쾌적한 전체 화면(Full-screen)**을 원합니다.

## 2. 해결 방법: Route Groups (접근 방법)

Next.js에는 이를 해결하기 위한 훌륭한 패턴인 **Route Groups (폴더명)** 기능이 있습니다. 
폴더 이름을 괄호로 묶어 `(dashboard)` 처럼 만들면, 이 폴더는 URL 경로에는 영향을 주지 않습니다. (즉, `/studio` 그대로 유지됩니다.)
그러나 이 폴더 내부에서만 통용되는 `layout.tsx`를 만들 수 있습니다.

### 변경된 폴더 구조
```text
src/app/studio/
 ├── (dashboard)/
 │    ├── layout.tsx  <-- 사이드바와 상단 헤더가 들어있는 대시보드 전용 레이아웃
 │    └── page.tsx    <-- 대시보드 홈 (포스트 목록)
 │
 ├── editor/
 │    ├── page.tsx    <-- 새 글 작성 (사이드바 영향을 받지 않음!)
 │    └── [id]/page.tsx <-- 기존 글 수정 (사이드바 영향을 받지 않음!)
```

이렇게 구조를 분리하면, 코드 내부에서 `if (경로가 editor면) { 사이드바 숨김 }` 과 같은 복잡하고 더러운 로직을 작성할 필요가 없습니다! 

## 3. 코드의 핵심 (Code)

### (1) `src/app/studio/(dashboard)/layout.tsx`
```tsx
export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      <StudioSidebar /> {/* 좌측 고정 사이드바 */}
      <main className="flex-1 ml-64 min-h-screen">
        <StudioHeader /> {/* 상단 고정 헤더 */}
        {children} {/* 여기에 (dashboard)/page.tsx 의 내용이 쏙 들어갑니다! */}
      </main>
    </div>
  );
}
```

### (2) 하위의 `editor/page.tsx`는 어떻게 전체화면이 되었을까요?
`editor` 폴더는 `(dashboard)` 폴더의 바깥에 위치합니다. 따라서 `DashboardLayout`의 자식(`children`)으로 들어가지 않게 되며, 오롯이 본인만의 화면을 구성할 수 있습니다. 

```tsx
export default function NewEditorPage() {
  return (
    // h-screen(화면 전체 높이)을 통해 사이드바 없이 가득 찬 에디터를 만듭니다.
    <div className="flex flex-col h-screen overflow-hidden">
        <header>에디터용 헤더...</header>
        <textarea className="flex-1 ..." />
    </div>
  );
}
```

## 4. 💡 한 줄 요약 (Summary)
> 특정 화면에서만 레이아웃을 다르게 적용하고 싶다면 컴포넌트 내부에서 if문을 쓰지 말고, **Next.js의 Route Groups `(이름)` 기능**을 활용하여 폴더 트리를 분리하세요!
