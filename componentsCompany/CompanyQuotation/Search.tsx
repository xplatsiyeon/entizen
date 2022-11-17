import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';
import { InputAdornment, TextField } from '@mui/material';
import Image from 'next/image';
import search from 'public/images/search.png';

type Props = {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
};

const Search = ({ searchWord, setSearchWord }: Props) => {
  return (
    <div>
      <Input
        value={searchWord}
        placeholder="용량, 주소, 상호명을 입력하세요."
        type="text"
        className="searchInput"
        onChange={(e) => setSearchWord(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <div style={{ width: '15pt', height: '15pt' }}>
                <Image src={search} alt="searchIcon" layout="intrinsic" />
              </div>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;

const Input = styled(TextField)`
  @media (min-width: 900pt) {
    width: 475.5pt;
    margin: 0 auto;
  }
  display: flex;
  margin-top: 9pt;
  width: 100%;
  border-radius: 6pt;
  background-color: #ffffff;
  border: 1.5pt solid ${colors.main};
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  .MuiInputBase-root {
    padding: 7.46pt 15pt;
    box-sizing: border-box;
  }
  & input {
    font-size: 10.5pt;
    box-sizing: border-box;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    text-align: left;
    padding: 0;
  }
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }
`;
