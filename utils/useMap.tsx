import { useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { coordinateAction } from 'store/lnglatSlice';

import { RootState } from 'store/store';

// interface MapRef {
//   current : object.
// }

const TAG = 'utills/useMap.tsx';
function useMap() {
  // let mapRef = useRef<any >(null);
  const dispatch = useDispatch();
  const { lnglatList, isMark } = useSelector(
    (state: RootState) => state.lnglatList,
  );
  const { locationList } = useSelector(
    (state: RootState) => state.locationList,
  );

  // 마커
  const contentString = [
    '<div>',
    '   <img src="/images/MapMarkerSvg.svg" />',
    '</div>',
  ].join('');

  useLayoutEffect(() => {
    if (typeof lnglatList !== 'string') {
      let currentPosition = [lnglatList.lat, lnglatList.lng];
      const mapDiv = document.getElementById('map');
      let map = null;
      if (mapDiv !== null) {
        map = new naver.maps.Map(mapDiv!, {
          center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
          zoomControl: false,
        });
        if (isMark === true) {
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
    }
    // console.log('mapRef 로그 확인');
    // console.log(mapRef);
    // console.log('useMap useEffect 입니다.');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lnglatList, locationList]);

  return {
    lnglatList,
  };
}

export default useMap;
