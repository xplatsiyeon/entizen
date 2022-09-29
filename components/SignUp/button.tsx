import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
interface Props {
  text: string;
  isClick: boolean;
  name?: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>> | undefined;
  modalOpen?: boolean;
  handleClick?: (x: React.MouseEvent<HTMLButtonElement>) => void;
}

const Btn = ({ text, isClick, name, handleClick }: Props) => {
  return (
    <Button
      onClick={handleClick}
      disabled={!isClick}
      name={name}
      isClick={isClick}
      // sx={{
      //   fontWeight: '700',
      //   marginTop: `${parseInt(marginTop)}pt`,
      //   width: '100%',
      //   height: '42pt',
      //   borderRadius: '6pt',
      //   alignItems: 'center',
      //   background: `${isClick ? '#5a2dc9' : '#E2E5ED'}`,
      //   color: 'white',
      //   ':hover': {
      //     outline: `2pt solid ${colors.main}`,
      //     borderRadius: '0',
      //   },
      // }}
    >
      {text}
    </Button>
  );
};

export default Btn;

const Button = styled.button<{ isClick: boolean }>`
  font-weight: 700;
  margin-top: 47.25pt;
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  border-radius: 6pt;
  align-items: center;
  color: white;
  background-color: ${({ isClick }) => (isClick ? '#5a2dc9' : '#E2E5ED')};
`;
