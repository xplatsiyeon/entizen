import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
interface Props {
  text: string;
  isClick: boolean;
  name?: string;
  setModalOpen?: Dispatch<SetStateAction<boolean>> | undefined;
  modalOpen?: boolean;
  marginTop?: number;
  handleClick?: (x: React.MouseEvent<HTMLButtonElement>) => void;
  bottom?: number;
  paddingOn?: boolean;
}

const Btn = ({
  bottom,
  text,
  isClick,
  marginTop,
  name,
  handleClick,
  paddingOn,
}: Props) => {
  const [propsGet, setPropsGet] = useState<boolean>(false);
  useEffect(() => {
    if (paddingOn) {
      setPropsGet(true);
    }
    console.log(propsGet);
  }, [paddingOn]);

  return (
    <ButtonBox>
      <Button
        onClick={handleClick}
        disabled={!isClick}
        name={name}
        marginTop={marginTop !== 0 ? marginTop : 0}
        isClick={isClick}
        bottom={bottom !== 0 ? bottom : 0}
        paddingOn={paddingOn ? paddingOn : false}
      >
        {text}
      </Button>
    </ButtonBox>
  );
};

export default Btn;

const ButtonBox = styled.div``;

const Button = styled.button<{
  isClick: boolean;
  marginTop?: number;
  bottom?: number;
  paddingOn?: boolean;
}>`
  font-weight: 700;
  margin-top: ${({ marginTop }) => marginTop && marginTop}pt;
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  margin-bottom: ${({ bottom }) => bottom !== 0 && bottom}pt;
  border-radius: 6pt;
  padding-left: ${({ paddingOn }) => paddingOn === true && 15}pt;
  padding-right: ${({ paddingOn }) => paddingOn === true && 15}pt;
  align-items: center;
  color: white;
  background-color: ${({ isClick }) => (isClick ? '#5a2dc9' : '#E2E5ED')};
`;
