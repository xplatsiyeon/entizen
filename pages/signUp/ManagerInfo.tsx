import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Btn from 'components/button';
import Input from 'components/input';
import MypageHeader from 'components/mypage/request/header';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import jwt_decode from 'jwt-decode';
import { JwtTokenType } from 'pages/signin';
import axios from 'axios';
import { useMutation } from 'react-query';
import { isTokenPatchApi, isTokenPostApi, isTokenPutApi } from 'api';
import useProfile from 'hooks/useProfile';
import { Key } from 'components/Profile/PasswordModify';
import Modal from 'components/Modal/Modal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useRouter } from 'next/router';
import instance from 'api/interceptor/service';

type Props = {
  setComponent: React.Dispatch<React.SetStateAction<number>>;
};

const SignUpManagerInfo = ({ setComponent }: Props) => {
  const [data, setData] = useState<string>('');
  const [email, setEmail] = useState(''); // 이메일
  const [authCode, setAuthCode] = useState<string>(''); // 이메일 코드
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const token: JwtTokenType = jwt_decode(accessToken);
  const { profile } = useProfile(accessToken);
  // 원버튼 모달
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // 투버튼 모달
  const [isTwoBtnModal, setIsTwoBtnModal] = useState(false);
  const [TwoBtnmodalMessage, setTwoBtnModalMessage] = useState('');

  // 이메일 전송
  const { mutate: emailMutate, isLoading: emailLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: (res) => {
        // console.log(res);
        // console.log(res.data.authCode);

        setModalMessage('인증번호가 이메일로 전송되었습니다.');
        setIsModal(true);
      },
      onError: () => {
        setModalMessage('다시 입력해주세요.');
        setIsModal(true);
      },
    },
  );

  // 이메일 코드
  const { mutate: emailCodeMutate, isLoading: emailCodeLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: (res) => {
        // console.log(res);
        if (res.data.isValidAuthCode) {
          setModalMessage('인증이 완료되었습니다.');
          setIsModal(true);
          setIsValid(true);
        } else {
          setModalMessage('잘못된 인증번호입니다.');
          setIsModal(true);
          setIsValid(false);
        }
      },
      onError: () => {
        setModalMessage('잘못된 인증번호입니다.');
        setIsModal(true);
        setIsValid(false);
      },
    },
  );
  // 담당자 정보 변경
  const { mutate: changeMutate, isLoading: changeLoading } = useMutation(
    isTokenPatchApi,
    {
      onSuccess: (res) => {
        setModalMessage('담당자가 변경되었습니다.');
        setIsModal(true);
      },
      onError: () => {
        setModalMessage('변경이 실패했습니다. 다시 시도해주세요.');
        setIsModal(true);
      },
    },
  );
  // 원버튼 모달 확인
  const onClickModal = () => {
    if (modalMessage === '담당자가 변경되었습니다.') {
      setComponent(0);
    } else {
      setIsModal(false);
    }
  };
  // 투버튼 모달 나가기
  const TwoBtnModalExit = () => setIsTwoBtnModal(false);
  // 나이스 인증 후 클릭되는 함수 (투버튼 수락)
  const onClickNice = () => {
    setTwoBtnModalMessage('담당자 정보가 변경됐습니다.');
    setIsTwoBtnModal(true);
  };
  // 담당자 정보 수정하기
  const onCickBtn = () => {
    const key: Key = JSON.parse(sessionStorage.getItem('key')!);
    if (profile?.phone.toString() === key?.phone.toString()) {
      changeMutate({
        url: '/members',
        data: {
          name: key.name,
          phone: key.phone.toString(),
          email: email,
        },
      });
    } else {
      setModalMessage(
        '이름과 인증정보가 일치하지 않습니다.\n다시 입력해주세요.',
      );
      setIsModal(true);
    }

    // if (name === key?.name) {
    //   changeMutate({
    //     url: '/members',
    //     data: {
    //       name: name,
    //       phone: key.phone.toString(),
    //       email: email,
    //     },
    //   });
    // } else {
    //   setModalMessage(
    //     '이름과 인증정보가 일치하지 않습니다.\n다시 입력해주세요.',
    //   );
    //   setIsModal(true);
    // }
  };

  // 이메일인증
  const onClickEmail = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    emailMutate({
      url: '/mail/auth',
      data: {
        email,
      },
    });
  };

  // 이메일 인증코드 확인
  const certifyEmailCode = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isEmailCodeValid) {
      emailCodeMutate({
        url: '/mail/auth/validation',
        data: {
          email,
          authCode,
        },
      });
    }
  };

  // 나이스 인증 팝업창 열기
  const fnPopup = (event: any) => {
    console.log('나이스 인증');
    console.log(event);
    const { id } = event.currentTarget;
    console.log(`id -> ${id}`);
    if (typeof window !== 'object') return;
    else {
      window.open(
        '',
        'popupChk',
        'width=500, height=550, top=100, left=100, fullscreen=no, menubar=no, status=no, toolbar=no, titlebar=yes, location=no, scrollbar=no',
      );
      let cloneDocument = document as any;
      cloneDocument.form_chk.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_chk.target = 'popupChk';
      cloneDocument.form_chk.submit();
    }
  };

  // 나이스 인증 데이터 불러오기
  useEffect(() => {
    instance({
      // headers: {
      //   local: process.env.NEXT_PUBLIC_LOCAL!,
      // },
      method: 'post',
      url: `/auth/nice`,
      data: { memberType: token.memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error('나이스 인증 에러 발생');
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // 이메일 유효성 검사
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;

  useEffect(() => {
    reg_email.test(email) ? setIsEmailValid(true) : setIsEmailValid(false);
    authCode.length === 7
      ? setIsEmailCodeValid(true)
      : setIsEmailCodeValid(false);
  }, [email, authCode]);

  useEffect(() => {
    setIsEmailCodeValid(false);
    setIsValid(false);
  }, [email]);
  return (
    <Wrapper>
      {isModal && (
        <Modal
          text={modalMessage}
          click={onClickModal}
          setIsModal={setIsModal}
        />
      )}
      {isTwoBtnModal && (
        <TwoBtnModal
          exit={TwoBtnModalExit}
          leftBtnColor={'#A6A9B0'}
          leftBtnText={'아니요'}
          rightBtnColor={colors.main1}
          rightBtnText={'확인'}
          text={TwoBtnmodalMessage}
          leftBtnControl={TwoBtnModalExit}
          rightBtnControl={onCickBtn}
        />
      )}
      <HeaderWrap>
        <MypageHeader
          handle={true}
          back={true}
          title={''}
          handleOnClick={() => setComponent(0)}
          handleBackClick={() => setComponent(0)}
        />
      </HeaderWrap>
      <Notice variant="h3">
        진행할 담당자 정보를
        <br />
        입력해주세요
      </Notice>
      <Remark variant="subtitle1">고객에게 전달되는 정보예요!</Remark>
      <form
        name="form_chk"
        method="get"
        onSubmit={() => {
          false;
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <input type="hidden" name="m" value="checkplusService" />
        {/* <!-- 필수 데이타로, 누락하시면 안됩니다. --> */}
        <input type="hidden" id="encodeData" name="EncodeData" value={data} />
        <input type="hidden" name="recvMethodType" value="get" />
        {/* <!-- 위에서 업체정보를 암호화 한 데이타입니다. --> */}

        <Form>
          <label>담당자 이메일</label>
          <div>
            <Input
              placeholder="이메일 입력"
              value={email}
              setValue={setEmail}
            />
          </div>
          <input type="hidden" name="test" value="" />
          <OverlapBtn
            style={{
              top: '25.5pt',
            }}
            isEmailValid={isEmailValid}
            onClick={onClickEmail}
            type="button"
            onSubmit={() => false}
          >
            인증
          </OverlapBtn>

          <Input
            placeholder="이메일 인증번호 입력"
            value={authCode}
            setValue={setAuthCode}
          />
          <OverlapBtn
            isEmailValid={isEmailCodeValid}
            onClick={certifyEmailCode}
            type="button"
          >
            확인
          </OverlapBtn>
        </Form>
        <Btn
          marginTop="140"
          // text={'담당자 변경'}
          text={'본인인증하기'}
          isClick={isValid}
          handleClick={fnPopup}
        />
      </form>
      {/* <Buttons className="firstNextPage" onClick={onClickNice}> */}
      <Buttons className="firstNextPage" onClick={onCickBtn}>
        숨겨진 비밀번호 버튼
      </Buttons>
    </Wrapper>
  );
};

export default SignUpManagerInfo;

const Wrapper = styled.div`
  position: relative;
  //margin: 0pt 31.875pt;
  padding-top: 42pt;
  height: 100%;
  @media (max-width: 899.25pt) {
    margin: 0 15pt 15pt 15pt;
    padding-top: 0;
  }
`;

const HeaderWrap = styled.div`
  margin-left: -15pt;
`;

const Notice = styled(Typography)`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 21pt;
  line-height: 33pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Remark = styled(Typography)`
  margin-top: 9pt;
  color: #747780;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24pt;
  position: relative;
  /* border: 1px solid red; */
  /* height: 100%; */
  & > label {
    color: ${colors.main2};
    font-size: 12pt;
    line-height: 12px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
`;

const OverlapBtn = styled.button<{ isEmailValid: boolean }>`
  position: absolute;
  right: 8pt;
  top: 77pt;
  background: ${({ isEmailValid }) =>
    isEmailValid ? colors.main : colors.lightWhite3};
  color: ${colors.lightWhite};
  border-radius: 6pt;
  padding: 7.5pt 9pt;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;
  cursor: pointer;
`;
const Buttons = styled.button`
  display: none;
`;
