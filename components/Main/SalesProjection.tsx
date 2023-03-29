import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import colors from 'styles/colors';
import search from 'public/images/search.png';
import mapPin from 'public/images/MapPin.png';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import SearchBar from './searchBar';
import Exit from 'public/images/X.svg';
import { relative } from 'path/posix';
import { addressType } from 'hooks/addressHooks';

type Props = {
  text?: string;
  setText?: Dispatch<SetStateAction<string>>;
  isSearchBar: boolean;
  setIsSearchBar: Dispatch<SetStateAction<boolean>>;
  results: addressType[];
};

const SalesProjection = ({
  text,
  setText,
  isSearchBar,
  setIsSearchBar,
  results,
}: Props) => {
  const router = useRouter();
  const userID = localStorage.getItem('USER_ID');
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const handleOnClick = () => {
    if (userID === null) {
      router.push('/signin');
    } else {
      router.push('/searchAddress');
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText!(e.target.value);
  };

  // input창 비회원 로그인시 input창 클릭하면 sign in으로
  const inputRef = useRef<HTMLInputElement>(null);

  const inputOnFocus = ({ target }: MouseEvent) => {
    if (userID === null) {
      if (inputRef.current && inputRef.current.contains(target as Node)) {
        router.push('/signin');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', inputOnFocus);
  }, [userID]);

  // 엔티즌에서 기획변경으로 비로그인시 여기에 입력하면 로그인창으로 이동
  // useEffect(() => {
  //   if (text) {
  //     if (text.length > 0 && userID === null) {
  //       router.push('/signin');
  //     }
  //   }
  // }, [text]);

  return (
    <>
      <SearchMapWrapper>
        <TextArea>
          내 충전기의 <span>예상 매출</span>을
          <br /> 확인해보세요!
        </TextArea>
        <SearchMapArea>
          {mobile && (
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
          )}
          {!mobile && (
            <Input
              placeholder="주소 입력 후 간단 체크!"
              type="text"
              onChange={onChangeInput}
              value={text}
              ref={inputRef}
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
                      {isSearchBar ? (
                        <Image src={Exit} alt="exit" layout="intrinsic" />
                      ) : (
                        <Image
                          src={mapPin}
                          alt="searchIcon"
                          layout="intrinsic"
                        />
                      )}
                    </div>
                  </InputAdornment>
                ),
              }}
            />
          )}
        </SearchMapArea>
        {/* 예상 매출 하단 바 */}
        {isSearchBar && (
          <SearchBar
            results={results}
            isSearchBar={isSearchBar}
            setIsSearchBar={setIsSearchBar}
          />
        )}
      </SearchMapWrapper>
    </>
  );
};

const SearchMapWrapper = styled.div`
  /* width: 100%; */
  margin-top: 52.5pt;
  min-width: 331.5pt;
  /* height: 470px; */
  position: relative;
  @media (max-width: 899.25pt) {
    margin-top: 24pt;
    min-width: 251.25pt;
    min-height: 88.5pt;
  }
`;

const TextArea = styled(Typography)`
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  /* font-family: 'AppleGothicNeo'; */
  /* font-family: 'abc'; */
  /* font-family: 'Apple SD Gothic Neo'; */
  font-size: 25.5pt;
  font-weight: 700;
  line-height: 37.5pt;
  letter-spacing: -0.02em;
  text-align: center;
  margin: 0 auto 58.5pt;
  color: #222222;
  & span {
    font-family: 'Spoqa Han Sans Neo';
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
