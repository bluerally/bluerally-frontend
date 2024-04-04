import { GetPartyListResponse } from '@/@types/party/type';
import { useNavigate } from '@/hooks/useNavigate';
import { elapsedTime } from '@/utils';
import { Chip } from 'bluerally-design-system';
import { Calendar, MapPin, UsersRound } from 'lucide-react';

interface Props {
  data?: GetPartyListResponse;
}

export const List = ({ data }: Props) => {
  const { pushToRoute } = useNavigate();

  return (
    <div className="mt-2 bg-g-0">
      {data?.map(
        (
          {
            id,
            title,
            sport_name,
            posted_date,
            participants_info,
            gather_date,
            due_date,
            body,
          },
          index,
        ) => {
          return (
            <div
              key={index}
              className="p-5 border-b border-g-100 hover:bg-b-20 hover:cursor-pointer"
              onClick={() => pushToRoute(`/detail/${id}`)}
            >
              <Chip variant="outlined">{sport_name}</Chip>
              <h1 className="pt-2 text-lg font-semibold text-g-700">{title}</h1>
              <div className="text-md text-g-500">{body}</div>

              <div className="flex justify-between">
                <div className="flex w-full pt-2 text-xs text-g-500">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {gather_date}
                    <div className="w-px h-2 bg-g-100 mx-1.5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    장소
                    <div className="w-px h-2 bg-g-100 mx-1.5" />
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <UsersRound size={14} />
                    {participants_info}
                  </div>
                  <div className="my-0 ml-auto mr-0">
                    {elapsedTime(new Date(posted_date).getTime())}
                  </div>
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};
