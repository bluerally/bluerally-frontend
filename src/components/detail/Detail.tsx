import { getParty } from '@/apis/getParty';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export const Detail = () => {
  const router = useRouter();
  const { partyId } = router.query;
  const [partyDetail, setPartyDetail] = useState({});
  console.log('detailPage', { partyId });

  useEffect(() => {
    getPartyDetail();
  }, []);

  const getPartyDetail = async () => {
    try {
      const { data } = await getParty(Number(partyId ?? 1));

      console.log(data);
      setPartyDetail(data);
    } catch {
      // console.log('error');
    }
  };

  return (
    <>
      {/* 컴포넌트로 빼기 */}
      <div>
        <span>{partyDetail.sport_name}</span>
        <span>{partyDetail.title}</span>
      </div>
      <p>
        날짜:
        {partyDetail.gather_date}
      </p>
      <p>
        장소:
        {partyDetail.sport_name}
      </p>
      <p>
        인원:
        {partyDetail.participants_info}
      </p>
      <p>
        마감:
        {partyDetail.due_date}
      </p>
      <p>
        금액:
        {partyDetail.price}
      </p>
      <hr />
      <p>{partyDetail.body}</p>

      <hr />

      {/* 컴포넌트로 빼기 */}
      {/* 작성자 */}
      <div>{partyDetail.organizer_profile?.name}</div>

      {/* 댓글 */}

      {/* 신청자 */}
      {partyDetail.pending_participants?.map(({ name }) => (
        <>{name}</>
      ))}

      {/* 파티원 */}
      {partyDetail.approved_participants?.map(({ name }) => (
        <>{name}</>
      ))}
    </>
  );
};
