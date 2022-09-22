import styled from '@emotion/styled';
import { Button } from '@mui/material';
import colors from 'styles/colors';

interface Props {
  leftControl?: () => void;
  rightControl?: () => void;
  title: string;
  subtitle?: string;
}

const RequestModal = ({
  title,
  subtitle,
  leftControl,
  rightControl,
}: Props) => {
  return (
    <ModalBackground>
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
const Modal = styled.div`
  background: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  border-radius: 22.5pt 22.5pt 0 0;
  padding: 30pt 15pt;
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
const RightBtn = styled(Button)`
  background: ${colors.main};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: 15pt 72.75pt;
`;
