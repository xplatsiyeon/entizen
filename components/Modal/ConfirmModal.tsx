import styled from '@emotion/styled';
import { useRef } from 'react';
import colors from 'styles/colors';

interface Props {
  contents: string;
  leftText: string;
  onClose: () => void;
  rightText: string;
  onClick: () => void;
}

export default function ConfirmModal({
  contents,
  leftText,
  onClose,
  rightText,
  onClick,
}: Props) {
  const outside = useRef(null);

  // 외부 클릭 모달 창 닫기
  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      onClose();
    }
  };

  return (
    <ModalBackground ref={outside} onClick={(e) => handleModalClose(e)}>
      <Modal>
        <H1>{contents}</H1>
        <BtnBox>
          <Button onClick={onClick}>{leftText}</Button>
          <Button className="cancel" onClick={onClose}>
            {rightText}
          </Button>
        </BtnBox>
      </Modal>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(102, 100, 100, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Modal = styled.div<{ border?: boolean }>`
  background: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: ${({ border }) => (border ? '' : '22.5pt 22.5pt 0 0')};
  padding: 51pt 15pt 30pt 15pt;
  width: 100%;
  position: fixed;
  bottom: 0;
  min-height: 288px;
  @media (min-width: 900pt) {
    border-radius: 12pt;
    width: 354pt;
    height: 243pt;
    margin-top: 0;
    padding: 42pt 37.5pt 30pt 37.5pt;
    position: absolute;
    top: 50%;
    left: 50%;
    bottom: auto;
    transform: translate(-50%, -50%);
  }
`;
const H1 = styled.h1`
  white-space: pre-wrap;
  font-weight: 700;
  font-size: 21pt;
  line-height: 21pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  @media (max-width: 899.25pt) {
    font-size: 15pt;
  }
`;
const BtnBox = styled.div`
  text-align: center;
  padding-top: 51pt;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  gap: 9pt;
  @media (min-width: 900pt) {
    flex-direction: column;
    gap: 12.36pt;
    padding-top: 24pt;
  }
`;
const Button = styled.button`
  color: ${colors.white};
  background-color: ${colors.main1};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding-top: 15pt;
  padding-bottom: 15pt;
  width: 100%;
  &.cancel {
    background-color: ${colors.lightWhite};
    color: ${colors.darkGray};
  }

  @media (max-width: 899.25pt) {
    flex: 4;
    &.cancel {
      color: ${colors.darkGray};
      background-color: ${colors.gray};
      flex: 2;
    }
  }
`;
