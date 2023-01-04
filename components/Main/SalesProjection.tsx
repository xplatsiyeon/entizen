import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import colors from 'styles/colors';
import search from 'public/images/search.png';
import mapPin from 'public/images/MapPin.png';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';

type Props = {
  text?: string;
  setText?: Dispatch<SetStateAction<string>>;
};

const SalesProjection = ({ text, setText }: Props) => {
  const router = useRouter();
  const mobile = useMediaQuery({
    query: '(max-width:810pt)',
  });
  const handleOnClick = () => {
    router.push('/searchAddress');
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText!(e.target.value);
  };

  return (
    <>
      <SearchMapWrapper>
        <TextArea>
          내 충전기의 <span>예상 매출</span>을
          <br /> 확인해보세요!
        </TextArea>
        <SearchMapArea>
          {/* {mobile && (
            <Input
              value="주소 입력 후 간단 체크!"
              type="submit"
              onClick={handleOnClick}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div style={{ width: '15pt', height: '15pt' }}>
                      <Image src={search} alt="searchIcon" layout="intrinsic" />
                    </div>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <div style={{ width: '15pt', height: '15pt' }}>
                      <Image src={mapPin} alt="searchIcon" layout="intrinsic" />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          )} */}
          {!mobile && (
            <Input
              placeholder="주소 입력 후 간단 체크!"
              type="text"
              onChange={onChangeInput}
              value={text}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <div style={{ width: '15pt', height: '15pt' }}>
                      <Image src={search} alt="searchIcon" layout="intrinsic" />
                    </div>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <div style={{ width: '15pt', height: '15pt' }}>
                      <Image src={mapPin} alt="searchIcon" layout="intrinsic" />
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </SearchMapArea>
      </SearchMapWrapper>
    </>
  );
};

const SearchMapWrapper = styled.div`
  width: 100%;
  margin-top: 52.5pt;

  @media (max-width: 899.25pt) {
    margin-top: 24pt;
  }
`;

const TextArea = styled(Typography)`
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 25.5pt;
  font-weight: 700;
  line-height: 37.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0 auto 58.5pt;
  & span {
    color: ${colors.main};
    font-weight: 700;
    letter-spacing: -2%;
  }
  @media (max-width: 899.25pt) {
    margin: 0 auto;
    font-weight: 500;
    font-size: 15pt;
    line-height: 21pt;
    letter-spacing: -2%;
  }
`;

const SearchMapArea = styled.div`
  width: 100%;
  /* height: 50pt; */
  position: relative;
  margin-top: 10.5pt;
`;

const Input = styled(TextField)`
  width: 100%;
  border-radius: 6pt;
  border: 2.5pt solid ${colors.main};
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .MuiInputBase-root {
    padding: 12pt 15pt;
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
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }
  @media (max-width: 899.25pt) {
    .MuiInputBase-root {
      cursor: pointer;
    }
    & input {
      cursor: pointer;
    }
  }
`;

export default SalesProjection;
