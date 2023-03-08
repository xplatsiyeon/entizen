import styled from '@emotion/styled';
import Modal from 'components/Modal/Modal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import ChooseUserType from './chooseUserType';
import CompanyDetailInfo from './CompanyDetailInfo';
import SignUpHeader from './header';
import IdPwInput from './IdPwInput';
import ManagerInfo from './ManagerInfo';
import TermContent from './TermContent';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { selectAction } from 'store/loginTypeSlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
export interface BusinessRegistrationType {
  url: string;
  size: number;
  originalName: string;
  typeName: string;
}

type Props = {};

const SignUpContainer = (props: Props) => {
  const router = useRouter();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  // level 각 컴포넌트 세션을 단계를 번호로 표시 ex) 일반 0~2 / 기업 0~4
  // const [level, setLevel] = useState<number>(0);
  const dispatch = useDispatch();

  const { signUpLevel, selectedType } = useSelector(
    (state: RootState) => state.LoginType,
  );

  console.log('⭐️ signUpLevel  : ', signUpLevel);
  console.log('⭐️ selectedType : ', selectedType);

  // Type 1 일때 일반, 0 일때 기업 선택
  const [userType, setUserType] = useState<number>(-1);

  // 회원가입 필요한 상태값들
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [fullTerms, setFullTerms] = useState(false);
  const [requiredTerms, setRequiredTerms] = useState(false);
  const [selectTerms, setSelectTerms] = useState([false, false]);
  const [requiredCheck, setRequiredCheck] = useState([false, false, false]);
  const [nextBtn, setNextBtn] = useState(false);
  // id pw pw확인 상태
  const [idInput, setIdInput] = useState<string>('');
  const [pwInput, setPwInput] = useState<string>('');
  const [checkPw, setCheckPw] = useState<string>('');

  // 기업로그인 가입 후 첫 로그인
  const [userCompleteModal, setUserCompleteModal] = useState<boolean>(false);

  const [pwSelected, setPwSelected] = useState<boolean>(false);
  const [checkPwSelected, setCheckPwSelected] = useState<boolean>(false);
  const [checkedPw, setCheckedPw] = useState<boolean>(false);
  const [checkSamePw, setCheckSamePw] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  // 기업회원 회원가입 플로우
  const [businessRegistration, setBusinessRegistration] = useState<
    BusinessRegistrationType[]
  >([]);
  const [companyName, setCompanyName] = useState<string>('');
  const [postNumber, setPostNumber] = useState<string>('');
  const [companyAddress, setCompanyAddress] = useState<string>('');
  const [companyDetailAddress, setCompanyDetailAddress] = useState<string>('');

  const [modalMessage, setModalMessage] = useState('');
  const [isModal, setIsModal] = useState(false);

  const onClickModal = () => {
    router.push('/signUp/Complete');
  };
  // const handleHomeClick = () => router.push('/');
  const handleHomeClick = () => {
    setModalOpen(true);
  };
  const gobackQuestion = () => setModalOpen(false);
  const stopRegist = () => router.push('/signin');
  const handleBackClick = (pageNumber: number) => {
    if (pageNumber === -1) {
      router.replace('/signin');
    } else {
      dispatch(selectAction.setSignUpLevel(pageNumber));
    }
  };

  useEffect(() => {
    if (selectedType === 'USER') {
      setUserType(1);
    } else if (selectedType === 'COMPANY') {
      setUserType(2);
    } else {
      setUserType(-1);
    }
  }, [router]);

  return (
    <>
      {isModal && <Modal click={onClickModal} text={modalMessage} />}
      {modalOpen && (
        <TwoBtnModal
          exit={gobackQuestion}
          text={
            '지금 나가시면\n작성하신 내용이 삭제됩니다.\n그래도 괜찮으시겠습니까?'
          }
          leftBtnText={'그만하기'}
          rightBtnText={'계속 작성하기'}
          leftBtnColor={'#A6A9B0'}
          rightBtnColor={'#5a2dc9'}
          leftBtnControl={stopRegist}
          rightBtnControl={gobackQuestion}
        />
      )}
      {/* 일반/기업 선택란 */}
      {signUpLevel === 0 && (
        <>
          <SignUpHeader
            title={mobile ? '' : '어떤 용무로 오셨나요?'}
            back={true}
            // homeBtn={false}
            handleBackClick={() => handleBackClick(-1)}
            web={true}
          />
          <Wrapper>
            <ChooseUserType
              userType={userType}
              setUserType={setUserType}
              // level={level}
              // setLevel={setLevel}
            />
          </Wrapper>
        </>
      )}
      {/* ------------일반---------- */}
      {/* 약관 동의 */}
      {signUpLevel === 1 && userType === 1 && (
        <>
          <SignUpHeader
            back={true}
            handleBackClick={() => handleBackClick(0)}
            title={mobile ? '' : '회원가입'}
            web={true}
          />
          <Wrapper>
            <TermContent
              setName={setName}
              setPhoneNumber={setPhoneNumber}
              fullTerms={fullTerms}
              setFullTerms={setFullTerms}
              requiredTerms={requiredTerms}
              setRequiredTerms={setRequiredTerms}
              selectTerms={selectTerms}
              setSelectTerms={setSelectTerms}
              requiredCheck={requiredCheck}
              setRequiredCheck={setRequiredCheck}
              nextBtn={nextBtn}
              setNextBtn={setNextBtn}
              userType={userType}
              setBirthday={setBirthday}
            />
          </Wrapper>
        </>
      )}
      {/* 아이디 / 비밀번호 입력*/}
      {signUpLevel === 2 && userType === 1 && (
        <>
          <SignUpHeader
            back={true}
            homeBtn={true}
            handleBackClick={() => handleBackClick(1)}
            handleHomeClick={handleHomeClick}
            title={mobile ? '' : '회원가입'}
            web={true}
          />
          <Wrapper>
            <IdPwInput
              idInput={idInput}
              setIdInput={setIdInput}
              pwInput={pwInput}
              setPwInput={setPwInput}
              checkPw={checkPw}
              setCheckPw={setCheckPw}
              pwSelected={pwSelected}
              setPwSelected={setPwSelected}
              checkPwSelected={checkPwSelected}
              setCheckPwSelected={setCheckPwSelected}
              checkedPw={checkedPw}
              setCheckedPw={setCheckedPw}
              checkSamePw={checkSamePw}
              setCheckSamePw={setCheckSamePw}
              name={name}
              phoneNumber={phoneNumber}
              birthday={birthday}
              fullTerms={fullTerms}
              userType={userType}
              setModalMessage={setModalMessage}
              setIsModal={setIsModal}
              setUserCompleteModal={setUserCompleteModal}
            />
          </Wrapper>
        </>
      )}
      {/* ===================================기업 ======================================= */}
      {/* 약관 동의*/}
      {signUpLevel === 1 && userType === 0 && (
        <>
          <SignUpHeader
            back={true}
            homeBtn={true}
            handleBackClick={() => handleBackClick(0)}
            handleHomeClick={handleHomeClick}
            title={mobile ? '' : '회원가입'}
            web={true}
          />
          <Wrapper>
            <TermContent
              setName={setName}
              setPhoneNumber={setPhoneNumber}
              fullTerms={fullTerms}
              setFullTerms={setFullTerms}
              requiredTerms={requiredTerms}
              setRequiredTerms={setRequiredTerms}
              requiredCheck={requiredCheck}
              setRequiredCheck={setRequiredCheck}
              selectTerms={selectTerms}
              setSelectTerms={setSelectTerms}
              nextBtn={nextBtn}
              setNextBtn={setNextBtn}
              userType={userType}
              setBirthday={setBirthday}
            />
          </Wrapper>
        </>
      )}
      {/* 상세 내용*/}
      {signUpLevel === 2 && userType === 0 && (
        <>
          <SignUpHeader
            web={true}
            back={true}
            homeBtn={true}
            title={mobile ? '' : '회원가입'}
            handleHomeClick={handleHomeClick}
            handleBackClick={() => handleBackClick(1)}
          />
          <Wrapper>
            <CompanyDetailInfo
              businessRegistration={businessRegistration}
              setBusinessRegistration={setBusinessRegistration}
              companyName={companyName}
              setCompanyName={setCompanyName}
              postNumber={postNumber}
              setPostNumber={setPostNumber}
              companyAddress={companyAddress}
              setCompanyAddress={setCompanyAddress}
              companyDetailAddress={companyDetailAddress}
              setCompanyDetailAddress={setCompanyDetailAddress}
            />
          </Wrapper>
        </>
      )}
      {/* 담당자 정보 */}
      {signUpLevel === 3 && userType === 0 && (
        <>
          <SignUpHeader
            web={true}
            back={true}
            homeBtn={true}
            handleBackClick={() => handleBackClick(2)}
            handleHomeClick={handleHomeClick}
            title={mobile ? '' : '회원가입'}
          />
          <Wrapper>
            <ManagerInfo
              setName={setName}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              userType={userType}
              setBirthday={setBirthday}
            />
          </Wrapper>
        </>
      )}
      {/* 아이디/비밀번호 입력 */}
      {signUpLevel === 4 && userType === 0 && (
        <>
          <SignUpHeader
            web={true}
            back={true}
            homeBtn={true}
            title={mobile ? '' : '회원가입'}
            handleBackClick={() => handleBackClick(3)}
            handleHomeClick={handleHomeClick}
          />
          <Wrapper>
            <IdPwInput
              email={email}
              companyName={companyName}
              postNumber={postNumber}
              companyAddress={companyAddress}
              companyDetailAddress={companyDetailAddress}
              idInput={idInput}
              setIdInput={setIdInput}
              pwInput={pwInput}
              setPwInput={setPwInput}
              checkPw={checkPw}
              setCheckPw={setCheckPw}
              pwSelected={pwSelected}
              setPwSelected={setPwSelected}
              checkPwSelected={checkPwSelected}
              setCheckPwSelected={setCheckPwSelected}
              checkedPw={checkedPw}
              setCheckedPw={setCheckedPw}
              checkSamePw={checkSamePw}
              setCheckSamePw={setCheckSamePw}
              name={name}
              phoneNumber={phoneNumber}
              birthday={birthday}
              fullTerms={fullTerms}
              userType={userType}
              businessRegistration={businessRegistration}
              setModalMessage={setModalMessage}
              setIsModal={setIsModal}
              setUserCompleteModal={setUserCompleteModal}
            />
          </Wrapper>
        </>
      )}
    </>
  );
};

const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
`;

export default SignUpContainer;
