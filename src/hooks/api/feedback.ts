import { PostFeedbackRequestBody } from '@/@types/feedback/type';
import requester from '@/utils/requester';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNotification, useSnackbar } from 'buooy-design-system';

const FeedbackApi = {
  post: ({ content }: PostFeedbackRequestBody) => {
    return requester.post(`/feedback`, { content });
  },
};

const usePostFeedback = () => {
  const notification = useNotification();
  const snackbar = useSnackbar();

  return useMutation(
    (data: PostFeedbackRequestBody) => FeedbackApi.post(data),
    {
      onSuccess: () => {
        notification.alert({
          type: 'alert',
          title: '피드백 등록',
          content: '피드백이 등록되었습니다.',
        });
      },
      onError: (error: AxiosError<any>) =>
        snackbar.warning({ content: `${error.code} 피드백 작성 실패` }),
    },
  );
};

export { FeedbackApi, usePostFeedback };
