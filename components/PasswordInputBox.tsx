import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import React, { SetStateAction, Dispatch, useState, useEffect } from 'react';
import colors from 'styles/colors';

type Props = {
  handleIdChange: (e: any) => void;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  placeholder: string;
  name?: string;
  isValid: boolean;
  setIsValid: Dispatch<SetStateAction<boolean>>;
};

export default function PasswordInputBox({
  handleIdChange,
  value,
  setValue,
  placeholder,
  isValid,
  setIsValid,
}: Props) {
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [pwShow, setPwShow] = useState<boolean>(false);

  const handleMouseDownX = (e: React.MouseEvent<HTMLSpanElement>) =>
    e.preventDefault();
  // X 버튼 클릭
  const onClickX = () => setValue('');
  // 표시 / 미표시
  const handleShowBtn = () => setPwShow((prev) => !prev);

  useEffect(() => {
    if (value.length > 3) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [value]);

  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <CloseWrap onMouseDown={handleMouseDownX} onClick={onClickX}>
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </CloseWrap>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: `${colors.main}`,
            cursor: 'pointer',
          }}
          variant="subtitle1"
          onClick={handleShowBtn}
          onMouseDown={handleMouseDownX}
        >
          {pwShow ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };

  const beforeAdornment = inputFocus ? iconAdorment : {};

  return (
    <Input
      focus={inputFocus.toString()}
      placeholder={placeholder}
      onChange={handleIdChange}
      type={pwShow ? 'text' : 'password'}
      value={value}
      hiddenLabel
      InputProps={beforeAdornment}
      onFocus={(e) => setInputFocus(true)}
      onBlur={(e) => setInputFocus(false)}
    />
  );
}

const Input = styled(TextField)<{ focus: string }>`
  margin-top: 9pt;
  width: 100%;
  border-width: 0.75pt;
  border-style: solid;
  border-radius: 6pt;
  border-color: ${({ focus }) =>
    focus === 'true' ? colors.main1 : colors.gray};
  & input {
    padding: 13.5pt 0 13.5pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
  }

  & .MuiInputBase-root {
    padding-right: 9pt;
  }

  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
  }
  .MuiOutlinedInput-notchedOutline {
    border: none;
  }
`;
const CloseWrap = styled.div`
  width: 10pt;
  height: 11pt;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-right: 5pt;
`;
