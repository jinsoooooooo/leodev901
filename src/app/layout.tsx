import type { Metadata } from "next";
import { Inter } from "next/font/google"; // 💡 Next.js에서 제공하는 폰트 최적화 모듈입니다.
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

/**
 * 💡 [학습노트] 구글 폰트(Inter) 최적화 적용
 * 
 * Next.js는 `next/font/google`을 통해 폰트를 빌드 타임에 미리 다운로드하여
 * 폰트 로딩으로 인한 화면 깜빡임(Layout Shift)을 원천 차단해 줍니다.
 * 
 * - variable: TailwindCSS 등에서 이 폰트를 CSS 변수(`var(--font-inter)`)로 쓸 수 있게 이름을 지어줍니다.
 * - subsets: 사용할 언어셋(예: 라틴어)만 선택해 폰트 파일 용량을 줄입니다.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/**
 * 💡 [학습노트] Metadata 객체 (SEO 최적화)
 * 
 * 브라우저 탭 상단의 제목(title)이나 구글 검색 시 
 * 표시되는 설명(description)을 정의합니다. (자동으로 <head> 태그에 병합됨)
 */
export const metadata: Metadata = {
  title: "Leo - Senior Full-Stack & AI Developer",
  description: "Backend & AI Agent Developer Portfolio",
};

/**
 * 💡 [학습노트] RootLayout (진짜 최상위 껍데기)
 * 
 * `src/app/layout.tsx`는 웹 앱 전체의 뼈대입니다. 
 * 무조건 <html>과 <body> 태그를 포함해야 하며, 모든 페이지({children})가 이 뼈대 안으로 들어옵니다.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: 다크모드 설정 시 서버와 클라이언트 HTML이 다를 경우 뜨는 경고를 무시합니다.
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* 구글 머터리얼 아이콘(Material Symbols)을 불러옵니다. SVG를 받지 않고 폰트처럼 렌더링합니다. */}
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      
      {/* 
        위에서 만든 inter 폰트의 변수명(inter.variable)을 <body>에 클래스로 주입하여, 
        하위의 모든 컴포넌트가 이 폰트를 쓸 수 있게 만듭니다. 
      */}
      <body className={`${inter.variable} font-display antialiased min-h-screen flex flex-col`}>
        
        {/* 
          💡 [학습노트] ThemeProvider (다크모드 제어)
          사용자의 시스템 설정이나 버튼 클릭에 따라 다크모드/라이트모드를 토글할 수 있게 해주는 라이브러리 설정입니다. 
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* 하위 레이아웃이나 개별 페이지(예: /studio/page.tsx) 내용이 이 자리에 삽입됩니다! */}
          {children}
        </ThemeProvider>
      </body>
    </html >
  );
}
