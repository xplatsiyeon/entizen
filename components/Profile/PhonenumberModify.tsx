import styled from '@emotion/styled';
import colors from 'styles/colors';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BackImg from 'public/images/back-btn.svg';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useProfile from 'hooks/useProfile';
import useDebounce from 'hooks/useDebounce';
import { useMutation } from 'react-query';
import { isPostApi, isTokenPatchApi } from 'api';
import Modal from 'components/Modal/Modal';
interface Key {
  id: string;
  isMember: boolean;
  memberIdx: number;
  name: string;
  phone: string;
}
interface UserInfo {
  isSuccess: boolean;
  id: string;
  name: string;
  phone: string;
}
type Props = {
  setTabNumber: React.Dispatch<React.SetStateAction<number>>;
};
const PhoneNumberModify = ({ setTabNumber }: Props) => {
  const router = useRouter();
  const key: Key = JSON.parse(localStorage.getItem('key')!);
  const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
  const { selectedType } = useSelector((state: RootState) => state.selectType);
  const { profile, invalidate, isLoading } = useProfile(accessToken);

  const [data, setData] = useState<any>();
  const [checkSns, setCheckSns] = useState<boolean>(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState<string>();
  const [existingPassword, setExistingPassword] = useState('');
  // -1: 초기값, 0: 비밀번호 체크 성공, 1: 비밀번호 체크 실패
  const [checkPassword, setCheckPassword] = useState(-1);

  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const value = useDebounce(existingPassword, 1500);
  const memeberType = JSON.parse(localStorage.getItem('MEMBER_TYPE')!);
  const userID = JSON.parse(localStorage.getItem('USER_ID')!);

  // 비밀번호 체크 mutate
  const { mutate: passowrdCheckMutate } = useMutation(isPostApi, {
    onSuccess: (res) => {
      if (res.data.isSuccess === true) {
        localStorage.setItem(
          'ACCESS_TOKEN',
          JSON.stringify(res.data.accessToken),
        );
        localStorage.setItem(
          'REFRESH_TOKEN',
          JSON.stringify(res.data.refreshToken),
        );
        setCheckPassword(0);
      } else {
        setCheckPassword(1);
      }
    },
    onError: (error) => {
      console.log('🔥error==>', error);
      setCheckPassword(1);
    },
  });
  // 휴대폰 번호 변경 mutate
  const { mutate: changePhoneMutate } = useMutation(isTokenPatchApi, {
    onSuccess: (res) => {
      setIsModal(true);
      setModalMessage('휴대폰 번호가 변경되었습니다.');
    },
    onError: (error: any) => {
      const { errorCode, message, isSuccess } = error?.response?.data;
      if (errorCode === 1008 && isSuccess === false) {
        setIsModal(true);
        setModalMessage(message);
      }
    },
  });

  // 비밀번호 검사
  useEffect(() => {
    if (value.length > 0) {
      passowrdCheckMutate({
        url: '/members/login',
        data: {
          memberType: memeberType,
          id: userID,
          password: value,
        },
      });
    }
  }, [value]);

  const phoneNumber = profile?.phone
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);

  // 휴대폰 변경
  // const HandlePhone = async () => {
  //   const key: Key = JSON.parse(localStorage.getItem('key')!);
  //   const newnumber = key?.phone
  //     .replace(/[^0-9]/g, '')
  //     .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
  //   setNewPhoneNumber(newnumber);
  // };

  const onClickBtn = () => {
    const key: Key = JSON.parse(localStorage.getItem('key')!);
    if (checkPassword === 0) {
      changePhoneMutate({
        url: '/members/phone',
        data: {
          name: key.name,
          phone: key.phone,
        },
      });
    }
  };

  // 나이스 인증 2
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
      cloneDocument.form_phone.action =
        'https://nice.checkplus.co.kr/CheckPlusSafeModel/checkplus.cb';
      cloneDocument.form_phone.target = 'popupChk';
      cloneDocument?.form_phone?.submit();
    }
  };
  // 나이스 인증 1
  useEffect(() => {
    const memberType = selectedType;
    axios({
      method: 'post',
      url: 'https://api.entizen.kr/api/auth/nice',
      data: { memberType },
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
  // sns 체크
  useEffect(() => {
    const snsMember = JSON.parse(localStorage.getItem('SNS_MEMBER')!);
    if (snsMember) {
      setCheckSns(snsMember);
    }
    console.log('⭐️ SNS 데이터 확인 ~라인 121');
    console.log(checkSns);
    console.log(snsMember);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 나이스 인증 테스트
  useEffect(() => {
    console.log('⭐️ 나이스 인증 테스트 ~라인 132');
    console.log(key);
    console.log('나이스 인증 폰번호 받아오기 ->' + newPhoneNumber);
  }, [newPhoneNumber, key]);

  return (
    <React.Fragment>
      {isModal && (
        <Modal
          click={() => {
            modalMessage === '휴대폰 번호가 변경되었습니다.'
              ? router.push('/')
              : setIsModal(false);
          }}
          text={modalMessage}
        />
      )}
      <WebBody>
        <Inner>
          <Wrapper>
            <WebHidden>
              <Header>
                <div className="img-item" onClick={() => setTabNumber(2)}>
                  <Image
                    style={{
                      cursor: 'pointer',
                      width: '18pt',
                      height: '18pt',
                    }}
                    src={BackImg}
                    alt="btn"
                  />
                </div>
                <span className="text">휴대폰 번호 변경</span>
              </Header>
            </WebHidden>
            <Title>기존 비밀번호</Title>
            <InputBox>
              <Input
                type="password"
                placeholder="기존 비밀번호 입력"
                value={existingPassword}
                onChange={(e) => setExistingPassword(e.currentTarget.value)}
              />
            </InputBox>
            {checkPassword === 1 && (
              <AlertMessage color={colors.sub4}>
                비밀번호가 일치하지 않습니다.
              </AlertMessage>
            )}
            <Title>휴대폰 번호</Title>
            <Notice>
              휴대폰 번호 변경 시 가입하신 분의 명의로 된 <br />
              번호로만 변경이 가능합니다.
            </Notice>
            <InputBox>
              {newPhoneNumber ? (
                <Input type="text" readOnly placeholder={newPhoneNumber} />
              ) : (
                <Input type="text" readOnly placeholder={phoneNumber} />
              )}
            </InputBox>

            {newPhoneNumber && (
              <AlertMessage color={colors.main}>
                해당 번호로 변경됩니다.
              </AlertMessage>
            )}
            {/* 나이스 인증을 위한 form */}
            <form name="form_phone" method="get">
              <input type="hidden" name="m" value="checkplusService" />
              <input
                type="hidden"
                id="encodeData"
                name="EncodeData"
                value={data !== undefined && data}
              />
              <input type="hidden" name="recvMethodType" value="get" />
              <BtnBox>
                <Btn checkPassword={checkPassword} onClick={fnPopup}>
                  수정완료
                </Btn>
              </BtnBox>
            </form>
            {/* 숨은 버튼 */}
            <Buttons className="firstNextPage" onClick={onClickBtn}>
              숨겨진 비밀번호 버튼
            </Buttons>
          </Wrapper>
        </Inner>
      </WebBody>
    </React.Fragment>
  );
};

export default PhoneNumberModify;

const WebHidden = styled.div`
  @media (min-width: 900pt) {
    display: none;
  }
`;

const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .img-item {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
  }
  @media (min-width: 900pt) {
    width: 580.5pt;
    height: auto;
  }
  @media (max-width: 899.25pt) {
    width: 100vw;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  width: 100%;
  background: ${colors.lightWhite};
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  padding: 32.25pt 0 42pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    margin: 0;
    padding: 0;
    border-radius: 0;
  }

  @media (min-width: 900pt) {
    padding-bottom: 425pt;
  }
`;
const Wrapper = styled.div`
  position: relative;
  margin: 0pt 31.875pt;
  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-top: 27pt;
  padding-left: 15pt;
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  padding-top: 9pt;
  padding-left: 15pt;
`;
const AlertMessage = styled.p<{ color: string }>`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${({ color }) => color};
  padding-left: 15pt;
  padding-top: 9pt;
`;
const InputBox = styled.div`
  position: relative;
  padding: 0 15pt;
`;
const Input = styled.input`
  padding: 13.5pt 0;
  margin-top: 9pt;
  border: 0.75pt solid ${colors.gray};
  border-radius: 6pt;
  width: calc(100% - 15pt);
  position: relative;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  padding-left: 15pt;
  width: 100%;
  &::placeholder {
    color: ${colors.lightGray4};
  }
`;
const BtnBox = styled.div`
  position: fixed;
  box-sizing: border-box;
  left: 0;
  bottom: 30pt;
  width: 100%;
  padding: 0 15pt;
  /* width: 100%; */
  @media (min-width: 900pt) {
    position: relative;
    top: 300pt;
  }
`;
const Btn = styled.button<{ checkPassword: number }>`
  cursor: pointer;
  background: ${({ checkPassword }) =>
    checkPassword === 0 ? colors.main : colors.gray};
  border-radius: 6pt;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0;

  :hover {
    background-color: ${colors.main};
  }
`;
const InputBtn = styled.span`
  background: ${colors.gray};
  border-radius: 6pt;
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  text-align: right;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  padding: 7.5pt 9pt;
  position: absolute;
  top: 15pt;
  right: 21pt;
  cursor: pointer;

  :hover {
    background-color: ${colors.main1};
  }
`;
const Buttons = styled.button`
  display: none;
`;
