import Link from 'next/link';

/**
 * 💡 [학습노트] StudioHeader 컴포넌트
 * 대시보드의 상단(Top Bar)을 담당합니다.
 * 
 * - sticky 속성을 사용하여 스크롤 시 상단에 고정되게 만들었습니다.
 * - backdrop-blur-md: 헤더 뒤쪽이 살짝 블러 처리되게 하는 이쁜 효과(Glassmorphism)를 줍니다.
 */
export default function StudioHeader() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-8">
      {/* 왼쪽: 빵부스러기(Breadcrumb) 영역 */}
      <div className="flex items-center gap-3 text-sm text-slate-500">
        <Link href="/studio" className="hover:text-slate-900 dark:hover:text-slate-300 transition-colors">
          Dashboard
        </Link>
        <span className="material-symbols-outlined !text-xs">chevron_right</span>
        <span className="text-slate-900 dark:text-slate-100 font-medium tracking-tight">All Content</span>
      </div>

      {/* 오른쪽: 액션 메뉴 (검색, 알림, 도움말) */}
      <div className="flex items-center gap-4">
        {/* 검색창 */}
        <div className="relative group">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <span className="material-symbols-outlined !text-lg">search</span>
          </span>
          <input 
            type="text" 
            placeholder="Quick search..." 
            className="pl-10 pr-4 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-1 focus:ring-primary w-64 transition-all focus:outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>
        
        {/* 아이콘 버튼들 */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
          <span className="material-symbols-outlined">help_outline</span>
        </button>
      </div>
    </header>
  );
}
