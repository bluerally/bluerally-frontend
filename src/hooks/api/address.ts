import axios from 'axios';

export type Address = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type AddressResponse = {
  documents: Address[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    same_name: {
      keyword: string;
      region: string[];
      selected_region: string;
    };
    total_count: number;
  };
};

export const getAddress = async (address: string) => {
  try {
    const { data } = await axios.get<AddressResponse>(
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${address}`,
      {
        headers: {
          Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_ADDRESS_KEY}`,
        },
      },
    );

    return data.documents;
  } catch (error) {}
};
