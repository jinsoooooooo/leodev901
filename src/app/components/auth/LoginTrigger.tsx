'use client';

import React, { useState } from 'react';
import AuthModal from './AuthModal';

export default function LoginTrigger({ className, children }: { className?: string; children?: React.ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className={className || "inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-200 active:scale-95"}
            >
                {children || "모달로 로그인하기 🔑"}
            </button>

            {/* 실제로 화면 어딘가에 숨어있다가 isModalOpen이 true가 되면 나타납니다. */}
            <AuthModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
