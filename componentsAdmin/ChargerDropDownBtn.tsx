import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import adminDropnDown from 'public/adminImages/adminDropdown.svg';
import adminDropnDownUp from 'public/adminImages/adminDropdownUp.svg';
import { M5_LIST_EN } from 'assets/selectList';

type Props = {
  dropDownValue: string[];
  currentStep: string;
  width? : string;

  //충전모달 셀렉트, 채널 셀렉트 전용 props.
  chargeKind?: boolean;
  chargeChannel?: boolean;
  setEnChargeKind?: Dispatch<SetStateAction<string>>;
  setEnChargeChannel?: Dispatch<SetStateAction<string>>;
  setChargeMethod?:Dispatch<SetStateAction<string>>;
};

const ChargerDropDownBtn = ({ dropDownValue, currentStep, width, chargeKind, chargeChannel, setEnChargeChannel, setEnChargeKind, setChargeMethod }: Props) => {
  // props로 받아야 하는거 최초 초기 단계 => currentStep
  // 드랍 다운에 들어가는 option 값 => dropDownValue

  //드랍다운 열리고 닫히고
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<string>('');

  return (
    <DropDownWrapper width={width}>
      {dropDown && (
        <DropDownBox width={width}>
          {['전체', ...dropDownValue].map((item, idx) => {
            const enChannel = ['SINGLE','DUAL','3_MODE']
            return(
            <DropDownText
              key={idx}
              onClick={() => {
                setSelectValue(item);
                if(item==='전체'){
                  if(chargeChannel&&setEnChargeChannel){
                    setEnChargeChannel('')
                  }
                  if(chargeKind&&setEnChargeKind){
                    setEnChargeKind('')
                  }
                  if(setChargeMethod){
                    setChargeMethod('')
                  }
                }else{
                if(chargeChannel&&setEnChargeChannel){
                  setEnChargeChannel(enChannel[idx])
                }
                if(chargeKind&&setEnChargeKind){
                  setEnChargeKind(M5_LIST_EN[idx])
                }
                if(setChargeMethod){
                  setChargeMethod(item)
                }
              }
              setDropDown(false);
              }}
            >
              {item}
            </DropDownText>
            )
          }
          )}
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

export default ChargerDropDownBtn;

const DropDownWrapper = styled.div<{width?:string}>`
  width: ${({width}) => (width? width :'85px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding:1px 3px;
  border: 1px solid ${colors.lightWhite3};
`;

const MainText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  text-align: left;
`;

const DropDownBox = styled.div<{width?:string}>`
  padding: 7px 12px;
  width:  ${({width}) => (width? '100%' :'90px')};
  position: absolute;
  z-index: 100;
  background-color: #ffffff;
  border: 1px solid ${colors.lightWhite3};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  top: 100%;
  left:0;
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
