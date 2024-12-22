import { Button } from 'buooy-design-system';
import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();

  return (
    <main className="grid min-h-full px-6 py-24 place-items-center sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="font-semibold text-7xl text-g-900">404</p>
        <h1 className="mt-2 tracking-tight text-g-500 text-md">
          해당 페이지가 존재하지 않습니다
        </h1>
        <div className="mt-6">
          <Button onClick={() => router.replace('/')}>홈으로 이동하기</Button>
        </div>
      </div>
    </main>
  );
};

export default Custom404;
