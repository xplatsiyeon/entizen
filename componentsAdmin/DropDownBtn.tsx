import React, { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import adminDropnDown from 'public/adminImages/adminDropdown.svg';
import adminDropnDownUp from 'public/adminImages/adminDropdownUp.svg';

type Props = {
  dropDownValue: string[];
  currentStep: string;
  width?: string;
  setSelectValue?: React.Dispatch<React.SetStateAction<string>>;
  selectValue?: string;
  background?: string;
  border?: string;
};

const DropDownBtn = ({
  dropDownValue,
  currentStep,
  width,
  setSelectValue,
  selectValue,
  background,
  border,
}: Props) => {
  // props로 받아야 하는거 최초 초기 단계 => currentStep
  // 드랍 다운에 들어가는 option 값 => dropDownValue

  //드랍다운 열리고 닫히고
  const [dropDown, setDropDown] = useState<boolean>(false);

  return (
    <DropDownWrapper
      width={width}
      border={border}
      background={background}
      onClick={() => {
        setDropDown(!dropDown);
      }}
    >
      {dropDown && (
        <DropDownBox width={width}>
          {dropDownValue.map((item, idx) => (
            <DropDownText
              key={idx}
              onClick={() => {
                if (setSelectValue) {
                  setSelectValue(item);
                }
                setDropDown(false);
              }}
            >
              {item}
            </DropDownText>
          ))}
        </DropDownBox>
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

const DropDownWrapper = styled.div<{
  width?: string;
  border?: string;
  background?: string;
}>`
  width: ${({ width }) => (width ? width : '85px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 1px 3px;
  cursor: pointer;
  background-color: ${({ background }) => (background ? background : '')};
  border: ${({ border }) =>
    border ? `1px solid ${border}` : `1px solid ${colors.lightWhite3}`};
`;

const MainText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  text-align: center;
  margin: 0 auto;
  cursor: pointer;
`;

const DropDownBox = styled.div<{ width?: string }>`
  padding: 7px 12px;
  width: ${({ width }) => (width ? '100%' : '90px')};
  position: absolute;
  z-index: 100;
  background-color: #ffffff;
  border: 1px solid ${colors.lightWhite3};
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: 103%;
  left: 0;
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
