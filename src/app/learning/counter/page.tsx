// src/app/learning/counter/page.tsx
// 1. 'use client' 지시어: 
// Next.js 앱 라우터에서 이 컴포넌트가 '클라이언트 컴포넌트'임을 선언합니다.
// 브라우저에서 실행되며, onClick 같은 이벤트 리스너나 useState 같은 상태 관리를 사용할 수 있게 해줍니다.
'use client';

// 2. import 문:
// React 라이브러리에서 필요한 기능(여기서는 useState)을 가져옵니다.
import { useState } from 'react';

// 3. 컴포넌트 정의 및 내보내기 (export default):
// CounterPage라는 이름의 함수를 만들고, 이 파일의 기본 컴포넌트로 내보냅니다.
// React에서 UI의 한 조각(페이지, 버튼 등)은 화면을 반환(return)하는 함수로 만듭니다.
export default function CounterPage() {

  // 4. useState 훅(Hook):
  // 컴포넌트 안에서 값이 변할 때 화면을 다시 그리게(렌더링) 해주는 React의 핵심 기능입니다.
  // - count: 현재 값을 저장하는 변수 (초기값 0이 들어감)
  // - setCount: count 값을 변경할 때 사용하는 전용 함수
  // ❗ 주의: count = count + 1 처럼 직접 변경하면 화면이 바뀌지 않습니다! 반드시 setCount를 써야합니다.
  const [count, setCount] = useState(0);

  // 5. return 문 (JSX 문법):
  // HTML과 아주 비슷하게 생겼지만, 자바스크립트 안에서 UI를 그릴 수 있게 해주는 JSX라는 문법입니다.
  // 이 return 안의 내용이 실제 웹사이트 화면으로 그려집니다.
  return (
    // className="" 은 일반 HTML의 class="" 와 같습니다.
    // 여기에 적힌 글자들(flex, flex-col 등)은 Tailwind CSS라는 스타일 도구의 미리 정의된 디자인입니다.
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">카운터 앱 실습</h1>

      {/* 6. JSX 안에서 자바스크립트 변수 쓰기 */}
      {/* 중괄호 {} 를 사용하면 자바스크립트 변수나 값을 화면에 보여줄 수 있습니다. */}
      <div className="text-6xl font-black text-blue-600 mb-8">
        {count}
      </div>

      <div className="flex gap-4">
        {/* 7. 이벤트 핸들러 (onClick): */}
        {/* 버튼이 클릭되었을 때 실행할 코드를 지정합니다. */}
        {/* () => 함수형태 로 작성하여, 바로 실행되지 않고 '클릭될 때만' 실행되게 합니다. */}
        <button
          onClick={() => setCount(count - 2)} // 감소 버튼 (현재 2씩 줄어들게 수정하셨네요!)
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 font-bold"
        >
          - 감소
        </button>

        <button
          onClick={() => setCount(count + 1)} // 증가 버튼
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-bold"
        >
          + 증가
        </button>
      </div>
    </div>
  );
}
