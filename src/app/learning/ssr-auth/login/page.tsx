'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// 💡 기존 lib/supabase.ts 가 아니라, 쿠키를 자동으로 구워주는 SSR 전용 클라이언트를 가져옵니다!
import { createClient } from '@/app/lib/supabase-browser';

export default function SSRLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const router = useRouter();
    // 브라우저 전용 클라이언트 인스턴스 생성
    const supabase = createClient();

    const handleSSRLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        // 💡 겉보기엔 Step 10과 똑같은 API지만, 밑단(Under the hood)에서
        // localStorage뿐만 아니라 '쿠키(Cookie)'까지 동시에 세팅해 주는 마법이 일어납니다.
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('✅ 로그인 성공! 쿠키가 생성되었습니다. 서버 페이지로 이동합니다...');
            // 로그인 성공 시 SSR 페이지로 이동
            setTimeout(() => {
                router.push('/learning/ssr-auth');
                router.refresh(); // 최신 세션 상태를 반영하기 위해 서버 컴포넌트 강제 리프레시
            }, 1000);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">SSR 전용 로그인 🍪</h1>
                    <p className="text-slate-600">이 폼에서 로그인을 하시면 서버 통신용 쿠키가 발급됩니다.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <form onSubmit={handleSSRLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">이메일</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="******"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-4 rounded-xl font-bold transition-all text-white ${loading
                                ? 'bg-slate-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
                                }`}
                        >
                            {loading ? '쿠키 굽는 중...' : '🍪 SSR 로그인 (쿠키 발급)'}
                        </button>
                    </form>

                    {errorMsg && (
                        <div className="mt-6 p-4 rounded-xl text-sm font-semibold bg-red-50 text-red-700 border border-red-100">
                            {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="mt-6 p-4 rounded-xl text-sm font-semibold bg-green-50 text-green-700 border border-green-100">
                            {successMsg}
                        </div>
                    )}
                </div>

                {/* 학습 로그 카드 */}
                <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-900 mb-2">💡 여기가 Step 10과 다른 점</h3>
                    <ul className="text-blue-800 text-sm space-y-2 list-disc pl-5 leading-relaxed">
                        <li><code>@/app/lib/supabase-browser.ts</code>에 있는 <strong>SSR 동기화 클라이언트</strong>를 사용했습니다.</li>
                        <li>덕분에 로그인이 완료되는 즉시, Next.js 서버(SSR)가 해독할 수 있는 강력한 <strong>세션 쿠키</strong>가 브라우저에 저장됩니다.</li>
                        <li>로그인 후 <code>router.refresh()</code>를 호출하여 서버 컴포넌트가 최신 쿠키를 바탕으로 다시 그려지도록 유도했습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
