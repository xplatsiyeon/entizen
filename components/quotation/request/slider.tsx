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

interface Ret {
  maxSubscribePricePerMonth: number;
  maxTotalSubscribePrice: number;
  minSubscribePricePerMonth: number;
  minTotalSubscribePrice: number;
  minChargingStationInstallationPrice: number;
  maxChargingStationInstallationPrice: number;
  investRate: number;
}
interface Props {
  isHome: boolean;
  subscribeProduct: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  disabled: boolean;
  setDisabled: Dispatch<SetStateAction<boolean>>;
  sliderDisable: boolean;
  thisStepTypeChange?: boolean;
  difaultValue?: number;
  unavailableGraph?: boolean;
  setCalculatedValue?: Dispatch<
    SetStateAction<{
      maxSubscribePricePerMonth: number;
      maxTotalSubscribePrice: number;
      minSubscribePricePerMonth: number;
      minTotalSubscribePrice: number;
      minChargingStationInstallationPrice: number;
      maxChargingStationInstallationPrice: number;
    }>
  >;
}
const SliderSizes = ({
  value,
  setValue,
  disabled,
  setDisabled,
  sliderDisable,
  difaultValue,
  setCalculatedValue,
  unavailableGraph,
  thisStepTypeChange,
  isHome,
  subscribeProduct,
}: Props) => {
  const { requestData, investRate } = useSelector(
    (state: RootState) => state.quotationData,
  );

  console.log('🔥 subscribeProduct : ', subscribeProduct);
  console.log('🔥 isHome : ', isHome);

  const setPriceByRate = (
    target: number | undefined,
    rate: number | undefined,
    standardRate: number | undefined,
  ) => {
    return Math.round((target! * rate!) / standardRate!);
  };

  // 수익 예측 계산
  useLayoutEffect(() => {
    const investRate = Math.floor(Number(requestData?.investRate) * 100);

    let ret: Ret = {
      maxSubscribePricePerMonth: 0,
      maxTotalSubscribePrice: 0,
      minSubscribePricePerMonth: 0,
      minTotalSubscribePrice: 0,
      minChargingStationInstallationPrice: 0,
      maxChargingStationInstallationPrice: 0,
      investRate: 0,
    };

    if (requestData?.subscribeProduct === 'ENTIRETY') {
      // console.log('⭐️ 전체구독');

      ret = {
        maxSubscribePricePerMonth: setPriceByRate(
          requestData?.entiretyMinAndMaxSubscribePrice
            ?.maxSubscribePricePerMonth,
          value,
          investRate,
        ),
        maxTotalSubscribePrice: setPriceByRate(
          requestData?.entiretyMinAndMaxSubscribePrice?.maxTotalSubscribePrice!,
          value,
          investRate,
        ),
        minSubscribePricePerMonth: setPriceByRate(
          requestData?.entiretyMinAndMaxSubscribePrice
            ?.minSubscribePricePerMonth!,
          value,
          investRate,
        ),
        minTotalSubscribePrice: setPriceByRate(
          requestData?.entiretyMinAndMaxSubscribePrice?.minTotalSubscribePrice!,
          value,
          investRate,
        ),
        minChargingStationInstallationPrice: setPriceByRate(
          requestData?.entiretyMinAndMaxSubscribePrice
            ?.minChargingStationInstallationPrice!,
          value,
          investRate,
        ),
        maxChargingStationInstallationPrice: setPriceByRate(
          requestData?.entiretyMinAndMaxSubscribePrice
            ?.maxChargingStationInstallationPrice!,
          value,
          investRate,
        ),
        investRate: value,
      };
    } else {
      // console.log('⭐️ 부분구독');
      ret = {
        maxSubscribePricePerMonth: setPriceByRate(
          requestData?.partMinAndMaxSubscribePrice?.maxSubscribePricePerMonth,
          value,
          investRate,
        ),
        maxTotalSubscribePrice: setPriceByRate(
          requestData?.partMinAndMaxSubscribePrice?.maxTotalSubscribePrice!,
          value,
          investRate,
        ),
        minSubscribePricePerMonth: setPriceByRate(
          requestData?.partMinAndMaxSubscribePrice?.minSubscribePricePerMonth!,
          value,
          investRate,
        ),
        minTotalSubscribePrice: setPriceByRate(
          requestData?.partMinAndMaxSubscribePrice?.minTotalSubscribePrice!,
          value,
          investRate,
        ),
        minChargingStationInstallationPrice: setPriceByRate(
          requestData?.partMinAndMaxSubscribePrice
            ?.minChargingStationInstallationPrice!,
          value,
          investRate,
        ),
        maxChargingStationInstallationPrice: setPriceByRate(
          requestData?.partMinAndMaxSubscribePrice
            ?.maxChargingStationInstallationPrice!,
          value,
          investRate,
        ),
        investRate: value,
      };
    }

    // console.log('⭐️ ret ~line 158');
    // console.log(ret);

    if (setCalculatedValue) {
      setCalculatedValue({
        maxSubscribePricePerMonth: ret.maxSubscribePricePerMonth!,
        maxTotalSubscribePrice: ret.maxTotalSubscribePrice!,
        minSubscribePricePerMonth: ret.minSubscribePricePerMonth!,
        minTotalSubscribePrice: ret.minTotalSubscribePrice!,
        minChargingStationInstallationPrice:
          ret.minChargingStationInstallationPrice!,
        maxChargingStationInstallationPrice:
          ret.maxChargingStationInstallationPrice!,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 프로그래스바 값 변경
  const handleChange = (event: Event, newValue: number | number[]) => {
    if (value !== newValue && subscribeProduct === 'ENTIRETY') {
      setDisabled(false); //슬라이더 클릭하면 안내메세지 꺼짐.
      setValue(newValue as number);
    }
  };

  useEffect(() => {
    if (unavailableGraph === true) {
      setDisabled(false);
    }
  }, [unavailableGraph]);

  useEffect(() => {
    if (!isHome && subscribeProduct === 'PART') {
      setValue(100);
    } else if (
      !isHome &&
      subscribeProduct === 'ENTIRETY' &&
      thisStepTypeChange
    ) {
      setDisabled(true);
      setValue(50);
    }
  }, [subscribeProduct, isHome]);

  return (
    <SliderCustom
      width={'97%'}
      disabled={disabled}
      subscribeProduct={subscribeProduct}
      sliderDisable={sliderDisable}
      isHome={isHome}
    >
      {/* 안내 메시지 */}
      {disabled && !isHome && subscribeProduct === 'ENTIRETY' && (
        <BubbleMessage>바를 움직여 주세요</BubbleMessage>
      )}
      {/* 슬라이더 */}
      <Slider
        step={5} //슬라이더 증감량. => 5씩 증감
        value={value} // 슬라이더 값
        onChange={handleChange} // 슬라이더 체인지 이벤트
        disabled={isHome ? true : false} // 그래프 사용 유무
        defaultValue={difaultValue ? difaultValue : 50} // 초기값
      />
      {/* 홈 충전기 안내 메시지 */}
      {isHome && (
        <AlertMessage>* 홈 충전기는 수익지분과 무관한 상품입니다.</AlertMessage>
      )}

      {/* 하단 퍼센트 뱃지 */}
      {!isHome && (
        <BadgeBox>
          <PersentBadge
            className="user"
            init={subscribeProduct ? false : true}
            disabled={isHome ? true : false}
            persent={value / 2}
          >
            {`${value}%`}
          </PersentBadge>
          <PersentBadge
            init={subscribeProduct ? false : true}
            disabled={isHome ? true : false}
            persent={value + (100 - value) / 2}
          >
            {`${100 - value}%`}
          </PersentBadge>
        </BadgeBox>
      )}

      {/* 부분 구독 안내 메시지 */}
      {!isHome && subscribeProduct === 'PART' && (
        <AlertMessage2>
          <p>부분구독을 선택하면 수익지분은 100%로 고정됩니다.</p>
        </AlertMessage2>
      )}
    </SliderCustom>
  );
};

export default SliderSizes;

const SliderCustom = styled(Box)<{
  disabled: boolean;
  subscribeProduct?: string;
  sliderDisable?: boolean;
  isHome: boolean;
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
  /* 왼쪽 그래프바 */
  .MuiSlider-track {
    color: ${colors.main};
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

  ${({ sliderDisable, isHome, subscribeProduct }) =>
    (sliderDisable || isHome) &&
    css`
      .MuiSlider-rail {
        color: ${colors.gray};
        opacity: 1;
      }
      .MuiSlider-track {
        color: ${subscribeProduct === 'PART' && !isHome
          ? colors.main
          : colors.gray6};
      }
    `}
`;
const BadgeBox = styled.div`
  width: calc(100% - 36pt);
  margin: 0 auto;
  position: relative;
  height: 15px;
`;
const PersentBadge = styled.span<{
  persent: number;
  disabled: boolean;
  init: boolean;
}>`
  position: absolute;
  left: ${({ persent }) => `calc(${persent}% - 16.725pt)`};
  bottom: -11.5pt; // 웹 화면에서 뱃지 간격
  color: ${colors.lightWhite};
  background-color: ${colors.gray};
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
    border-bottom-color: ${colors.gray};
  }
  &.user {
    background-color: ${({ init }) => (init ? colors.gray6 : colors.main)};
    &:after {
      border-bottom-color: ${({ init }) => (init ? colors.gray6 : colors.main)};
    }
  }

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

const AlertMessage2 = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 10.5pt;
  letter-spacing: -0.24px;
  color: ${colors.lightGray2};
  background-color: ${colors.gray3};
  padding-top: 9pt;
  padding-bottom: 9pt;
  margin-top: 26pt;
  border-radius: 6pt;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    max-width: 309px;
  }
`;
