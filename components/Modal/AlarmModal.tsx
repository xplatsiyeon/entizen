import styled from '@emotion/styled';
import { Box } from '@mui/material';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import colors from 'styles/colors';
import { DropDownTime } from 'components/BuyerSetting/AlarmDropDown';

interface Props {
  setIsModal: Dispatch<SetStateAction<boolean>>;
  onClick: (item: DropDownTime) => void;
}

const AlarmModal = ({ setIsModal, onClick }: Props) => {
  console.log('DropDownTime==>', DropDownTime);
  const outside = useRef();

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      setIsModal((prev) => !prev);
    }
  };

  return (
    <ModalWrapper ref={outside} onClick={(e) => handleModalClose(e)}>
      <ModalBox>
        <ul className="wrap">
          {DropDownTime.map((item, idx) => (
            <li className="row" key={idx} onClick={() => onClick(item)}>
              {item?.time}
            </li>
          ))}
        </ul>
      </ModalBox>
    </ModalWrapper>
  );
};

export default AlarmModal;

const ModalWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;
const ModalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: auto;
  left: auto;
  border-radius: 20pt 20pt 0 0;
  justify-content: center;
  align-items: center;
  border-radius: 12pt;
  padding-top: 12pt;
  padding-left: 15pt;
  padding-right: 15pt;
  background-color: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  width: 100%;
  .wrap {
    width: 100%;
    text-align: center;
    height: 216pt;
    overflow: scroll;
  }
  .row {
    width: 100%;
    padding: 9pt;

    &:hover {
      background: #f9f7ff;
      border-radius: 8px;
      color: ${colors.main1};
      font-weight: 700;
    }
  }
`;
