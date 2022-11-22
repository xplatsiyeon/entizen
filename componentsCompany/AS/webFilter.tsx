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
import checkSvg from 'public/images/check-small.png';
import blackDownArrow from 'public/images/blackDownArrow16.png';
import { filterType } from 'pages/company/quotation';
import Image from 'next/image';
import SortArrow from '../../public/quotation/SortArrow.png';
import { Rotate90DegreesCcw } from '@mui/icons-material';
import React, {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props = {
  setSelected: Dispatch<SetStateAction<string>>;
  type: string;
};

const WebFilter = ({ setSelected, type }: Props) => {
  // 신규 A/S sort
  const receivedText = ['등록일순 보기', '현장별 보기', '상태순 보기'];

  // 히스토리 sort
  const historyText = ['현장별 보기', '낮은 평점순 보기', '높은 평점순 보기'];

  const handleSelect = (idx: number) => {
    if (type === 'historyAS') {
      setSelected(historyText[idx]);
    } else if (type === 'receivedAS') {
      setSelected(receivedText[idx]);
    }
    // 선택된 옵션에 맞게 정렬 api 호출.
  };
  const [state, setState] = useState({ bottom: false });

  const [selectName, setSelectName] = useState<string>('현장별 보기');
  const [selectNewName, setSelectNewName] = useState<string>('등록일순 보기');

  //   const userMenu = useRef<HTMLInputElement>(null);
  const userMenu =
    React.useRef<HTMLInputElement>() as React.MutableRefObject<HTMLDivElement>;
  const userCurrent: HTMLElement | null = userMenu.current;

  const [hide, setHide] = useState<boolean>(false);

  //   const modalCloseHandler = (event: React.MouseEvent<HTMLElement>) => {
  //     if (hide && !userCurrent?.contains(event.target as Node)) {
  //       setHide(false);
  //     }
  //   };

  // 나중에 event type 수정 예정
  const modalCloseHandler = (event: any): void => {
    if (hide && !userCurrent?.contains(event.target as Node)) {
      setHide(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', modalCloseHandler);
    return () => {
      window.removeEventListener('click', modalCloseHandler);
    };
  });

  return (
    <WebRapper ref={userMenu}>
      <>
        {/* 신규 A/S */}
        {type === 'receivedAS' && (
          <WebBox
            hide={hide}
            onClick={() => {
              setHide(!hide);
            }}
          >
            <SelectValueBox>
              <SelectValue>{selectNewName}</SelectValue>
              <IconBox hide={hide}>
                <Image src={SortArrow} alt="rijgtArrow" />
              </IconBox>
            </SelectValueBox>
            <FilterContainer>
              <SelectContainer hide={hide}>
                <SelectBox>
                  {receivedText.map((text, index) => (
                    <SelectOption
                      onClick={() => {
                        setSelectNewName(text);
                        handleSelect(index);
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
        )}
        {type === 'historyAS' && (
          <WebBox
            hide={hide}
            onClick={() => {
              setHide(!hide);
            }}
          >
            {/* 히스토리 */}
            <SelectValueBox>
              <SelectValue>{selectName}</SelectValue>
              <IconBox hide={hide}>
                <Image src={SortArrow} alt="rijgtArrow" />
              </IconBox>
            </SelectValueBox>
            <FilterContainer>
              <SelectContainer hide={hide}>
                <SelectBox>
                  {historyText.map((text, index) => (
                    <SelectOption
                      onClick={() => {
                        setSelectName(text);
                        handleSelect(index);
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
        )}
      </>
    </WebRapper>
  );
};

export default WebFilter;

const WebRapper = styled.div`
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  display: flex;
  justify-content: center;
  background-color: white;
  z-index: 3;
  margin-left: 9pt;
  @media (max-width: 899pt) {
    display: none;
  }
`;

const WebBox = styled.div<{ hide: boolean }>`
  width: 96pt;
  height: 33pt;
  border: 0.75pt solid #e2e5ed;
  border-radius: 6pt;
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
  margin-top: 6pt;
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
