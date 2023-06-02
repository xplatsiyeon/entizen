import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';

interface Props {
  placeholder: string;
  isButton?: boolean;
  contents?: string;
  setValue?: Dispatch<SetStateAction<string>>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any; // 필요한 props 작성하세요.
}

const Input = ({
  placeholder,
  isButton = false,
  contents,
  setValue,
  onChange,
}: Props) => {
  return (
    <Wrapper>
      <Box
        type="text"
        placeholder={placeholder}
        onChange={onChange ? onChange : (e) => setValue!(e.currentTarget.value)}
      />
      {isButton && <OverlapBtn>{contents}</OverlapBtn>}
    </Wrapper>
  );
};
export default Input;

const Wrapper = styled.div`
  position: relative;
`;
const Box = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  margin-top: 9pt;
  padding: 13.5pt 0;
  padding-left: 12pt;

  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  :hover {
    outline: 2pt solid ${colors.main};
  }
`;
const OverlapBtn = styled.button`
  position: absolute;
  right: 8pt;
  top: 17pt;
  background: #e2e5ed;
  color: #ffffff;
  border-radius: 6pt;
  padding: 7.5pt 9pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
`;
