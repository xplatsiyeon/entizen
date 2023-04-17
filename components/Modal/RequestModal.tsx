import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRef } from 'react';
import colors from 'styles/colors';

interface Props {
  leftControl?: () => void;
  rightControl?: () => void;
  exit: () => void;
  title: string;
  subtitle?: string;
  border?: boolean | undefined;
}

const RequestModal = ({
  title,
  subtitle,
  leftControl,
  rightControl,
  border,
  exit,
}: Props) => {
  const outside = useRef(null);

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      exit();
    }
  };
  return (
    <ModalBackground ref={outside} onClick={(e) => handleModalClose(e)}>
      {border ? (
        <Modal border={border}>
          <H1>{title}</H1>
          <Text>{subtitle}</Text>
          <BtnBox>
            <RightBtn border={border} onClick={rightControl}>
              다시 생각해 볼게요
            </RightBtn>
            <LeftBtn onClick={leftControl}>계정 탈퇴</LeftBtn>
          </BtnBox>
        </Modal>
      ) : (
        <Modal>
          <H1>{title}</H1>
          <Text>{subtitle}</Text>
          <BtnBox>
            <LeftBtn onClick={leftControl}>취소</LeftBtn>
            <RightBtn onClick={rightControl}>확인</RightBtn>
          </BtnBox>
        </Modal>
      )}
    </ModalBackground>
  );
};

export default RequestModal;

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
  padding: 30pt 15pt 10pt;

  @media (max-width: 899.25pt) {
    position: absolute;
    bottom: 0;
    border-radius: 6pt;
    bottom: 150pt;
  }

  @media (min-width: 900pt) {
    border-radius: 12pt;
    width: 354pt;
    padding: 42pt 28.5pt 10pt;
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
    white-space: normal;
    font-size: 21pt;
    font-weight: 700;
    line-height: 33pt;
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
  flex-direction: column;
  gap: 9pt;
`;
const LeftBtn = styled.button`
  /* background: ${colors.gray}; */
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.darkGray};
  padding: 15pt 26.25pt;
  @media (min-width: 900pt) {
    width: 100%;
  }
`;
const RightBtn = styled.button<{ border?: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  background: ${colors.main};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: ${({ border }) => (border ? '15pt 37.5pt' : '15pt 72.75pt')};
  @media (min-width: 900pt) {
    width: 100%;
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
