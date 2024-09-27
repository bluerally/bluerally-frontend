import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useGetUserMe,
  usePostUserMe,
  useUploadProfileImage,
} from '@/hooks/api/user';
import {
  Button,
  ButtonGroup,
  ButtonValue,
  Label,
  TextArea,
  TextInput,
  useNotification,
} from 'bluerally-design-system';
import { useGetSports } from '@/hooks/api/common';
import { Header } from '@/components/layouts/Header';
import { X, Camera } from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigate';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';

export const ProfileModifyComponent = () => {
  const { pushToRoute } = useNavigate();

  const { data: sportsData } = useGetSports();
  const { mutate: modifyProfile } = usePostUserMe();
  const { mutate: uploadProfileImage } = useUploadProfileImage();
  const { isLoggedIn } = useAuth();
  const { data } = useGetUserMe(isLoggedIn);

  const user = data?.data;
  const sports = sportsData?.data;

  const [params, setParams] = useState({
    name: '',
    introduction: '',
    interested_sports_ids: [] as number[],
  });

  const [profileImage, setProfileImage] = useState('');
  const [newProfileImageFile, setNewProfileImageFile] = useState<File | null>(
    null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const notification = useNotification();

  useEffect(() => {
    if (!user) {
      return;
    }
    setParams({
      name: user.name,
      introduction: user.introduction,
      interested_sports_ids: user.interested_sports
        .map((sport) => sport?.id)
        .filter((id): id is number => id !== undefined),
    });

    setProfileImage(user.profile_image);
  }, [user]);

  const updateData = () => {
    if (!params.name.trim()) {
      notification.alert({
        type: 'error',
        title: '닉네임 오류',
        content: '닉네임을 입력하세요.',
      });
      return;
    }

    if (newProfileImageFile) {
      const imageData = {
        profile_image: newProfileImageFile,
      };

      uploadProfileImage(imageData, {
        onSuccess: () => {
          modifyProfile(params);
        },
        onError: () => {
          notification.alert({
            type: 'error',
            title: '이미지 업로드 실패',
            content: '프로필 이미지 업로드에 실패했습니다.',
          });
        },
      });
    } else {
      modifyProfile(params);
    }
  };

  const handleSports = (selectedValues: number[]) => {
    setParams((prevParams) => ({
      ...prevParams,
      interested_sports_ids: selectedValues,
    }));
  };

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prevParams) => ({
      ...prevParams,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setParams((prevParams) => ({
      ...prevParams,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const elem = event.target as HTMLInputElement;

      if (!elem.files) {
        console.warn('files not found');
        return;
      }

      const file = elem.files[0];
      const fileUrl = URL.createObjectURL(file);

      setProfileImage(fileUrl); // 미리보기 이미지 업데이트
      setNewProfileImageFile(file); // 새 이미지 파일 저장
    },
    [],
  );

  return (
    <>
      <Header
        left={<X onClick={() => pushToRoute(`/profile`)} />}
        center={<>프로필 수정</>}
        right={
          <Button onClick={updateData} size="sm">
            게시
          </Button>
        }
      />
      <div className="p-5 bg-g-0">
        <div className="flex items-center justify-center">
          <div className="relative">
            <input
              type="file"
              name="attachments"
              aria-label="image uploader"
              accept="image/*"
              onChange={handleChangeFile}
              ref={fileInputRef}
              className="hidden"
            />
            <Image
              src={profileImage}
              alt="profile-image"
              width={100}
              height={100}
              objectFit="cover"
              className="w-[100px] h-[100px] border-2 rounded-full border-g-300"
            />

            <div
              className="absolute inset-0 flex items-center justify-center bg-gray-700 rounded-full cursor-pointer bg-opacity-30"
              onClick={handleUploadClick}
            >
              <Camera className="text-2xl text-white" size={40} />
            </div>
          </div>
        </div>

        <div className="pb-8">
          <Label>스포츠관심사</Label>
          <ButtonGroup
            options={
              sports?.map(({ name, id }) => ({
                title: name,
                value: id,
              })) ?? []
            }
            values={params.interested_sports_ids}
            onChange={(selectedValues) => {
              if (!Array.isArray(selectedValues)) {
                return;
              }
              handleSports(selectedValues.map((value) => Number(value)));
            }}
            gap={6}
            isMultiple
          />
        </div>
        <div className="pb-8">
          <Label>닉네임</Label>
          <div className="pt-1.5">
            <TextInput
              name="name"
              value={params.name}
              onChange={handleTextInput}
            />
          </div>
        </div>
        <div className="pb-8">
          <Label>자기소개</Label>
          <div className="pt-1.5">
            <TextArea
              name="introduction"
              value={params.introduction}
              onChange={handleTextArea}
            />
          </div>
        </div>
      </div>
    </>
  );
};
