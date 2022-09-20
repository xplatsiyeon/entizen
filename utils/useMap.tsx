import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import mapPin from 'public/images/blueMapPin.png';
import MapPing from 'components/quotationRequest/MapPing';

function useMap() {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<any | null>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >('');
  // let HOME_PATH = window.HOME_PATH || '.';
  const markerHtml = (text: string) => {
    return (
      <div>
        <Image src={mapPin} alt="사진" />
      </div>
    );
  };

  const contentString = [
    '<div>',
    '   <img src="/images/blueMapPin.png" />',
    '</div>',
  ].join('');

  useEffect(() => {
    setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
  }, []);

  useEffect(() => {
    if (typeof myLocation !== 'string') {
      let currentPosition = [myLocation.latitude, myLocation.longitude];

      // Naver Map 생성
      let map = (mapRef.current = new naver.maps.Map('map', {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: false,
      }));
      new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        map: map,
        icon: {
          content: contentString,
          size: new naver.maps.Size(50, 52),
          anchor: new naver.maps.Point(50, 50),
        },
      });
    }
  }, [myLocation]);

  return {
    myLocation,
  };
}

export default useMap;
