import Link from 'next/link';
import { createClient } from '@/app/lib/supabase-server';

import LogoutButton from '@/app/components/auth/LogoutButton';
import LoginTrigger from '@/app/components/auth/LoginTrigger';

/**
 * 💡 [학습노트] StudioSidebar 컴포넌트
 * Next.js App Router에서 레이아웃에 포함되어 좌측을 담당하는 "사이드바"입니다.
 * 
 * - fixed 속성으로 좌측에 고정됩니다.
 * - w-64 로 너비를 16rem(256px)으로 고정했습니다.
 * - 다크모드 대응을 위해 dark: 접두사를 활용합니다. (예: dark:bg-background-dark)
 */
export default async function StudioSidebar() {

  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full bg-white dark:bg-slate-900 z-20">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <span className="material-symbols-outlined">layers</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">CMS Studio</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Pro Dashboard</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <Link
          href="/studio"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
        >
          <span className="material-symbols-outlined">dashboard</span>
          Overview
        </Link>
        <Link
          href="/studio"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-primary/10 text-primary transition-colors"
        >
          <span className="material-symbols-outlined">description</span>
          All Content
        </Link>
        <Link
          href="/studio/blog"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
        >
          <span className="material-symbols-outlined">edit_note</span>
          Blog Posts
        </Link>
        <Link
          href="/studio/scrap"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
        >
          <span className="material-symbols-outlined">delete_outline</span>
          Scraps
        </Link>

        <div className="pt-4 pb-2 px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Admin</div>

        <Link
          href="/studio/settings"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400"
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </Link>
      </nav>


      {/* 👤 유저 프로필 영역 */}
      {user ? (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
              <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 text-sm">person</span>
            </div>
            <div className="flex-1 overflow-hidden">
              {/* 유저 이메일의 앞부분을 아이디로 활용하여 보여줍니다 */}
              <p className="text-xs font-semibold truncate text-slate-900 dark:text-slate-100">{user.email?.split('@')[0]}</p>
              <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
            </div>
            
            {/* 로그아웃 버튼 (디자인 호환성을 위해 아이콘 형태로 전달) */}
            <LogoutButton className="p-1.5 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 rounded-lg transition-colors flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </LogoutButton>
          </div>
        </div>
      ) : (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800">
           {/* 로그인 트리거 버튼 (주변 디자인과 어울리게 커스텀 스타일 전달) */}
          <LoginTrigger className="flex items-center justify-center gap-2 w-full p-2 text-sm font-bold rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all">
            <span className="material-symbols-outlined text-[18px]">login</span>
            로그인
          </LoginTrigger>
        </div>
      )}
    </aside>
  );
}
