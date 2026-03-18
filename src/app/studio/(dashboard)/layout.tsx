import StudioSidebar from '@/app/components/studio/StudioSidebar';
import StudioHeader from '@/app/components/studio/StudioHeader';

/**
 * 💡 [학습노트] Route Groups를 이용한 특정 경로 레이아웃 
 * 
 * (dashboard) 폴더는 URL 경로에는 나타나지 않지만 (/studio 로 접속됨),
 * 이렇게 묶어두면 해당 폴더 안에서만 독립적인 layout.tsx를 가질 수 있습니다.
 * 
 * 에디터(전체화면)에는 사이드바가 필요 없기 때문에,
 * 대시보드 쪽만 이 레이아웃(사이드바 + 헤더)을 감싸도록 분리했습니다.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* 1. 좌측 고정 사이드바 */}
      <StudioSidebar />

      {/* 2. 우측 메인 콘텐츠 영역 (사이드바 너비인 ml-64 만큼 띄움) */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* 상단 고정 헤더 */}
        <StudioHeader />
        
        {/* 하위 페이지 컨텐츠 렌더링 */}
        {children}
      </main>
    </div>
  );
}
