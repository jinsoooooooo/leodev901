'use client';

import React, { useState, useEffect } from 'react';

// 게시글 데이터의 생김새를 정의합니다. (DB에서 가져올 형태)
interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

export default function BoardPage() {
    // 1. 화면에 보여줄 게시물 목록 상태 (초기엔 텅 빈 상자)
    const [posts, setPosts] = useState<Post[]>([]);

    // 2. 사용자가 입력할 제목과 내용 상태
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // 3. ✨핵심 마법문법 1: useEffect (페이지가 켜질 때 딱 한 번만 실행!)✨
    // 투두 리스트 땐 새로고침하면 비었죠? 이번엔 페이지가 열리자마자 백엔드(API)로 전화를 걸어 저장된 글을 가져옵니다.
    useEffect(() => {
        fetchPosts(); // 아래에 만든 글 가져오기 함수를 실행
    }, []); // 빈 배열 []의 의미: "이 페이지가 처음 열렸을 때 딱 한 번만 실행해라!"

    // 4. 게시글 '가져오기' 함수 (GET 요청)
    const fetchPosts = async () => {
        try {
            // 프론트엔드가 백엔드 점원('api/board')에게 "데이터 좀 줘!"라고 전화를 겁니다.
            const response = await fetch('/api/board');
            // 점원이 보내준 데이터(JSON)를 내 상자(posts)에 쏙 넣으면 화면에 짠! 하고 나타납니다.
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('글을 불러오는데 실패했습니다', error);
        }
    };

    // 5. 게시글 '저장하기' 함수 (POST 요청)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // (버튼을 눌렀을 때 페이지가 무작정 새로고침 되는 기본 폼 요소를 막습니다)

        if (!title.trim() || !content.trim()) return;

        try {
            // 이번엔 백엔드 점원('api/board')에게 그냥 전화(GET)를 거는 게 아니라,
            // 'POST'라는 택배(새 글 데이터)를 함께 봉투(body)에 담아 보냅니다!
            const response = await fetch('/api/board', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // "이 택배는 JSON(데이터) 형식이에요"
                },
                body: JSON.stringify({ title, content }), // 포장지(JSON.stringify)로 싸서 보냄
            });

            if (response.ok) {
                // 백엔드에서 저장이 끝났다고 연락이 오면,
                // 입력창을 비워주고, 화면을 최신 상태로 만들기 위해 전화를 다시 걸어 새 목록을 받아옵니다(fetchPosts)!
                setTitle('');   // 타이틀 비우기
                setContent(''); // 내용 비우기
                fetchPosts();   // 목록 갱신
            }
        } catch (error) {
            console.error('글 저장에 실패했습니다', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
                    4단계: 게시판 (파일 저장소 연동) 💾
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
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <textarea
                            placeholder="내용을 적어보세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="px-4 py-2 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
                        >
                            글 저장하기 (API 호출)
                        </button>
                    </div>
                </form>

                {/* 게시글 목록 보여주기 구역 */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 flex justify-between items-center">
                        <span>게시글 목록</span>
                        <span className="text-sm font-normal text-gray-500">
                            총 {posts.length}개의 글 (새로고침해도 안 날아가요!)
                        </span>
                    </h2>

                    <div className="flex flex-col gap-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-500">
                                아직 작성된 글이 없습니다. 첫 글을 남겨보세요!
                            </div>
                        ) : (
                            // 백엔드에서 받아온 거꾸로(최근 글이 먼저) 보여주기 위해 slice().reverse()를 썼습니다!
                            posts.slice().reverse().map((post) => (
                                <div key={post.id} className="p-6 border rounded-xl hover:shadow-md transition bg-white">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">{post.content}</p>
                                    <p className="text-xs text-gray-400">
                                        작성 시간: {new Date(post.createdAt).toLocaleString()}
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
