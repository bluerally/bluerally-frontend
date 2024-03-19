import { GetPartyListResponse } from '@/@types/party/type';
import { useNavigate } from '@/hooks/useNavigate';
import Image from 'next/image';

interface Props {
  data?: GetPartyListResponse;
}

export const List = ({ data }: Props) => {
  const { pushToRoute } = useNavigate();

  return (
    <>
      {data?.map(
        (
          {
            id,
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
            <div
              key={index}
              className="border border-sky-600 hover:backdrop-brightness-95 hover:cursor-pointer"
              onClick={() => pushToRoute(`/detail/${id}`)}
            >
              <div>{title}</div>
              <div>{sport_name}</div>

              <div>{price}</div>
              <div>{posted_date}</div>
              <div>{participants_info}</div>

              <div>{String(is_user_organizer)}</div>
              <div>{organizer_profile.name}</div>
              <div>
                <Image
                  src={
                    organizer_profile.profile_picture ??
                    `/static/images/profile.png`
                  }
                  alt="profile"
                  width={50}
                  height={50}
                />
              </div>
              <div>만남일자: {gather_date}</div>
              <div>{gather_time}</div>

              <div>{due_date}</div>
              <div>{body}</div>
            </div>
          );
        },
      )}
    </>
  );
};
