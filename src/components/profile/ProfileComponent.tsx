import { Profile } from '../common/Profile';
import { useRouter } from 'next/router';

interface Props {}

export const ProfileComponent = ({}: Props) => {
  const router = useRouter();

  const { userId: id } = router.query;

  const userId = Number(id);

  return <Profile userId={userId} />;
};
