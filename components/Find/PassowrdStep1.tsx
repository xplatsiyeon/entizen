import styled from '@emotion/styled';
import { isTokenPostApi } from 'api';
import axios from 'axios';
import Modal from 'components/Modal/Modal';
import MypageHeader from 'components/mypage/request/header';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FindKey } from 'pages/signin';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import colors from 'styles/colors';

import backIcon from 'public/images/backIcon.svg';
import instance from 'api/interceptor/service';

interface UserInfo {
  data: {
    isSuccess: boolean;
    data: {
      member: {
        memberIdx: number;
        memberType: string;
        snsLogin: null | string;
      } | null;
    };
  };
}

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const PassowrdStep1 = ({ setStep }: Props) => {
  const router = useRouter();
  // let key = sessionStorage.getItem('key');
  // let data = JSON.parse(key!);
  const [data, setData] = useState<any>();
  const memberType = router?.query.loginType;
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [ModalMsg, setModalMsg] = useState('');

  const { mutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: (data: UserInfo) => {
      // console.log('data==>>', data);
      // console.log('memberType==>>', memberType);
      // console.log(
      //   'data?.data?.data?.member?.memberType=>',
      //   data?.data?.data?.member?.memberType,
      // );

      if (
        data?.data?.data?.member === null ||
        data?.data?.data?.member?.memberType !== memberType
      ) {
        setIsModal(true);
        setModalMsg(
          `${
            memberType === 'USER' ? '이메일과' : '아이디와'
          } 회원정보가 일치하지 않습니다.\n다시 입력해주세요.`,
        );
      } else if (data?.data?.data?.member?.snsLogin !== null) {
        setIsModal(true);
        setModalMsg(
          'SNS 계정으로 가입된 회원입니다.\nSNS 계정으로 로그인해 주세요.',
        );
      } else {
        fnPopup();
        // console.log('data==>>', data);
        return;
      }
    },
    onError: (error) => {
      // console.log(error);
    },
  });

  const colseModal = () => setIsModal(false);

  const onClickButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValid) {
      mutate({
        url: '/members/verification/identity',
        data: {
          name,
          id,
        },
      });
    }
  };

  // 나이스 인증 후 숨겨진 버튼 클릭
  const onSubmitBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isValid) {
      let key = sessionStorage.getItem('key');
      // console.log('key ===>', key);
      let data: FindKey = JSON.parse(key!);
      // console.log('data==>', data);

      // console.log([data.name, name]);
      // console.log([data.id, id]);

      if (data.name === name && data.id === id) {
        setStep(1);
      } else {
        sessionStorage.removeItem('key');
        setIsModal(true);
        setModalMsg(
          `${
            memberType === 'USER' ? '이메일과' : '아이디와'
          } 회원정보가 일치하지 않습니다.\n다시 입력해주세요.`,
        );
      }
    }
  };

  // 나이스 인증 온클릭 함수
  const fnPopup = () => {
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      document.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      document.form_chk.target = 'popupChk';
      document.form_chk.submit();
    }
  };

  // 나이스 인증
  useEffect(() => {
    if (memberType) {
      instance({
        method: 'post',
        url: `/auth/nice`,
        data: { memberType },
      })
        .then((res) => {
          setData(res.data.executedData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (name.length > 0 && id.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [name, id]);

  return (
    <div className="container">
      {isModal && <Modal click={colseModal} text={ModalMsg} size={'auto'} />}
      {/* 모바일 */}
      <MypageHeader
        handle={true}
        back={true}
        handleBackClick={() => router.push('/signin')}
        title={'비밀번호 찾기'}
      />
      {/* 웹 */}
      <HeadWrapper>
        <Header>
          <HeaderText onClick={() => router.push('/signin')}>
            <Image src={backIcon} alt="back" />
          </HeaderText>
          <HeaderText style={{ margin: '0 auto' }}>비밀번호 찾기</HeaderText>
        </Header>
      </HeadWrapper>
      {/* 바디 */}
      <Container>
        <label>이름</label>
        <input
          placeholder="이름을 입력해주세요."
          type={'text'}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label>{memberType === 'USER' ? '이메일' : '아이디'}</label>
        <input
          placeholder={`${memberType === 'USER' ? '이메일' : '아이디'} 입력`}
          type={'text'}
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
        />
        {/* --------------------------나이스 인증------------------- */}
        <form name="form_chk" method="get">
          <input type="hidden" name="m" value="checkplusService" />
          {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
          <input
            type="hidden"
            id="encodeData"
            name="EncodeData"
            value={data !== undefined && data}
          />
          <input type="hidden" name="recvMethodType" value="get" />
          {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}
          <BtnBox>
            {/* <Btn isValid={isValid} onClick={fnPopup}> */}
            <Btn isValid={isValid} onClick={onClickButton}>
              비밀번호 찾기
            </Btn>
          </BtnBox>
        </form>
        <Buttons className="firstNextPage" onClick={onSubmitBtn}>
          숨겨진 아이디 버튼
        </Buttons>
      </Container>
    </div>
  );
};

export default PassowrdStep1;

const HeadWrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* padding: 0 15pt; */
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 45.75pt;
`;
const HeaderText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: center;
  color: #222222;
  cursor: pointer;

  @media (max-width: 899.25pt) {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding: 9pt 0;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 15pt;
  & > label {
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin-bottom: 9pt;
  }
  & > label:nth-of-type(2) {
    margin-top: 30pt;
  }
  & > input {
    border: 0.75pt solid ${colors.gray};
    border-radius: 6pt;
    font-weight: 500;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding: 13.5pt 0 13.5pt 12pt;
  }
  & > input::placeholder {
    color: ${colors.lightGray3};
  }
  @media (max-width: 899.25pt) {
    padding: 36pt 15pt 0 15pt;
  }
`;

const BackBtn = styled.div`
  position: relative;
  width: 15.625pt;
  height: 11.25pt;
`;

const BtnBox = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  bottom: 35pt;
  width: 100%;
  padding: 0 15pt;

  @media (min-width: 900pt) {
    position: static;
    padding: 30pt 0 0 0;
  }
`;
const Buttons = styled.button`
  display: none;
`;
const Btn = styled.button<{ isValid: boolean }>`
  background-color: ${({ isValid }) =>
    isValid ? colors.main : colors.lightWhite3};
  border-radius: 6pt;
  width: 100%;
  padding: 15pt 0;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  cursor: ${({ isValid }) => (isValid ? 'pointer' : 'auto')};
`;
