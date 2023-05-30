import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import colors from 'styles/colors';
import AdminHeader from 'componentsAdmin/Header';
import Warning from 'public/adminImages/exclamation-mark.svg';
import Image from 'next/image';
import useDebounce from 'hooks/useDebounce';
import { api, isTokenAdminPostApi } from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import { useDispatch } from 'react-redux';
import { adminPageNumberAction } from 'storeAdmin/adminPageNumberSlice';

interface Validated {
  isSuccess: boolean;
  data: { isDuplicated: boolean };
}

type Props = {
  setIsDetail?: React.Dispatch<React.SetStateAction<boolean>>;
  detatilId?: string;
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
};

type IDDupl = {
  isSuccess: boolean;
  data: {
    isDuplicated: boolean;
  };
};

const AddAdminAccount = ({
  setIsDetail,
  detatilId,
  setNowHeight,
  setNumber,
}: Props) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // 관리자 추가 성공했을때 컴포넌트 바꿀거임
  const [changeNumber, setChangeNumber] = useState(false);

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
  const [isEmailChangeColor, setIsEmailChangeColor] = useState(false);
  const [initIdAlert, setInitIdAlert] = useState(false);
  const [initEmailAlert, setInitEmailAlert] = useState(false);
  // 패스워드 보여주기 true false
  const [pwShow, setPwShow] = useState<boolean[]>([false, false, false]);

  // 백엔드에서 아이디 & 이메일 중복검사 성공시 저장
  const [idDuplicate, setIdDuplicated] = useState<IDDupl>();
  const [emailDuplicate, setEmailDuplicated] = useState<IDDupl>();

  const [finalCheck, setFinalCheck] = useState(false);

  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);

  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');

  // 이메일 유효성 검사

  const [isEmailCodeValid, setIsEmailCodeValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const reg_email =
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  const email = `${emailFirst}@${emailSecond}`;

  // 아이디 중복 검사 및 비밀번호 유효성 검사 해야함
  // 이메일 중복 검사도 해야함
  // 관리자 아이디 생성하기 눌렀을때 나오는 모달창 추가

  // 아이디 중복검사
  const {
    mutate: postIdMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: (res) => {
      // console.log('----아이디 중복체크 성공----');
      setIdDuplicated(res.data);
    },
    onError: (error) => {
      // console.log('----아이디 중복체크 실패----');
      // console.log(error);
      alert('다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const idPostBtnControll = () => {
    postIdMutate({
      url: `/admin/managers/id`,
      data: {
        id: idInput,
      },
    });
  };

  // 이메일 중복검사
  const {
    mutate: postEmailMutate,
    isLoading: postEmailLoading,
    isError: postEmailError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: (res) => {
      // console.log('----아이디 중복체크 성공----');
      setEmailDuplicated(res.data);
    },
    onError: (error) => {
      // console.log('----아이디 중복체크 실패----');
      // console.log(error);
      alert('다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const emailPostBtnControll = () => {
    postEmailMutate({
      url: `/admin/managers/email`,
      data: {
        email: email,
      },
    });
  };

  const {
    mutate: adminAccountMutate,
    isLoading: adminAccountLoading,
    error: adminAccountError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      setMessageModal(true);
      setMessage('추가가 완료 됐습니다.');
    },
    onError: (error) => {
      // console.log('----회원가입 실패----');
      // console.log(error);
      setMessageModal(true);
      setMessage('추가 요청을 실패했습니다.\n다시 시도해주세요.');
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

  // replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, '')
  const handleMouseDownPassword = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.isPropagationStopped();
  };

  const overlabCheck = () => {
    setInitIdAlert(true);
    // idRefetch();
  };

  const overEmailCheck = () => {
    setInitEmailAlert(true);
  };

  const handleEmailCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // 이메일 유효성 검사
    // 문제: 한글입력 안되게 했는데 첫번째 문자가 안지워짐...
    if (e.target.name === 'emailFirst') {
      setEmailFirst(value);
      setInitEmailAlert(false);
    } else if (e.target.name === 'emailSecond') {
      setEmailSecond(value);
      setInitEmailAlert(false);
    }
  };

  // 관리자 등록  온클릭
  const handleCompanyClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (finalCheck) {
      adminAccountMutate({
        url: '/admin/managers',
        data: {
          id: idInput,
          password: checkPw,
          name: name,
          phone: `010${phoneFirst}${phoneSecond}`,
          email: `${emailFirst}@${emailSecond}`,
        },
      });
    }
  };
  const handleShowBtn = (id: number) => {
    let temp = [...pwShow];
    temp[id] = !temp[id];
    setPwShow(temp);
  };
  // 비밀번호 유효성 검사
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwords, checkPassword]);

  // 아이디 중복확인 버튼 비활성화
  useEffect(() => {
    if (idInput.length <= 3) {
      setIdLength(true);
    } else {
      setIdLength(false);
    }
  }, [idInput]);

  // 이메일 중복확인 버튼 비활성화
  useEffect(() => {
    if (
      emailFirst.length > 0 &&
      emailSecond.length > 1 &&
      isEmailValid === true
    ) {
      setIsEmailChangeColor(true);
    } else {
      setIsEmailChangeColor(false);
    }
  }, [emailFirst, emailSecond, isEmailValid]);

  // 유효성 검사
  useEffect(() => {
    reg_email.test(email) ? setIsEmailValid(true) : setIsEmailValid(false);
  }, [email]);

  useEffect(() => {
    if (setNowHeight) {
      setNowHeight(window.document.documentElement.scrollHeight);
    }
  }, []);

  // 관리자 등록 완료 되고 확인버튼 누르면 관리자 리스트 목록 페이지로 이동
  useEffect(() => {
    if (changeNumber) {
      dispatch(adminPageNumberAction.setIsAdminPage(2));
    }
  }, [changeNumber]);

  // 모든 요건 충족되면 관리자 아이디 생성 가능
  useEffect(() => {
    if (
      idDuplicate?.data?.isDuplicated === false &&
      initIdAlert === true &&
      idLength === false &&
      isEmailChangeColor === true &&
      emailDuplicate?.data?.isDuplicated === false &&
      checkSamePw === true &&
      name.length !== 0 &&
      phoneFirst.length === 4 &&
      phoneSecond.length === 4
    ) {
      setFinalCheck(true);
    } else {
      setFinalCheck(false);
    }
  }, [
    idDuplicate,
    emailDuplicate,
    checkSamePw,
    name,
    phoneFirst,
    phoneSecond,
    isEmailChangeColor,
  ]);

  // console.log(
  //   ' emailDuplicate?.data?.isDuplicated',
  //   emailDuplicate?.data?.isDuplicated,
  // );

  const iconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <Typography
          onClick={() => setPwInput('')}
          onMouseDown={handleMouseDownPassword}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: `${colors.main}`,
            cursor: 'pointer',
          }}
          variant="subtitle1"
          onClick={() => handleShowBtn(0)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[0] ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };

  const secondIconAdorment = {
    endAdornment: (
      <InputAdornment position="start">
        <Typography
          onClick={() => setCheckPw('')}
          onMouseDown={handleMouseDownPassword}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CancelRoundedIcon
            sx={{
              color: '#E2E5ED',
              width: '10.5pt',
              marginRight: '9pt',
              cursor: 'pointer',
            }}
          />
        </Typography>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '16px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            color: `${colors.main}`,
            cursor: 'pointer',
          }}
          variant="subtitle1"
          onClick={() => handleShowBtn(1)}
          onMouseDown={handleMouseDownPassword}
        >
          {pwShow[1] ? '미표시' : '표시'}
        </Typography>
      </InputAdornment>
    ),
  };
  const iconAdornment = pwSelected ? iconAdorment : {};
  const secondIconAdornment = checkPwSelected ? secondIconAdorment : {};

  // console.log('idDuplicate', idDuplicate);

  return (
    <Wrapper>
      {messageModal && (
        <AlertModal
          setIsModal={setMessageModal}
          message={message}
          setIsDetail={setIsDetail}
          setChangeNumber={setChangeNumber}
        />
      )}
      <AdminHeader type="main" title="관리자 관리" subTitle="관리자 등록" />
      <Manager>
        <li className="row">
          <label className="label">아이디</label>
          {/* <Input
            placeholder="아이디"
            onChange={handleIdChange}
            value={idInput}
            width={364}
          /> */}
          <Input
            placeholder="아이디 입력"
            onChange={handleIdChange}
            value={idInput}
            name="id"
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <OverlapBtn className="overlap" isChangeColor={isChangeColor}>
            //         <ButtonText
            //           className="checkOverlap"
            //           onClick={() => {
            //             if (isChangeColor === true) {
            //               overlabCheck();
            //             }
            //           }}
            //         >
            //           중복확인
            //         </ButtonText>
            //       </OverlapBtn>
            //     </InputAdornment>
            //   ),
            // }}
          />
          <InputAdornment position="end">
            <OverlapBtn className="overlap" isChangeColor={isChangeColor}>
              <ButtonText
                className="checkOverlap"
                onClick={() => {
                  if (isChangeColor === true) {
                    overlabCheck();
                    idPostBtnControll();
                  }
                }}
              >
                중복확인
              </ButtonText>
            </OverlapBtn>
          </InputAdornment>
          {/* <Image src={Warning} alt="warning" /> */}
        </li>

        {idInput.length < 4 && (
          <NoticeText>아이디는 4글자 이상 입력해주세요</NoticeText>
        )}

        {idDuplicate?.data?.isDuplicated === false &&
          initIdAlert &&
          !idLength && <NoticeText>사용가능한 아이디입니다.</NoticeText>}
        {idDuplicate?.data?.isDuplicated === true &&
          initIdAlert &&
          !idLength && (
            <NoticeText warning={true}>이미 사용중인 아이디입니다.</NoticeText>
          )}
        {idDuplicate?.data?.isDuplicated === false &&
          initIdAlert &&
          idLength && (
            <NoticeText warning={true}>4글자 이상 입력해주세요</NoticeText>
          )}
        <li className="row">
          <label className="label">비밀번호</label>
          {/* <Input
            placeholder="비밀번호"
            width={364}
            onChange={handleIdChange}
            value={pwInput}
            onFocus={(e) => setPwSelected(true)}
            onBlur={(e) => setPwSelected(false)}
          /> */}
          <Input
            className={!checkedPw && pwInput.length > 4 ? 'warning' : ''}
            placeholder="비밀번호 입력"
            onChange={handleIdChange}
            type={pwShow[0] ? 'text' : 'password'}
            value={pwInput}
            name="pw"
            hiddenLabel
            InputProps={iconAdornment}
            onFocus={(e) => setPwSelected(true)}
            onBlur={(e) => setPwSelected(false)}
          />
          {!checkedPw && pwInput.length > 4 && (
            <Image src={Warning} alt="warning" />
          )}
        </li>

        {!checkedPw && pwInput.length > 7 && (
          <NoticeText warning={true}>
            영문, 숫자, 특수문자 조합 8자 이상 입력해 주세요
          </NoticeText>
        )}
        {pwInput.length < 4 && (
          <NoticeText>비밀번호는 8자 이상 16자 이하로 입력해주세요.</NoticeText>
        )}
        {checkedPw && pwInput.length > 7 && pwInput.length < 17 && (
          <NoticeText>사용 가능한 비밀번호입니다.</NoticeText>
        )}

        <li className="row">
          <label className="label">비밀번호 확인</label>
          {/* <Input
            placeholder="비밀번호 확인"
            width={364}
            value={checkPw}
            onChange={handleIdChange}
            onFocus={(e) => setCheckPwSelected(true)}
            onBlur={(e) => setCheckPwSelected(false)}
          /> */}
          <Input
            placeholder="비밀번호 재입력"
            onChange={handleIdChange}
            type={pwShow[1] ? 'text' : 'password'}
            value={checkPw}
            name="checkPw"
            InputProps={secondIconAdornment}
            onFocus={(e) => setCheckPwSelected(true)}
            onBlur={(e) => setCheckPwSelected(false)}
          />
          {/* <Image src={Warning} alt="warning" /> */}
        </li>
        {/* <NoticeText>비밀번호 확인을 위해 한번 더 입력해주세요.</NoticeText> */}
        {checkPw.length < 4 && (
          <NoticeText>비밀번호 확인을 위해 한번 더 입력해주세요.</NoticeText>
        )}
        {!checkSamePw && checkPw.length > 4 && (
          <NoticeText warning={true}>비밀번호가 일치하지 않습니다</NoticeText>
        )}
        {checkSamePw && checkPw.length < 17 && checkPw.length > 7 && (
          <NoticeText>비밀번호가 일치합니다.</NoticeText>
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
          {/* <TextInput
            placeholder="E-mail"
            width={168}
            onChange={(e) => {
              setEmailFirst(e.target.value);
            }}
          /> */}
          <Input
            value={emailFirst}
            placeholder="E-mail"
            name="emailFirst"
            width={168}
            onChange={handleEmailCheck}
          />
          <EmailText>@</EmailText>
          <Input
            value={emailSecond}
            placeholder=""
            name="emailSecond"
            width={168}
            onChange={handleEmailCheck}
          />
          {/* <TextInput
            placeholder=""
            width={168}
            onChange={(e) => {
              setEmailSecond(e.target.value);
            }}
          /> */}
          <InputAdornment position="end">
            <OverlapBtn className="overlap" isChangeColor={isEmailChangeColor}>
              <ButtonText
                className="checkOverlap"
                onClick={() => {
                  if (isEmailChangeColor === true) {
                    overEmailCheck();
                    emailPostBtnControll();
                  }
                }}
              >
                중복확인
              </ButtonText>
            </OverlapBtn>
          </InputAdornment>
          {emailDuplicate?.data?.isDuplicated === true && (
            <Image src={Warning} alt="warning" />
          )}
        </li>
        {emailDuplicate?.data?.isDuplicated === true &&
          initEmailAlert === true && (
            <NoticeText warning={true}>중복된 이메일입니다.</NoticeText>
          )}
        {emailDuplicate?.data?.isDuplicated === false &&
          isEmailChangeColor === true && (
            <NoticeText>사용가능한 이메일입니다.</NoticeText>
          )}
      </Manager>
      <BtnBox>
        <Btn onClick={handleCompanyClick} finalCheck={finalCheck}>
          관리자 아이디 생성하기
        </Btn>
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
const Btn = styled.button<{ finalCheck: boolean }>`
  padding: 5px 19px;
  /* background: #464646; */
  background: ${({ finalCheck }) =>
    finalCheck === true ? '#5221CB' : '#464646'};
  border: none;
  color: ${colors.lightWhite};
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;

// const Input = styled(TextField)<{ width?: number; warning?: boolean }>`
//   /* width: 364px; */
//   width: ${({ width }) => `${width}px`};
//   height: 18px;
//   outline: none;
//   resize: none;
//   background: none;
//   /* border: 1px solid #e2e5ed; */
//   margin-right: 10px;
//   border: ${({ warning }) =>
//     warning ? '1px solid #F75015' : '1px solid #e2e5ed'};
//   border-radius: 2px;
//   ::placeholder {
//     padding-left: 5px;
//     color: #a6a9b0;
//   }
// `;

const Input = styled(TextField)<{ width?: number; warning?: boolean }>`
  border-radius: 2px;
  & input {
    padding: 3pt 0 3pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
  }
  & .MuiInputBase-root {
    padding-right: 9pt;
    margin-right: 5px;
  }
  ::placeholder {
    color: ${colors.gray};
    font-weight: 500;
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
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
  color: ${({ warning }) => (warning ? '#F75015' : '#747780')};
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

const OverlapBtn = styled.button<{ isChangeColor: boolean }>`
  & .checkOverlap {
    padding: 3pt 9pt;
    cursor: pointer;
  }
  margin-right: 0;
  color: ${colors.lightWhite};
  border-radius: 4px;
  font-size: 10.5pt;
  font-weight: 500;
  line-height: 12pt;

  background-color: ${({ isChangeColor }) =>
    isChangeColor ? colors.main : colors.gray};
`;

const ButtonText = styled(Typography)`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
