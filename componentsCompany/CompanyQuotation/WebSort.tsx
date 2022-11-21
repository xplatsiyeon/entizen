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
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import checkSvg from 'public/images/check-small.png';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import { filterType } from 'pages/company/quotation';
import Image from 'next/image';
import SortArrow from '../../public/quotation/SortArrow.png';
import { Rotate90DegreesCcw } from '@mui/icons-material';

type Props = {
  checkedFilter: filterType;
  setCheckedFilter: Dispatch<SetStateAction<filterType>>;
  checkedFilterIndex: number;
  setcheckedFilterIndex: Dispatch<SetStateAction<number>>;
};

const filterList: filterType[] = [
  '마감일순 보기',
  '상태순 보기',
  '날짜순 보기',
];

const WebSort = ({
  checkedFilter,
  setCheckedFilter,
  checkedFilterIndex,
  setcheckedFilterIndex,
}: Props) => {
  const [state, setState] = useState({ bottom: false });

  const [selectName, setSelectName] = useState<string>('마감일순 보기');

  // 정렬 값 변경 (with 리덕스)
  const onClickIndex = (index: number) => {
    setcheckedFilterIndex(index);
  };

  useEffect(() => {
    setCheckedFilter(filterList[checkedFilterIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedFilterIndex]);

  const [hide, setHide] = useState<boolean>(false);
  return (
    <WebRapper>
      <WebBox
        hide={hide}
        onClick={() => {
          setHide(!hide);
        }}
      >
        <SelectValueBox>
          <SelectValue>{selectName}</SelectValue>
          <IconBox hide={hide}>
            <Image src={SortArrow} alt="rijgtArrow" />
          </IconBox>
        </SelectValueBox>
        <FilterContainer>
          <SelectContainer hide={hide}>
            <SelectBox>
              {filterList.map((text, index) => (
                <SelectOption
                  onClick={() => {
                    setSelectName(text);
                    onClickIndex(index);
                  }}
                  key={index}
                >
                  {text}
                </SelectOption>
              ))}
            </SelectBox>
          </SelectContainer>
        </FilterContainer>
      </WebBox>
    </WebRapper>
  );
};

export default WebSort;

const WebRapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: white;
  z-index: 3;
`;

const WebBox = styled.div<{ hide: boolean }>`
  width: 96pt;
  height: 33pt;
  border: 0.75pt solid #e2e5ed;
  @media (max-width: 899pt) {
    display: none;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectValueBox = styled.button`
  display: flex;
  width: 75pt;
  justify-content: space-between;
  align-items: center;
  margin: 5pt auto;
  cursor: pointer;
  background: none;
`;

const SelectValue = styled.div`
  max-width: 67.5pt;
  font-weight: 500;
  text-align: center;
  font-size: 10.5pt;
  line-height: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
`;

const SelectBox = styled.div`
  font-weight: 500;
  text-align: center;
  font-size: 10.5pt;
  line-height: 12pt;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.02em;
  background-color: white;
`;

const SelectContainer = styled.ul<{ hide: boolean }>`
  width: 96pt;
  list-style-type: none;
  position: absolute;
  background: #ffffff;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 6pt;
  cursor: pointer;
  display: ${({ hide }) => (hide !== true ? 'none' : '')};
`;

const SelectOption = styled.li`
  padding: 10pt 0;
  :hover {
    background: rgba(168, 156, 235, 0.35);
  }
`;

const IconBox = styled.div<{ hide: boolean }>`
  align-self: center;
  width: 10pt;
  padding: 5pt 0;
  transform: ${({ hide }) => (hide !== true ? `` : `rotate(180deg)`)};
`;
