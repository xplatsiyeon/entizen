import styled from '@emotion/styled';
import {
  Box,
  Button,
  Divider,
  Drawer,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  makeStyles,
  TextField,
  Typography,
} from '@mui/material';
import Image, { StaticImageData } from 'next/image';
import search from 'public/images/search.png';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import NoAs from './NoAs';
import CommonBtn from './CommonBtn';
import { useRouter } from 'next/router';
import checkSvg from 'public/images/check-small.png';

type Props = {};

const AsIndex = (props: Props) => {
  const [state, setState] = useState({
    bottom: false,
  });
  const [checkedFilterIndex, setCheckedFilterIndex] = useState<number>(0);
  const [checkedFilter, setCheckedFilter] = useState<string>('등록일순 보기');
  const filterList: string[] = ['등록일순 보기', '현장별 보기', '상태순 보기'];

  useEffect(() => {
    setCheckedFilter(filterList[checkedFilterIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedFilterIndex]);

  const list = (anchor: string) => (
    <FilterBox
      sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListBox>
        <FilterHeader>정렬</FilterHeader>
        {filterList.map((text, index) => (
          <React.Fragment key={index}>
            <ListItems
              key={index}
              disablePadding
              onClick={() => setCheckedFilterIndex(index)}
            >
              <ListItemButtons>
                <ListItemTexts sx={{ textAlign: 'center' }} primary={text} />{' '}
                {checkedFilterIndex === index ? (
                  <Image
                    src={checkSvg}
                    alt="checked"
                    style={{ color: 'blue' }}
                  />
                ) : (
                  ''
                )}
              </ListItemButtons>
            </ListItems>
            {/* <Dividers /> */}
          </React.Fragment>
        ))}
      </ListBox>
    </FilterBox>
  );

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };
  const router = useRouter();
  const menuList: {} = [];
  const handlerBtn = () => router.push('/mypage/as/1-2');
  const handleAsListClick = () => router.push('/mypage/as/1-1');

  return (
    <Wrapper>
      <FilterBtnBox>
        {(['bottom'] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <FilterBtn onClick={toggleDrawer(anchor, true)}>
              <span>{checkedFilter}</span>
              <span>
                <Image src={blackDownArrow} alt="filterIcon" />
              </span>
            </FilterBtn>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              PaperProps={{ style: { borderRadius: '20pt 20pt 0 0' } }}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
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
      <ContentsContainer>
        <ContentsWrapper onClick={handleAsListClick}>
          <ContentTop>
            <ContentTitle>LS안양주유소</ContentTitle>
          </ContentTop>
          <ContentCenter>
            <ContentCenterText></ContentCenterText>
          </ContentCenter>
          <ContentBottom>
            <CommonBtn text={'접수요청 D+3'} backgroundColor={'#F75015'} />
            <DateText>2022.05.17 18:13</DateText>
          </ContentBottom>
        </ContentsWrapper>
        <ContentsWrapper onClick={() => router.push('/mypage/as/asGoReview')}>
          <ContentTop>
            <ContentTitle>LS안양주유소</ContentTitle>
          </ContentTop>
          <ContentCenter>
            <ContentCenterText></ContentCenterText>
          </ContentCenter>
          <ContentBottom>
            <CommonBtn text={'완료대기'} backgroundColor={'#FFC043'} />
            <DateText>2022.05.17 18:13</DateText>
          </ContentBottom>
        </ContentsWrapper>
        <ContentsWrapper onClick={() => router.push('/mypage/as/asReviewEnd')}>
          <ContentTop>
            <ContentTitle>LS안양주유소</ContentTitle>
          </ContentTop>
          <ContentCenter>
            <ContentCenterText></ContentCenterText>
          </ContentCenter>
          <ContentBottom>
            <CommonBtn text={'A/S완료'} backgroundColor={'#222222'} />
            <DateText>2022.05.17 18:13</DateText>
          </ContentBottom>
        </ContentsWrapper>
      </ContentsContainer>
      {!menuList && <NoAs />}
      {menuList && (
        <BtnBox>
          <Btn onClick={handlerBtn}>A/S 요청하기</Btn>
        </BtnBox>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  position: relative;
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

const ContentsContainer = styled.div`
  margin-top: 18pt;
`;

const ContentsWrapper = styled.div`
  padding: 12.75pt 13.5pt;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
  margin-bottom: 9pt;
  border-radius: 6pt;
`;

const ContentTop = styled.div``;

const ContentTitle = styled(Typography)`
  font-size: 12pt;
  font-weight: 700;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const ContentCenter = styled.div`
  margin-top: 1.5pt;
`;

const ContentCenterText = styled(Typography)`
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 18pt;
  letter-spacing: -0.02em;
  text-align: left;
  height: 18pt;
`;

const ContentBottom = styled.div`
  margin-top: 12pt;
  display: flex;
  justify-content: space-between;
`;

const DateText = styled(Typography)`
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  display: flex;
  align-items: flex-end;
  color: #caccd1;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 76.5pt;
`;

const Btn = styled(Button)`
  background: ${colors.main};
  color: ${colors.lightWhite};
  margin-top: 27pt;
  border-radius: 6pt;
  padding: 9pt 30pt;
`;

const FilterBox = styled(Box)`
  border-radius: 20pt 20pt 0 0;
`;

const ListBox = styled(List)`
  box-shadow: 4px 0px 10px rgba(137, 163, 201, 0.2);
  padding-left: 15pt;
  padding-right: 15pt;
  margin: 0;
`;

const ListItems = styled(ListItem)`
  padding-top: 15pt;
  padding-bottom: 15pt;
  border-bottom: 1px solid #e2e5ed;
  margin: 0;
  &:nth-of-type(4) {
    border-bottom: none;
  }
`;

const ListItemButtons = styled(ListItemButton)`
  padding-top: 0;
  padding-bottom: 0;
  width: 40%;
  margin: 0;
  & span {
    width: 40%;
    margin-right: 0;
  }
`;

const ListItemTexts = styled(ListItemText)`
  width: 40%;
  padding-top: 0;
  padding-bottom: 0;
  text-align: left;
`;

const Dividers = styled(Divider)`
  width: 90%;
`;

const FilterHeader = styled(Typography)`
  font-size: 15pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  padding-top: 21pt;
  padding-bottom: 9pt;
`;
export default AsIndex;
