import styled from '@emotion/styled';
import { TextField } from '@mui/material';
import Image from 'next/image';
import btnImg from 'public/images/back-btn.svg';
import React, { useState } from 'react';
import colors from 'styles/colors';
import whiteMapPin from 'public/images/mapPinWhite.png';

type Props = {};

const SearchAddress = (props: Props) => {
  const [searchWord, setSearchWord] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };
  return (
    <Container>
      <HeaderBox>
        <Image src={btnImg} alt="backBtn" />
        <FindAddress
          placeholder="상호명 또는 주소 검색"
          onChange={handleChange}
          value={searchWord}
        />
      </HeaderBox>
      <SearchResult>
        <IconBox>
          <Image src={whiteMapPin} alt="mapPin" />
        </IconBox>
        <AddressBox>
          <div>dd</div>
          <div>dd</div>
        </AddressBox>
      </SearchResult>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderBox = styled.div`
  padding-left: 15pt;
  border-bottom: 1px solid #e9eaee;
  display: flex;
`;

const FindAddress = styled(TextField)`
  width: 100%;
  padding: 0;
  margin-left: 6pt;
  display: flex;
  justify-content: center;
  .MuiInputBase-root {
    padding-top: 12pt;
    padding-bottom: 12pt;
    padding-left: 0pt;
  }
  & input {
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    color: ${colors.lightGray3};
    text-align: left;
    padding: 0;
  }

  ::placeholder {
    color: ${colors.lightGray3};
    font-weight: 400;
  }
  & fieldset {
    border: none;
  }
`;

const SearchResult = styled.div`
  display: flex;
  padding-left: 15pt;
  padding-top: 15pt;
  padding-bottom: 15pt;
  border-bottom: 1px solid #e9eaee;
`;

const IconBox = styled.div`
  position: relative;
  margin-right: 9pt;
`;

const AddressBox = styled.div`
  display: flex;
  /* width: 100%; */
  flex-direction: column;

  & :first-of-type {
    margin-bottom: 6pt;
    font-size: 10.5pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    padding-top: 1.5pt;
    text-align: left;
  }

  & :nth-of-type(2) {
    font-size: 9pt;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;

export default SearchAddress;
