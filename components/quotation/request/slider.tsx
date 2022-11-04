import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface CalculateValue {
  maxSubscribePricePerMonth: number;
  maxTotalSubscribePrice: number;
  minSubscribePricePerMonth: number;
  minTotalSubscribePrice: number;
}

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  difaultValue?: number;
  subscribeNumber?: number;
  setCalculatedValue?: Dispatch<
    SetStateAction<{
      maxSubscribePricePerMonth: number;
      maxTotalSubscribePrice: number;
      minSubscribePricePerMonth: number;
      minTotalSubscribePrice: number;
    }>
  >;
  calculatedValue?: CalculateValue;
}
const TAG = '🔥 components/quotation/request/slider.tsx';
const SliderSizes = ({
  value,
  setValue,
  disabled,
  setDisabled,
  difaultValue,
  setCalculatedValue,
  calculatedValue,
  subscribeNumber,
}: Props) => {
  const { quotationData } = useSelector((state: RootState) => state);
  const {
    maxSubscribePricePerMonth,
    maxTotalSubscribePrice,
    minSubscribePricePerMonth,
    minTotalSubscribePrice,
    investRate,
  } = quotationData.requestData!;

  const setPriceByRate = (
    target: number,
    rate: number,
    standardRate: number,
  ) => {
    console.log(TAG + '🌈 ~line 27 rate value  ' + rate);
    console.log(TAG + '🌈 ~line 27 target value  ' + target);
    return Math.round((target * rate) / standardRate);
  };

  useEffect(() => {
    const ret = {
      maxSubscribePricePerMonth: setPriceByRate(
        maxSubscribePricePerMonth!,
        value,
        Number(investRate),
      ),
      maxTotalSubscribePrice: setPriceByRate(
        maxTotalSubscribePrice!,
        value,
        Number(investRate),
      ),
      minSubscribePricePerMonth: setPriceByRate(
        minSubscribePricePerMonth!,
        value,
        Number(investRate),
      ),
      minTotalSubscribePrice: setPriceByRate(
        minTotalSubscribePrice!,
        value,
        Number(investRate),
      ),
      investRate: value,
    };
    if (setCalculatedValue) {
      setCalculatedValue({
        maxSubscribePricePerMonth: ret.maxSubscribePricePerMonth!,
        maxTotalSubscribePrice: ret.maxTotalSubscribePrice!,
        minSubscribePricePerMonth: ret.minSubscribePricePerMonth!,
        minTotalSubscribePrice: ret.minTotalSubscribePrice!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 간편 견적 포스트
  // const predictionApi = async () => {
  //   const PREDICTION_POST = `https://test-api.entizen.kr/api/quotations/prediction`;
  //   try {
  //     await axios({
  //       method: 'post',
  //       url: PREDICTION_POST,
  //       data: {
  //         chargers: quotationData.chargers,
  //         subscribeProduct: quotationData.subscribeProduct,
  //         investRate: (value / 100).toString(),
  //         subscribePeriod: quotationData.subscribePeriod,
  //         installationAddress: locationList.locationList.roadAddrPart,
  //         installationLocation: quotationData.installationLocation,
  //       },
  //       headers: {
  //         ContentType: 'application/json',
  //       },
  //       withCredentials: true,
  //     }).then((res) => {
  //       dispatch(quotationAction.setRequestData(res.data));
  //       console.log('defalt', quotationAction.setRequestData(res.data));
  //       // dispatch(quotationAction.init());
  //       // router.push('/quotation/request/1-7');
  //     });
  //   } catch (error) {
  //     console.log('post 요청 실패');
  //     console.log(error);
  //   }
  // };

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (subscribeNumber !== -1 && value !== newValue) {
      setDisabled(false); //슬라이더 클릭하면 안내메세지 꺼짐.
      // if (difaultValue) {
      //   console.log('🌪 ~라인 158 api 호출');
      //   predictionApi();
      // }
      setValue(newValue as number);
    }
  };

  return (
    <SliderCustom width={'97%'} disabled={disabled} client={true.toString()}>
      {/* 안내 메시지 */}
      {subscribeNumber === 0 && disabled && (
        <BubbleMessage>바를 움직여 주세요</BubbleMessage>
      )}

      {/* 슬라이더 */}
      <Slider
        step={5} //슬라이더 증감량. => 5씩 증감
        value={value}
        onChange={handleChange}
        defaultValue={difaultValue ? difaultValue : 50}
        // valueLabelDisplay="auto"
      />
      {/* 하단 뱃지 */}
      <PersentBadge
        disabled={disabled}
        client={true.toString()}
        persent={value / 2}
      >
        {`${value}%`}
      </PersentBadge>
      <PersentBadge
        disabled={disabled}
        client={false.toString()}
        persent={value + (100 - value) / 2}
      >
        {`${100 - value}%`}
      </PersentBadge>
    </SliderCustom>
  );
};

export default SliderSizes;

const SliderCustom = styled(Box)<{ disabled: boolean; client: string }>`
  position: relative;
  padding-top: 6pt;
  padding-bottom: 10.5pt;

  .MuiSlider-root {
    color: ${colors.gray};
    border-radius: 2px;
    width: 100%;
    box-sizing: border-box;
  }
  .MuiSlider-track {
    color: ${({ client }) => (client ? colors.main : colors.gray)};
    border: 0;
    right: 0;
    /* 초기값 */
    ${({ disabled }) =>
      disabled &&
      css`
        color: ${colors.lightGray2};
      `}
  }
  .MuiSlider-thumb::after {
    background: #ffffff;
    box-shadow: 0px 0px 5px rgba(117, 130, 149, 0.6);
    width: 15pt;
    height: 15pt;
  }
`;
const PersentBadge = styled.span<{
  persent: number;
  disabled: boolean;
  client: string;
}>`
  position: absolute;
  left: ${({ persent }) => `calc(${persent}% - 14.5pt)`};
  bottom: -11.5pt; // 웹 화면에서 뱃지 간격
  color: ${colors.lightWhite};
  background-color: ${({ client }) =>
    client === 'true' ? colors.main : colors.gray};
  border-radius: 6pt;
  padding: 4.5pt 7.5pt;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: -20px;
    transform: translate(-50%);
    border: solid transparent;
    border-width: 9pt 6pt;
    border-bottom-color: ${({ client }) =>
      client === 'true' ? colors.main : colors.gray};
  }
  /* 초기값 */
  ${({ disabled, client }) =>
    disabled &&
    css`
      background-color: ${client === 'true' ? colors.lightGray2 : colors.gray};
      &:after {
        border-bottom-color: ${client === 'true'
          ? colors.lightGray2
          : colors.gray};
      }
    `}

  @media (max-width: 500pt) {
    bottom: 0;
  }
`;
const BubbleMessage = styled.span`
  position: absolute;
  top: -19.5pt;
  left: 50%;
  transform: translate(-50%);
  /* width: 87pt; */
  padding: 4.5pt 7.5pt;
  background: ${colors.main};
  color: ${colors.lightWhite};
  border-radius: 6pt;
  font-weight: 500;
  font-size: 9pt;
  font-family: 'Spoqa Han Sans Neo';
  line-height: 9pt;
  letter-spacing: -0.02em;
  margin-bottom: 19.5pt;
  text-align: center;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 15pt;
    transform: translate(-50%) rotate(-180deg);
    border: solid transparent;
    border-width: 9pt 6pt;
    border-bottom-color: ${colors.main1};
  }
`;
