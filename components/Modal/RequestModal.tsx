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
            <LeftBtn onClick={leftControl}>탈퇴</LeftBtn>
            <RightBtn border={border} onClick={rightControl}>
              다시 생각해 볼게요
            </RightBtn>
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
  padding: 30pt 15pt;

  @media (max-width: 899.25pt) {
    position: absolute;
    bottom: 0;
  }

  @media (min-width: 900pt) {
    border-radius: 16px;
    width: 560px;
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
  @media (min-width: 900pt) {
    white-space: normal;
  }
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
  @media (min-width: 900pt) {
    width: 102pt;
  }
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
  padding: ${({ border }) => (border ? '15pt 37.5pt' : '15pt 72.75pt')};
  @media (min-width: 900pt) {
    width: 230pt;
  }
`;
