import { Header } from '@/components/layouts/Header';
import { Chip } from 'bluerally-design-system';
import { Calendar, ChevronLeft, Heart, MapPin, UsersRound } from 'lucide-react';
import { useRouter } from 'next/router';
import { NoDataMessage } from '../common/NoDataMessage';
import { useGetLikeList, useDeleteLike } from '@/hooks/api/like';
import { elapsedTime } from '@/utils';
import { useNavigate } from '@/hooks/useNavigate';

export const Like = () => {
  const router = useRouter();
  const { data } = useGetLikeList();
  const { mutate: cancelLike } = useDeleteLike();
  const { pushToRoute } = useNavigate();

  const likeList = data?.data;

  return (
    <>
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        center={<>찜한 목록</>}
      />
      <div className="flex flex-col items-center justify-center">
        {likeList?.length ? (
          <div className="w-full bg-g-0">
            {likeList.map(
              ({
                id,
                title,
                sport_name,
                body,
                gather_date,
                participants_info,
                posted_date,
              }) => {
                return (
                  <div
                    key={id}
                    className="p-5 border-b border-g-100 hover:bg-b-20 hover:cursor-pointer"
                  >
                    <div onClick={() => pushToRoute(`/detail/${id}`)}>
                      <Chip variant="filled">{sport_name}</Chip>
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

                    <div
                      onClick={() => cancelLike(id)}
                      className="flex items-center justify-end pt-5"
                    >
                      <Heart
                        size={24}
                        className="cursor-pointer fill-current text-b-500"
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>
        ) : (
          <NoDataMessage message="찜한 목록이 없어요" />
        )}
      </div>
    </>
  );
};
