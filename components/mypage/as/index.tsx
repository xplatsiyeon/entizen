import styled from '@emotion/styled';
import { InputAdornment, TextField } from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import search from 'public/images/search.png';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import React from 'react';
import colors from 'styles/colors';
import NoAs from './noAs';

type Props = {};

const AsIndex = (props: Props) => {
  const menuList: {} = [];
  //     headText: string;
  //     leftImg: ;
  //     background: string;
  //     topTextColor: string;
  //     color: string;
  //     rightImg: StaticImageData;
  //     menuText: string;
  //     width: number;
  //     height: number;
  //   }[] = [
  //     {
  //       headText: '플랫폼 가이드',
  //       //   leftImg: 'public/images/boxLight.png',
  //       leftImg: lightBox,
  //       background: '#ffffff',
  //       topTextColor: '#747780',
  //       color: '#5A2DC9',
  //       rightImg: blueRight,
  //       menuText: '엔티즌을\n더 잘 쓰는\n꿀팁 확인하기',
  //       width: 30,
  //       height: 30,
  //     },
  //     {
  //       headText: '구독 가이드',
  //       //   leftImg: 'public/images/arrow.png',
  //       leftImg: arrow,
  //       background: '#5A2DC9',
  //       topTextColor: 'rgba(255, 255, 255, 0.5)',
  //       color: '#FFFFFF',
  //       rightImg: whiteRight,
  //       menuText: '구독에 대한\n모든 것을\n한 눈에!',
  //       width: 30,
  //       height: 30,
  //     },
  //     {
  //       headText: '충전기 가이드',
  //       leftImg: charger,
  //       background: '#FFC043',
  //       topTextColor: 'rgba(255, 255, 255, 0.5)',
  //       color: '#FFFFFF',
  //       rightImg: whiteRight,
  //       menuText: '나에게 딱 맞는\n충전기는?',
  //       width: 30,
  //       height: 30,
  //     },
  //     {
  //       headText: '보조금 가이드',
  //       leftImg: moneyMan,
  //       background: '#FFFFFF',
  //       topTextColor: '#747780',
  //       color: '#5A2DC9',
  //       rightImg: blueRight,
  //       menuText: '보조금은\n최대 얼마?',
  //       width: 32.8275,
  //       height: 35.52749,
  //     },
  //   ];

  return (
    <Wrapper>
      <FilterBtnBox>
        <FilterBtn>
          <span>등록일순 보기</span>
          <span>
            <Image src={blackDownArrow} alt="filterIcon" />
          </span>
        </FilterBtn>
      </FilterBtnBox>
      <div>
        <Input
          placeholder="프로젝트를 검색하세요."
          type="text"
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
      {menuList && <NoAs />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
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
  margin-top: 9pt;
  .MuiInputBase-root {
    padding: 10.5pt 12pt;
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
    color: ${colors.gray};
    font-weight: 400;
  }
  & span > img {
    width: 15pt;
    height: 15pt;
  }
  & fieldset {
    border: none;
  }
`;

const FilterBtnBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;
  margin-top: 29.25pt;
`;

const FilterBtn = styled.div`
  font-size: 9pt;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  position: relative;
  & span:first-of-type {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    /* top: 1pt; */
  }
  & span:nth-of-type(2) {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 3pt;
    bottom: 1pt;
  }
`;

export default AsIndex;
