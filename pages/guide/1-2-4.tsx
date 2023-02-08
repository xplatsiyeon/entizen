import styled from '@emotion/styled';
import colors from 'styles/colors';
import GuideHeader from 'components/guide/header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import WebFooter from 'componentsWeb/WebFooter';
import WebHeader from 'componentsWeb/WebHeader';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { subsidyGuideAction } from 'store/subsidyGuideSlice';
import UserRightMenu from 'components/UserRightMenu';
import alertIcon from '/public/images/akar-icons_circle-alert-fill.png';
import arrowIcon from '/public/images/subsidy-arrow-icon.png';

import Image from 'next/image';
interface Subsidy {
  ministryOfEnvironmentApplyPrice: number;
  koreaEnergyAgencyApplyPrice: number;
  localGovernmentApplyPrice: number;
  duplicateApplyPrice: number;
  maxApplyPrice: number;
  canDuplicateApply: boolean;
  date: string;
}

const Guide1_2_4 = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [subsidy, setSubsidy] = useState<Subsidy>();

  const { subsidyGuideData } = useSelector((state: RootState) => state);
  const thisYearSubsidy = subsidyGuideData.thisYearSubsidy;
  const checkYear = Object.entries(thisYearSubsidy)
    .slice(0, 5)
    .map((e) => e[1])
    .every((e) => e !== 0);

  const changeMoneyUnit = (num: any): string => {
    if (num) {
      if (num === 0) {
        return '0';
      } else {
        return num
          .toString()
          .slice(0, -3)
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
      }
    } else {
      return '0';
    }
  };

  const onClickButton = () => {
    dispatch(subsidyGuideAction.reset());
    router.push('/');
  };

  useEffect(() => {
    console.log('subsidyGuideData==>>', subsidyGuideData);

    if (checkYear === true) {
      // 올해 보조금 금액
      setSubsidy(subsidyGuideData.thisYearSubsidy);
    } else {
      // 작년 보조금 금액
      setSubsidy(subsidyGuideData.lastYearSubsidy);
    }
  }, [subsidyGuideData]);

  return (
    <Body>
      <WebHeader num={3} now={'guide'} sub={'guide'} />
      <Wrapper>
        <UserRightMenu />
        <GuideHeader
          title={'보조금 가이드'}
          leftOnClick={() => router.back()}
          rightOnClick={() => router.push('/')}
        />

        {checkYear ? (
          <>
            {' '}
            <SubsidyResult>
              <p>
                <span className="accent">{subsidyGuideData.memberName}</span>
                님이
                <br /> 신청 가능한 보조금은 <br />
                최대&nbsp;
                <span className="accent">
                  {`${changeMoneyUnit(subsidy?.maxApplyPrice)}만원`}
                </span>
                &nbsp;입니다
              </p>
            </SubsidyResult>
            <ResultContainer>
              {/* 환경부 */}
              <div className="box">
                <div className="name">환경부</div>
                <div className="price">
                  {`${changeMoneyUnit(
                    subsidy?.ministryOfEnvironmentApplyPrice,
                  )}만원`}
                </div>
              </div>

              {subsidy?.canDuplicateApply ? (
                <>
                  {/* 한국에너지공단 */}
                  <div className="box">
                    <div className="name overlap">한국에너지공단</div>
                    <div className="price overlap">
                      {`${changeMoneyUnit(
                        subsidy?.koreaEnergyAgencyApplyPrice,
                      )}만원`}
                      <div className="badge">중복 신청 가능</div>
                    </div>
                  </div>
                  {/* 지자체 */}
                  <div className="box">
                    <div className="name overlap">{`${subsidyGuideData?.installationSiDo} ${subsidyGuideData?.installationSiGunGu}`}</div>
                    <div className="price overlap">
                      {`${changeMoneyUnit(
                        subsidy?.localGovernmentApplyPrice,
                      )}만원`}
                      <div className="badge">중복 신청 가능</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* 한국에너지공단 */}
                  <div className="box">
                    <div className="name">한국에너지공단</div>
                    <div className="price">
                      {`${changeMoneyUnit(
                        subsidy?.koreaEnergyAgencyApplyPrice,
                      )}만원`}
                    </div>
                  </div>
                  {/* 지자체 */}
                  <div className="box">
                    <div className="name">{`${subsidyGuideData?.installationSiDo} ${subsidyGuideData?.installationSiGunGu}`}</div>
                    <div className="price">
                      {`${changeMoneyUnit(
                        subsidy?.localGovernmentApplyPrice,
                      )}만원`}
                    </div>
                  </div>
                </>
              )}
            </ResultContainer>
            <Notice pt={72}>
              보조금은 &apos;전기자동차충전사업자&apos;로 등록된 <br />
              사업자만 신청 가능합니다.
              <br />
              <br />
              &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고, <br />
              파트너와 보조금에 대해 상의해보세요!
            </Notice>
          </>
        ) : (
          <LastYearSubsidyGuide>
            <div className="alert">
              <Image src={alertIcon} width={44} height={44} />
            </div>
            <h1 className="main">
              보조금 공고 발표 전<br /> 또는 신청기간이 지났습니다.
            </h1>
            <p className="notice">
              보조금 알림설정을 통해
              <br /> 새로운 보조금 공고소식을 받아보세요.
            </p>
            <button className="subsidyButton">
              보조금 알림설정 가기{' '}
              <div className="arrow">
                <Image src={arrowIcon} width={5} height={10} />
              </div>
            </button>
            <div className="Announcement">
              <p className="text">
                찾으신 제품의 2021년 보조금은
                <br />
                최대{' '}
                <span className="highlight">
                  {`${subsidy?.maxApplyPrice?.toLocaleString('ko-KR')}원`}
                </span>{' '}
                이었습니다.
              </p>
            </div>
            <Notice pt={45}>
              보조금은 &apos;전기자동차충전사업자&apos;로 등록된 <br />
              사업자만 신청 가능합니다.
              <br />
              <br />
              &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고, <br />
              파트너와 보조금에 대해 상의해보세요!
            </Notice>
          </LastYearSubsidyGuide>
        )}

        <Btn onClick={onClickButton}>홈으로</Btn>
      </Wrapper>
      <WebFooter />
    </Body>
  );
};

