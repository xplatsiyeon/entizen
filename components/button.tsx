import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import colors from '../styles/colors';
interface Props {
  text?: string;
  isClick?: boolean;
  marginTop: string;
  [key: string]: any; // 필요한 props 작성하세요. testß
  setModalOpen?: Dispatch<SetStateAction<boolean>> | undefined;
  modalOpen?: boolean;
  handleClick?: (x: React.MouseEvent<HTMLButtonElement>) => void;
}

const Btn = ({ text, isClick, marginTop, handleClick, modalOpen }: Props) => {
  return (
    <Wrapper>
      <Button
        onClick={handleClick}
        disabled={!isClick}
        sx={{
          fontWeight: '700',
          marginTop: `${parseInt(marginTop)}pt`,
          width: '100%',
          height: '42pt',
          borderRadius: '6pt',
          alignItems: 'center',
          background: `${isClick ? '#5a2dc9' : '#E2E5ED'}`,
          color: 'white',
          cursor: 'pointer',
          ':hover': {
            outline: `2pt solid ${colors.main}`,
            borderRadius: '0',
          },
        }}
      >
        {text}
      </Button>
    </Wrapper>
  );
};

export default Btn;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* border: 1px solid red; */
  /* cursor: pointer; */
  @media (max-width: 899.25pt) {
    padding: 0 15pt;
    bottom: 30pt;
    left: 0;
    position: fixed;
  }
`;
