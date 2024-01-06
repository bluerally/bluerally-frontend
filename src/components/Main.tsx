import { useRouter } from 'next/router';

const Main = () => {
  const router = useRouter();

  const goToDetail = (partyId: number) => {
    router.push({
      pathname: `/detail/${partyId}`,
    });
  };

  return (
    <>
      <button onClick={() => goToDetail(1)}>go to detail</button>
    </>
  );
};

export default Main;
