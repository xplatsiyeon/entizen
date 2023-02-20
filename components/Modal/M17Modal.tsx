import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRef } from 'react';
import colors from 'styles/colors';

interface Props {
  contents: string;
  leftText: string;
  leftControl: () => void;
  rightText: string;
  rightControl: () => void;
  backgroundOnClick: () => void;
}

const M17Modal = ({
  contents,
  leftText,
  leftControl,
  rightText,
  rightControl,
  backgroundOnClick,
}: Props) => {
  const outside = useRef(null);

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      backgroundOnClick();
    }
  };
  return (
    <ModalBackground ref={outside} onClick={(e) => handleModalClose(e)}>
      <Modal>
        <H1>{contents}</H1>
        <BtnBox>
          <RightBtn onClick={rightControl}>{rightText}</RightBtn>
          <LeftBtn onClick={leftControl}>{leftText}</LeftBtn>
        </BtnBox>
      </Modal>
    </ModalBackground>
  );
};

export default M17Modal;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  background-color: rgba(102, 100, 100, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div<{ border?: boolean }>`
  background: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: ${({ border }) => (border ? '' : '22.5pt 22.5pt 0 0')};
  padding: 30pt 15pt;
  margin-top: 160pt;
  width: 100%;
  @media (min-width: 900pt) {
    border-radius: 12pt;
    width: 324pt;
    padding: 42pt 28.5pt 10pt;
  }
`;
const H1 = styled.h1`
  white-space: pre-wrap;
  font-weight: 700;
  font-size: 15pt;
  line-height: 21pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Text = styled.p`
  white-space: pre-wrap;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 12pt;
`;
const BtnBox = styled.div`
  text-align: center;
  padding-top: 24pt;
  display: flex;
  justify-content: center;
  gap: 9pt;
  @media (min-width: 900pt) {
    flex-direction: column;
  }
`;

const LeftBtn = styled(Button)<{ border?: boolean }>`
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  background: ${colors.main};
  padding: ${({ border }) => (border ? '15pt 37.5pt' : '15pt 72.75pt')};
  color: white;
`;
const RightBtn = styled(Button)`
  color: #595757;
  background-color: #e2e5ed;
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 15pt 26.25pt;
`;
