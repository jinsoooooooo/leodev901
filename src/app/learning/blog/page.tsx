// 💡 'use client'가 없습니다 → 서버 컴포넌트!
//
// 🔑 이제 사이드바는 layout.tsx에서 관리합니다.
// 이 파일(page.tsx)은 오른쪽 메인 콘텐츠 영역만 담당합니다.
// layout이 사이드바 + children(이 파일)을 조합해서 보여줍니다.

import { supabase } from '@/app/lib/supabase';
import Link from 'next/link';

interface PostMeta {
    id: number;
    title: string;
    summary: string | null;
    created_at: string;
}

export default async function BlogListPage() {
    // 💡 layout.tsx에서도 조회하지만, 이 페이지는 메인 콘텐츠(총 게시글 수 등)에 필요해서 별도 조회합니다.
    const { data: posts, error } = await supabase
        .from('posts')
        .select('id, title, summary, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('[서버 컴포넌트] posts 목록 조회 실패:', error);
    }

    const postList: PostMeta[] = posts ?? [];

    return (
        // 💡 이제 flex 껍데기와 <BlogSidebar>는 layout.tsx에 있습니다.
        // 여기는 오른쪽 메인 영역만 반환하면 됩니다.
        <main className="flex-1 flex flex-col items-center justify-center px-12 text-center">
            {/* 서버 렌더링 증거 배지 */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 mb-8">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Server Component</span>
            </div>

            <h1 className="text-4xl font-bold text-gray-800 mb-3">
                📔 나의 블로그
            </h1>
            <p className="text-gray-500 mb-2">
                총 <strong className="text-indigo-600">{postList.length}개</strong>의 게시글이 있습니다.
            </p>
            <p className="text-sm text-gray-400 mb-10">
                왼쪽 사이드바에서 읽고 싶은 게시글을 선택하세요.
            </p>

            {/* 최신 게시글 바로가기 카드들 (서버에서 렌더링!) */}
            {postList.length > 0 && (
                <div className="w-full max-w-lg text-left">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">최근 게시글</p>
                    <div className="flex flex-col gap-2">
                        {postList.slice(0, 5).map((post) => (
                            <Link
                                key={post.id}
                                href={`/learning/blog/${post.id}`}
                                className="group p-4 border border-gray-100 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                            >
                                <p className="font-medium text-gray-800 group-hover:text-indigo-700 transition-colors line-clamp-1">
                                    {post.title}
                                </p>
                                {post.summary && (
                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{post.summary}</p>
                                )}
                                <p className="text-xs text-gray-300 mt-1">
                                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 학습 포인트 설명 */}
            <div className="mt-12 w-full max-w-lg bg-amber-50 border border-amber-200 rounded-xl p-5 text-left">
                <p className="text-sm font-bold text-amber-800 mb-2">💡 이 페이지에서 배우는 것</p>
                <ul className="text-xs text-amber-700 space-y-1.5 list-disc pl-4">
                    <li><code className="bg-amber-100 px-1 rounded">layout.tsx</code>가 사이드바를 포함 → <strong>/blog와 /blog/[id] 모두 유지!</strong></li>
                    <li><code className="bg-amber-100 px-1 rounded">usePathname</code>으로 URL을 읽어 현재 게시글 하이라이트</li>
                    <li><code className="bg-amber-100 px-1 rounded">{'<Link>'}</code> 는 서버에서도 동작 → SEO 유리</li>
                    <li>상세 페이지는 <code className="bg-amber-100 px-1 rounded">generateMetadata</code>로 동적 SEO</li>
                </ul>
            </div>
        </main>
    );
}
