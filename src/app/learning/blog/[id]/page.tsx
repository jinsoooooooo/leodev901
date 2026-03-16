// 💡 'use client' 없음 → 서버 컴포넌트!
//
// 🔑 이 파일에서 배우는 두 가지 핵심:
// 1. generateMetadata: 게시글 ID로 DB를 조회해서 각 게시글마다 다른 SEO 생성
// 2. async 서버 컴포넌트: DB에서 게시글 상세 내용을 서버에서 가져와 HTML 완성
//
// 💡 [id]의 의미: URL의 동적 파라미터
//   /learning/blog/1  → params.id = "1"
//   /learning/blog/42 → params.id = "42"
//
// 💡 사이드바는 layout.tsx에서 관리됩니다.
//    이 파일은 오른쪽 본문 영역만 담당합니다.
//    layout → BlogSidebar(클라이언트) + [여기서 반환하는 JSX]

import { supabase } from '@/app/lib/supabase';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface Params {
    params: Promise<{ id: string }>;
}

// ✅ generateStaticParams: 빌드 시점에 어떤 게시글 ID들이 있는지 Next.js에 알려주는 함수!
// output: export 환경에서는 동적 라우팅을 위해 반드시 필요합니다.
export async function generateStaticParams() {
    const { data: posts } = await supabase
        .from('posts')
        .select('id');
        
    if (!posts) return [];

    return posts.map((post) => ({
        id: post.id.toString(),
    }));
}

// ✅ generateMetadata: 각 게시글마다 다른 SEO를 동적으로 생성하는 함수!
export async function generateMetadata({ params }: Params): Promise<Metadata> {
    // 💡 Next.js 15에서 params는 Promise입니다 → await로 꺼내야 합니다!
    const { id } = await params;

    const { data: post } = await supabase
        .from('posts')
        .select('title, summary')
        .eq('id', id)
        .single();

    if (!post) {
        return { title: '게시글을 찾을 수 없습니다' };
    }

    return {
        title: `${post.title} | 나의 블로그`,
        description: post.summary ?? '게시글 내용을 확인하세요.',
        openGraph: {
            title: post.title,
            description: post.summary ?? '',
        },
    };
}

// ✅ 게시글 상세 페이지 — 메인 본문 영역만 반환
export default async function BlogDetailPage({ params }: Params) {
    const { id } = await params;

    const { data: post, error } = await supabase
        .from('posts')
        .select('id, title, summary, content, created_at')
        .eq('id', id)
        .single();

    if (!post || error) {
        notFound();
    }

    return (
        // 💡 layout.tsx의 children 자리에 이 JSX가 들어갑니다.
        // layout이 이미 flex + 사이드바를 잡고 있으므로 여기는 본문만!
        <main className="flex-1 max-w-3xl px-16 py-14">
            {/* 서버 컴포넌트 배지 */}
            <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1 mb-8">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                <span className="text-xs font-bold text-indigo-600">Server Component — 서버에서 HTML 완성</span>
            </div>

            {/* 제목 */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
            </h1>

            {/* 요약 (있을 때만) */}
            {post.summary && (
                <p className="text-lg text-gray-500 mb-8 leading-relaxed border-l-4 border-indigo-200 pl-4">
                    {post.summary}
                </p>
            )}

            {/* 구분선 */}
            <hr className="border-gray-100 mb-8" />

            {/* 작성일 */}
            <p className="text-xs text-gray-400 mb-6">
                {new Date(post.created_at).toLocaleDateString('ko-KR', {
                    year: 'numeric', month: 'long', day: 'numeric'
                })}
            </p>

            {/* 본문 */}
            <article className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-wrap">
                {post.content}
            </article>

            {/* generateMetadata 학습용 안내 */}
            <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                <p className="text-xs font-bold text-indigo-600 mb-1">🔍 이 페이지 SEO</p>
                <p className="text-xs text-indigo-500 leading-relaxed">
                    <code>generateMetadata</code>가 이 게시글의 title, summary로 SEO를 자동 생성했습니다!
                    크롬 개발자 도구(F12) → Elements → &lt;head&gt; 에서 확인하세요.
                </p>
            </div>
        </main>
    );
}
