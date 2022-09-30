import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import MypageHeader from './header';
import IdPwInput from './IdPwInput';
import TermContent from './TermContent';

type Props = {};

const SignUpContainer = (props: Props) => {
  const router = useRouter();
  const [level, setLevel] = useState<number>(1);
  const [name, setName] = useState<string>('');
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
  return (
    <>
      {level === 0 && (
        <>
          <MypageHeader back={true} homeBtn={true} title={''} exitBtn={true} />
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
            />
          </Wrapper>
        </>
      )}
      {level === 1 && (
        <>
          <MypageHeader
            back={true}
            homeBtn={true}
            title={''}
            exitBtn={true}
            handleHomeClick={() => console.log('111')}
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
