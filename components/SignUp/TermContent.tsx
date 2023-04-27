import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CheckOnImg from 'public/images/check-box-on.svg';
import CheckImg from 'public/images/check-box.svg';
import SmallCheckImg from 'public/images/check-small.svg';
import SmallCheckOnImg from 'public/images/check-small-on.svg';
import { useRouter } from 'next/router';
import colors from 'styles/colors';
import Btn from './button';
import axios from 'axios';
import Modal from 'components/Modal/Modal';
import { useMediaQuery } from 'react-responsive';
import { selectAction } from 'store/loginTypeSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import useNice from 'hooks/useNice';
import TermsModal from 'components/Modal/TermsModal';
type Props = {
  // level: number;
  // setLevel: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
  setPhoneNumber: Dispatch<SetStateAction<string>>;
  fullTerms: boolean;
  setFullTerms: Dispatch<SetStateAction<boolean>>;
  requiredTerms: boolean;
  setRequiredTerms: Dispatch<SetStateAction<boolean>>;
  selectTerms: boolean[];
  setSelectTerms: Dispatch<SetStateAction<boolean[]>>;
  requiredCheck: boolean[];
  setRequiredCheck: Dispatch<SetStateAction<boolean[]>>;
  nextBtn: boolean;
  setNextBtn: Dispatch<SetStateAction<boolean>>;
  userType?: number;
  setBirthday: Dispatch<SetStateAction<string>>;
};

export type termsType = 'terms' | 'privacyPolicy';

