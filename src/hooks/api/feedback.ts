import { PostFeedbackRequestBody } from '@/@types/feedback/type';
import requester from '@/utils/requester';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNotification } from 'bluerally-design-system';

const TOKEN = process.env.NEXT_PUBLIC_USER_TOKEN;

const headers = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
};

const FeedbackApi = {
  post: ({ content }: PostFeedbackRequestBody) => {
    return requester.post(`/feedback`, { content }, headers);
  },
};

const usePostFeedback = () => {
  const notification = useNotification();

  return useMutation(
    (data: PostFeedbackRequestBody) => FeedbackApi.post(data),
    {
      onSuccess: () => {
        window.alert('피드백이 등록되었습니다.');
      },
      //   onSuccess: () => {
      //     notification.alert({
      //       type: 'alert',
      //       title: '피드백 등록',
      //       content: '피드백이 등록되었습니다.',
      //     });
      //   },
      onError: (error: AxiosError<any>) =>
        window.alert(`${error.code} 피드백 작성 실패`),
    },
  );
};

export { FeedbackApi, usePostFeedback };
