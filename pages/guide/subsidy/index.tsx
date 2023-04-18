import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
import { useEffect, useState } from 'react';
import arrow_small from 'public/guide/Arrow.svg';
import Step1 from 'components/guide/step1';
import Step2 from 'components/guide/step2';
import GuideHeader from 'components/guide/header';
import { useRouter } from 'next/router';
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
import Modal from 'components/Modal/Modal';
import UserRightMenu from 'components/UserRightMenu';
import { Option } from 'store/quotationSlice';
import { useMutation } from 'react-query';
import { isTokenPostApi } from 'api';
import { subsidyAction, subsidySlice } from 'store/subsidySlice';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useMediaQuery } from 'react-responsive';
export interface SelectedOption {
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

const SubsidyGuide = () => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });
  const router = useRouter();
  const dispatch = useDispatch();
  const InstallationPurposeType = [
    'BUSINESS',
    'WELFARE',
    'MARKETING',
    'PERSONAL',
    'ETC',
  ];

  // 충전기 설치 목적 (STEP 1)
  const [clicked, setClicked] = useState(-1);
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isValid, setIsValid] = useState(true);

  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  // 충전기 종류 및 수량 선택 (STEP 1) - 프론트
  const [selectedOption, setSelectedOption] = useState<SelectedOption[]>([
    {
      idx: 0,
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ]);
  // 충전기 종류 및 수량 선택 (STEP 1) - 백엔드
  const [selectedOptionEn, setSelectedOptionEn] = useState<Option[]>([
    {
      kind: '',
      standType: '',
      channel: '',
      count: '',
    },
  ]);
  // 충전기 설치 지역
  const [selectedRegion, setSelectedRegion] = useState<Region>({
    m9: '',
    m10: '',
  });

  const { mutate: subsidyMutate, isLoading: subsidyLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: async (res) => {
        await dispatch(subsidyGuideAction.addDate(res.data.data));
        await dispatch(
          subsidyGuideAction.addRegion({
            installationSiDo: selectedRegion.m9,
            installationSiGunGu:
              selectedRegion.m10 === '-' ? '' : selectedRegion.m10,
          }),
        );
        router.push('/guide/subsidy/result');
      },

      onError: (error: any) => {
        const text = error.response.data.message;
        setIsModal((prev) => !prev);
        setErrorMessage(text);
      },
    },
  );

  // STEP 1 탭기능
  const handlePurposeOnClick = (index: number) => {
    setClicked(index);
  };
  // STEP 2 충전기 옵션 체인지
  // 셀렉터 옵션 체인지
  const handleSelectBox = (value: string, name: string, index: number) => {
    let copy: SelectedOption[] = [...selectedOption];
    let copyEn: Option[] = [...selectedOptionEn];
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
    // console.log(index);
    const copy = [...selectedOption];
    copy.splice(index, 1);
    setSelectedOption(copy);
  };
  // 지역 옵션 체인지
  const HandleRegionChange = (value: string, name: string) => {
    const copy = { ...selectedRegion };
    // console.log('copy=>', copy);
    // return;
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
      const data = {
        chargers: selectedOptionEn,
        installationPurpose: InstallationPurposeType[clicked],
        installationSiDo: selectedRegion.m9,
        installationSiGunGu:
          selectedRegion.m10 === '-' ? '' : selectedRegion.m10,
      };
      subsidyMutate({
        url: '/guide/subsidy',
        data: data,
      });
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

  const onClickRouter = () => {
    router.push('/guide/charger');
  };

  const { chargePurpose, chargeRegion, chargerEn, chargerKo } = useSelector(
    (state: RootState) => state.subsidySlice,
  );

  useEffect(() => {
    setClicked(chargePurpose);
    setSelectedOption(chargerKo);
    setSelectedOptionEn(chargerEn);
    setSelectedRegion(chargeRegion);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(
        subsidyAction.addSubsidy({
          chargePurpose: clicked,
          chargerKo: selectedOption,
          chargerEn: selectedOptionEn,
          chargeRegion: selectedRegion,
        }),
      );
    };
  }, [clicked, selectedOption, selectedOptionEn, selectedRegion]);

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

      <WebHeader num={3} now={'guide'} sub={'guide'} />
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
            handleSelectBox={handleSelectBox}
            HandleRegionChange={HandleRegionChange}
            onClickAdd={onClickAdd}
            onClickMinus={onClickMinus}
          />
          {mobile && (
            <ChargeGuide onClick={onClickRouter}>
              <span className="text">충전기 가이드</span>
              <div className="img">
                <Image src={arrow_small} alt="arrow_small" />
              </div>
            </ChargeGuide>
          )}
          <Btn buttonActivate={buttonActivate} onClick={onClickButton}>
            보조금 확인하기
          </Btn>
        </Wrapper>
      </Inner>
      <WebFooter />
    </Body>
  );
};

export default SubsidyGuide;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  margin: 0 auto;
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
  /* padding-left: 15pt;
  padding-right: 15pt; */
  position: relative;
  margin: 0 46.5pt;
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
    cursor: pointer;
  }
  .img {
    position: relative;
    width: 12pt;
    height: 12pt;
  }
  @media (max-width: 899.25pt) {
    padding-top: 30pt;
    padding-bottom: 80pt;
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
  border-radius: 6pt;
  background-color: ${({ buttonActivate }) =>
    buttonActivate ? colors.main : '#e2e5ed'};
  cursor: pointer;
  @media (max-width: 899.25pt) {
    position: fixed;
    padding: 15pt 0 39pt 0;
    width: 100%;
    border-radius: 0pt;
  }
`;
