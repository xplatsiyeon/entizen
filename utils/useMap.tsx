import { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

function useMap() {
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
  }, [lnglatList, locationList]);

  return {
    lnglatList,
  };
}

export default useMap;
