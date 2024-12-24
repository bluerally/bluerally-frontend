import { Address, getAddress } from '@/hooks/api/address';
import { TextInput } from 'buooy-design-system';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Header } from '../layouts/Header';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
};

const SearchAddressModal = ({ isOpen, onClose, onSelectAddress }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [addressList, setAddressList] = useState<Address[]>([]);

  const handleSearch = async () => {
    const data = await getAddress(searchValue);

    setAddressList(data ?? []);
  };

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } fixed inset-0 min-w-96 mx-auto z-50 bg-white w-full max-w-[600px]`}
    >
      <div className="fixed inset-0 max-w-[600px]  mx-auto z-50 bg-g-0">
        <Header right={<X onClick={onClose} />} />

        <div className="p-2">
          <TextInput
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onReset={() => setSearchValue('')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            placeholder="주소를 검색해주세요"
          />

          {addressList.map((address) => {
            return (
              <div
                key={address.x}
                className="p-2 border-b cursor-pointer border-g-100"
                onClick={() => onSelectAddress(address.address_name)}
              >
                <div className="text-g-500">{address.address_name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchAddressModal;
