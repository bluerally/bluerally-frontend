import { Address, useAddress } from '@/hooks/api/address';
import { SearchInput } from 'buooy-design-system';
import { X } from 'lucide-react';
import { useState } from 'react';
import { Header } from '../layouts/Header';
import { Divider } from '../common/Divider';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: string) => void;
};

const SearchAddressModal = ({ isOpen, onClose, onSelectAddress }: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [addressList, setAddressList] = useState<Address[]>([]);

  const { mutateAsync: getAddress } = useAddress();

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

        <div className="px-5">
          <div className="h-[54px] bg-white">
            <SearchInput
              value={searchValue}
              placeholder="검색어를 입력해주세요"
              onChange={(e) => setSearchValue(e.target.value)}
              onClickReset={() => {
                setSearchValue('');
                setAddressList([]);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
            />
            <div className="pt-1">
              <Divider />
            </div>
          </div>

          <div
            className="pt-6 overflow-y-auto"
            style={{
              maxHeight: 'calc(100vh - 150px)',
            }}
          >
            {searchValue.trim() === '' || addressList.length === 0 ? (
              <>
                <span className="text-lg font-medium text-g-400">
                  입력 예시
                </span>
                <div className="flex flex-col gap-4 pt-6">
                  <div className="flex flex-col">
                    <span className="font-medium text-md text-g-400">
                      도로명 + 건물번호
                    </span>
                    <span className="font-semibold text-md-2 text-b-300">
                      남대문로 9길 40
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-md text-g-400">
                      지역명(동/리) + 번지
                    </span>
                    <span className="font-semibold text-md-2 text-b-300">
                      중구 다동 155
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-md text-g-400">
                      지역명(동/리)+ 건물명
                    </span>
                    <span className="font-semibold text-md-2 text-b-300">
                      분당 주공
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="">
                {addressList.map((address, index) => {
                  return (
                    <div
                      key={address.x}
                      className="flex flex-col gap-1 cursor-pointer"
                      onClick={() => onSelectAddress(address.address_name)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-md-2 text-g-900">
                          {address.place_name}
                        </span>
                        <span className="text-g-200">|</span>
                        <span className="text-basic-2 text-g-400 min-w-16">
                          {address.category_name.split(' > ').pop()}
                        </span>
                      </div>
                      <span className="text-basic-2 text-g-400">
                        [지번] {address.address_name}
                      </span>
                      {index !== addressList.length - 1 && (
                        <div className="py-4">
                          <Divider />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAddressModal;
