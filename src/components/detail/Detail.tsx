import { useRouter } from 'next/router';
import { useGetPartyDetails } from '@/hooks/api/party';
import { useGetPartyCommentList } from '@/hooks/api/comment';

export const Detail = () => {
  const router = useRouter();
  const { partyId } = router.query;
  const { data } = useGetPartyDetails(Number(partyId ?? 1));
  const { data: commentListData } = useGetPartyCommentList(Number(partyId));

  const partyDetailData = data?.data;
  const partyCommentList = commentListData?.data;

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

      {/* 신청자 */}
      <h3>신청자</h3>
      {partyDetailData?.pending_participants?.map((participant) => (
        <div key={participant?.user_id}>{participant?.name}</div>
      ))}
      {/* 파티원 */}
      <h3>파티원</h3>
      {partyDetailData?.approved_participants?.map((participant) => (
        <div key={participant?.user_id}>{participant?.name}</div>
      ))}

      <br />
      <br />
      {/* 댓글 */}
      <h3>코멘트</h3>
      {partyCommentList?.map(
        ({ id, commenter_profile, posted_date, content, is_writer }) => (
          <div key={id}>
            <span>댓글 쓴 사람: {commenter_profile.name}</span>
            <span>{posted_date}</span>
            <span>{content}</span>

            {is_writer && (
              <>
                <span>삭제</span>
                <span>수정</span>
              </>
            )}
          </div>
        ),
      )}
    </>
  );
};
