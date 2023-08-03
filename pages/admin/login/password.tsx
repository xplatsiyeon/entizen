import styled from '@emotion/styled';
import { PropsApi } from 'api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import AdminPasswordModal from 'componentsAdmin/Modal/AdminPasswordModal';
import { css } from '@emotion/react';
import AdminRepasswordModal from 'componentsAdmin/Modal/AdminRepasswordModal';
import instance from 'api/interceptor/service';
import { FindKey } from 'pages/signin';

type Existence = {
  isSuccess: boolean;
  data: {
    isExistedManager: boolean;
    manager: {
      managerIdx: number;
      id: string;
      name: string;
      phone: string;
      email: string;
      isRepresentativeAdmin: boolean;
    };
  };
};

interface NiceKey {
  birthDate: string;
  name: string;
  phone: string;
}

const PasswordNotifyPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [modal, setModal] = useState<boolean>(false);
  const [alertModal, setAlertModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [firstEmail, setFirstEmail] = useState('');
  const [secondEmail, setSecondEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [checkPassword, setCheckPassword] = useState<boolean>(true);
  const [checkRePassword, setCheckRePassword] = useState<boolean>(true);
  const [message, setMessage] = useState('');
  const [data, setData] = useState<any>();

  // 관리자 조회시 데이터 저장
  const [success, setSuccess] = useState<Existence>();

  // 관리자 조회 하는지 안하는지
  const [existence, setExistence] = useState<boolean>(false);

  // 이름, 이메일, 아이디 전부 입력해야 조회 버튼 클릭가능
  const [sendStatus, setSendStatus] = useState<boolean>(false);

  const {
    mutate: passwordMutate,
    isLoading: passwordLoading,
    isError: passwordError,
  } = useMutation(
    async (apiInfo: PropsApi) => {
      const { url, data } = apiInfo;
      return await axios({
        method: 'GET',
        url: `/api${url}`,
        // withCredentials: true,
      }).then((res) => res);
    },
    {
      onSuccess: (res) => {
        setSuccess(res.data);
      },
      onError: (err) => {
        // console.log(err);
      },
    },
  );

  const adminExistence = () => {
    // console.log('=======관리자 유무 호출=======');
    if (sendStatus === true) {
      // console.log('=======관리자 유무 호출 조건 충족=======');
      passwordMutate({
        url: `/admin/managers/existence?id=${id}&name=${name}&email=${firstEmail}@${secondEmail}`,
      });
    }
  };

  const {
    mutate: rePasswordMutate,
    isLoading: rePasswordLoading,
    isError: rePasswordError,
  } = useMutation(
    async (apiInfo: PropsApi) => {
      const { url, data } = apiInfo;
      return await instance({
        method: 'PATCH',
        url: `${url}`,
        data,
      }).then((res) => res);
    },
    {
      onSuccess: (res) => {
        setAlertModal(true);
        setMessage(
          '비밀번호 변경이 완료됐습니다.\n확인 버튼을 누르면 로그인 페이지로 이동합니다.',
        );
      },
      onError: (err) => {
        // console.log(err);
        setAlertModal(true);
        setMessage(
          '비밀번호 변경에 실패했습니다.\n다시 한번 확인 부탁드립니다.',
        );
      },
    },
  );

  const repassword = () => {
    if (checkPassword === true && checkRePassword === true) {
      rePasswordMutate({
        url: `/admin/managers/${success?.data?.manager?.managerIdx}/password`,
        data: {
          password: rePassword,
        },
      });
    }
  };

  useEffect(() => {
    // if (id !== '' && name !== '' && firstEmail !== '' && secondEmail !== '') {
    if (id !== '') {
      setSendStatus(true);
    } else {
      setSendStatus(false);
    }
  }, [id, name, firstEmail, secondEmail]);

  // useEffect(() => {
  //   if (success?.data?.isExistedManager === false) {
  //     setModal(true);
  //     setExistence(false);
  //   } else if (success === undefined) {
  //     setExistence(false);
  //   } else if (success?.data?.isExistedManager === true) {
  //     setExistence(true);
  //   }
  // }, [success]);

  useEffect(() => {
    if (1 < password.length && password.length < 8) {
      setCheckPassword(false);
    } else if (17 < password.length) {
      setCheckPassword(false);
    } else {
      setCheckPassword(true);
    }
    if (password !== rePassword) {
      setCheckRePassword(false);
    } else {
      setCheckRePassword(true);
    }
  }, [password, rePassword]);

  // 나이스 인증 팝업 띄어기 (2/3)
  const fnPopup = () => {
    if (typeof window !== 'object') return;
    else {
      if (sendStatus) {
        window.open(
          '',
          'popupChk',
          'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
        );
        document.form_chk.action =
          'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
        document.form_chk.target = 'popupChk';
        document.form_chk.submit();
      } else {
        alert('아이디를 입력해주세요.');
      }
    }
  };

  // 나이스 인증 온클릭 (3/3)
  const onClickNice = () => {
    let key = sessionStorage.getItem('key');
    let data: NiceKey = JSON.parse(key!);
    console.log(data);
    // 아이디와 비밀번호 일치하는지 조건 확인 (추가 작업 필요)
    if (key) {
      setExistence(true);
    }
  };

  // 나이스 인증 (실행 데이터 담기 ) (1/3)
  useEffect(() => {
    instance({
      method: 'post',
      url: `/admin/auth/nice`,
    })
      .then((res) => {
        console.log(res);
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Body>
      <Inner>
        <Wrapper>
          {modal && <AdminPasswordModal setModal={setModal} />}
          {/* ============== 나이스 인증 ==============  */}
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
          </form>
          <button
            className="firstNextPage"
            onClick={onClickNice}
            style={{ display: 'none' }}
          >
            숨겨진 아이디 버튼
          </button>
          {/* ============== 나이스 인증 ==============  */}
          <TitleWrapper>
            <span className="leftText">엔티즌 관리자 시스템</span>
            <span className="rightText">비밀번호 재설정</span>
          </TitleWrapper>
          {existence === false && (
            <InputWrapper>
              {/* 아이디 */}
              <InputBox>
                <LeftTitle>아이디</LeftTitle>
                <InputID
                  type="text"
                  placeholder="아이디"
                  onChange={(e) =>
                    setId(e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''))
                  }
                />
              </InputBox>
              {/* 이름 */}
              {/* <InputBox>
                <LeftTitle>이름</LeftTitle>
                <InputName
                  type="text"
                  placeholder="이름"
                  onChange={(e) => setName(e.target.value)}
                />
              </InputBox> */}
              {/* 이메일 */}
              {/* <InputBox>
                <LeftTitle>이메일</LeftTitle>
                <InputEmail
                  type="text"
                  placeholder="E-mail"
                  onChange={(e) => setFirstEmail(e.target.value)}
                />
                <span style={{ padding: '0 5px' }}>@</span>
                <InputEmail
                  type="text"
                  placeholder=""
                  onChange={(e) => setSecondEmail(e.target.value)}
                />
              </InputBox> */}
            </InputWrapper>
          )}
          {existence === true && (
            <InputWrapper>
              {alertModal && (
                <AdminRepasswordModal
                  setAlertModal={setAlertModal}
                  message={message}
                  size={'lg'}
                />
              )}
              <InputContainer style={{ marginBottom: '40px' }}>
                <LeftTitlePw>재설정 비밀번호</LeftTitlePw>
                <InputBox2>
                  <InputPassword
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''),
                      )
                    }
                    maxLength={16}
                    checkPassword={checkPassword}
                  />
                  <Notice checkPassword={checkPassword}>
                    비밀번호는 8자 이상 16자 이하로 입력해주세요.
                  </Notice>
                </InputBox2>
              </InputContainer>
              <InputContainer>
                <LeftTitlePw>비밀번호 재확인</LeftTitlePw>
                <InputBox2>
                  <InputPassword
                    type="password"
                    pattern="[A-Za-z]+"
                    placeholder="비밀번호 재확인"
                    maxLength={16}
                    value={rePassword}
                    onChange={(e) =>
                      setRePassword(
                        e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''),
                      )
                    }
                    checkRePassword={checkRePassword}
                  />
                  {checkRePassword === false ? (
                    <Notice checkRePassword={checkRePassword}>
                      입력하신 비밀번호가 일치하지 않습니다.
                    </Notice>
                  ) : rePassword.length === 0 ? (
                    <Notice>비밀번호 확인을 위해 한번 더 입력해주세요.</Notice>
                  ) : (
                    <Notice>비밀번호가 일치합니다.</Notice>
                  )}
                </InputBox2>
              </InputContainer>
            </InputWrapper>
          )}
          {existence === false ? (
            <Button
              onClick={() => {
                // adminExistence();
                fnPopup();
              }}
            >
              <span>본인인증</span>
            </Button>
          ) : (
            <Button
              onClick={() => {
                repassword();
              }}
            >
              <span>재설정</span>
            </Button>
          )}
        </Wrapper>
      </Inner>
    </Body>
  );
};

