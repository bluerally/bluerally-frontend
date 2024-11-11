import { Header } from '@/components/layouts/Header';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

export const Service = () => {
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
        center={<>이용약관</>}
      />
      <pre className="max-w-full p-5 overflow-x-auto break-words whitespace-pre-wrap">
        {`제1장 총칙

제1조(목적)
이 약관은 주식회사 부이(이하 “회사”)가 운영하는 사이버 몰에서 제공하는 인터넷 관련 서비스를 이용함에 있어 사이버 몰과 “이용자”의 권리․의무 및 책임사항을 규정함을 목적으로 합니다.

제2조(정의)
① “몰”이란 회사가 재화 또는 용역(이하 “재화 등”)을 “이용자”에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 사이버몰을 말합니다.
② “이용자”란 “몰”에 접속하여 이 약관에 따라 “회사”가 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ “회원”이라 함은 “몰”에 회원 가입을 한 자로서, 계속적으로 “몰”이 제공하는 서비스를 이용할 수 있는 자를 말합니다.
④ “비회원”이란 회원으로 가입하지 않고 “몰”이 제공하는 서비스를 이용하는 자를 말합니다.
⑤ “판매자”란 “회사”와 “인터넷 쇼핑몰 입점 계약”을 체결하고 “몰”에서 재화 등을 판매하는 자를 말합니다.`}
      </pre>
    </>
  );
};
