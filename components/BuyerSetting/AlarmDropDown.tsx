import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import arrowDropnDown from 'public/images/alramDown.svg';
import arrowDropnDownUp from 'public/images/alramUp.svg';

type Props = {
  currentStep: string;
  setSelectValue?: React.Dispatch<React.SetStateAction<string>>;
  setSendTime: React.Dispatch<React.SetStateAction<string>>;
  selectValue?: string;
  background?: string;
  border?: string;
  handleSelectBox?: (value: string, name: string, index: number) => void;
};

export const DropDownTime = [
  { time: '오전 12시', send: '12:00', show: '오전 12:00' },
  { time: '오전 1시', send: '01:00', show: '오전 01:00' },
  { time: '오전 2시', send: '02:00', show: '오전 02:00' },
  { time: '오전 3시', send: '03:00', show: '오전 03:00' },
  { time: '오전 4시', send: '04:00', show: '오전 04:00' },
  { time: '오전 5시', send: '05:00', show: '오전 05:00' },
  { time: '오전 6시', send: '06:00', show: '오전 06:00' },
  { time: '오전 7시', send: '07:00', show: '오전 07:00' },
  { time: '오전 8시', send: '08:00', show: '오전 08:00' },
  { time: '오전 9시', send: '09:00', show: '오전 09:00' },
  { time: '오전 10시', send: '10:00', show: '오전 10:00' },
  { time: '오전 11시', send: '11:00', show: '오전 11:00' },
  { time: '오후 12시', send: '24:00', show: '오후 12:00' },
  { time: '오후 1시', send: '13:00', show: '오후 01:00' },
  { time: '오후 2시', send: '14:00', show: '오후 02:00' },
  { time: '오후 3시', send: '15:00', show: '오후 03:00' },
  { time: '오후 4시', send: '16:00', show: '오후 04:00' },
  { time: '오후 5시', send: '17:00', show: '오후 05:00' },
  { time: '오후 6시', send: '18:00', show: '오후 06:00' },
  { time: '오후 7시', send: '19:00', show: '오후 07:00' },
  { time: '오후 8시', send: '20:00', show: '오후 08:00' },
  { time: '오후 9시', send: '21:00', show: '오후 09:00' },
  { time: '오후 10시', send: '22:00', show: '오후 10:00' },
  { time: '오후 11시', send: '23:00', show: '오후 11:00' },
];

const AlarmDropDown = ({
  currentStep,
  setSelectValue,
  selectValue,
  background,
  border,
  handleSelectBox,
  setSendTime,
}: Props) => {
  // props로 받아야 하는거 최초 초기 단계 => currentStep
  // 드랍 다운에 들어가는 option 값 => dropDownValue

  //드랍다운 열리고 닫히고
  const [dropDown, setDropDown] = useState<boolean>(false);

  return (
    <DropDownWrapper
      onClick={() => {
        setDropDown(!dropDown);
        handleSelectBox;
      }}
    >
      {dropDown && (
        <>
          <DropDownBox>
            {DropDownTime.map((item, idx) => (
              <DropDownText
                key={idx}
                onClick={() => {
                  if (setSelectValue) {
                    setSelectValue(item?.show);
                    setSendTime(item?.send);
                  }
                  setDropDown(false);
                }}
              >
                {item?.time}
              </DropDownText>
            ))}
          </DropDownBox>
          <Line />
        </>
      )}

      <MainText
        onClick={() => {
          setDropDown(!dropDown);
        }}
      >
        {selectValue === '' ? currentStep : selectValue}
      </MainText>
      {/* 나중에 드랍다운되면 화살표 방향 돌려벌여 */}
      {dropDown === false ? (
        <Image
          src={arrowDropnDown}
          layout="intrinsic"
          alt="dropDown"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setDropDown(!dropDown);
          }}
        />
      ) : (
        <Image
          src={arrowDropnDownUp}
          layout="intrinsic"
          alt="dropDownUp"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setDropDown(!dropDown);
          }}
        />
      )}
    </DropDownWrapper>
  );
};

export default AlarmDropDown;

const DropDownWrapper = styled.div`
  width: 84pt;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0.75pt 2.25pt;
  cursor: pointer;

  :not(:first-of-type) {
    margin-top: 7.5pt;
  }
`;

const MainText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 15pt;
  color: ${colors.main1};
  letter-spacing: -0.02em;
  text-align: right;
  margin: 0 auto;
  cursor: pointer;
`;

const DropDownBox = styled.div`
  padding: 5.25pt 9pt;
  width: 100%;
  position: absolute;
  z-index: 100;
  background-color: #ffffff;
  border: 0.75pt solid ${colors.lightWhite3};
  border-radius: 6pt;
  display: flex;
  flex-direction: column;
  gap: 18pt;
  top: 103%;
  left: 0;
  box-shadow: 3pt 0pt 7.5pt rgba(137, 163, 201, 0.2);
  height: 180pt;
  overflow-y: scroll;
  @media (max-width: 899.25pt) {
  }
`;

const DropDownText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  font-size: 10.5pt;
  color: #222222;
  text-align: left;
  line-height: 12pt;
  cursor: pointer;
`;

const ImageRotate = styled.div`
  transform: rotate(180deg);
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Line = styled.div`
  @media (max-width: 899.25pt) {
    top: 1200%;
    height: 10pt;
    width: 10pt;
    position: absolute;
    z-index: 100;
  }
`;
