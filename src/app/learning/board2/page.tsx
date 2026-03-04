'use client';

import React, { useState, useEffect } from 'react';
// 우리가 방금 만든 'supabase 연결 통로'를 불러옵니다! (최상위 폴더 기준)
import { supabase } from '@/app/lib/supabase';

// 게시글 데이터의 생김새를 정의합니다. (DB에서 가져올 형태)
interface Post {
    id: number;
    title: string;
    content: string;
    // Supabase의 기본 테이블 설정은 'created_at' 이라는 스네이크 케이스를 씁니다.
    created_at: string;
}

export default function SupabaseBoardPage() {
    // 1. 화면에 보여줄 게시물 목록 상태 (초기엔 텅 빈 상자)
    const [posts, setPosts] = useState<Post[]>([]);

    // 2. 사용자가 입력할 제목과 내용 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 3. ✨핵심 마법문법 1: useEffect (페이지가 켜질 때 딱 한 번만 실행!)✨
    useEffect(() => {
        fetchPosts(); // 아래에 만든 글 가져오기 함수를 실행
    }, []); // 빈 배열 []의 의미: "이 페이지가 처음 열렸을 때 딱 한 번만 실행해라!"

    // 4. 게시글 '가져오기' 함수 (Supabase GET)
    const fetchPosts = async () => {
        try {
            // API 점원 대신 Supabase 본사에 직접 연락합니다!
            // "posts 테이블에서 모든 데이터(*)를 가져와(select). 근데 최신순(created_at)으로 내림차순(ascending: false) 정렬해서 보내줘!"
            // 💡 문법 설명: { data, error } 의 정체 (객체 구조 분해 할당)
            // Supabase API가 일 처리를 끝내면 커다란 상자(객체) 하나를 던져줍니다.
            // 그 상자 안에는 여러 정보가 섞여 있는데, 그 중에서 우리가 필요한 'data(게시글 결과)'와 'error(에러 알림)'
            // 두 개만 쏙 뽑아오려면 중괄호 {}를 사용합니다. 일반적인 변수 규칙이 아니라 JavaScript의 강력한 문법입니다!
            // 💡 실무 적용 팁: 에러 모니터링을 위해 'status' 코드까지 함께 뽑아옵니다!
            // data: 내가 필요한 게시글 목록
            // error: 에러가 발생했다면 왜 발생했는지 상세 정보
            // status: HTTP 상태 코드 (예: 200 성공, 401 권한없음, 500 서버에러)
            const { data, error, status } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            // Supabase에서 에러가 났다고 알려주면 에러를 던집니다.
            if (error) {
                // 실무에서는 여기서 모니터링 도구(Sentry 등)에 에러를 기록합니다.
                // console.error(`[Error ${status}]: 게시글을 불러오지 못했습니다. 상세내용:`, error);
                throw error;
            }

            // 에러가 없으면 data를 내 상자(posts)에 쏙 넣습니다.
            if (data) setPosts(data);
        } catch (error) {
            console.error('글을 불러오는데 실패했습니다', error);
        }
    };

    // 5. 게시글 '저장하기' 함수 (Supabase POST)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        try {
            // Supabase 본사에 택배를 보냅니다.
            // "posts 테이블에 이 데이터 덩어리({ title, content })를 끼워 넣어줘(insert)!"
            // 💡 글 저장이 잘 되었는지 성공 여부(status)나 에러(error)만 확인하면 되므로 두 개를 뽑습니다.
            const { error, status } = await supabase
                .from('posts')
                .insert([{ title, content }]);

            // 에러가 없으면(저장에 성공했으면)
            if (!error) {
                // 입력창을 싹 비우고, 목록을 새로고침합니다!
                setTitle('');
                setContent('');
                fetchPosts();
            } else {
                throw error;
            }
        } catch (error) {
            console.error('글 저장에 실패했습니다', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4 text-green-600">
                    5단계: 게시판 (Supabase 연동 완료! 🚀)
                </h1>

                {/* 게시글 작성 폼 구역 */}
                <form onSubmit={handleSubmit} className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">새 글 작성</h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <textarea
                            placeholder="내용을 적어보세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="px-4 py-2 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            DB에 글 저장하기
                        </button>
                    </div>
                </form>

                {/* 게시글 목록 보여주기 구역 */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 flex justify-between items-center">
                        <span>DB 게시글 목록</span>
                        <span className="text-sm font-normal text-gray-500">
                            총 {posts.length}개의 글 (Supabase 서버에 저장됨)
                        </span>
                    </h2>

                    <div className="flex flex-col gap-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-500">
                                아직 작성된 글이 없습니다. 첫 글을 남겨보세요!
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="p-6 border rounded-xl hover:shadow-md transition bg-white border-green-100">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>
                                    <p className="text-xs text-gray-400">
                                        작성 시간: {new Date(post.created_at).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
