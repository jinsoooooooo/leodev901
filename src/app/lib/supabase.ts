// src/app/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// 1. .env.local 파일에 저장해둔 환경변수(비밀번호)를 불러옵니다.
// ! 기호는 "이 값이 무조건 있다"고 TypeScript에게 보장해주는 기호입니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// 2. 이 키들을 가지고 Supabase 본사와 통신할 수 있는 '연결 통로(client)'를 하나 개통합니다.
// 기본 스키마(public)가 아닌 유저님이 지정한 'leodev901' 스키마를 사용하도록 옵션에 못을 박아둡니다!
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: {
        schema: 'leodev901'
    }
});
