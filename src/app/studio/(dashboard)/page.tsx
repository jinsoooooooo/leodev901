import Link from 'next/link';

export const metadata = {
  title: 'CMS Studio - Content Manager',
};

/**
 * 💡 [학습노트] Studio Dashboard Home
 * URL: /studio
 * 
 * 앞서 만든 (dashboard)/layout.tsx 안의 {children} 에 해당하는 부분입니다.
 * 사이드바와 헤더는 이미 layout.tsx에 있으므로,
 * 이 파일에는 메인 컨텐츠인 "타이틀", "상태 탭", "테이블" 구조만 들어갑니다.
 */
export default function StudioDashboard() {
  return (
    <div className="p-8 max-w-6xl w-full mx-auto">
      {/* 1. Page Header (타이틀 및 신규 생성 버튼) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
            Content Manager
          </h2>
          <p className="text-slate-500 max-w-md">
            Organize, edit, and publish Leo's professional portfolio and technical documentation across all platforms.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-all flex items-center gap-2">
            <span className="material-symbols-outlined !text-lg">add</span> New Scrap
          </button>
          <Link href="/studio/editor" className="px-4 py-2 bg-primary text-white hover:bg-primary/90 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
            <span className="material-symbols-outlined !text-lg">edit</span> New Blog Post
          </Link>
        </div>
      </div>

      {/* 2. Tabs (상태 필터링 탭) */}
      <div className="border-b border-slate-200 dark:border-slate-800 mb-6 flex gap-8">
        <button className="pb-3 text-sm font-semibold text-primary border-b-2 border-primary">
          All Status
        </button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors border-b-2 border-transparent">
          Drafts
        </button>
        <button className="pb-3 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 transition-colors border-b-2 border-transparent">
          Published
        </button>
      </div>

      {/* 3. Table Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200 dark:border-slate-800">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* 임시 하드코딩 행 1 (블로그) */}
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <Link href="/studio/editor/1" className="text-sm font-semibold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors">
                    System Design: Scalable Chat App
                  </Link>
                  <span className="text-[11px] text-slate-400 font-mono tracking-tight">/blog/scalable-chat-architecture</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
                  Article
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/5 text-primary border border-primary/20">Backend</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/5 text-primary border border-primary/20">Scaling</span>
                </div>
              </td>
              <td className="px-6 py-4 text-xs text-slate-500">2 hours ago</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-medium">Published</span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined !text-base">visibility</span>
                  </button>
                  <Link href="/studio/editor/1" className="p-1 hover:text-primary transition-colors flex items-center">
                    <span className="material-symbols-outlined !text-base">edit</span>
                  </Link>
                  <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined !text-base">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>

            {/* 임시 하드코딩 행 2 (스크랩) */}
            <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Notes on Redis Caching Strategies</span>
                  <span className="text-[11px] text-slate-400 font-mono tracking-tight">/scrap/redis-notes</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500 uppercase tracking-tighter">
                  Scrap
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/5 text-primary border border-primary/20">Redis</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/5 text-primary border border-primary/20">DevOps</span>
                </div>
              </td>
              <td className="px-6 py-4 text-xs text-slate-500">Oct 05, 2023</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-medium">Published</span>
                </div>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined !text-base">visibility</span>
                  </button>
                  <button className="p-1 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined !text-base">edit</span>
                  </button>
                  <button className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                    <span className="material-symbols-outlined !text-base">more_vert</span>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* 4. Pagination / Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium tracking-tight">Showing 2 of 142 entries</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 shadow-sm font-bold">
              1
            </button>
            <button className="px-3 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
