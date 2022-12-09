import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import { useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import arrow_small from 'public/guide/Arrow.svg';
import Step1 from 'components/guide/step1';
import Step2 from 'components/guide/step2';
import GuideHeader from 'components/guide/header';
import { useRouter } from 'next/router';
import { RootState } from 'store/store';
import { useSelector } from 'react-redux';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  M8_LIST,
  M8_LIST_EN,
} from 'assets/selectList';
import { useDispatch } from 'react-redux';
import { subsidyGuideAction } from 'store/subsidyGuideSlice';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import axios from 'axios';
import Modal from 'components/Modal/Modal';
import UserRightMenu from 'components/UserRightMenu';

export interface Option {
  idx: number;
  kind: string;
  standType: string;
  channel: string;
  count: string;
}
export interface OptionEn {
  kind: string;
  standType: string;
  channel: string;
  count: string;
}
export interface Region {
  m9: string;
  m10: string;
}

const Guide1_2 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  // SubsidyGuideSlice
  const { subsidyGuideData } = useSelector((state: RootState) => state);

  const InstallationPurposeType = [
    'BUSINESS',
    'WELFARE',
    'MARKETING',
    'PERSONAL',
    'ETC',
  ];
  const [clicked, setClicked] = useState(-1);
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [m5Index, setM5Index] = useState(0);
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option[]>([
    {
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ]);
  // 백엔드에 보내줄 이름
  const [selectedOptionEn, setSelectedOptionEn] = useState<OptionEn[]>([
    {
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ]);
  const [selectedRegion, setSelectedRegion] = useState<Region>({
    m9: '',
    m10: '',
  });

  // STEP 1 탭기능
  const handlePurposeOnClick = (index: number) => setClicked(index);
  // STEP 2 충전기 옵션 체인지
  // 셀렉터 옵션 체인지
  const handleChange = (event: any, index: number) => {
    const { name, value } = event.target;
    let copy: Option[] = [...selectedOption];
    let copyEn: OptionEn[] = [...selectedOptionEn];
    // 영어 값 추출
    let valueEn: string;
    // 충전기 종류
    if (name === 'kind') {
      const idx = M5_LIST.indexOf(value);
      valueEn = M5_LIST_EN[idx];
      copy[index] = {
        idx: idx,
        kind: '',
        standType: '',
        channel: '',
        count: '',
      };
      copy[index] = {
        ...copy[index],
        kind: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        kind: valueEn,
      };
      // 타입
    } else if (copy[index].kind.length > 1 && name === 'standType') {
      const idx = M6_LIST.indexOf(value);
      // console.log('index -> ' + idx);
      if (value === '-') {
        valueEn = '';
      } else {
        valueEn = M6_LIST_EN[idx];
      }
      copy[index] = {
        ...copy[index],
        standType: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        standType: valueEn,
      };
    } else if (copy[index].kind.length > 1 && name === 'channel') {
      const idx = M7_LIST.indexOf(value);
      valueEn = M7_LIST_EN[idx];
      copy[index] = {
        ...copy[index],
        channel: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        channel: valueEn,
      };
      // 개수
    } else if (copy[index].kind.length > 1 && name === 'count') {
      const idx = M8_LIST.indexOf(value);
      valueEn = M8_LIST_EN[idx];
      copy[index] = {
        ...copy[index],
        count: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        count: valueEn,
      };
    }

    setSelectedOption(copy);
    setSelectedOptionEn(copyEn);
  };
  // 셀렉터 추가
  const onClickAdd = () => {
    if (selectedOption.length === 5) return;
    const temp = selectedOption.concat({
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
    });
    setSelectedOption(temp);
  };
  // 셀렉터 빼기
  const onClickMinus = (index: number) => {
    console.log(index);
    const copy = [...selectedOption];
    copy.splice(index, 1);
    setSelectedOption(copy);
  };
  // 지역 옵션 체인지
  const HandleRegionChange = (event: SelectChangeEvent<unknown>) => {
    const { name, value } = event.target;
    const copy = selectedRegion;
    if (name === 'm9') {
      copy.m10 = '';
    }
    setSelectedRegion(() => ({
      ...copy,
      [name]: value,
    }));
  };
  // 버튼 온클릭
  const onClickButton = async () => {
    if (buttonActivate) {
      const SUBSIDY_URL = 'https://ㅅㄷㄴㅅ-api.entizen.kr/api/guide/subsidy';
      const accessToken = JSON.parse(localStorage.getItem('ACCESS_TOKEN')!);
      try {
        await axios({
          method: 'post',
          url: SUBSIDY_URL,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            ContentType: 'application/json',
          },
          data: {
            chargers: selectedOptionEn,
            installationPurpose: InstallationPurposeType[clicked],
            installationSiDo: selectedRegion.m9,
            installationSiGunGu:
              selectedRegion.m10 === '-' ? '' : selectedRegion.m10,
          },
        })
          .then((res) => {
            dispatch(
              subsidyGuideAction.addDate({
                ministryOfEnvironmentApplyPrice:
                  res.data.ministryOfEnvironmentApplyPrice,
                koreaEnergyAgencyApplyPrice:
                  res.data.koreaEnergyAgencyApplyPrice,
                localGovernmentApplyPrice: res.data.localGovernmentApplyPrice,
                duplicateApplyPrice: res.data.duplicateApplyPrice,
                maxApplyPrice: res.data.maxApplyPrice,
                canDuplicateApply: res.data.canDuplicateApply,
                memberName: res.data.memberName,
                region1: selectedRegion.m9,
                region2: selectedRegion.m10 === '-' ? '' : selectedRegion.m10,
              }),
            );
          })
          .then((res) => {
            router.push('/guide/1-2-4');
          })
          .catch((error) => {
            const text = error.response.data.message;
            setIsModal((prev) => !prev);
            setErrorMessage(text);
          });
      } catch (error) {
        console.log('보조금 가이드 에러');
        console.log(error);
      }
    }
  };
  // 버튼 유효성 검사
  const validation = () => {
    const copy: any = [...selectedOption];
    for (const option of copy) {
      for (const key in option) {
        if (option[key].length < 1) {
          setIsValid(false);
        }
      }
    }
  };
  // 버튼 활성화
  useEffect(() => {
    const { m9, m10 } = selectedRegion;
    setIsValid(true);
    validation();
    if (isValid && clicked !== -1 && m9.length > 0 && m10.length > 0) {
      setButtonActivate(true);
    } else {
      setButtonActivate(false);
    }
  }, [clicked, selectedOption, selectedRegion, isValid]);

  return (
    <Body>
      {isModal && (
        <Modal
          text={errorMessage}
          color={colors.main}
          click={() => setIsModal((prev) => !prev)}
        />
      )}

      <WebHeader />
      <UserRightMenu />
      <Inner>
        <Wrapper>
          <GuideHeader
            title={'보조금 가이드'}
            leftOnClick={() => router.back()}
            rightOnClick={() => router.push('/')}
          />
          <Step1
            clicked={clicked}
            handlePurposeOnClick={handlePurposeOnClick}
          />
          <Step2
            selectedRegion={selectedRegion}
            selectedOption={selectedOption}
            handleOptionChange={handleChange}
            HandleRegionChange={HandleRegionChange}
            onClickAdd={onClickAdd}
            onClickMinus={onClickMinus}
            m5Index={m5Index}
          />
          <ChargeGuide onClick={() => router.push('/guide/1-5')}>
            <span className="text">충전기 가이드</span>
            <div className="img">
              <Image src={arrow_small} alt="arrow_small" />
            </div>
          </ChargeGuide>
          <Btn buttonActivate={buttonActivate} onClick={onClickButton}>
            보조금 확인하기
          </Btn>
        </Wrapper>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default Guide1_2;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  //height: 810pt;
  background: #fcfcfc;

  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 45.75pt auto;
  width: 345pt;
  //width: 281.25pt;
  box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
  border-radius: 12pt;
  background: #ffff;
  padding: 32.25pt 0 42pt;

  @media (max-width: 899.25pt) {
    width: 100%;
    position: relative;
    margin: 0 auto;
    padding: 0;
    box-shadow: none;
    background: none;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 100pt;
  padding-left: 15pt;
  padding-right: 15pt;
  position: relative;
  margin: 0 31.875pt;

  @media (max-width: 899.25pt) {
    height: 100%;
    margin: 0;
    padding: 0 15pt 15pt 15pt;
  }
`;
const ChargeGuide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3pt;
  padding-top: 75pt;
  color: ${colors.gray2};
  .text {
    letter-spacing: -0.02em;
    border-bottom: 1px solid ${colors.gray2};
  }
  .img {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
`;
const Btn = styled.div<{ buttonActivate: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  color: ${colors.lightWhite};
  padding: 15pt 0 15pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 33pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : '#e2e5ed'};

  @media (max-width: 899.25pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
    width: 100%;
  }
`;
