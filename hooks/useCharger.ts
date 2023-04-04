import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { speedAction } from 'store/speed';

type Props = {};

export interface SlowFast {
  year: string;
  chargeQuantity: number;
  sales: number;
}
export interface Location {
  jibunAddr: string | undefined;
  roadAddrPart: string | undefined;
  sggNm: string | undefined;
  siNm: string | undefined;
}

export default function useCharger() {
  const { fastCharger, slowCharger } = useSelector(
    (state: RootState) => state.speedData,
  );

  const dispatch = useDispatch();

  const callInfo = async (speed: 'SLOW' | 'FAST', location: Location) => {
    // console.log('실행');
    const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
    const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/charge`, {
      params: {
        siDo: location.siNm,
        siGunGu: location.sggNm ? location.sggNm : '',
        chargerSpeed: speed,
        address: location.roadAddrPart,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    });

    if (speed === 'SLOW') {
      dispatch(speedAction.addSlowSpeed(res.data.charge));
    }
    if (speed === 'FAST') {
      dispatch(speedAction.addFastSpeed(res.data.charge));
    }
  };

  return { slowCharger, fastCharger, callInfo };
}
