import { GetPartyListResponse } from '@/@types/party/type';
import { useRouter } from 'next/router';

interface Props {
  data?: GetPartyListResponse;
}

export const List = ({ data }: Props) => {
  const router = useRouter();

  const goToDetail = (partyId: number) => {
    router.push({
      pathname: `/detail/${partyId}`,
    });
  };

  console.log('data', data);

  return (
    <>
      {data?.map(
        (
          {
            title,
            sport_name,
            price,
            posted_date,
            participants_info,
            is_user_organizer,
            organizer_profile,
            gather_date,
            gather_time,
            due_date,
            body,
          },
          index,
        ) => {
          return (
            <div key={index}>
              <div>{title}</div>
              <div>{sport_name}</div>

              <div>{price}</div>
              <div>{posted_date}</div>
              <div>{participants_info}</div>

              <div>{String(is_user_organizer)}</div>
              <div>{organizer_profile.name}</div>
              <div>{organizer_profile.profile_picture}</div>

              <div>만남일자: {gather_date}</div>
              <div>{gather_time}</div>

              <div>{due_date}</div>
              <div>{body}</div>
              <button onClick={() => goToDetail(1)}>go to detail</button>
            </div>
          );
        },
      )}
    </>
  );
};
