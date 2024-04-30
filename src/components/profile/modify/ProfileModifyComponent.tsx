import { PostUserMeRequestBody } from '@/@types/user/type';
import { Avatar } from '@/components/common/Avatar';
import { FormTextArea } from '@/components/form/FormTextArea';
import { FormTextInput } from '@/components/form/FormTextInput';
import { FormButtonGroup } from '@/components/form/FormButtonGroup';
import { useGetUserMe, usePostUserMe } from '@/hooks/api/user';
import { Button, Label } from 'bluerally-design-system';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { useGetSports } from '@/hooks/api/common';

export const ProfileModifyComponent = () => {
  const { data } = useGetUserMe();
  const { data: sportsData } = useGetSports();
  const { mutate: modifyProfile } = usePostUserMe();

  const user = data?.data;

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostUserMeRequestBody>({
    mode: 'onSubmit',
    defaultValues: {
      name: user?.name,
      introduction: user?.introduction,
      interested_sports_ids: user?.interested_sports as
        | (string & Partial<unknown>)
        | undefined,
      profile_image: user?.profile_image,
    },
  });

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
      <div className="flex justify-center">
        <Avatar size="lg" image={user?.profile_image} />
      </div>
      <form
        onSubmit={handleSubmit(updateData, handleError)}
        className="p-5 bg-g-0"
      >
        <Button>완료</Button>
        <div className="pb-8">
          <Label>스포츠관심사</Label>
          <FormButtonGroup
            control={control}
            name="interested_sports"
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
      </form>
    </>
  );
};
