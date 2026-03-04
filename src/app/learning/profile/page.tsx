// src/app/learning/profile/page.tsx
// 1. 방금 만든 'ProfileCard' 붕어빵 틀을 사용하기 위해 불러옵니다!
import { ProfileCard } from "./components/ProfileCard";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-8">2단계: 프로필 카드 (컴포넌트 분리 후)</h1>

            {/* 2. 여러 명의 프로필을 좌우로 나란히 배치하기 위한 박스 */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">

                {/* 3. 첫 번째 카드: 레오 (이제 수십 줄의 코드가 단 6줄로 줄었습니다!) */}
                <ProfileCard
                    name="레오"
                    role="풀스택 개발자"
                    bio="React와 Next.js를 즐겁게 배우고 있는 개발자입니다."
                    imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Leo"
                />

                {/* 4. 두 번째 카드: 제인 (똑같은 틀에 내용물만 바꿔서 추가!) */}
                <ProfileCard
                    name="제인"
                    role="UI/UX 디자이너"
                    bio="사용자 경험을 고민하며 예쁜 화면을 그리는 것을 좋아합니다."
                    imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Jane"
                />

                {/* 5. 세 번째 카드: 알렉스 */}
                <ProfileCard
                    name="알렉스"
                    role="데이터 엔지니어"
                    bio="복잡한 데이터를 다루고 분석하는 파이프라인을 구축합니다."
                    imageUrl="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                />

            </div>
        </div>
    );
}
