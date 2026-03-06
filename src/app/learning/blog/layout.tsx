// 💡 이 파일은 /learning/blog 경로 전체의 SEO + 공통 레이아웃을 담당합니다.
// layout.tsx는 /blog 와 /blog/[id] 양쪽에 공통으로 씌워집니다.
//
// 🔑 이것이 사이드바가 상세 페이지에서도 유지되는 이유입니다!
//   /blog 접속       → layout(사이드바 포함) + page.tsx(메인 콘텐츠)
//   /blog/42 접속    → layout(사이드바 포함) + [id]/page.tsx(게시글 본문)
//   → 두 경우 모두 layout이 공통이므로 사이드바가 그대로 남아있습니다!

import type { Metadata } from 'next';
import React from 'react';
import { supabase } from '@/app/lib/supabase';
import BlogSidebar from './BlogSidebar';

// 💡 고정 SEO: 블로그 전체에 적용되는 기본 메타데이터
// 하위 페이지([id])에서 generateMetadata를 쓰면 이것을 덮어씁니다.
export const metadata: Metadata = {
    title: '13단계: 노션 스타일 블로그 | 프론트엔드 학습',
    description: '서버 컴포넌트로 Supabase 게시글을 읽어오고, generateMetadata로 각 게시글의 SEO를 동적 생성하는 실습입니다.',
    openGraph: {
        title: '13단계: 노션 스타일 블로그',
        description: 'Next.js 서버 컴포넌트 + Supabase + SEO 실습',
    },
};

// 💡 layout.tsx는 async 서버 컴포넌트로 만들 수 있습니다!
// 여기서 posts 목록을 한 번만 가져오면,
// /blog 와 /blog/[id] 어디에 있든 같은 사이드바가 유지됩니다.
export default async function BlogLayout({ children }: { children: React.ReactNode }) {
    const { data: posts } = await supabase
        .from('posts')
        .select('id, title, summary, created_at')
        .order('created_at', { ascending: false });

    return (
        <div className="flex min-h-screen bg-white">
            {/* 사이드바: layout에 있으므로 /blog, /blog/[id] 모두에서 유지됩니다 */}
            <BlogSidebar posts={posts ?? []} />

            {/* children: /blog → page.tsx, /blog/42 → [id]/page.tsx 로 자동 교체 */}
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
