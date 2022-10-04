import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
interface Props {
  text: string;
  isClick: boolean;
  name?: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>> | undefined;
  modalOpen?: boolean;
  marginTop: number;
  handleClick?: (x: React.MouseEvent<HTMLButtonElement>) => void;
}

const Btn = ({ text, isClick, marginTop, name, handleClick }: Props) => {
  return (
    <Button
      onClick={handleClick}
      disabled={!isClick}
      name={name}
      marginTop={marginTop}
      isClick={isClick}
    >
      {text}
    </Button>
  );
};

export default Btn;

const Button = styled.button<{ isClick: boolean; marginTop: number }>`
  font-weight: 700;
  margin-top: ${({ marginTop }) => marginTop && marginTop}pt;
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  border-radius: 6pt;
  align-items: center;
  color: white;
  background-color: ${({ isClick }) => (isClick ? '#5a2dc9' : '#E2E5ED')};
`;
