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
const openList = ['회원관리', '역경매 관리', '프로젝트'];
const closeList = [
  ['일반회원', '기업회원'],
  ['역경매관리 리스트'],
  ['프로젝트 리스트'],
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
      case '일반회원':
        setNumber(1);
        break;
      case '기업회원':
        setNumber(2);
        break;
      case '역경매관리 리스트':
        setNumber(3);
        break;
      case '프로젝트 리스트':
        setNumber(4);
        break;
      default:
        setNumber(0);
        break;
    }
  };

  return (
    <Wrapper aria-labelledby="nested-list-subheader">
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

                  <ListItemText primary={closeList[idx][innerIdx]} />
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

const Wrapper = styled(List)`
  min-width: 154.5pt;

  background-color: ${colors.main1};
  height: 100vh;
  padding: 0;
  .css-cveggr-MuiListItemIcon-root {
    min-width: 0;
  }
  .css-16ac5r2-MuiButtonBase-root-MuiListItemButton-root {
    font-family: 'Spoqa Han Sans Neo';
    font-style: normal;
    font-weight: 500;
    font-size: 12pt;
    line-height: 150%;
    color: ${colors.lightWhite};
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
  font-weight: 400;
  font-size: 12pt;
  line-height: 150%;
  background: ${colors.lightWhite3};
  color: ${colors.dark2};
`;
