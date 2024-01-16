import { useRouter } from 'next/router';
import { useGetPartyDetails } from '@/hooks/api/party';

export const Detail = () => {
  const router = useRouter();
  const { partyId } = router.query;
  const { data } = useGetPartyDetails(Number(partyId ?? 1));

  const partyDetailData = data?.data;

  return (
    <>
      {/* 컴포넌트로 빼기 */}
      <div>
        <span>{partyDetailData?.sport_name}</span>
        <span>{partyDetailData?.title}</span>
      </div>
      <p>
        날짜:
        {partyDetailData?.gather_date}
      </p>
      <p>
        장소:
        {partyDetailData?.sport_name}
      </p>
      <p>
        인원:
        {partyDetailData?.participants_info}
      </p>
      <p>
        마감:
        {partyDetailData?.due_date}
      </p>
      <p>
        금액:
        {partyDetailData?.price}
      </p>
      <hr />
      <p>{partyDetailData?.body}</p>

      <hr />

      {/* 컴포넌트로 빼기 */}
      {/* 작성자 */}
      <div>{partyDetailData?.organizer_profile?.name}</div>

      {/* 댓글 */}

      {/* 신청자 */}
      {partyDetailData?.pending_participants?.map((participant) => (
        <div key={participant?.user_id}>{participant?.name}</div>
      ))}

      {/* 파티원 */}
      {partyDetailData?.approved_participants?.map((participant) => (
        <div key={participant?.user_id}>{participant?.name}</div>
      ))}
    </>
  );
};
