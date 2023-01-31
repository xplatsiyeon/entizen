import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import { handleLogoutOnClickAdmin } from 'api/logout';
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
import jwt_decode from 'jwt-decode';
import styled from '@emotion/styled';
import colors from 'styles/colors';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRouter } from 'next/router';
import { AdminJwtTokenType } from 'pages/signin';
import { useDispatch } from 'react-redux';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';

// import React from 'react';

type Props = {
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  nowHeight?: number;
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
  '파트너 등록 제품',
  '정보수정',
  // '알림',
  // 'DATA 업데이트',
  'DATA 다운로드',
  // '기타',
];
const closeList = [
  ['관리자 등록', '관리자 리스트 조회'],
  ['역경매 현황', '프로젝트 현황', 'A/S 현황', '통계'],
  ['일반회원', '기업회원'],
  ['역경매관리 리스트'],
  ['진행프로젝트 리스트', '완료프로젝트 리스트'],
  ['AS 상세'],
  ['소통하기 리스트', '1대1 문의'],
  ['리스트 조회'],
  ['회사별 리스트'],
  ['약관', '공지사항', '배너', 'FAQ'],
  // ['약관', '공지사항', '배너', '가이드', 'FAQ'],
  // ['알림'],
  // ['DATA 업데이트'],
  ['수익 SIMUL', '보조금', '간편견적'],
  // ['블락'],
];
const Workspace = ({ setNumber, nowHeight }: Props) => {
  const dispatch = useDispatch();
  // window.document.documentElement.scrollHeight
  // window.screen.height
  const router = useRouter();

  // const [nowHeight, setNowHeight] = React.useState<number>(
  //   window.document.documentElement.scrollHeight,
  // );
  const [open, setOpen] = React.useState<boolean[]>(
    Array.from({ length: openList.length }, () => false),
  );

  const handleClick = (id: number) => {
    let temp = [...open];
    temp[id] = !temp[id];
    setOpen(temp);
  };

  const logoutOnClick = async () => {
    handleLogoutOnClickAdmin()
      .then((res) => router.push('/admin/login'))
      .catch((error) => alert(error));
  };

  // 이름 가져오기
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);
  const isToken = (accessToken: string) => {
    if (accessToken) {
      const newToken: AdminJwtTokenType = jwt_decode(accessToken);
      return newToken?.name;
    }
  };
  let token = '';
  React.useEffect(() => {
    if (accessToken !== null) {
      const newToken: AdminJwtTokenType = jwt_decode(accessToken);
    }
  }, []);

  const handleRouter = (name: string) => {
    switch (name) {
      case '관리자 등록':
        // setNumber(1);
        dispatch(adminPageNumberAction.setIsAdminPage(1));
        break;

      case '관리자 리스트 조회':
        // setNumber(2);
        dispatch(adminPageNumberAction.setIsAdminPage(2));
        break;

      case '프로젝트 현황':
        // setNumber(3);
        dispatch(adminPageNumberAction.setIsAdminPage(3));
        break;

      case '통계':
        // setNumber(4);
        dispatch(adminPageNumberAction.setIsAdminPage(4));
        break;

      case '일반회원':
        // setNumber(5);
        dispatch(adminPageNumberAction.setIsAdminPage(5));
        break;

      case '기업회원':
        // setNumber(6);
        dispatch(adminPageNumberAction.setIsAdminPage(6));
        break;

      case '역경매관리 리스트':
        // setNumber(7);
        dispatch(adminPageNumberAction.setIsAdminPage(7));
        break;

      case '진행프로젝트 리스트':
        // setNumber(8);
        dispatch(adminPageNumberAction.setIsAdminPage(8));
        break;

      case 'AS 상세':
        // setNumber(9);
        dispatch(adminPageNumberAction.setIsAdminPage(9));
        break;

      case '소통하기 리스트':
        // setNumber(10);
        dispatch(adminPageNumberAction.setIsAdminPage(10));
        break;

      case '1대1 문의':
        // setNumber(11);
        dispatch(adminPageNumberAction.setIsAdminPage(11));
        break;

      case '리스트 조회':
        // setNumber(12);
        dispatch(adminPageNumberAction.setIsAdminPage(12));
        break;

      case '회사별 리스트':
        // setNumber(13);
        dispatch(adminPageNumberAction.setIsAdminPage(13));
        break;

      case '약관':
        // setNumber(14);
        dispatch(adminPageNumberAction.setIsAdminPage(14));
        break;

      case '공지사항':
        // setNumber(15);
        dispatch(adminPageNumberAction.setIsAdminPage(15));
        break;

      case '배너':
        // setNumber(16);
        dispatch(adminPageNumberAction.setIsAdminPage(16));
        break;

      case '가이드':
        // setNumber(17);
        dispatch(adminPageNumberAction.setIsAdminPage(17));
        break;

      case 'FAQ':
        // setNumber(18);
        dispatch(adminPageNumberAction.setIsAdminPage(18));
        break;

      case '설정':
        // setNumber(19);
        dispatch(adminPageNumberAction.setIsAdminPage(19));
        break;

      case '알림':
        // setNumber(20);
        dispatch(adminPageNumberAction.setIsAdminPage(20));
        break;

      case 'DATA 업데이트':
        // setNumber(21);
        dispatch(adminPageNumberAction.setIsAdminPage(21));
        break;

      case '수익 SIMUL':
        // setNumber(22);
        dispatch(adminPageNumberAction.setIsAdminPage(22));
        break;

      case '보조금':
        // setNumber(26);
        dispatch(adminPageNumberAction.setIsAdminPage(26));
        break;

      case '간편견적':
        // setNumber(27);
        dispatch(adminPageNumberAction.setIsAdminPage(27));
        break;

      case '블락':
        // setNumber(23);
        dispatch(adminPageNumberAction.setIsAdminPage(23));
        break;

      case '역경매 현황':
        // setNumber(24);
        dispatch(adminPageNumberAction.setIsAdminPage(24));
        break;

      case 'A/S 현황':
        // setNumber(25);
        dispatch(adminPageNumberAction.setIsAdminPage(25));
        break;

      case '완료프로젝트 리스트':
        // setNumber(26);
        dispatch(adminPageNumberAction.setIsAdminPage(28));
        break;

      default:
        // setNumber(0);
        dispatch(adminPageNumberAction.setIsAdminPage(0));
        break;
    }
  };

  React.useEffect(() => {
    if (router.asPath !== '/admin') {
      dispatch(adminPageNumberAction.setIsAdminPage(25));
      return () => {
        dispatch(adminPageNumberAction.setIsAdminPage(25));
      };
    }
  }, [router]);

  // React.useEffect(() => {
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [nowHeight]);

  return (
    <Wrapper aria-labelledby="nested-list-subheader" nowHeight={nowHeight}>
      {accessToken !== null && <Name> {`${isToken(accessToken)} 님`}</Name>}
      <LogoutBtn onClick={logoutOnClick}>로그아웃</LogoutBtn>
      {openList.map((item, idx) => (
        <NavContainer key={idx}>
          {/* close */}
          <ListItemButton onClick={() => handleClick(idx)}>
            <ListItemIcon></ListItemIcon>

            {open[idx] ? <ExpandLess /> : <ExpandMore />}
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

const Wrapper = styled(List)<{ nowHeight?: number }>`
  min-width: 154.5pt;
  background-color: ${colors.main1};
  padding: 0;
  height: ${({ nowHeight }) => nowHeight && `${nowHeight}px`};
  //1f8bwsm
  .MuiListItemIcon-root {
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
