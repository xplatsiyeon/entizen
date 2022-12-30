import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import Warning from 'public/adminImages/exclamation-mark.svg';
import Image from 'next/image';
import useDebounce from 'hooks/useDebounce';
import { api } from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

interface ValidatedId {
  isMember: boolean;
  isSuccess: boolean;
}

const AddAdminAccount = () => {
  const queryClient = useQueryClient();
  const [idInput, setIdInput] = useState<string>('');
  const [pwInput, setPwInput] = useState<string>('');
  const [checkPw, setCheckPw] = useState<string>('');
  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [phoneFirst, setPhoneFirst] = useState<string>('');
  const [phoneSecond, setPhoneSecond] = useState<string>('');
  const [emailFirst, setEmailFirst] = useState<string>('');
  const [emailSecond, setEmailSecond] = useState<string>('');
  const [idLength, setIdLength] = useState(false);
  const [isChangeColor, setIsChangeColor] = useState(false);
  const [initIdAlert, setInitIdAlert] = useState(false);
  // 패스워드 보여주기 true false
  const [pwShow, setPwShow] = useState<boolean[]>([false, false, false]);

  // 아이디 중복 검사 및 비밀번호 유효성 검사 해야함
  // 이메일 중복 검사도 해야함
  // 관리자 아이디 생성하기 눌렀을때 나오는 모달창 추가

  const { data, refetch } = useQuery<ValidatedId>(
    'ValidIdCheck',
    () =>
      api({
        method: 'GET',
        endpoint: `/admin/managers`,
      }),
    {
      enabled: false,
      onError: (error) => {
        console.log('----아이디 중복체크----');
        console.log(error);
        alert('다시 시도해주세요.');
      },
    },
  );

  const {
    mutate: adminAccountMutate,
    isLoading: adminAccountLoading,
    error: adminAccountError,
  } = useMutation(api, {
    onSuccess: () => {
      console.log('성공');
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log('----회원가입 실패----');
      console.log(error);
      alert('회원가입 실패했습니다. 다시 시도해주세요.');
    },
  });

  // 디바운스를 이용한 유효성 검사
  const passwords = useDebounce(pwInput, 500);
  const checkPassword = useDebounce(checkPw, 500);
  // 인풋 값 변화, 중복확인 색 변경
  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const idRegExp = /^[a-zA-z0-9]{4,12}$/; //아이디 유효성 검사
    if (e.target.name === 'id') {
      setInitIdAlert(false);
      setIdInput(value);
      idRegExp.test(value) ? setIsChangeColor(true) : setIsChangeColor(false);
    }
    if (e.target.name === 'pw') setPwInput(value);
    if (e.target.name === 'checkPw') setCheckPw(value);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.isPropagationStopped();
  };

  const overlabCheck = () => {
    setInitIdAlert(true);
    refetch();
  };

  // 기업 회원가입 온클릭
  const handleCompanyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (checkSamePw) {
      adminAccountMutate({
        method: 'POST',
        endpoint: '/admin/managers',
        data: {
          id: idInput,
          password: checkPw,
          name: name,
          phone: `010${phoneFirst}${phoneSecond}`,
          email: `${emailFirst}${emailSecond}`,
        },
      });
    }
  };
  const handleShowBtn = (id: number) => {
    let temp = [...pwShow];
    temp[id] = !temp[id];
    setPwShow(temp);
  };
  // 유효성 검사
  useEffect(() => {
    if (passwords) {
      let check1 =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/.test(
          passwords,
        );
      setCheckedPw(check1);
    }
    if (checkPassword) {
      if (passwords !== checkPassword) setCheckSamePw(false);
      else setCheckSamePw(true);
    }
    console.log(passwords, checkPassword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwords, checkPassword]);

  // 중복확인 버튼 비활성화
  useEffect(() => {
    if (idInput.length <= 3) {
      setIsChangeColor(false);
      setIdLength(true);
    } else {
      setIdLength(false);
      setIsChangeColor(true);
    }
  }, [initIdAlert, idInput]);

  return (
    <Wrapper>
      <AdminHeader type="main" title="관리자 관리" subTitle="관리자 등록" />
      <Manager>
        <li className="row">
          <label className="label">아이디</label>
          <Input
            placeholder="아이디"
            onChange={handleIdChange}
            value={idInput}
            width={364}
          />
          {/* <Image src={Warning} alt="warning" /> */}
        </li>
        <NoticeText>아이디는 2자 이상 입력해주세요</NoticeText>
        {data?.isMember === false && initIdAlert && !idLength && (
          <NoticeText>사용가능한 아이디입니다.</NoticeText>
        )}
        {data?.isMember === true && initIdAlert && !idLength && (
          <NoticeText>이미 사용중인 아이디입니다.</NoticeText>
        )}
        {data?.isMember === false && initIdAlert && idLength && (
          <NoticeText>2글자 이상 입력해주세요</NoticeText>
        )}
        <li className="row">
          <label className="label">비밀번호</label>
          <Input
            placeholder="비밀번호"
            width={364}
            onChange={handleIdChange}
            value={pwInput}
            onFocus={(e) => setPwSelected(true)}
            onBlur={(e) => setPwSelected(false)}
          />
          {!checkedPw && pwInput.length > 4 && (
            <Image src={Warning} alt="warning" />
          )}
        </li>
        <NoticeText>비밀번호는 8자 이상 16자 이하로 입력해주세요.</NoticeText>
        {!checkedPw && pwInput.length > 4 ? (
          <NoticeText>영문,숫자,특수문자 조합 10자 이상</NoticeText>
        ) : (
          <></>
        )}

        <li className="row">
          <label className="label">비밀번호 확인</label>
          <Input
            placeholder="비밀번호 확인"
            width={364}
            value={checkPw}
            onChange={handleIdChange}
            onFocus={(e) => setCheckPwSelected(true)}
            onBlur={(e) => setCheckPwSelected(false)}
          />
          {/* <Image src={Warning} alt="warning" /> */}
        </li>
        <NoticeText>비밀번호 확인을 위해 한번 더 입력해주세요.</NoticeText>
        {!checkSamePw && checkPw.length > 4 ? (
          <NoticeText>비밀번호를 확인해주세요</NoticeText>
        ) : (
          <></>
        )}
        <li className="row">
          <label className="label">이름</label>
          <TextInput
            placeholder="이름"
            width={168}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {/* <Image src={Warning} alt="warning" /> */}
        </li>
        <li className="row">
          <label className="label">전화번호</label>
          <TextInput placeholder="010" width={55} readOnly />
          <Hyphen />
          <TextInput
            placeholder=""
            width={55}
            value={phoneFirst}
            maxLength={4}
            onChange={(e) => {
              setPhoneFirst(
                e.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1'),
              );
            }}
          />
          <Hyphen />
          <TextInput
            placeholder=""
            width={55}
            value={phoneSecond}
            maxLength={4}
            onChange={(e) => {
              setPhoneSecond(
                e.target.value
                  .replace(/[^0-9.]/g, '')
                  .replace(/(\..*)\./g, '$1'),
              );
            }}
          />
          {/* <Image src={Warning} alt="warning" /> */}
        </li>
        <li className="row">
          <label className="label">이메일</label>
          <TextInput
            placeholder="E-mail"
            width={168}
            onChange={(e) => {
              setEmailFirst(e.target.value);
            }}
          />
          <EmailText>@</EmailText>
          <TextInput
            placeholder=""
            width={168}
            onChange={(e) => {
              setEmailSecond(e.target.value);
            }}
          />
          {/* <Image src={Warning} alt="warning" /> */}
        </li>
      </Manager>
      <BtnBox>
        <Btn onClick={handleCompanyClick}>관리자 아이디 생성하기</Btn>
      </BtnBox>
    </Wrapper>
  );
};

