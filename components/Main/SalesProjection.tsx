import styled from '@emotion/styled';
import { InputAdornment, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import colors from 'styles/colors';
import search from 'public/images/search.png';
import mapPin from 'public/images/MapPin.png';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import SearchBar from './searchBar';
import Exit from 'public/images/X.svg';
import { addressType } from 'hooks/userAddressHooks';

type Props = {
  keyword?: string;
  setKeyword?: (keyword: string) => {
    payload: string;
    type: string;
  };
  isSearchBar?: boolean;
  isScroll?: boolean;
  setIsScroll?: Dispatch<SetStateAction<boolean>>;
  setIsSearchBar?: Dispatch<SetStateAction<boolean>>;
  results?: addressType[];
};

const SalesProjection = ({
  keyword,
  setKeyword,
  isScroll,
  setIsScroll,
  isSearchBar,
  setIsSearchBar,
  results,
}: Props) => {
  const router = useRouter();
  const userID = sessionStorage.getItem('USER_ID');
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
    setKeyword!(e.target.value);
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

  return (
    <SearchMapWrapper>
      <TextArea>
        내 충전기의 <span>예상 매출</span>을
        <br /> 확인해보세요!
      </TextArea>
      {/* 인풋박스 */}
      <SearchMapArea>
        {/* 모바일 */}
        {mobile && (
          <Input
            isMobile={true}
            value="주소 입력 후 간단 체크!"
            type="submit"
            onClick={handleOnClick}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div
                    style={{
                      width: '15pt',
                      height: '15pt',
                    }}
                  >
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
        {/* 데스트탑 */}
        {!mobile && (
          <InputWrap>
            <Input
              className="mainSearchInput"
              placeholder="주소 입력 후 간단 체크!"
              type="text"
              onChange={onChangeInput}
              value={keyword}
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
                    <div
                      style={{
                        width: '15pt',
                        height: '15pt',
                        cursor: 'pointer',
                      }}
                    >
                      {isSearchBar ? (
                        <Image
                          src={Exit}
                          alt="exit"
                          layout="intrinsic"
                          onClick={() => {
                            setIsScroll && setIsScroll(false);
                          }}
                        />
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
          </InputWrap>
        )}
      </SearchMapArea>
      {/* 예상 매출 하단 바 */}
      {keyword && keyword.length > 0 && isSearchBar && (
        <SearchBar
          results={results!}
          isSearchBar={isSearchBar!}
          setIsSearchBar={setIsSearchBar!}
          isScroll={isScroll!}
          setIsScroll={setIsScroll!}
        />
      )}
    </SearchMapWrapper>
  );
};

const SearchMapWrapper = styled.div`
  margin-top: 52.5pt;
  min-width: 331.5pt;
  @media (max-width: 899.25pt) {
    margin-top: 24pt;
    min-width: 251.25pt;
    min-height: 88.5pt;
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
  /* margin: 0 auto 58.5pt; */
  color: #222222;
  & span {
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main};
    font-weight: 700;
    letter-spacing: -2%;
  }
  @media (max-width: 899.25pt) {
    /* margin: 0 auto; */
    font-weight: 500;
    font-size: 15pt;
    line-height: 21pt;
    letter-spacing: -2%;
  }
`;
const SearchMapArea = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  padding-top: 53.25pt;
  background-color: ${colors.lightWhite};
  z-index: 9999;
  @media (max-width: 899.25pt) {
    padding-top: 0pt;
    z-index: 0;
  }
`;
const InputWrap = styled.div`
  padding: 0 56.25pt;
`;
const Input = styled(TextField)<{ isMobile?: boolean }>`
  margin-top: ${({ isMobile }) => isMobile && '10.5pt'};
  width: 100%;
  min-width: 324pt;
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
    color: ${({ isMobile }) => (isMobile ? colors.lightGray3 : colors.main2)};
    text-align: left;
    padding: 0;

    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 13.5pt;
    line-height: 15.75pt;
    letter-spacing: -0.02em;
  }
  &.mobile {
    color: '##CACCD1';
  }
  ::placeholder {
    color: '##CACCD1';
    font-weight: 400;
  }
  & span > img {
    width: 11.25pt;
    height: 13.875pt;
    margin-right: 9.375pt;
  }
  & fieldset {
    border: none;
  }
  @media (max-width: 899.25pt) {
    min-width: 0;
    .MuiInputBase-root {
      cursor: pointer;
    }
    & input {
      cursor: pointer;
    }
  }
`;

export default SalesProjection;
