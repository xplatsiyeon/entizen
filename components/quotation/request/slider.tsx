import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useLayoutEffect,
} from 'react';
import { css } from '@emotion/react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  sliderDisable?: boolean;
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
}
const TAG = '🔥 components/quotation/request/slider.tsx';
const SliderSizes = ({
  value,
  setValue,
  disabled,
  setDisabled,
  sliderDisable,
  difaultValue,
  setCalculatedValue,
  subscribeNumber,
}: Props) => {
  const { quotationData } = useSelector((state: RootState) => state);

  const setPriceByRate = (target: any, rate: any, standardRate: any) => {
    return Math.round((target * rate) / standardRate);
  };

  useLayoutEffect(() => {
    const ret = {
      maxSubscribePricePerMonth: setPriceByRate(
        quotationData?.requestData?.maxSubscribePricePerMonth,
        value,
        Math.floor(Number(quotationData?.requestData?.investRate) * 100),
      ),
      maxTotalSubscribePrice: setPriceByRate(
        quotationData?.requestData?.maxTotalSubscribePrice!,
        value,
        Math.floor(Number(quotationData?.requestData?.investRate) * 100),
      ),
      minSubscribePricePerMonth: setPriceByRate(
        quotationData?.requestData?.minSubscribePricePerMonth!,
        value,
        Math.floor(Number(quotationData?.requestData?.investRate) * 100),
      ),
      minTotalSubscribePrice: setPriceByRate(
        quotationData?.requestData?.minTotalSubscribePrice!,
        value,
        Math.floor(Number(quotationData?.requestData?.investRate) * 100),
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

  const handleChange = (event: Event, newValue: number | number[]) => {
    if (subscribeNumber !== -1 && value !== newValue) {
      setDisabled(false); //슬라이더 클릭하면 안내메세지 꺼짐.
      setValue(newValue as number);
    }
  };

  return (
    <SliderCustom
      width={'97%'}
      disabled={disabled}
      client={true.toString()}
      sliderDisable={sliderDisable!}
    >
      {/* 안내 메시지 */}
      {/* {subscribeNumber === 0 && disabled && (
        <BubbleMessage>바를 움직여 주세요</BubbleMessage>
      )} */}
      {disabled && <BubbleMessage>바를 움직여 주세요</BubbleMessage>}

      {/* 슬라이더 */}
      <Slider
        step={5} //슬라이더 증감량. => 5씩 증감
        value={value}
        onChange={handleChange}
        disabled={sliderDisable! === true ? true : false}
        defaultValue={difaultValue ? difaultValue : 50}
        // valueLabelDisplay="auto"
      />
      {sliderDisable! === true && (
        <AlertMessage>* 홈 충전기는 수익지분과 무관한 상품입니다.</AlertMessage>
      )}

      {/* 하단 뱃지 */}
      {!sliderDisable! && (
        <>
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
        </>
      )}
    </SliderCustom>
  );
};

export default SliderSizes;

const SliderCustom = styled(Box)<{
  disabled: boolean;
  client: string;
  sliderDisable?: boolean;
}>`
  position: relative;
  padding-top: 6pt;
  padding-bottom: 10.5pt;
  width: 100%;

  .MuiSlider-root {
    color: ${colors.gray};
    border-radius: 2px;
    margin-left: 18pt;
    width: calc(100% - 36pt);
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

  ${({ sliderDisable }) =>
    sliderDisable &&
    css`
      .MuiSlider-rail {
        color: ${colors.gray};
        opacity: 1;
      }
      .MuiSlider-track {
        display: none;
      }
    `}
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
    bottom: -7px;
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

const AlertMessage = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: 12pt;
`;
