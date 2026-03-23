"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/app/lib/supabase-browser';
import LogoutButton from '@/app/components/auth/LogoutButton';
import LoginTrigger from '@/app/components/auth/LoginTrigger';
import { User } from '@supabase/supabase-js';

export default function SSRAuthPage() {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const supabase = createClient();
                const { data: userData } = await supabase.auth.getUser();

                if (userData?.user) {
                    setUser(userData.user);

                    const { data: roleData } = await supabase
                        .from('user_roles')
                        .select('role')
                        .eq('user_id', userData.user.id)
                        .single();

                    setRole(roleData?.role || 'user');
                }
            } catch (e: any) {
                setErrorMessage(e.message || "클라이언트 초기화 중 오류가 발생했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        setUser(null);
        setRole(null);
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
                ) : isLoading ? (
                    <div className="text-center p-8">로딩 중...</div>
                ) : user ? (
                    // ✅ 로그인된 상태
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
                        <div className="text-center mb-6">
                            <div className="text-4xl mb-4">🎉</div>
                            <h2 className="text-xl font-bold text-slate-800">렌더링 완료!</h2>
                            <p className="text-sm text-slate-500">주의: 이 화면은 원래 SSR을 위한 것이었으나, Github Pages 정적 배포 호환을 위해 클라이언트 렌더링으로 수정되었습니다.</p>
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
                        <span className="text-xl">💡</span> 임시 클라이언트 렌더링 안내
                    </h3>
                    <ul className="text-indigo-800 text-sm space-y-3 list-disc pl-5 leading-relaxed">
                        <li>이 컴포넌트는 원래 서버에서 동작하는 코드로 작성되었으나, <strong>Github Pages의 정적 HTML 호스팅 특성</strong> 때문에 빌드가 불가능했습니다.</li>
                        <li>Github Pages에서는 백엔드 서버가 없어 <code>cookies()</code>를 사용할 수 없으므로, 부득이하게 전체 로직을 클라이언트 컴포넌트(<code>useEffect</code>)로 마이그레이션했습니다.</li>
                        <li>진짜 SSR 인증을 경험하려면 Vercel 로 배포해야 합니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
