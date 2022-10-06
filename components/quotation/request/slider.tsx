import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { quotationAction } from 'store/quotationSlice';
import { useRouter } from 'next/router';

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  difaultValue?: number;
  setCalculatedValue?: Dispatch<SetStateAction<{}>>;
  calculatedValue?: {};
}

const PREDICTION_POST = `https://test-api.entizen.kr/api/quotations/prediction`;

const SliderSizes = ({
  value,
  setValue,
  disabled,
  setDisabled,
  difaultValue,
  setCalculatedValue,
  calculatedValue,
}: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { quotationData, locationList } = useSelector(
    (state: RootState) => state,
  );

  const setPriceByRate = (target: any, rate: any, standardRate: any) => {
    Math.round((target * rate) / standardRate);
  };

  const res = {
    isSuccess: true,
    investRate: '0.7',
    predictedProfitTime: '',
    maxSubscribePricePerMonth: 3261785,
    maxTotalSubscribePrice: 78282829,
    minSubscribePricePerMonth: 2552701,
    minTotalSubscribePrice: 61264823,
  };

  useEffect(() => {
    const ret = {
      maxSubscribePricePerMonth: setPriceByRate(
        quotationData.requestData?.maxSubscribePricePerMonth,
        value,
        quotationData.requestData?.investRate,
      ),
      maxTotalSubscribePrice: setPriceByRate(
        res.maxTotalSubscribePrice,
        value,
        quotationData.requestData?.investRate,
      ),
      minSubscribePricePerMonth: setPriceByRate(
        res.minSubscribePricePerMonth,
        value,
        quotationData.requestData?.investRate,
      ),
      minTotalSubscribePrice: setPriceByRate(
        res.minTotalSubscribePrice,
        value,
        quotationData.requestData?.investRate,
      ),
      investRate: value,
    };
    console.log(ret);
    if (setCalculatedValue) {
      setCalculatedValue(ret);
    }

    console.log(calculatedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  console.log('벨루 체크 ->' + difaultValue);
  // 간편 견적 포스트
  const predictionApi = async () => {
    try {
      await axios({
        method: 'post',
        url: PREDICTION_POST,
        data: {
          chargers: quotationData.chargers,
          subscribeProduct: quotationData.subscribeProduct,
          investRate: (value / 100).toString(),
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
        // dispatch(quotationAction.init());
        // router.push('/quotation/request/1-7');
      });
    } catch (error) {
      console.log('post 요청 실패');
      console.log(error);
    }
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setDisabled(false);
    setValue(newValue as number);
    if (difaultValue) {
      console.log('1-7 슬라이더 확인');
      predictionApi();
    }
  };

  return (
    <SliderCustom width={'100%'} disabled={disabled} client={true.toString()}>
      {/* 슬라이더 */}
      <Slider
        step={5}
        value={value}
        onChange={handleChange}
        defaultValue={difaultValue ? difaultValue : 50}
        valueLabelDisplay="auto"
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
  left: ${({ persent }) => `calc(${persent}% - 15pt)`};
  bottom: 0;
  color: ${colors.lightWhite};
  background-color: ${({ client }) =>
    client === 'true' ? colors.main : colors.gray};
  border-radius: 6pt;
  padding: 4.5pt 7.5pt;
  font-size: 9pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
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
`;
