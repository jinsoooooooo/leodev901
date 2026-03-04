/*
 * ==============================================================================
 * [빌드 에러 수정 및 로컬 실습용 백업]
 * GitHub Pages 배포 시(static export)에는 Node.js 서버 전용 기능인 파일 시스템(fs)
 * 접근이나 동적 POST API 라우트를 사용할 수 없어 빌드 에러가 발생합니다.
 * 본 프로젝트의 실제 운영 환경(게시판 2)에서는 Supabase(BaaS)를 사용 중이므로,
 * 빌드 통과를 위해 로컬 파일 기반의 API 통신 코드는 아래와 같이 주석 처리해 두었습니다.
 * 
 * 나중에 로컬에서 fs 모듈 동작 방식을 실습하거나 복습하실 때 이 주석을 해제하고
 * 로컬 서버(npm run dev)에서 테스트해 보시면 됩니다.
 * ==============================================================================
 */

// // 0-1. import { NextResponse } from 'next/server';
// // Next.js에서 벡엔드(서버) 역할을 할 때, 프론트엔드에게 응답(데이터나 에러메시지 등)을 
// // 예쁜 상자(JSON 형식 등)에 담아서 보내주는 역할을 하는 택배 기사 같은 도구입니다.
// import { NextResponse } from 'next/server';

// // 0-2. import fs from 'fs';
// // 'fs'는 'File System'의 약자입니다. 컴퓨터나 서버의 하드디스크에 있는 진짜 '파일'을
// // 읽고(읽기), 쓰고(만들기), 지울 수 있게 해주는 Node.js의 기본 도구입니다.
// import fs from 'fs';

// // 0-3. import path from 'path';
// // 폴더 튜소(경로, path)를 안전하고 다루기 쉽게 합치거나 쪼개주는 도구입니다.
// // 윈도우는 경로를 역슬래시(\)로, 맥/리눅스는 슬래시(/)로 쓰는데, 이걸 알아서 예쁘게 맞춰줍니다.
// import path from 'path';

// // 1. 데이터를 저장할 파일의 절대 경로를 만듭니다.
// // process.cwd()는 현재 프로젝트 폴더(leodev901)를 의미합니다.
// // 즉, 프로젝트 최상단에 'data.json' 이라는 임시 창고 파일을 만들겠다는 뜻입니다!
// const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

// // 2. GET 요청 처리 (데이터 가져오기):
// // 누군가(프론트엔드) 브라우저에서 'http://localhost:3000/api/board' 주소로 POST 방식이 아닌 GET 방식으로 데이터를 달라고 하면 이 함수가 실행됩니다.
// export async function GET() {
//     try {
//         // 만약 창고 파일(data.json)이 아예 존재하지 않는다면?
//         if (!fs.existsSync(DATA_FILE_PATH)) {
//             // 아직 글이 하나도 없다는 뜻이므로 빈 배열(상자)을 돌려줍니다.
//             return NextResponse.json([]);
//         }

//         // 파일이 있다면 안의 내용(문자열)을 읽어옵니다.
//         const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf-8');

//         // 읽어온 문자열을 다시 자바스크립트용 배열 객체로 변환(JSON.parse)해서 돌려줍니다!
//         const posts = JSON.parse(fileContents);
//         return NextResponse.json(posts);

//     } catch (error) {
//         // 읽다가 에러가 나면 500 에러를 뱉습니다.
//         return NextResponse.json({ error: '데이터를 읽어오는 데 실패했습니다.' }, { status: 500 });
//     }
// }

// // 3. POST 요청 처리 (새로운 데이터 저장하기):
// // 사용자가 게시글을 작성하고 '저장' 버튼을 누르면, 프론트엔드가 이쪽으로 새 글 데이터를 보냅니다.
// export async function POST(request: Request) {
//     try {
//         // 프론트엔드가 택배로 보낸 '새 글 데이터' 상자를 열어서 확인합니다. 
//         // (예: { title: "첫 글", content: "안녕하세요!" })
//         const newPost = await request.json();

//         let posts = []; // 기존 게시글들을 담아둘 빈 상자

//         // 만약 이미 창고 파일이 있다면 안의 내용물(기존 글들)을 먼저 상자에 쓸어 담습니다.
//         if (fs.existsSync(DATA_FILE_PATH)) {
//             const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
//             posts = JSON.parse(fileContents);
//         }

//         // 새 글에 고유한 번호(id)와 작성 시간(createdAt) 도장을 쾅 찍어줍니다.
//         const postWithId = {
//             id: Date.now(),
//             ...newPost,
//             createdAt: new Date().toISOString()
//         };

//         // 기존 상자(posts)에 새 글(postWithId)을 추가합니다.
//         posts.push(postWithId);

//         // 새 글이 추가된 빵빵해진 상자를 다시 문자열로 예쁘게 포장(JSON.stringify)해서
//         // 창고 파일(data.json)에 콱! 덮어써버립니다. (영구 저장 완료!)
//         fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(posts, null, 2));

//         // 저장이 잘 되었다고 방금 저장한 그 글을 프론트엔드에 다시 돌려보내줍니다.
//         return NextResponse.json(postWithId, { status: 201 });

//     } catch (error) {
//         return NextResponse.json({ error: '게시글 저장에 실패했습니다.' }, { status: 500 });
//     }
// }
// 
// // 더미 GET 핸들러(빌드 통과용) - GitHub Pages 정적 배포 호환을 위해 비워둡니다.
// 파일 경로 라우팅 에러 방지를 위해 static 모드로 강제 설정합니다.
export const dynamic = 'force-static';

export async function GET() {
    return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
