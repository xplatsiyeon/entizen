import styled from '@emotion/styled';
import { TextField, Typography } from '@mui/material';
import React from 'react';
import colors from 'styles/colors';

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
          <Input></Input>
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
  margin-top: 10.5pt;
`;

const Input = styled(TextField)`
  width: 100%;
`;
export default SalesProjection;
