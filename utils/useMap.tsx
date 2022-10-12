import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

function useMap() {
  let mapRef = useRef<any>(null);
  const { lnglatList } = useSelector((state: RootState) => state.lnglatList);
  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );

  // 마커
  const contentString = [
    '<div>',
    '   <img src="/images/blueMapPin.png" />',
    '</div>',
  ].join('');

  useEffect(() => {
    if (typeof lnglatList !== 'string') {
      let currentPosition = [lnglatList.lat, lnglatList.lng];
      let map;
      // Naver Map 생성
      if (naver.maps) {
        mapRef.current = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          zoomControl: false,
        });
        map = mapRef.current;
        new naver.maps.Marker({
          position: new naver.maps.LatLng(
            currentPosition[0],
            currentPosition[1],
          ),
          map: map,
          icon: {
            content: contentString,
            size: new naver.maps.Size(20, 20),
            anchor: new naver.maps.Point(20, 40),
          },
        });
      }
    }
    console.log('mapRef 로그 확인');
    console.log(mapRef);
    console.log('useMap useEffect 입니다.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lnglatList, locationList]);

  return {
    lnglatList,
  };
}

export default useMap;
