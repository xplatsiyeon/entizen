import styled from '@emotion/styled';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import checkSvg from 'public/images/check-small.png';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import { filterType } from 'pages/company/quotation';

type Props = {
  checkedFilter: filterType;
  setCheckedFilter: Dispatch<SetStateAction<filterType>>;
  checkedFilterIndex: number;
  setcheckedFilterIndex: Dispatch<SetStateAction<number>>;
};

const tabName = ['받은 요청', '보낸 견적', '히스토리'];
const filterList: filterType[] = [
  '마감일순 보기',
  '상태순 보기',
  '날짜순 보기',
];

const Sort = ({
  checkedFilter,
  setCheckedFilter,
  checkedFilterIndex,
  setcheckedFilterIndex,
}: Props) => {
  const [state, setState] = useState({ bottom: false });

  // 정렬 값 변경 (with 리덕스)
  const onClickIndex = (index: number) => {
    setcheckedFilterIndex(index);
  };

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

  useEffect(() => {
    setCheckedFilter(filterList[checkedFilterIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedFilterIndex]);

  return (
    <div>
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
    </div>
  );
};

export default Sort;

const FilterBtnBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  position: relative;
  margin-top: 29.25pt;
  @media (min-width: 899pt) {
    display: none;
  }
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
const FilterHeader = styled(Typography)`
  font-size: 15pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  padding-top: 21pt;
  padding-bottom: 9pt;
`;
