import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import colors from 'styles/colors';
import searchImg from 'public/images/address.png';

type Props = {};

const SalesProjection = (props: Props) => {
  return (
    <>
      <SearchMapWrapper>
        <TextArea>
          내 충전기의 <span>예상 매출</span>을
          <br /> 확인해보세요!
        </TextArea>
        <SearchMapArea>
          <Input
            placeholder="주소 입력 후 간단 체크!"
            // type=""
            // hiddenLabel
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">kg</InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">hi</InputAdornment>,
            }}
          />
        </SearchMapArea>
      </SearchMapWrapper>
    </>
  );
};

const SearchMapWrapper = styled.div`
  width: 100%;
  margin-top: 24pt;
`;

const TextArea = styled(Typography)`
  text-align: center;
  margin: auto;
  font-weight: 500;
  font-size: 15pt;
  line-height: 21pt;
  letter-spacing: -2%;
  & span {
    color: ${colors.main};
    font-weight: 700;
    letter-spacing: -2%;
  }
`;

const SearchMapArea = styled.div`
  width: 100%;
  position: relative;
  margin-top: 10.5pt;
`;

const Input = styled(TextField)`
  width: 100%;
  border-radius: 6pt;
  border: 2.5pt solid ${colors.main};
  display: flex;
  justify-content: center;
  & fieldset {
    border: none;
  }
`;

export default SalesProjection;
