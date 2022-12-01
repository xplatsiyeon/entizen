import { css } from '@emotion/react';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paddingOn]);

  return (
    <ButtonBox propsGet={propsGet === true ? propsGet : false}>
      <Button
        onClick={handleClick}
        disabled={!isClick}
        name={name}
        marginTop={marginTop !== 0 ? marginTop : 0}
        isClick={isClick}
        bottom={bottom !== 0 ? bottom : 0}
        // paddingOn={paddingOn ? paddingOn : false}
        propsGet={propsGet === true ? propsGet : false}
      >
        {text}
      </Button>
    </ButtonBox>
  );
};

export default Btn;

const ButtonBox = styled.div<{ propsGet?: boolean }>`
  padding-left: ${({ propsGet }) => (propsGet === true ? 15 : 0)}pt;
  padding-right: ${({ propsGet }) => (propsGet === true ? 15 : 0)}pt;

  ${({ propsGet }) =>
    propsGet === true &&
    css`
      position: fixed;
      bottom: 30pt;
      box-sizing: border-box;
      width: 100%;
    `}
  @media(min-width:900pt) {
    position: relative;
  }
`;

const Button = styled.button<{
  isClick: boolean;
  marginTop?: number;
  bottom?: number;
  propsGet?: boolean;
}>`
  font-weight: 700;
  margin-top: 30pt;
  width: 100%;
  padding-top: 15pt;
  padding-bottom: 15pt;
  margin-bottom: ${({ bottom }) => bottom !== 0 && bottom}pt;
  border-radius: 6pt;
  align-items: center;
  color: white;
  background-color: ${({ isClick }) => (isClick ? '#5a2dc9' : '#E2E5ED')};
  cursor: ${({ isClick }) => isClick && 'pointer'};

  @media (max-width: 899.25pt) {
    margin-top: ${({ marginTop }) => marginTop && marginTop}pt;
  }
`;
