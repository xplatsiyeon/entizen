import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import adminDropnDown from 'public/adminImages/adminDropdown.svg';
import adminDropnDownUp from 'public/adminImages/adminDropdownUp.svg';

type Props = {
  dropDownValue: string[];
  currentStep: string;
};

const DropDownBtn = ({ dropDownValue, currentStep }: Props) => {
  // props로 받아야 하는거 최초 초기 단계 => currentStep
  // 드랍 다운에 들어가는 option 값 => dropDownValue

  //드랍다운 열리고 닫히고
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>('');
  return (
    <DropDownWrapper>
      {dropDown && (
        <DropDownBox>
          {dropDownValue.map((item, idx) => (
            <DropDownText
              key={idx}
              onClick={() => {
                setSelectValue(item);
                setDropDown(false);
              }}
            >
              {item}
            </DropDownText>
          ))}
        </DropDownBox>
      )}

      <MainText>{selectValue === '' ? currentStep : selectValue}</MainText>
      {/* 나중에 드랍다운되면 화살표 방향 돌려벌여 */}
      {dropDown === false ? (
        <Image
          src={adminDropnDown}
          layout="intrinsic"
          alt="dropDown"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            setDropDown(!dropDown);
          }}
        />
      ) : (
        <Image
          src={adminDropnDownUp}
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

export default DropDownBtn;

const DropDownWrapper = styled.div`
  width: 85px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  text-align: left;
`;

const DropDownBox = styled.div`
  padding: 7px 12px;
  width: 90px;
  position: absolute;
  z-index: 100;
  background-color: #ffffff;
  border: 1px solid #747780;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: 57.5%;
  box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
`;

const DropDownText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: normal;
  font-size: 16px;
  color: #000000;
  text-align: center;
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
