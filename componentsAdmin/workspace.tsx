import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/router';
// import React from 'react';

type Props = {
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};
const openList = [
  '관리자 관리',
  '메인대시보드',
  '회원관리',
  '역경매 관리',
  '프로젝트',
  'A/S 전체',
  '소통하기',
  '엔티즌 도서관',
  '파트너 등록 제품'
];
const closeList = [
  ['관리자 등록', '관리자 리스트 조회'],
  ['프로젝트 현황', '통계'],
  ['일반회원', '기업회원'],
  ['역경매관리 리스트'],
  ['프로젝트 리스트'],
  ['AS 상세'],
  ['소통하기 리스트', '1대1 문의'],
  ['리스트 조회'],
  ['회사별 리스트']
];
const Workspace = ({ setNumber }: Props) => {
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean[]>(
    Array.from({ length: openList.length }, () => false),
  );
  const handleClick = (id: number) => {
    let temp = [...open];
    temp[id] = !temp[id];
    setOpen(temp);
  };
  const handleRouter = (name: string) => {
    switch (name) {
      case '관리자 등록':
        setNumber(1);
        break;
      case '관리자 리스트 조회':
        setNumber(2);
        break;
      case '프로젝트 현황':
        setNumber(3);
        break;
      case '통계':
        setNumber(4);
        break;
      case '일반회원':
        setNumber(5);
        break;
      case '기업회원':
        setNumber(6);
        break;
      case '역경매관리 리스트':
        setNumber(7);
        break;
      case '프로젝트 리스트':
        setNumber(8);
        break;
      case 'AS 상세':
        setNumber(9);
        break;
      case '소통하기 리스트':
        setNumber(10);
        break;
      case '1대1 문의':
        setNumber(11);
        break;
      case '리스트 조회':
        setNumber(12);
        break;

      case '회사별 리스트':
      setNumber(9);
      break;

      default:
        setNumber(0);
        break;
    }
  };

  console.log(window.document.documentElement.clientHeight);

  return (
    <Wrapper
      aria-labelledby="nested-list-subheader"
      windowHeight={window.document.documentElement.clientHeight}
    >
      <Name>이정민님</Name>
      <LogoutBtn>로그아웃</LogoutBtn>
      {openList.map((item, idx) => (
        <NavContainer key={idx}>
          {/* close */}
          <ListItemButton onClick={() => handleClick(idx)}>
            <ListItemIcon></ListItemIcon>
            {open ? <ExpandLess /> : <ExpandMore />}
            <ListItemText primary={item} />
          </ListItemButton>
          {/* open */}
          <ListOpen in={open[idx]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {closeList[idx].map((name, innerIdx) => (
                <ListItemButton
                  sx={{ pl: 4 }}
                  onClick={() => handleRouter(name)}
                  key={innerIdx}
                >
                  <ListItemIcon>
                    <ChevronRightIcon fontSize="medium" color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={closeList[idx][innerIdx]}
                    className="innerText"
                  />
                </ListItemButton>
              ))}
            </List>
          </ListOpen>
        </NavContainer>
      ))}
    </Wrapper>
  );
};

export default Workspace;

const Wrapper = styled(List)<{ windowHeight: number }>`
  min-width: 154.5pt;
  background-color: ${colors.main1};
  height: 100vh;
  padding: 0;
  .css-cveggr-MuiListItemIcon-root {
    min-width: 0;
  }
  .MuiListItemButton-root {
    font-weight: 600;
    font-size: 12pt;
    line-height: 150%;
    color: ${colors.lightWhite};
  }
  .innerText {
    font-weight: 600;
    font-size: 12pt;
    line-height: 150%;
    color: ${colors.main2};
  }
`;
const Name = styled.div`
  font-weight: 700;
  font-size: 12pt;
  line-height: 150%;
  color: ${colors.lightWhite};
  padding-left: 15pt;
  padding-top: 24pt;
`;
const LogoutBtn = styled.button`
  padding-top: 4pt;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 150%;
  text-align: right;
  color: ${colors.lightWhite};
  background-color: ${colors.main1};
  padding-left: 15pt;
  padding-bottom: 36.75pt;
`;
const NavContainer = styled.div``;
const ListOpen = styled(Collapse)`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 12pt;
  line-height: 150%;
  background: ${colors.lightWhite3};
  color: ${colors.dark2} !important;
`;
