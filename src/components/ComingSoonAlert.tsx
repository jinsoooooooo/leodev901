"use client";

import React from "react";

export default function ComingSoonAlert({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div 
            className={className} 
            onClick={() => alert("준비 중입니다.")}
            style={{ cursor: 'pointer' }}
        >
            {children}
        </div>
    );
}
