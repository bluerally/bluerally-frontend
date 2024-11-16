import { useEffect } from 'react';

type Props = {
  address: string;
};

declare global {
  interface Window {
    kakao?: any;
  }
}

export const Map = ({ address }: Props) => {
  useEffect(() => {
    const mapScript = document.createElement('script');
    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&libraries=services&autoload=false`;
    document.head.appendChild(mapScript);

    mapScript.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
          draggable: false,
        };

        const map = new window.kakao.maps.Map(container, options);

        if (!address) {
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          address,
          (result: { x: number; y: number }[], status: number) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(
                result[0].y,
                result[0].x,
              );

              map.setCenter(coords);

              const marker = new window.kakao.maps.Marker({
                position: coords,
              });
              marker.setMap(map);
            } else {
              console.error('주소 검색 실패:', status);
            }
          },
        );
      });
    };
  }, [address]);

  if (!address) {
    return null;
  }

  return <div id="map" className="w-full h-40 rounded-lg" />;
};
