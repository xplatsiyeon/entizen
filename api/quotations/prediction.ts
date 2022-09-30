import axios from 'axios';
import { LocationListTypes } from 'store/locationSlice';
import { Data, quotationAction } from 'store/quotationSlice';
import { RootState } from 'store/store';

const PREDICTION_POST = `https://test-api.entizen.kr/api/quotations/prediction`;

export const predictionApi = async (
  quotationData: Data,
  locationList: LocationListTypes,
  dispatch: any,
) => {
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
    }).then((res) => {
      dispatch(quotationAction.setRequestData(res.data));
      // return res;
    });
  } catch (error) {
    console.log('post 요청 실패');
    console.log(error);
  }
};
