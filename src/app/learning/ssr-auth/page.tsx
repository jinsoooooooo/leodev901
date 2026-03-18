import React from 'react';
import Link from 'next/link';
// 방금 만든 서버 전용 클라이언트 불러오기
import { createClient } from '@/app/lib/supabase-server';
import LogoutButton from '@/app/components/auth/LogoutButton';
import LoginTrigger from '@/app/components/auth/LoginTrigger';

export default async function SSRAuthPage() {
    // 💡 서버 컴포넌트이므로 'use client'가 없습니다!
    // 내부에서 await를 자유롭게 사용할 수 있습니다.

    let user = null;
    let role = null;
    let errorMessage = null;

    try {
        // 1. 서버 클라이언트 초기화 (요청으로 들어온 쿠키를 뜯어서 해석합니다)
        const supabase = await createClient();

        // 2. 현재 쿠키를 기반으로 유저 정보 가져오기
        const { data: userData } = await supabase.auth.getUser();

        if (userData?.user) {
            user = userData.user;

            // 3. 유저 ID를 이용해 leodev901 스키마의 user_roles 테이블에서 역할(Role) 꺼내오기
            const { data: roleData } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', user.id)
                .single();

            // 데이터가 있으면 권한 할당, 없으면 기본값 'user'
            role = roleData?.role || 'user';
        }
    } catch (e: any) {
        errorMessage = e.message || "서버 클라이언트 초기화 중 오류가 발생했습니다. (npm install @supabase/ssr 설치 여부를 확인하세요)";
    }

    const handleLogout = async () => {
        const supabase = await createClient();
        await supabase.auth.signOut();
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
            <div className="max-w-xl w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">14단계: SSR 인증 & 인가 🛡️</h1>
                    <p className="text-slate-600">서버 컴포넌트에서 쿠키를 읽어 유저와 권한(Role)을 확인합니다.</p>
                </div>

                {/* 에러 발생 시 UI */}
                {errorMessage ? (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 border border-red-200 shadow-sm">
                        🚨 {errorMessage}
                    </div>
                ) : user ? (
                    // ✅ 로그인된 상태 (서버에서 확인 완료)
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
                        <div className="text-center mb-6">
                            <div className="text-4xl mb-4">🎉</div>
                            <h2 className="text-xl font-bold text-slate-800">서버 렌더링 성공!</h2>
                            <p className="text-sm text-slate-500">이 화면은 서버에서 만들어진 채 내려왔습니다. (SEO 최적화)</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-5 text-left space-y-4 shadow-inner border border-slate-100">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase w-16">Email</span>
                                <span className="text-sm font-semibold text-slate-700">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-bold text-slate-400 uppercase w-16">UID</span>
                                <span className="text-xs font-mono text-slate-500 truncate">{user.id}</span>
                            </div>

                            {/* DB에서 조회해온 권한 보여주기 */}
                            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-200">
                                <span className="text-xs font-bold text-indigo-500 uppercase">DB 권한 (user_roles)</span>
                                <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                                    <span className="text-sm font-medium text-slate-600">현재 부여된 역할</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${role === 'admin' ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-200 text-slate-700'}`}>
                                        {role === 'admin' ? '👑 관리자 (Admin)' : '👤 일반 유저 (User)'}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-3">
                                <LogoutButton />
                            </div>
                        </div>
                    </div>
                ) : (
                    // ❌ 로그인 안된 상태
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center mb-8">
                        <div className="text-4xl mb-4">🔒</div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">로그인이 필요합니다</h2>
                        <p className="text-slate-500 text-sm mb-6">현재 쿠키에 인증 정보가 없습니다.<br />(서버 판단 결과)</p>
                        {/* 💡 기존 링크 대신 모달 팝업을 띄우는 트리거 버튼을 사용합니다. */}
                        <LoginTrigger />
                    </div>
                )}

                {/* 학습 정리 박스 */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">💡</span> SSR 인증의 핵심 포인트
                    </h3>
                    <ul className="text-indigo-800 text-sm space-y-3 list-disc pl-5 leading-relaxed">
                        <li>이 컴포넌트는 클라이언트 JS가 동작하기 전, <strong>서버에서 유저 로그인 여부를 파악</strong>합니다. (SEO 최적화의 기본)</li>
                        <li>브라우저 <code>localStorage</code>가 아닌 <strong>HTTP 쿠키(Cookie)</strong>를 해석하여 세션을 검증합니다.</li>
                        <li>유저의 이메일 정보 획득과, 커스텀 DB(<code>leodev901.user_roles</code>) 조회를 <strong>서버 통신 2번 (await 2번)</strong>으로 연달아 깔끔하게 처리했습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
