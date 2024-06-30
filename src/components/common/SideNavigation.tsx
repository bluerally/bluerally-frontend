import { useNavigate } from '@/hooks/useNavigate';
import { useEffect, useState } from 'react';
import { ProfileLabel } from './ProfileLabel';
import { useGetUserMe } from '@/hooks/api/user';
import { Dialog } from './Dialog';
import { Header } from '../layouts/Header';
import { X } from 'lucide-react';
import { Button, TextArea } from 'bluerally-design-system';
import { usePostFeedback } from '@/hooks/api/feedback';

export interface Props {
  open: boolean;
  onClose: () => void;
}

export const SideNavigation = ({ open, onClose }: Props) => {
  const { pushToRoute } = useNavigate();
  const { data } = useGetUserMe();
  const { mutate: addFeedback } = usePostFeedback();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);
  const [feedbackValue, setFeedbackValue] = useState('');

  const user = data?.data;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [open]);

  useEffect(() => {
    if (!feedbackDialogOpen) {
      setFeedbackValue('');
    }
  }, [feedbackDialogOpen]);

  const currentUser = {
    user_id: Number(user?.id),
    profile_picture: String(user?.profile_image),
    name: String(user?.name),
  };

  const handleAddFeedback = () => {
    addFeedback({ content: feedbackValue });
    setFeedbackDialogOpen(false);
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transform ${
          open ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300`}
      >
        <div className="flex flex-col">
          <div className="px-4 py-[16.5px]  border-b border-g-100 hover:bg-gray-100">
            <ProfileLabel profile={currentUser} />
          </div>
          <div
            onClick={() => pushToRoute(`/profile`)}
            className="px-4 py-[16.5px] border-b border-g-100 hover:bg-gray-100 cursor-pointer"
          >
            마이페이지
          </div>
          <div
            onClick={() => pushToRoute(`/like`)}
            className="px-4 py-[16.5px] border-b border-g-100 hover:bg-gray-100 cursor-pointer"
          >
            관심 목록
          </div>
          <div
            onClick={() => setFeedbackDialogOpen(true)}
            className="px-4 py-[16.5px] border-b border-g-100 hover:bg-gray-100 cursor-pointer"
          >
            피드백하기
          </div>
          <div
            onClick={() => pushToRoute(`/logout`)}
            className="px-4 py-[16.5px] hover:bg-gray-100 cursor-pointer"
          >
            로그아웃
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
