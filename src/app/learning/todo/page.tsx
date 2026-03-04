'use client'; // 사용자의 입력(타이핑, 클릭)과 상태(할 일 목록) 관리가 필요하므로 선언합니다!

import React, { useState } from 'react';

// 1. 할 일(Todo) 데이터의 생김새를 정의합니다.
// 하나의 할 일은 '고유한 ID', '내용(text)', '완료 여부(completed)' 세 가지 정보를 가집니다.
interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoPage() {
    // 2. 여러 개의 상태(State) 관리
    // todos: 할 일 '목록(배열)'을 저장하는 상태입니다. 초기값은 빈 배열([])입니다.
    const [todos, setTodos] = useState<Todo[]>([]);

    // inputText: 사용자가 입력창에 타이핑하고 있는 '현재 글자'를 저장하는 상태입니다.
    const [inputText, setInputText] = useState('');

    // 3. 할 일 추가 함수
    const handleAddTodo = () => {
        // 입력창이 비어있으면(공백만 있으면) 아무것도 안 하고 함수를 끝냅니다.
        if (inputText.trim() === '') return;

        // 새로운 할 일 객체(데이터 블록)를 하나 만듭니다.
        const newTodo: Todo = {
            id: Date.now(), // 현재 시간을 밀리초로 가져와서 고유한 ID로 씁니다 (간단한 팁!)
            text: inputText, // 방금 입력창에 쓴 글자
            completed: false, // 처음 추가할 땐 당연히 미완료 상태
        };

        // 기존의 할 일 목록(todos) 끝에 방금 만든 새 할 일(newTodo)을 이어붙여서 저장합니다!
        // [...기존배열, 새항목] 문법은 기존 것을 보존하면서 새 것을 추가하는 마법의 주문입니다.
        setTodos([...todos, newTodo]);

        // 추가가 끝났으니 입력창은 다시 텅 비워줍니다.
        setInputText('');
    };

    // 4. 할 일 삭제 함수 
    // (selectedId: number) : 삭제할 할 일의 고유한 ID를 매개변수로 받습니다.
    const handleDeleteTodo = (selectedId: number) => {
        // filter 기계의 원리:
        // 배열 안의 항목들을 하나씩 꺼내서 조건(todo.id != selectedId)을 검사합니다.
        // 이 조건이 '참(true)'인 녀석들만 모아서 새로운 배열을 만들어줍니다.
        // 즉, "내가 방금 누른 ID와 '다른' 녀석들만 통과시켜라!" 라는 뜻이 되어 자연스럽게 누른 항목만 빠지게 됩니다.
        const newTodos = todos.filter((todo) => todo.id !== selectedId); // (참고: !== 로 쓰는 것이 더 안전한 자바스크립트 문법입니다!)

        // 새로 만든 상자(newTodos)로 기존 상자를 덮어씌워서 화면을 바꿉니다.
        setTodos(newTodos);
    }

    // 5. 할 일 완료/취소 토글 함수
    const handleToggleTodoComplete = (selectedId: number) => {
        // map 기계의 원리:
        // 배열 안의 항목들을 하나씩 꺼내서 요리한 다음, 똑같은 개수의 새로운 배열을 만들어줍니다.
        const newTodos = todos.map((todo) => {
            // 내가 방금 누른 할 일(todo)의 ID가 현재 검사 중인 ID와 같다면?
            if (todo.id === selectedId) {
                // ...todo 문법: 기존 데이터(id, text)는 그대로 복사(유지)하고,
                // completed 값만 원래 상태의 반대(!todo.completed)로 뒤집어줍니다. (true -> false, false -> true)
                return { ...todo, completed: !todo.completed };
            }
            // 누른 항목이 아니라면? 아무것도 바꾸지 않고 그대로 둡니다.
            return todo;
        });

        // 이렇게 변경된 새 상자로 상태를 업데이트합니다.
        setTodos(newTodos);
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 flex flex-col items-center">
            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl overflow-hidden">

                {/* 헤더 영역 */}
                <div className="bg-blue-600 p-6 text-white text-center">
                    <h1 className="text-3xl font-bold">할 일 목록 📝</h1>
                    <p className="mt-2 text-blue-100">오늘 할 일을 기록해보세요</p>
                </div>

                {/* 입력창 + 추가 버튼 영역 */}
                <div className="p-6 flex gap-2">
                    {/* 
                        value={inputText}: 입력창의 글자는 항상 inputText 상태와 똑같아야 합니다.
                        onChange: 타이핑할 때마다 그 글자를 잡아서 setInputText로 상태를 바꿉니다.
                    */}
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        // 엔터키를 쳐도 추가되도록 하는 보너스 기능!
                        onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
                        placeholder="할 일을 입력하세요..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddTodo}
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        추가
                    </button>
                </div>

                {/* 할 일 목록이 표시되는 영역 */}
                {/* 4. 배열 렌더링 (map 함수) */}
                {/* todos 배열에 들어있는 할 일 개수만큼 아래의 <div>를 붕어빵 찍어내듯 반복해서 그립니다! */}
                <ul className="divide-y divide-gray-200">
                    {todos.map((todo) => (
                        // 목록을 그릴 때는 각 항목마다 고유한 이름표(key)를 달아주어야 React가 헷갈리지 않습니다.
                        <li key={todo.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition">
                            <span className="text-gray-800 font-medium">
                                {todo.text}
                            </span>
                            <div className="flex gap-2">
                                {/* JSX 조건부 렌더링: 삼항 연산자 (조건 ? 참결과 : 거짓결과) 사용 */}
                                {!todo.completed ? (
                                    // 6-1. onClick 이벤트 연결 (완료 버튼)
                                    // 함수에 값을 전달해야 할 때는 반드시 '() => 함수명(값)' 형태로 적어야 합니다.
                                    // 그냥 '함수명(값)' 이라고 적으면 클릭하기도 전에 바로 실행되어 버립니다!
                                    <button
                                        onClick={() => handleToggleTodoComplete(todo.id)}
                                        className="text-sm text-green-500 hover:text-green-700 font-semibold px-2 py-1 bg-green-50 rounded cursor-pointer"
                                    >
                                        완료
                                    </button>
                                ) : (
                                    // 6-2. onClick 이벤트 연결 (취소 버튼)
                                    <button
                                        onClick={() => handleToggleTodoComplete(todo.id)}
                                        className="text-sm text-gray-500 hover:text-gray-700 font-semibold px-2 py-1 bg-gray-50 rounded cursor-pointer"
                                    >
                                        취소
                                    </button>
                                )}

                                <button className="text-sm text-red-500 hover:text-red-700 font-semibold px-2 py-1 bg-red-50 rounded cursor-pointer"
                                    onClick={() => handleDeleteTodo(todo.id)}>
                                    삭제
                                </button>
                            </div>
                        </li>
                    ))}

                    {/* 할 일이 하나도 없을 때 보여줄 안내 메시지 */}
                    {todos.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            아직 등록된 할 일이 없습니다! 텅~
                        </div>
                    )}
                </ul>

            </div>
        </div>
    );
}
