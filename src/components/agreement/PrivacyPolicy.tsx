import { Header } from '@/components/layouts/Header';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <>
      <Header
        left={
          <ChevronLeft
            size={24}
            onClick={() => router.push('/')}
            strokeWidth={1.5}
          />
        }
        center={<>개인정보처리방침 (전문)</>}
      />
      <pre className="max-w-full p-5 overflow-x-auto break-words whitespace-pre-wrap">
        {`부이팀은 부이 ("www.buooy.kr"이하 "서비스")를 이용하는 정보주체의 개인정보 및 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 안전하게 관리하고 있습니다.
정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.

1. 개인정보의 처리 목적 및 수집 항목
정보주체는 회원가입을 하지 않아도 모임 검색을 이용할 수 있습니다.
모임 서비스의 관심, 흥미, 기호 등을 분석한 추천 서비스를 이용하기 위해 회원 가입을 할 경우, 부이팀은 서비스 제공을 위해 필요한 최소한의 개인정보를 수집합니다.
부이팀은 다음과 같이 개인정보를 수집∙이용하고 있습니다.
개인정보가 필요한 시점에 최소한의 정보만을 수집하며, 법적 근거와 사전 동의를 받은 범위 내에서만 이용합니다.`}
      </pre>
    </>
  );
};
