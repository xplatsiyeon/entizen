import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import mapPin from 'public/images/blueMapPin.png';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

function useMap() {
  const mapRef = useRef<HTMLElement | null | any>(null);
  // const [myLocation, setMyLocation] = useState<
  //   { latitude: number; longitude: number } | string
  // >({ latitude: 37.4862618, longitude: 127.1222903 });
  const { lnglatList } = useSelector((state: RootState) => state.lnglatList);
  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );
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
    if (typeof lnglatList !== 'string') {
      let currentPosition = [lnglatList.lat, lnglatList.lng];

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
          size: new naver.maps.Size(20, 20),
          anchor: new naver.maps.Point(20, 40),
        },
      });
    }
  }, [lnglatList, locationList]);

  return {
    lnglatList,
  };
}

export default useMap;
