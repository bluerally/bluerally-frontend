import { useEffect, useState } from 'react';
import { GetUserMeResponse, PostUserMeRequestBody } from '@/@types/user/type';
import { Avatar } from '@/components/common/Avatar';
import { FormTextArea } from '@/components/form/FormTextArea';
import { FormTextInput } from '@/components/form/FormTextInput';
import { FormButtonGroup } from '@/components/form/FormButtonGroup';
import { useGetUserMe, usePostUserMe } from '@/hooks/api/user';
import { Button, Label } from 'bluerally-design-system';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useGetSports } from '@/hooks/api/common';
import { Header } from '@/components/layouts/Header';
import { X } from 'lucide-react';
import { useNavigate } from '@/hooks/useNavigate';

export const ProfileModifyComponent = () => {
  const { pushToRoute } = useNavigate();
  const { data: sportsData } = useGetSports();
  const { mutate: modifyProfile } = usePostUserMe();
  const { data } = useGetUserMe();

  const user = data?.data;

  const [defaultValues, setDefaultValues] = useState({
    name: '',
    introduction: '',
    interested_sports_ids: undefined as (string & Partial<unknown>) | undefined,
    profile_image: '',
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostUserMeRequestBody>({
    mode: 'onSubmit',
    defaultValues,
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        introduction: user.introduction,
        interested_sports_ids: defaultValues.interested_sports_ids,
        profile_image: user.profile_image,
      });
    }
  }, [user, reset, defaultValues]);

  const updateData: SubmitHandler<PostUserMeRequestBody> = ({
    name,
    introduction,
    interested_sports_ids,
    profile_image,
  }) => {
    const modifyData = {
      name,
      introduction,
      interested_sports_ids,
      profile_image,
    };

    modifyProfile(modifyData);
  };

  const handleError: SubmitErrorHandler<PostUserMeRequestBody> = (error) => {
    console.log(error);
  };

  return (
    <>
      <form onSubmit={handleSubmit(updateData, handleError)}>
        <Header
          left={<X onClick={() => pushToRoute(`/profile`)} />}
          center={<>프로필 수정</>}
          right={
            <Button type="submit" size="sm">
              게시
            </Button>
          }
        />
        <div className="p-5 bg-g-0">
          <div className="flex justify-center">
            <Avatar size="lg" image={user?.profile_image} />
          </div>
          <div className="pb-8">
            <Label>스포츠관심사</Label>
            <FormButtonGroup
              isMultiple
              control={control}
              name="interested_sports_ids"
              options={sportsData?.data ?? []}
            />
          </div>
          <div className="pb-8">
            <Label>닉네임</Label>
            <div className="pt-1.5">
              <FormTextInput
                control={control}
                name="name"
                status={errors.name ? 'error' : 'default'}
                statusMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className="pb-8">
            <Label>자기소개</Label>
            <div className="pt-1.5">
              <FormTextArea control={control} name="introduction" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