const TermContent = ({
  setName,
  setPhoneNumber,
  fullTerms,
  setFullTerms,
  requiredTerms,
  setRequiredTerms,
  selectTerms,
  requiredCheck,
  setRequiredCheck,
  setSelectTerms,
  nextBtn,
  setNextBtn,
  userType,
  setBirthday,
}: Props) => {
  // console.log('테스트11입니다 => ' + test11());
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const [data, setData] = useState<any>();
  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [isTermsModal, setIsTermsModal] = useState<boolean>(false);
  const [termsModalType, setTermsModalType] = useState<termsType>('terms');

  const LoginType = useSelector((state: RootState) => state.LoginType);
  const signUpLevel = useSelector(
    (state: RootState) => state.LoginType.signUpLevel,
  );

  const { fnPopup } = useNice();

  const handleForceClick = () => {
    let key = sessionStorage.getItem('key');
    if (key !== null) {
      let data = JSON.parse(key);
      setName(data.name);
      setPhoneNumber(data.phone);
      setBirthday(data.birthDate);

      if (data.isMember === true) {
        setIsModal(true);
        setModalMessage('이미 회원가입 하셨습니다.');
      } else if (data.isMember === false) {
        dispatch(selectAction.setSignUpLevel(signUpLevel + 1));
      }
    }
  };

  const onClickModal = () => {
    router.replace('/signin');
    setIsModal(false);
  };

  const justNextPage = () => {
    dispatch(selectAction.setSignUpLevel(signUpLevel + 1));
  };

  // ==================== Term 로직 ======================
  const fullTermsHandler = () => {
    console.log('⭐️ fullTerms : ', fullTerms);
    if (fullTerms) {
      setFullTerms(false);
      setRequiredCheck([false, false, false]);
      setSelectTerms([false]);
    } else {
      setFullTerms(true);
      setRequiredCheck([true, true, true]);
      setSelectTerms([true]);
    }
  };
  // 보기 이벤트
  const TermsofServiceHandler = (
    event: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    id: number,
  ) => {
    event.stopPropagation();
    // 데이터 저장
    dispatch(
      selectAction.setTerm({
        fullTerms,
        requiredTerms,
        selectTerms,
        requiredCheck,
      }),
    );

    router.push({
      pathname: '/setting',
      query: {
        id,
        setting: 'true',
        userType: userType,
      },
    });
  };

  // 전체 약관 동의 체크 함수
  const onClickRequiredCheckBox = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const {
      currentTarget: { id },
    } = event;
    const temp = [...requiredCheck];
    switch (id) {
      case 'full':
        !requiredTerms
          ? setRequiredCheck([true, true, true])
          : setRequiredCheck([false, false, false]);
        break;
      case 'first':
        temp[0] = !temp[0];
        setRequiredCheck(temp);
        break;
      case 'second':
        temp[1] = !temp[1];
        setRequiredCheck(temp);
        break;
      case 'third':
        temp[2] = !temp[2];
        setRequiredCheck(temp);
        break;
    }
  };

  const onClickSelectTerms = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    const {
      currentTarget: { id },
    } = event;
    const temp = [...selectTerms];

    switch (id) {
      case 'first':
        temp[0] = !temp[0];
        setSelectTerms(temp);
        break;
      case 'second':
        temp[1] = !temp[1];
        setSelectTerms(temp);
        break;
    }
  };

  // 보기 보튼
  const onClickView = (
    e: React.MouseEvent<HTMLSpanElement>,
    type: termsType,
  ) => {
    e.stopPropagation();
    if (mobile) {
      setIsTermsModal(true);
      setTermsModalType(type);
    } else {
      type === 'terms'
        ? TermsofServiceHandler(e, 3)
        : TermsofServiceHandler(e, 4);
    }
  };

  // 데이터 GET
  useEffect(() => {
    setFullTerms(LoginType.fullTerms);
    setRequiredTerms(LoginType.requiredTerms);
    setSelectTerms(LoginType.selectTerms);
    setRequiredCheck(LoginType.requiredCheck);
  }, []);

  // 전체 약관 동의
  useEffect(() => {
    const everyCheck = requiredCheck.every((e) => e === true);
    everyCheck ? setRequiredTerms(true) : setRequiredTerms(false);
  }, [requiredCheck]);

  useEffect(() => {
    // console.log();
    if (router.asPath.includes('Canceled')) {
      router.push('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // 다음 버튼 활성화
  useEffect(() => {
    requiredTerms ? setNextBtn(true) : setNextBtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredTerms]);
  // 전체 약관 동의 활성화
  useEffect(() => {
    const everyRequiredCheck = requiredCheck.every((e) => e === true);
    const everySelectedCheck = selectTerms.every((e) => e === true);
    console.log('⭐️ everyRequiredCheck : ', everyRequiredCheck);
    console.log('⭐️ selectTerms : ', selectTerms);

    if (!everyRequiredCheck || !everySelectedCheck) setFullTerms(false);
    if (everyRequiredCheck && everySelectedCheck) setFullTerms(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredTerms, selectTerms]);

  useEffect(() => {
    const memberType = 'USER';
    axios({
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/nice`,
      data: { memberType },
    })
      .then((res) => {
        setData(res.data.executedData);
      })
      .catch((error) => {
        console.error(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isModal && <Modal text={modalMessage} click={onClickModal} />}
      {!mobile && <Notice variant="h3">엔티즌 약관에 동의해주세요</Notice>}
      {mobile && isTermsModal && (
        <TermsModal
          userType={userType}
          termsModalType={termsModalType}
          setIsTermsModal={setIsTermsModal}
        />
      )}

      {mobile && (
        <Notice variant="h3">
          엔티즌 약관에
          <br />
          동의해주세요
        </Notice>
      )}
      <Terms onClick={fullTermsHandler}>
        <Image alt="check" src={fullTerms ? CheckOnImg : CheckImg} />
        <p>전체 약관에 동의합니다.</p>
      </Terms>
      <Form isterms={requiredTerms.toString()}>
        <Box className="box" id="full" onClick={onClickRequiredCheckBox}>
          <span>
            <Image alt="check" src={requiredTerms ? CheckOnImg : CheckImg} />
          </span>
          <p>필수 약관에 동의합니다.</p>
        </Box>
        {/* [필수] 개인정보 처리방침 */}
        <Check>
          <Item id="third" onClick={onClickRequiredCheckBox}>
            <div>
              <Image
                alt="smallCheck"
                src={requiredCheck[2] ? SmallCheckOnImg : SmallCheckImg}
              />
              <p>[필수]개인정보 처리방침</p>
            </div>
            <span
              id="privacyPolicy"
              onClick={(e) => onClickView(e, 'privacyPolicy')}
            >
              보기
            </span>
          </Item>
        </Check>
        {/* [필수] 사용자 이용약관 | 판매자 이용약관 */}
        <Check>
          <Item id="first" onClick={onClickRequiredCheckBox}>
            <div>
              <Image
                alt="smallCheck"
                src={requiredCheck[0] ? SmallCheckOnImg : SmallCheckImg}
              />
              <p>{`[필수]${userType === 0 ? '고객' : '파트너'} 이용약관`}</p>
            </div>
            <span onClick={(e) => onClickView(e, 'terms')}>보기</span>
          </Item>
        </Check>
        {/* [필수] 만 14세 이상 */}
        <Check>
          <Item id="second" onClick={onClickRequiredCheckBox}>
            <div>
              <Image
                alt="smallCheck"
                src={requiredCheck[1] ? SmallCheckOnImg : SmallCheckImg}
              />
              <p>[필수] 만 14세 이상</p>
            </div>
            <span></span>
          </Item>
        </Check>
      </Form>
      <BottomForm isterms={selectTerms}>
        <Box>
          <Item id="first" onClick={onClickSelectTerms}>
            <div>
              <Image
                alt="smallCheck"
                src={selectTerms[0] ? SmallCheckOnImg : SmallCheckImg}
              />
              <p>[선택]이벤트 및 혜택 알림 수신</p>
            </div>
          </Item>
        </Box>
      </BottomForm>
      {/* =========================== 일반 ========================== */}
      {userType === 0 && (
        <div>
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
            <Btn
              text="본인인증하기"
              name={'form_chk'}
              marginTop={42.5}
              isClick={nextBtn}
              handleClick={fnPopup}
            />
          </form>
          <Buttons className="firstNextPage" onClick={handleForceClick}>
            아아
          </Buttons>
        </div>
      )}
      {/* ===================== 기업 =========================== */}
      {userType === 1 && (
        <Btn
          text="다음"
          handleClick={justNextPage}
          marginTop={42.5}
          isClick={nextBtn}
        />
      )}
    </>
  );
};

const Notice = styled(Typography)`
  margin-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  letter-spacing: -0.02em;
  font-family: 'Spoqa Han Sans Neo';
  color: #222222;
  @media (min-width: 900pt) {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 22.5pt;
    letter-spacing: -0.02em;
    text-align: left;
    padding-top: 43.6875pt;
  }
`;
const Terms = styled(Box)`
  display: flex;
  align-items: center;
  margin-top: 49.5pt;
  cursor: pointer;
  & > p {
    margin-left: 12pt;
  }
`;
const Form = styled(Box)<{ isterms: string }>`
  border: 0.75pt solid
    ${({ isterms }) => (isterms === 'true' ? colors.main : colors.lightGray)};
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 15pt 11.25pt;
  .box {
    display: flex;
    align-items: center;
    cursor: pointer;
    & > p {
      margin-left: 12pt;
    }
  }
`;
const Check = styled(Box)`
  margin-top: 15pt;
  /* display: flex;
  align-items: center; */
`;
const Item = styled(Box)`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  & > div {
    display: flex;
    align-items: center;
    & > p {
      font-weight: 500;
      font-size: 10.5pt;
      line-height: 12pt;
      letter-spacing: -0.003em;
      padding-left: 12pt;
    }
  }
  & > span {
    width: 19.5pt;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    letter-spacing: -0.003em;
    text-decoration-line: underline;
    color: #a6a9b0;
    cursor: pointer;
  }

  &.selected {
    margin-top: 15px;
  }
`;
const BottomForm = styled(Box)<{ isterms: boolean[] }>`
  border: 0.75pt solid
    ${({ isterms }) =>
      isterms.every((e) => e === true) ? colors.main : colors.lightGray};
  border-radius: 6pt;
  margin-top: 15pt;
  padding: 15pt 11.25pt;
  & > p {
    margin-left: 12pt;
  }
`;

const Buttons = styled.button`
  display: none;
`;

export default TermContent;
