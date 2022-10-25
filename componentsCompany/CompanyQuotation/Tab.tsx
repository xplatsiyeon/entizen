import styled from '@emotion/styled';
import {
  Box,
  Divider,
  Drawer,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import search from 'public/images/search.png';
import colors from 'styles/colors';
import checkSvg from 'public/images/check-small.png';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import { filterType } from 'pages/company/quotation';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { companyRequestFilterNumberAction } from 'storeCompany/requestTabSlice';

type Props = {
  searchWord: string;
  setSearchWord: Dispatch<SetStateAction<string>>;
  checkedFilter: filterType;
  setCheckedFilter: Dispatch<SetStateAction<filterType>>;
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  checkedFilterIndex: number;
};
const tabName = ['받은 요청', '보낸 견적', '히스토리'];
const filterList: filterType[] = [
  '마감일순 보기',
  '상태순 보기',
  '날짜순 보기',
];
const Tab = ({
  searchWord,
  setSearchWord,
  checkedFilter,
  setCheckedFilter,
  tabNumber,
  setTabNumber,
  checkedFilterIndex,
}: Props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({ bottom: false });
  // 정렬 값 변경 (with 리덕스)
  const onClickIndex = (index: number) => {
    dispatch(companyRequestFilterNumberAction.setNumber(index));
  };

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
      {/* 모달창  */}
      <ListBox>
        <FilterHeader>정렬</FilterHeader>
        {filterList.map((text, index) => (
          <React.Fragment key={index}>
            <ListItems
              key={index}
              disablePadding
              onClick={() => onClickIndex(index)}
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

  return (
    <>
      <TabBox>
        {tabName.map((el, index) => (
          <TabLists key={index} onClick={() => setTabNumber(index)}>
            <TabList
              className={
                tabNumber !== undefined && tabNumber === index ? 'selected' : ''
              }
            >
              {el}
            </TabList>
            {tabNumber === index && <BottomLine></BottomLine>}
          </TabLists>
        ))}
      </TabBox>
      <FilterBtnBox>
        {(['bottom'] as const).map((anchor, index) => (
          <React.Fragment key={index}>
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
    </>
  );
};

const TabBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 9.75pt;
  border-bottom: 1px solid #f3f4f7;
`;

const TabLists = styled.div`
  color: #caccd1;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 15pt;
  letter-spacing: -0.02em;
  text-align: center;
  cursor: pointer;
  & .selected {
    color: ${colors.main};
    font-weight: 700;
  }
`;

const TabList = styled.div`
  text-align: center;
`;
const BottomLine = styled.div`
  width: 100%;
  border: 1.5pt solid ${colors.main};
  margin-top: 12pt;
  border-radius: 2pt;
`;

const Input = styled(TextField)`
  display: flex;
  margin-top: 9pt;
  /* margin: 18pt 15pt 0pt; */
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
    /* padding: 8.96pt 15pt; */
    padding: 7.46pt 15pt;
    box-sizing: border-box;
  }
  & input {
    font-size: 10.5pt;
    box-sizing: border-box;
    font-weight: 400;
    line-height: 12pt;
    letter-spacing: -2%;
    //color: ${colors.main2};
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
  cursor: pointer;
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
  padding-top: 12pt;
  padding-bottom: 12pt;
  border-bottom: 1px solid #e2e5ed;
  margin: 0;

  &:nth-of-type(3) {
    border-bottom: none;
    margin-bottom: 49.5pt;
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

export default Tab;
