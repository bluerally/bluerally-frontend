import { GetPartyListResponse } from '@/@types/party/type';
import { Chip } from 'bluerally-design-system';
import dayjs from 'dayjs';
import { Calendar, MapPin, UsersRound } from 'lucide-react';
import { useRouter } from 'next/router';
import { NoDataMessage } from '../common/NoDataMessage';

interface Props {
  data?: GetPartyListResponse;
  noDataMessage?: string;
  description?: string;
  icon?: React.ReactNode;
}

export const List = ({
  data,
  noDataMessage = '아직 게시물이 없어요',
  description = '좋은 모임이 곧 준비될거에요',
  icon,
}: Props) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {data?.length ? (
        <div className="w-full bg-g-100">
          {data.map(
            (
              {
                id,
                title,
                sport_name,
                posted_date,
                participants_info,
                gather_date,
                body,
                address,
                is_active,
              },
              index,
            ) => (
              <div
                key={index}
                className="p-4 mx-5 mt-3 mb-4 hover:cursor-pointer bg-g-0 rounded-2xl"
                onClick={() => router.push(`/detail/${id}`)}
              >
                <div className="flex gap-1">
                  <Chip variant="gray-filled" size="sm">
                    {sport_name}
                  </Chip>
                  {!is_active && (
                    <Chip variant="red-outline" size="sm">
                      마감
                    </Chip>
                  )}
                </div>
                <h1 className="pt-2 text-xl font-semibold md-2 text-g-900">
                  {title}
                </h1>
                <div className="text-md text-g-500">{body}</div>

                <div className="flex justify-between">
                  <div className="flex w-full pt-4 text-basic-2 text-g-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {dayjs(gather_date).format('YY.MM.DD')}
                      <div className="w-0.5 h-0.5 bg-g-100 mx-1.5" />
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <UsersRound size={14} />
                      {participants_info}
                      <div className="w-0.5 h-0.5 bg-g-100 mx-1.5" />
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span className="max-w-[200px] truncate">{address}</span>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      ) : (
        <NoDataMessage
          message={noDataMessage}
          description={description}
          icon={icon}
        />
      )}
    </div>
  );
};
