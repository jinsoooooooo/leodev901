'use client';

// 💡 이 컴포넌트는 클라이언트 컴포넌트입니다.
// 이유: usePathname() 훅이 브라우저에서만 동작하기 때문!
//
// 🔑 이번 변경 핵심: useState → usePathname
//
// [이전 방식]
//   - useState로 selectedId를 관리
//   - 문제: /blog/[id] 로 이동하면 layout이 유지되지만
//           BlogSidebar가 새로 마운트되면서 selectedId가 초기화됨!
//
// [새 방식]
//   - usePathname()으로 현재 URL을 읽어서 선택 상태를 결정
//   - 장점: 새로고침해도, URL로 직접 들어와도 현재 게시글이 항상 하이라이트됨!
//   - 예: URL이 '/learning/blog/42' 이면 → id=42 항목 강조

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface PostMeta {
    id: number;
    title: string;
    summary: string | null;
    created_at: string;
}

export default function BlogSidebar({ posts }: { posts: PostMeta[] }) {
    // 💡 usePathname(): 현재 브라우저 URL의 경로를 반환합니다.
    //   /learning/blog       → '/learning/blog'
    //   /learning/blog/42    → '/learning/blog/42'
    const pathname = usePathname();

    // 💡 URL에서 현재 선택된 게시글 ID를 추출합니다.
    //   예: '/learning/blog/42' → '42' → 숫자 42
    //   예: '/learning/blog'    → NaN  (목록 페이지, 아무것도 선택 안 됨)
    const currentId = Number(pathname.split('/').pop());

    return (
        <aside className="w-64 min-h-screen bg-gray-50 border-r border-gray-200 flex flex-col shrink-0">
            {/* 사이드바 헤더 */}
            <div className="px-4 py-5 border-b border-gray-200">
                {/* 뒤로가기 링크 (목록 페이지에 있을 땐 숨김) */}
                {pathname !== '/learning/blog' && (
                    <Link
                        href="/learning/blog"
                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-indigo-500 mb-3 transition-colors group"
                    >
                        <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
                        블로그 홈
                    </Link>
                )}
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">BLOG</p>
                <h2 className="text-base font-bold text-gray-800">게시글 목록</h2>
                <p className="text-xs text-gray-400 mt-1">{posts.length}개의 게시글</p>
            </div>

            {/* 게시글 목록 */}
            <nav className="flex-1 overflow-y-auto py-2">
                {posts.length === 0 ? (
                    <p className="px-4 py-6 text-xs text-gray-400 text-center">
                        아직 게시글이 없습니다.
                    </p>
                ) : (
                    posts.map((post) => {
                        // 💡 usePathname으로 읽은 currentId와 비교하여 현재 게시글 판단!
                        const isSelected = currentId === post.id;
                        return (
                            // 💡 useRouter 대신 <Link> 사용
                            // → 서버/클라이언트 모두 호환, SEO에도 유리한 <a> 태그로 변환
                            <Link
                                key={post.id}
                                href={`/learning/blog/${post.id}`}
                                className={`w-full text-left px-4 py-3 flex flex-col gap-1 hover:bg-gray-100 transition-colors border-l-2 block ${isSelected
                                        ? 'border-indigo-500 bg-indigo-50'   // 선택된 항목
                                        : 'border-transparent'
                                    }`}
                            >
                                <span className={`text-sm font-medium leading-tight line-clamp-2 ${isSelected ? 'text-indigo-700' : 'text-gray-700'
                                    }`}>
                                    {isSelected ? '📖' : '📄'} {post.title}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                                </span>
                            </Link>
                        );
                    })
                )}
            </nav>

            {/* 하단 힌트 */}
            <div className="px-4 py-3 border-t border-gray-200">
                <p className="text-xs text-gray-400">
                    💡 <code className="bg-gray-200 px-1 rounded">usePathname</code>으로 현재 URL 감지
                </p>
            </div>
        </aside>
    );
}
