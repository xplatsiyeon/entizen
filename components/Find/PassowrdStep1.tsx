import styled from '@emotion/styled';
import { isTokenPostApi } from 'api';
import axios from 'axios';
import Modal from 'components/Modal/Modal';
import { useRouter } from 'next/router';
import { FindKey } from 'pages/signin';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import colors from 'styles/colors';

interface UserInfo {
  data: {
    isSuccess: boolean;
    data: {
      member: {
        memberIdx: number;
        memberType: string;
      } | null;
    };
  };
}

type Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const PassowrdStep1 = ({ setStep }: Props) => {
  const router = useRouter();
  // let key = localStorage.getItem('key');
  // let data = JSON.parse(key!);
  const [data, setData] = useState<any>();
  const loginTypeEnList: string[] = ['USER', 'COMPANY'];

  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [ModalMsg, setModalMsg] = useState('');

  const { mutate, isLoading } = useMutation(isTokenPostApi, {
    onSuccess: (data: UserInfo) => {
      if (data.data.data.member !== null) {
        setStep(1);
      } else {
        setIsModal(true);
        setModalMsg(
          '아이디와 회원정보가 일치하지 않습니다.\n다시 입력해주세요.',
        );
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const colseModal = () => setIsModal(false);

  // 버튼 클릭
  const onSubmitBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let key = localStorage.getItem('key');
    let data: FindKey = JSON.parse(key!);

    if (isValid) {
      if (data.name !== name || data.id !== id) {
        setIsModal(true);
        setModalMsg(
          '아이디와 회원정보가 일치하지 않습니다.\n다시 입력해주세요.',
        );
      } else {
        mutate({
          url: '/members/verification/identity',
          data: {
            name,
            id,
          },
        });
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
    const memberType = router.query.loginType;
    console.log('🔥memberType=>', memberType);
    axios({
      method: 'post',
      url: 'https://api.entizen.kr/api/auth/nice',
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  // useEffect(() => {
  //   console.log('🔥 data check ==>>', data);
  // }, [data]);

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
      <HeadWrapper>
        <Header>
          <HeaderText
            onClick={() => router.push('/signin')}
          >{`${'<'}`}</HeaderText>
          <HeaderText style={{ margin: '0 auto' }}>비밀번호 찾기</HeaderText>
        </Header>
        <Container>
          <label>이름</label>
          <input
            placeholder="이름을 입력해주세요."
            type={'text'}
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <label>아이디</label>
          <input
            placeholder="아이디 입력"
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
              <Btn isValid={isValid} onClick={fnPopup}>
                비밀번호 찾기
              </Btn>
            </BtnBox>
          </form>
          <Buttons className="firstNextPage" onClick={onSubmitBtn}>
            숨겨진 아이디 버튼
          </Buttons>
        </Container>
      </HeadWrapper>
    </div>
  );
};

export default PassowrdStep1;

const HeadWrapper = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Header = styled.div`
  display: flex;
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
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
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
