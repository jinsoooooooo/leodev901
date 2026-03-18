'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase-browser';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const router = useRouter();
    const supabase = createClient();

    if (!isOpen) return null;

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        setSuccessMsg('');

        // 💡 로그인 시 쿠키를 자동으로 설정해주는 브라우저 클라이언트를 사용합니다!
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        setLoading(false);

        if (error) {
            setErrorMsg(error.message);
        } else {
            setSuccessMsg('✅ 로그인 성공! 페이지를 새로고침합니다...');
            setTimeout(() => {
                onClose();
                router.refresh(); // 서버 컴포넌트 전체를 새로고침하여 로그인 정보를 반영합니다.
            }, 1000);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Box */}
            <div className="relative w-full max-w-[440px] transform overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl transition-all animate-in zoom-in-95 duration-200 p-8 md:p-10">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    aria-label="Close"
                >
                    <span className="material-symbols-outlined font-light">close</span>
                </button>

                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold tracking-tight mb-3 text-slate-900 dark:text-white">Sign In</h1>
                    <p className="text-slate-500 text-sm">Enter your credentials to access the LeoDev901 studio.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">
                            Email address
                        </label>
                        <div className="relative">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="name@company.com"
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none placeholder:text-slate-400"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">
                                Password
                            </label>
                            <a className="text-xs font-medium text-blue-600 hover:underline" href="#">Forgot password?</a>
                        </div>
                        <div className="relative flex items-center">
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all outline-none placeholder:text-slate-400"
                            />
                            <button className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" type="button">
                                <span className="material-symbols-outlined text-xl">visibility</span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-semibold py-3.5 rounded-lg transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>

                    {errorMsg && (
                        <div className="mt-4 p-4 rounded-lg text-sm font-medium bg-red-50 text-red-600 border border-red-100 text-center animate-in fade-in duration-300">
                            🚨 {errorMsg}
                        </div>
                    )}

                    {successMsg && (
                        <div className="mt-4 p-4 rounded-lg text-sm font-medium bg-green-50 text-green-600 border border-green-100 text-center animate-in fade-in duration-300">
                            {successMsg}
                        </div>
                    )}

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white dark:bg-slate-900 px-2 text-slate-400 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                            <img alt="Google Logo" className="size-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCUGc6rrhVxVLxt9G105Inwz_nDmm3dtI8m53CH9luQENtQWnhinLchDJhIy1YLfKVxE6Kv7ipJynjorYcSM3RidAb69wG0KDgKQiIplCVmUAucxvWbamAw-l_au5mEEoC6jYRD3JYenfrFNhzKKk0sC1A5REawx9xYwYLdd0yx0J9IRfwidaWXKrSQMoih3pKPAx6fdhB87AiCwcbX39up71M4UmTi5TQDZXMtJzpQwjf9jI_0KIw99BJ58dxkSK_oX2kEIqoTvij" />
                            Google
                        </button>
                        <button type="button" className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-sm font-medium text-slate-700 dark:text-slate-300">
                            <span className="material-symbols-outlined text-lg">terminal</span>
                            SSO
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-center text-slate-500 text-sm">
                    Don't have an account?
                    <a className="text-blue-600 font-semibold hover:underline ml-1" href="#">Contact sales</a>
                </p>
            </div>
        </div>
    );
}
