import styled from '@emotion/styled';
import { Box } from '@mui/material';
import Header from 'components/header';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useRouter } from 'next/router';
import { FindKey } from 'pages/signin';
import Modal from 'components/Modal/Modal';
import colors from 'styles/colors';

type Props = {
  isFindId: boolean;
  setIsFindId: Dispatch<SetStateAction<boolean>>;
  setIsFindIdView: Dispatch<SetStateAction<boolean>>;
};

export default function FindIdComponents({
  isFindId,
  setIsFindId,
  setIsFindIdView,
}: Props) {
  const router = useRouter();
  const { id } = useSelector((state: RootState) => state.findUserInfo);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  // const [isFindId, setIsFindId] = useState(true);

  // 비밀번호 찾기
  const HandleFindPassword = async () => {
    if (isFindId === true) {
      // 아이디 찾았고, 비밀번호 변경
      let key = sessionStorage.getItem('key');
      let data: FindKey = JSON.parse(key!);
      console.log('🔥 data  : ', data);
      if (data.isMember) {
        sessionStorage.getItem('key');
        router.push('/find/password');
      } else {
        setErrorMessage(
          '탈퇴한 계정입니다.\n엔티즌 이용을 원하시면\n 다시 가입해주세요.',
        );
        setErrorModal((prev) => !prev);
      }
    } else {
      // 비밀번호 찾기 로 이동
      router.push({
        pathname: '/find/password',
        query: {
          loginType: 'USER',
        },
      });
    }
  };

  const onClickLogin = () => {
    setIsFindIdView(false);
    setIsFindId(false);
  };

  return (
    <React.Fragment>
      {errorModal && (
        <Modal
          text={errorMessage}
          color={'#7e7f81'}
          click={() => setErrorModal((prev) => !prev)}
        />
      )}
      <Body>
        <Header />
        <Inform>
          <div>
            고객님의 정보와
            <br />
            {id ? '일치하는  이메일입니다' : '일치하는 이메일이 없습니다'}
          </div>
        </Inform>
        <UserId>{id ? id : ''}</UserId>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {/* 로그인 버튼 */}
          <ButtonWrap onClick={onClickLogin}>로그인</ButtonWrap>
        </Box>

        {/* 이메일 찾기 or 비밀번호 찾기  */}
        <ButtonBox>
          {id ? (
            <Button isFindId={true} onClick={HandleFindPassword}>
              비밀번호 찾기
            </Button>
          ) : (
            <div></div>
          )}
          {/* <Button isFindId={false} onClick={HandleFindPassword}>
                이메일 찾기
              </Button>
              <ColumnLine />
              <Button isFindId={false} onClick={HandleFindPassword}>
                비밀번호 찾기
              </Button> */}
        </ButtonBox>
      </Body>
    </React.Fragment>
  );
}

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inform = styled.div`
  margin-top: 12pt;
  margin-left: 15pt;
  & > div {
    font-size: 15pt;
    font-weight: 700;
    line-height: 22.5pt;
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main2};
    letter-spacing: -0.02em;
    @media (max-width: 899.25pt) {
      font-size: 18pt;
      line-height: 24pt;
    }
  }
`;
const UserId = styled.div`
  margin-top: 39pt;
  text-align: center;
  font-weight: 700;
  color: ${colors.main};
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-size: 18pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  @media (max-width: 899.25pt) {
    font-size: 12pt;
    line-height: 12pt;
    margin-top: 54pt;
  }
`;

const ButtonWrap = styled.button`
  font-weight: 700;
  margin: 48pt 15pt 0 15pt;
  width: 100%;
  height: 42pt;
  padding: 15pt 0;
  font-size: 12pt;
  line-height: 12pt;
  border-radius: 6pt;
  align-items: center;
  background: #5a2dc9;
  color: white;
  font-family: 'Spoqa Han Sans Neo';
  @media (max-width: 899.25pt) {
    margin: 60pt 15pt 0 15pt;
  }
`;
const ButtonBox = styled.div`
  margin-top: 26.25pt;
  padding: 3.75pt 0;
  font-family: 'Spoqa Han Sans Neo';
  text-align: center;
`;
const Button = styled.button<{ isFindId: boolean }>`
  font-size: 10.5pt;
  font-weight: 400;
  line-height: 12pt;
  cursor: pointer;
  padding-bottom: 1.5pt;
  letter-spacing: -0.02em;

  text-decoration-line: ${({ isFindId }) => (isFindId ? 'underline' : 'none')};
  text-underline-position: ${({ isFindId }) => (isFindId ? 'under' : 'none')};
  color: ${colors.lightGray7};
  background: none;
`;

const ColumnLine = styled.span`
  display: inline-block;
  border-right: 0.75pt solid ${colors.lightGray3};
  padding-top: 1.5pt;
  margin-right: 9pt;
  padding-right: 9pt;
  height: 9pt;
`;
