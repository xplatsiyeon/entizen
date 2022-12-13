import styled from '@emotion/styled';
import Modal from 'components/Modal/Modal';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ChooseUserType from './chooseUserType';
import CompanyDetailInfo from './CompanyDetailInfo';
import MypageHeader from './header';
import IdPwInput from './IdPwInput';
import ManagerInfo from './ManagerInfo';
import TermContent from './TermContent';

export interface BusinessRegistrationType {
  url: any;
  size: number;
  originalName: string;
}

type Props = {};

const SignUpContainer = (props: Props) => {
  const router = useRouter();
  // level 각 컴포넌트 세션을 단계를 번호로 표시 ex) 일반 0~2 / 기업 0~4
  const [level, setLevel] = useState<number>(0);
  // Type 1 일때 일반, 0 일때 기업 선택
  const [userType, setUserType] = useState<number>(-1);
  // 회원가입 필요한 상태값들
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [fullTerms, setFullTerms] = useState(false);
  const [requiredTerms, setRequiredTerms] = useState(false);
  const [selectTerms, setSelectTerms] = useState(false);
  const [nextBtn, setNextBtn] = useState(false);
  // id pw pw확인 상태
  const [idInput, setIdInput] = useState<string>('');
  const [pwInput, setPwInput] = useState<string>('');
  const [checkPw, setCheckPw] = useState<string>('');

  // 패스워드 보여주기 true false
  const [pwShow, setPwShow] = useState<boolean>(false);

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
  const handleHomeClick = () => router.push('/');
  const gobackQuestion = () => setModalOpen(false);
  const stopRegist = () => router.push('/signin');
  const handleBackClick = () => setModalOpen(true);

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
      {level === 0 && (
        <>
          <MypageHeader
            back={true}
            title={''}
            handleBackClick={handleBackClick}
          />
          <Wrapper>
            <ChooseUserType
              userType={userType}
              setUserType={setUserType}
              level={level}
              setLevel={setLevel}
            />
          </Wrapper>
        </>
      )}
      {/* ------------일반---------- */}
      {/* 약관 동의 */}
      {level === 1 && userType === 1 && (
        <>
          <MypageHeader
            back={true}
            homeBtn={true}
            title={''}
            exitBtn={true}
            handleBackClick={handleBackClick}
            handleHomeClick={handleHomeClick}
          />
          <Wrapper>
            <TermContent
              setLevel={setLevel}
              level={level}
              setName={setName}
              setPhoneNumber={setPhoneNumber}
              fullTerms={fullTerms}
              setFullTerms={setFullTerms}
              requiredTerms={requiredTerms}
              setRequiredTerms={setRequiredTerms}
              selectTerms={selectTerms}
              setSelectTerms={setSelectTerms}
              nextBtn={nextBtn}
              setNextBtn={setNextBtn}
              userType={userType}
            />
          </Wrapper>
        </>
      )}
      {/* 아이디 / 비밀번호 입력*/}
      {level === 2 && userType === 1 && (
        <>
          <MypageHeader
            back={true}
            homeBtn={true}
            title={''}
            exitBtn={true}
            handleHomeClick={() => console.log('111')}
            handleBackClick={handleBackClick}
          />
          <Wrapper>
            <IdPwInput
              idInput={idInput}
              setIdInput={setIdInput}
              pwInput={pwInput}
              setPwInput={setPwInput}
              checkPw={checkPw}
              setCheckPw={setCheckPw}
              pwShow={pwShow}
              setPwShow={setPwShow}
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
              fullTerms={fullTerms}
              userType={userType}
              setModalMessage={setModalMessage}
              setIsModal={setIsModal}
            />
          </Wrapper>
        </>
      )}
      {/* ------------기업---------- */}
      {/* 약관 동의*/}
      {level === 2 && userType === 0 && (
        <>
          <MypageHeader
            back={true}
            homeBtn={true}
            title={''}
            exitBtn={true}
            handleBackClick={handleBackClick}
            handleHomeClick={handleHomeClick}
          />
          <Wrapper>
            <TermContent
              setLevel={setLevel}
              level={level}
              setName={setName}
              setPhoneNumber={setPhoneNumber}
              fullTerms={fullTerms}
              setFullTerms={setFullTerms}
              requiredTerms={requiredTerms}
              setRequiredTerms={setRequiredTerms}
              selectTerms={selectTerms}
              setSelectTerms={setSelectTerms}
              nextBtn={nextBtn}
              setNextBtn={setNextBtn}
              userType={userType}
            />
          </Wrapper>
        </>
      )}
      {/* 상세 내용*/}
      {level === 1 && userType === 0 && (
        <>
          <MypageHeader
            back={true}
            homeBtn={true}
            title={''}
            exitBtn={true}
            handleHomeClick={() => router.push('/signin')}
            handleBackClick={handleBackClick}
          />
          <Wrapper>
            <CompanyDetailInfo
              businessRegistration={businessRegistration}
              setBusinessRegistration={setBusinessRegistration}
              setLevel={setLevel}
              level={level}
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
      {level === 3 && userType === 0 && (
        <>
          <MypageHeader
            back={true}
            homeBtn={true}
            title={''}
            exitBtn={true}
            handleHomeClick={() => router.push('/signin')}
            handleBackClick={handleBackClick}
          />
          <Wrapper>
            <ManagerInfo
              level={level}
              setLevel={setLevel}
              setName={setName}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              userType={userType}
            />
          </Wrapper>
        </>
      )}
      {/* 아이디/비밀번호 입력 */}
      {level === 4 && userType === 0 && (
        <>
          <MypageHeader
            back={true}
            homeBtn={true}
            title={''}
            exitBtn={true}
            handleHomeClick={() => console.log('111')}
            handleBackClick={handleBackClick}
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
              pwShow={pwShow}
              setPwShow={setPwShow}
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
              fullTerms={fullTerms}
              userType={userType}
              businessRegistration={businessRegistration}
              setModalMessage={setModalMessage}
              setIsModal={setIsModal}
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