export default Guide1_2_4;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  min-height: 650pt;
  @media (max-height: 809pt) {
    display: block;
    width: 100%;
    padding: 0;
  }
`;
const Wrapper = styled.div`
  width: 345pt;
  margin: 0 auto;
  padding-bottom: 100pt;
  padding-left: 15pt;
  padding-right: 15pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    padding: 0;
  }
`;
const SubsidyResult = styled.div`
  padding-top: 66pt;
  text-align: center;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  text-align: center;
  letter-spacing: -0.02em;
  .accent {
    color: ${colors.main};
  }
`;
const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4.5pt;
  .box {
    padding-top: 45pt;
    width: 100%;
  }
  .name {
    background: ${colors.lightWhite};
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 8px;
    padding: 12pt 0;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .price {
    position: relative;
    background: ${colors.lightWhite};
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 8px;
    margin-top: 3pt;
    padding: 30pt 14.25pt;
    font-weight: 700;
    font-size: 12pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.darkGray};
  }
  .overlap {
    border: 0.75pt solid rgba(90, 45, 201, 0.5);
  }
  .badge {
    position: absolute;
    bottom: 10pt;
    left: 50%;
    transform: translate(-50%, 0%);
    font-weight: 700;
    font-size: 9pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main};
    width: 100%;
  }

  @media (max-width: 899.25pt) {
    box-sizing: border-box;
    margin: 0 15pt;
  }
`;
const Notice = styled.p<{ pt: number }>`
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  padding-top: ${({ pt }) => pt}pt;
`;
const Btn = styled.div`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  margin-top: 33pt;
  background-color: ${colors.main};
  @media (max-width: 899.25pt) {
    display: block;
  }
`;

const LastYearSubsidyGuide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 15pt;
  .alert {
    margin-top: 46.5pt;
  }
  .main {
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin: 19.5pt 54pt 15pt 54pt;
  }
  .notice {
    font-weight: 500;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
    margin: 0 48.75pt;
  }
  .subsidyButton {
    margin-top: 27pt;
    display: flex;
    gap: 7.5pt;
    background: ${colors.main1};
    border-radius: 29px;
    font-weight: 700;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightWhite};
    padding: 9pt 12pt;
  }
  .arrow {
  }

  .Announcement {
    background: ${colors.lightWhite};
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    padding: 24pt 0;
    width: 100%;
    /* margin-top: 36pt; */
    margin: 36pt 15pt 0 15pt;
  }
  .text {
    font-weight: 600;
    font-size: 10.5pt;
    line-height: 32px;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    text-align: 20px;
  }
  .highlight {
    font-weight: 700;
    font-size: 18pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main1};
  }

  @media (min-width: 899.25pt) {
    /* border: 1px solid red; */
    width: 411pt;
    .Announcement {
      font-weight: 700;
      font-size: 19.5pt;
      line-height: 28.5pt;
      text-align: center;
      letter-spacing: -0.02em;
      color: ${colors.main2};
    }
    .text {
    }
    .highlight {
    }
  }
`;