export default AddAdminAccount;
const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 10;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

// const Wrapper = styled.div`
//   width: 964px;
//   display: flex;
//   flex-direction: column;
// `;

const Wrapper = styled.div`
  padding-left: 18pt;
`;

const Line = styled.div`
  width: 946px;
  height: 2px;
`;

const Manager = styled.ul`
  border-top: 2px solid #464646;
  border-bottom: 2px solid #e7e7e7;
  padding: 20px 0;
  li {
    /* gap: 7.5pt; */
    display: flex;
    align-items: center;
    background: #ffffff;
    /* border: 1px solid ${colors.lightWhite3}; */
    height: 30pt;
    padding: 4pt 0 4pt 12pt;
    width: 100%;
  }
  .searchInput {
    border: 1px solid ${colors.lightWhite3};
    height: 100%;
    width: 274.5pt;
    padding-left: 10px;
  }
  .row {
    width: 946px;
  }
  .label {
    min-width: 94px;
    margin-right: 24px;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.main2};
  }
  .checkBoxContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-right: 16px;
  }
  .checkBox {
    width: 16px;
    height: 16px;
  }
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Btn = styled.button`
  padding: 5px 19px;
  background: #464646;
  border: none;
  color: ${colors.lightWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;

const Input = styled(TextField)<{ width?: number; warning?: boolean }>`
  /* width: 364px; */
  width: ${({ width }) => `${width}px`};
  height: 18px;
  outline: none;
  resize: none;
  background: none;
  /* border: 1px solid #e2e5ed; */
  margin-right: 10px;
  border: ${({ warning }) =>
    warning ? '1px solid #F75015' : '1px solid #e2e5ed'};
  border-radius: 2px;
  ::placeholder {
    padding-left: 5px;
    color: #a6a9b0;
  }
`;

const TextInput = styled.textarea<{ width?: number; warning?: boolean }>`
  /* width: 364px; */
  width: ${({ width }) => `${width}px`};
  height: 28px;
  outline: none;
  resize: none;
  background: none;
  /* border: 1px solid #e2e5ed; */
  margin-right: 10px;
  border: ${({ warning }) =>
    warning ? '1px solid #F75015' : '1px solid #e2e5ed'};
  border-radius: 2px;
  ::placeholder {
    padding-left: 5px;
    color: #a6a9b0;
  }
`;

const InputPhone = styled.input`
  width: 55px;
  height: 28px;
  border: 1px solid #e2e5ed;
`;

const Hyphen = styled.div`
  width: 7px;
  margin: 0 6px;
  border: 1px solid #747780;
`;

const NoticeText = styled.div<{ warning?: boolean }>`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 400;
  /* color: #747780; */
  color: ${({ warning }) => (warning ? 'F75015' : '#747780')};
  line-height: 150%;
  padding-left: 135px;
  padding-bottom: 20px;
`;

const EmailText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #747780;
  line-height: 150%;
  margin: 0 5px;
`;
