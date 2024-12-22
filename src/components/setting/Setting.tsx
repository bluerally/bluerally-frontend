import { Header } from '@/components/layouts/Header';
import { usePostFeedback } from '@/hooks/api/feedback';
import { useAuth } from '@/hooks/useAuth';
import { Button, TextArea, theme, useNotification } from 'buooy-design-system';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Dialog } from '../common/Dialog';

export const Setting = () => {
  const router = useRouter();
  const { mutate: addFeedback } = usePostFeedback();
  const { logout } = useAuth();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState('');
  const notification = useNotification();

  useEffect(() => {
    if (!feedbackDialogOpen) {
      setFeedbackValue('');
    }
  }, [feedbackDialogOpen]);

  const handleAddFeedback = () => {
    addFeedback({ content: feedbackValue });
    setFeedbackDialogOpen(false);
  };

  const handleClickLogout = () => {
    logout();
    router.push('/');
  };

  const handleClickWithdrawal = () => {
    notification.alert({
      type: 'alert',
      title: '탈퇴하시겠어요?',
      content: '탈퇴의 경우 피드백하기를 통해 문의부탁드립니다.',
      onConfirm: () => {},
    });
  };

  return (
    <>
      <Header
        left={<ChevronLeft size={24} onClick={() => router.back()} />}
        center={<>설정</>}
      />
      <div className="flex flex-col gap-10 p-5">
        <div className="flex flex-col gap-4">
          <span className="text-g-400 text-basic">문의</span>
          <div
            className="flex justify-between cursor-pointer"
            onClick={() => setFeedbackDialogOpen(true)}
          >
            <span className="text-g-900 text-md-2">피드백하기</span>
            <ChevronRight size={16} color={theme.palette.gray['400']} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-g-400 text-basic">기타</span>
          <div
            className="flex justify-between cursor-pointer"
            onClick={handleClickLogout}
          >
            <span className="text-g-900 text-md-2">로그아웃</span>
            <ChevronRight size={16} color={theme.palette.gray['400']} />
          </div>
          <div
            className="flex justify-between cursor-pointer"
            onClick={handleClickWithdrawal}
          >
            <span className="text-g-900 text-md-2">탈퇴</span>
            <ChevronRight size={16} color={theme.palette.gray['400']} />
          </div>
        </div>
      </div>
      {feedbackDialogOpen && (
        <Dialog
          open={feedbackDialogOpen}
          header={
            <Header
              center={<>피드백하기</>}
              right={<X onClick={() => setFeedbackDialogOpen(false)} />}
            />
          }
        >
          <TextArea
            placeholder="내용을 작성해주세요"
            onChange={(e) => setFeedbackValue(e.target.value)}
            value={feedbackValue}
          />
          <div className="pt-5">
            <Button width="100%" onClick={handleAddFeedback}>
              작성완료
            </Button>
          </div>
        </Dialog>
      )}
    </>
  );
};
