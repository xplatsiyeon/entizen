import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRef } from 'react';
import colors from 'styles/colors';
import { useMediaQuery } from 'react-responsive';

interface Props {
  leftControl?: () => void;
  rightControl?: () => void;
  exit: () => void;
  title: string;
  subtitle?: string;
}

const RequestDetailModal = ({
  title,
  subtitle,
  leftControl,
  rightControl,
  exit,
}: Props) => {
  const outside = useRef(null);
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      exit();
    }
  };
  return (
    <ModalBackground ref={outside} onClick={(e) => handleModalClose(e)}>
      <Modal>
        <H1>{title}</H1>
        <Text>{subtitle}</Text>
        <BtnBox>
          <LeftBtn onClick={leftControl}>취소</LeftBtn>
          <RightBtn onClick={rightControl}>확인</RightBtn>
        </BtnBox>
      </Modal>
    </ModalBackground>
  );
};

export default RequestDetailModal;

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

  @media (max-width: 899.25pt) {
    position: absolute;
    bottom: 0;
    width: 100%;
    border-top-left-radius: 20pt;
    border-top-right-radius: 20pt;
    padding-top: 30pt;
    padding-left: 15pt;
    padding-right: 15pt;
  }

  @media (min-width: 900pt) {
    border-radius: 12pt;
    width: 420pt;
    padding: 30pt 37.5pt;
  }
`;
const H1 = styled.h1`
  white-space: pre-wrap;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 700;
  font-size: 15pt;
  line-height: 21pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};

  @media (min-width: 900pt) {
    font-size: 15pt;
    font-weight: 700;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
const Text = styled.p`
  white-space: pre-wrap;
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 15pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 12pt;

  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 400;
    line-height: 18pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
const BtnBox = styled.div`
  text-align: center;
  padding-top: 24pt;
  display: flex;
  justify-content: center;
  gap: 9pt;

  @media (max-width: 899.25pt) {
    padding-bottom: 30pt;
  }
`;
const LeftBtn = styled(Button)`
  /* background: ${colors.gray}; */
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.darkGray};
  background-color: #e2e5ed;
  /* padding: 15pt 26.25pt; */
  padding: 15pt 0;
  flex: 2;
  @media (min-width: 900pt) {
    width: 100%;
  }
`;
const RightBtn = styled(Button)<{ border?: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  background: ${colors.main};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  /* padding: ${({ border }) => (border ? '15pt 37.5pt' : '15pt 72.75pt')}; */
  padding: 15pt 0;
  flex: 4;
  @media (min-width: 900pt) {
    width: 100%;
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