export default PasswordNotifyPage;

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  width: 100%;
  height: 100vh;
  background: #e2e5ed;
  position: relative;
`;
const Inner = styled.div`
  width: 694px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -65%);
  background: #ffffff;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.16);
  border-radius: 4px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px 50px 60px;

  > p {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 150%;
    color: #000000;
    margin-bottom: 8px;
  }
`;
const InputID = styled.input`
  width: 64%;
  height: 28px;
  margin-bottom: 8px;
  padding-left: 10px;
  color: #000000;
  background: #ffffff;
  border: 1px solid #e2e5ed;
  border-radius: 2px;
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #a6a9b0;
  }
`;

const InputName = styled.input`
  width: 50%;
  height: 28px;
  padding-left: 10px;
  color: #000000;
  background: #ffffff;
  border: 1px solid #e2e5ed;
  margin-bottom: 8px;
  border-radius: 2px;
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #a6a9b0;
  }
`;

const InputEmail = styled.input`
  width: 30%;
  height: 28px;
  padding-left: 10px;
  color: #000000;
  background: #ffffff;
  border: 1px solid #e2e5ed;
  border-radius: 2px;
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #a6a9b0;
  }
`;

const InputPassword = styled.input<{
  checkPassword?: boolean;
  checkRePassword?: boolean;
}>`
  width: 364px;
  height: 28px;
  padding-left: 10px;
  color: #000000;
  background: #ffffff;
  border: 1px solid #e2e5ed;
  ${({ checkPassword }) =>
    checkPassword === false &&
    css`
      border: 1px solid #f75015;
    `}
  ${({ checkRePassword }) =>
    checkRePassword === false &&
    css`
      border: 1px solid #f75015;
    `}
  margin-bottom: 8px;
  border-radius: 2px;
  &::placeholder {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #a6a9b0;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  background: #464646;
  margin: 40px auto 0;
  width: 94px;
  height: 40px;
  > span {
    color: white;
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 150%;
    padding: 7px 0;
  }
`;

const PasswordNotify = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  padding: 7px 0;
  color: #222222;
  margin-top: 20px;
  letter-spacing: 0.05em;
  cursor: pointer;
`;

const ErrP = styled.p`
  position: relative;
  display: flex;
  align-items: center;
  &.err {
    margin-top: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    color: #f75015;
  }
  img {
    position: relative;
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-items: inherit;
  margin-bottom: 30px;
  gap: 15px;
  .leftText {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 150%;
    color: #222222;
    text-align: left;
  }
  .rightText {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: #222222;
    text-align: left;
    margin-top: 6px;
  }
`;

const LeftTitle = styled.p`
  font-style: normal;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  margin-bottom: 8px;
  /* width: 50px;
  margin-right: 105px; */
  width: 70px;
  margin-right: 30px;
`;

const LeftTitlePw = styled.p`
  font-style: normal;
  /* font-weight: 500; */
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  margin-bottom: 8px;
  width: 130px;
  margin-right: 50px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin: 0 auto;
  padding: 30px 0;
`;

const Notice = styled.p<{ checkPassword?: boolean; checkRePassword?: boolean }>`
  color: #747780;
  /* #f75015 */
  font-size: 14px;
  ${({ checkPassword }) =>
    checkPassword === false &&
    css`
      color: #f75015;
    `}
  ${({ checkRePassword }) =>
    checkRePassword === false &&
    css`
      color: #f75015;
    `}
`;

const NoticePw = styled.p`
  color: #747780;
  font-size: 14px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: inherit;
`;

const InputBox2 = styled.div`
  display: flex;
  flex-direction: column;
`;
