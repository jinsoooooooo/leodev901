"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function StudioEditor() {
    // Use client to enforce no-scrollbar styling for this page layout if needed,
    // but we can just rely on the layout wrapper classes.

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
            {/* Top Action Bar */}
            <header className="flex h-14 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f1823] shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/studio" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-lg">arrow_back</span>
                        목록으로
                    </Link>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
                        <span className="text-sm font-semibold">새로운 블로그 포스트 작성</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-lg">save</span>
                        저장(Draft)
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                        미리보기
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-lg">download</span>
                        내보내기
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors shadow-sm">
                        <span className="material-symbols-outlined text-lg">rocket_launch</span>
                        발행(Publish)
                    </button>
                </div>
            </header>

            {/* Main Workspace */}
            <main className="flex flex-1 overflow-hidden">
                {/* Split View Editor */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Left Pane: Markdown Editor */}
                    <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0d1117]">
                        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Editor</span>
                            <div className="flex gap-2">
                                <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Bold"><span className="material-symbols-outlined text-lg">format_bold</span></button>
                                <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Italic"><span className="material-symbols-outlined text-lg">format_italic</span></button>
                                <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Link"><span className="material-symbols-outlined text-lg">link</span></button>
                                <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Image"><span className="material-symbols-outlined text-lg">image</span></button>
                                <button className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Code"><span className="material-symbols-outlined text-lg">code</span></button>
                            </div>
                        </div>

                        <textarea
                            className="flex-1 w-full p-6 bg-transparent border-none focus:ring-0 font-mono text-sm leading-relaxed resize-none text-slate-800 dark:text-slate-300 custom-scrollbar outline-none"
                            spellCheck="false"
                            defaultValue={`# 안녕하세요, 새로운 포스트를 시작하세요

여기에 내용을 작성해보세요. **마크다운** 문법이 실시간으로 지원됩니다.

## 주요 기능들

1. **실시간 프리뷰**: 우측에서 렌더링된 결과를 확인하세요.
2. **반응형 디자인**: 다양한 화면에서 최적화된 편집 환경을 제공합니다.
3. **메타데이터 관리**: 우측 사이드바에서 SEO와 태그를 관리하세요.`}
                        />
                    </div>

                    {/* Right Pane would go here for preview, omitted in skeleton */}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #30363d; border-radius: 10px; }
      `}} />
        </div>
    );
}
