// src/app/learning/profile/components/ProfileCard.tsx
'use client'; // <-- [추가 1] 이제 다시 클릭(이벤트)을 쓸 거니까 선언합니다!
// 
import React, { useState } from 'react';



// 1. Props(프롭스) 인터페이스 정의:
// 붕어빵 틀에 들어갈 재료(데이터)의 종류와 형태를 미리 정해둡니다. (TypeScript 문법)
export interface ProfileCardProps {
    name: string;      // 이름 (예: "레오")
    role: string;      // 역할 (예: "풀스택 개발자")
    bio: string;       // 소개글 (예: "React와 Next.js를 즐겁게 배우고 있는 개발자입니다.")
    imageUrl: string;  // 프로필 이미지 주소
}

// 2. ProfileCard 붕어빵 틀(컴포넌트) 만들기:
// 'props' 라는 이름표를 든 상자를 매개변수로 받습니다.
export function ProfileCard(props: ProfileCardProps) {
    const [name, setName] = useState("props.name");

    // 이전 page.tsx에 있던 <div> 코드를 그대로 가져옵니다.
    return (
        <div className="w-80 bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">

            {/* 카드 상단 배경 및 프로필 이미지 */}
            <div className="h-32 bg-blue-500 relative">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 cursor-pointer">
                    <img
                        // 3. 사진 주소 대신 props에서 전달받은 imageUrl을 넣습니다. (값이 바뀔 부분)
                        src={props.imageUrl}
                        // 접근성을 위해 이름도 동적으로 넣습니다.
                        alt={`${props.name}의 프로필 사진`}
                        className="w-24 h-24 rounded-full border-4 border-white bg-gray-200"
                        onClick={() => setName(name + "!")}
                    />
                </div>
            </div>

            {/* 텍스트 정보 영역 */}
            <div className="pt-16 pb-8 px-6 text-center">
                {/* 4. 고정된 글자("레오" 등)를 지우고 중괄호 {} 안에 props 데이터를 넣습니다. */}
                <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                <p className="text-blue-500 font-medium mb-4">{props.role}</p>
                <p className="text-gray-600 text-sm">
                    {props.bio}
                </p>
            </div>

        </div>
    );
}
