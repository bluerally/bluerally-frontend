import { GetPartyListResponse } from '@/@types/party/type';
import { useNavigate } from '@/hooks/useNavigate';
import { elapsedTime } from '@/utils';
import { Chip } from 'bluerally-design-system';
import { Calendar, MapPin, UsersRound } from 'lucide-react';
import { NoDataMessage } from '../common/NoDataMessage';

interface Props {
  data?: GetPartyListResponse;
  noDataMessage?: string;
}

export const List = ({
  data,
  noDataMessage = '찾는 모임이 없어요.......',
}: Props) => {
  const { pushToRoute } = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {data?.length ? (
        <div className="w-full mt-4 bg-g-0">
          {data.map(
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
            ) => (
              <div
                key={index}
                className="p-5 border-b border-g-100 hover:cursor-pointer"
                onClick={() => pushToRoute(`/detail/${id}`)}
              >
                <Chip variant="gray-filled">{sport_name}</Chip>
                <h1 className="pt-2 font-semibold md-2 text-g-700 text-md-2">
                  {title}
                </h1>
                <div className="text-basic-2 text-g-500">{body}</div>

                <div className="flex justify-between">
                  <div className="flex w-full pt-2 text-basic text-g-500">
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
            ),
          )}
        </div>
      ) : (
        <NoDataMessage message={noDataMessage} />
      )}
    </div>
  );
};
