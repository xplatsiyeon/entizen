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
          <LeftBtn onClick={leftControl}>{leftText}</LeftBtn>
          <RightBtn onClick={rightControl}>{rightText}</RightBtn>
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
  @media (min-width: 900pt) {
    border-radius: 12pt;
    width: 324pt;
    padding: 42pt 15pt;
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
const LeftBtn = styled(Button)`
  background: ${colors.gray};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.darkGray};
  padding: 15pt 26.25pt;
`;
const RightBtn = styled(Button)<{ border?: boolean }>`
  background: ${colors.main};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: ${({ border }) => (border ? '15pt 37.5pt' : '15pt 72.75pt')}; ;
`;
