import { GetPartyDetailResponse } from '@/@types/party/type';
import { Profile } from '../common/Profile';

interface Props {
  partyList: GetPartyDetailResponse['pending_participants'];
}

export const PartyMember = ({ partyList }: Props) => {
  return (
    <>
      {partyList?.map((party) => {
        return <Profile key={party?.user_id} userId={party?.user_id} />;
      })}
    </>
  );
};
