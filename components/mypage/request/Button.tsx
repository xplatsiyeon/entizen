import styled from '@emotion/styled';
import { ButtonBase } from '@mui/material';
import colors from 'styles/colors';
import { css } from '@emotion/react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  setPartnerModal: Dispatch<SetStateAction<boolean>>;
  setConfirmModal: Dispatch<SetStateAction<boolean>>;
}

const Button = ({ setPartnerModal, setConfirmModal }: Props) => {
  return (
    <BtnBox>
      <Btn onClick={() => setPartnerModal((prev) => !prev)}>
        다른파트너 선정
      </Btn>
      <Btn onClick={() => setConfirmModal((prev) => !prev)} puple={true}>
        확정하기
      </Btn>
    </BtnBox>
  );
};

export default Button;

const BtnBox = styled.div`
  display: flex;
  margin: 0 15pt;
  gap: 11.25pt;
  padding: 54pt 0;
`;
const Btn = styled(ButtonBase)<{ puple?: boolean }>`
  width: 100%;
  border-radius: 8px;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  padding: 15pt 0;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main};
  border: 1px solid #5a2dc9;
  ${({ puple }) =>
    puple &&
    css`
      background: ${colors.main};
      color: ${colors.lightWhite};
    `}
`;
