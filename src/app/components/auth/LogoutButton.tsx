'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase-browser';

export default function LogoutButton({ className, children }: { className?: string; children?: React.ReactNode }) {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        // 브라우저 클라이언트를 사용해 로그아웃하면, 브라우저에 저장된 쿠키가 깔끔하게 삭제됩니다!
        await supabase.auth.signOut();

        // 로그아웃 후 로그인 페이지로 강제 이동 및 새로고침
        // router.push('/learning/ssr-auth/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            title="로그아웃"
            className={className || "inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200"}
        >
            {children || "로그아웃"}
        </button>
    );
}
