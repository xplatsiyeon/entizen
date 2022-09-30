import axios from 'axios';
import { useDispatch } from 'react-redux';

import { useSelector } from 'react-redux';
import { LocationListTypes } from 'store/locationSlice';
import { Data, quotationAction } from 'store/quotationSlice';
import { RootState } from 'store/store';

const PREDICTION_POST = `https://test-api.entizen.kr/api/quotations/prediction`;

export const predictionApi = async () =>
  // quotationData: Data,
  // locationList: LocationListTypes,
  {
    const { quotationData, locationList } = useSelector(
      (state: RootState) => state,
    );

    const dispatch = useDispatch();

    try {
      await axios({
        method: 'post',
        url: PREDICTION_POST,
        data: {
          chargers: quotationData.chargers,
          subscribeProduct: quotationData.subscribeProduct,
          investRate: quotationData.investRate,
          subscribePeriod: quotationData.subscribePeriod,
          installationAddress: locationList.locationList.roadAddrPart,
          installationLocation: quotationData.installationLocation,
        },
        headers: {
          ContentType: 'application/json',
        },
        withCredentials: true,
      }).then((res) => dispatch(quotationAction.setRequestData(res.data)));
    } catch (error) {
      console.log('post 요청 실패');
      console.log(error);
    }
  };
