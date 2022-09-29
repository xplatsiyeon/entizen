import axios from 'axios';

import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const { quotationData, locationList } = useSelector(
  (state: RootState) => state,
);

const PREDICTION_POST = `https://test-api.entizen.kr/api/quotations/prediction`;

export const predictionApi = async () => {
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
        installationPoints: quotationData.installationPoints,
        installationPurpose: quotationData.installationPurpose,
      },
      headers: {
        ContentType: 'application/json',
      },
      withCredentials: true,
    }).then((res) => console.log(res));
  } catch (error) {
    console.log('post 요청 실패');
    console.log(error);
  }
};
