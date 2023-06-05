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
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { subsidyAction } from 'store/subsidySlice';
// interface Subsidy {
//   ministryOfEnvironmentApplyPrice: number;
//   koreaEnergyAgencyApplyPrice: number;
//   localGovernmentApplyPrice: number;
//   duplicateApplyPrice: number;
//   maxApplyPrice: number;
//   canDuplicateApply: boolean;
//   date: string;
// }선택요금제도

const SubsidyResultGuide = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const mobile = useMediaQuery({
    query: '(max-width:810pt)',
  });

  const { subsidyGuideData } = useSelector((state: RootState) => state);
  const thisYearSubsidy = subsidyGuideData.thisYearSubsidy;
  const checkYear = Object.entries(thisYearSubsidy)
    .slice(0, 5)
    .map((e) => e[1])
    .every((e) => e === 0);

  const changeMoneyUnit = (num: any): string => {
    if (num) {
      if (num === 0) {
        return '0';
      } else {
        return num
          .toString()
          .slice(0, -4)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    } else {
      return '0';
    }
  };

  const onClickAlarmBtn = () => {
    router.push({
      pathname: '/setting',
      query: { id: 1, direct: true },
    });
  };

  const onClickButton = () => {
    dispatch(subsidyGuideAction.reset());
    router.push('/');
  };

  useEffect(() => {
    dispatch(subsidyAction.reset());
  }, []);

  // console.log(`⭐️ line: 81, ⭐️ subsidyGuideData: ${subsidyGuideData}`);
  // console.log(subsidyGuideData);
  // console.log(
  //   '최대 신청 보조금',
  //   subsidyGuideData?.thisYearSubsidy?.maxApplyPrice,
  // );
  // console.log(
  //   '최대 신청 보조금',
  //   changeMoneyUnit(subsidyGuideData?.thisYearSubsidy?.maxApplyPrice),
  // );

  return (
    <Body>
      <WebHeader num={3} now={'guide'} sub={'guide'} />
      <Wrapper>
        <UserRightMenu />

        {mobile && (
          <GuideHeader
            title={'보조금 가이드'}
            leftOnClick={() => router.back()}
            rightOnClick={() => router.push('/')}
          />
        )}

        <Container>
          {!checkYear ? (
            <>
              {/* ================== 올해 보조금 ====================*/}
              <SubsidyResult>
                {mobile ? (
                  <p>
                    <span className="accent">
                      {subsidyGuideData.memberName}
                    </span>
                    님이
                    <br /> 신청 가능한 보조금은 <br />
                    최대&nbsp;
                    <span className="accent">
                      {`${changeMoneyUnit(
                        subsidyGuideData?.thisYearSubsidy?.maxApplyPrice,
                      )}만원`}
                    </span>
                    &nbsp;입니다
                  </p>
                ) : (
                  <p>
                    <span className="accent">
                      {subsidyGuideData.memberName}
                    </span>
                    님이 신청 가능한 보조금은 <br />
                    최대&nbsp;
                    <span className="accent">
                      {`${changeMoneyUnit(
                        subsidyGuideData?.thisYearSubsidy?.maxApplyPrice,
                      )}만원`}
                    </span>
                    &nbsp;입니다
                  </p>
                )}
              </SubsidyResult>
              <ResultContainer>
                {/* 환경부 */}
                <div className="box">
                  <div className="name">환경부</div>
                  <div className="price">
                    {`${changeMoneyUnit(
                      subsidyGuideData?.thisYearSubsidy
                        ?.ministryOfEnvironmentApplyPrice,
                    )}만원`}
                  </div>
                </div>

                {subsidyGuideData?.thisYearSubsidy?.canDuplicateApply ? (
                  <>
                    {/* 한국에너지공단 */}
                    <div className="box">
                      <div className="name overlap">한국에너지공단</div>
                      <div className="price overlap">
                        {`${changeMoneyUnit(
                          subsidyGuideData?.thisYearSubsidy
                            ?.koreaEnergyAgencyApplyPrice,
                        )}만원`}
                        <div className="badge">중복 신청 가능</div>
                      </div>
                    </div>
                    {/* 지자체 */}
                    <div className="box">
                      <div className="name overlap">{`${subsidyGuideData?.installationSiDo} ${subsidyGuideData?.installationSiGunGu}`}</div>
                      <div className="price overlap">
                        {`${changeMoneyUnit(
                          subsidyGuideData?.thisYearSubsidy
                            ?.localGovernmentApplyPrice,
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
                          subsidyGuideData?.thisYearSubsidy
                            ?.koreaEnergyAgencyApplyPrice,
                        )}만원`}
                      </div>
                    </div>
                    {/* 지자체 */}
                    <div className="box">
                      <div className="name">{`${subsidyGuideData?.installationSiDo} ${subsidyGuideData?.installationSiGunGu}`}</div>
                      <div className="price">
                        {`${changeMoneyUnit(
                          subsidyGuideData?.thisYearSubsidy
                            ?.localGovernmentApplyPrice,
                        )}만원`}
                      </div>
                    </div>
                  </>
                )}
              </ResultContainer>
              {!mobile ? (
                <Notice pt={72}>
                  보조금은 &apos;전기자동차충전사업자&apos;로 등록된 사업자만
                  신청 가능합니다.
                  <br />
                  &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고,
                  파트너와 보조금에 대해 상의해보세요!
                </Notice>
              ) : (
                <Notice pt={37.5}>
                  <br />
                  &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고, <br />
                  파트너와 보조금에 대해 상의해보세요!
                </Notice>
              )}
            </>
          ) : (
            // ==================== 작년 보조금 ======================
            <LastYearSubsidyGuide>
              <div className="alert">
                <Image src={alertIcon} layout="fill" />
              </div>
              <h1 className="main">
                보조금 공고 발표 전<br /> 또는 신청기간이 지났습니다.
              </h1>
              <p className="notice">
                {'보조금 알림설정을 통해\n새로운 보조금 공고소식을 받아보세요.'}
              </p>
              <button className="subsidyButton" onClick={onClickAlarmBtn}>
                보조금 알림설정 가기
                <div className="arrow">
                  <Image src={arrowIcon} width={5} height={10} />
                </div>
              </button>
              <div className="Announcement">
                <p className="text">
                  찾으신 제품의
                  {Number(subsidyGuideData.thisYearSubsidy.date.slice(0, 4)) -
                    1}
                  년 보조금은
                </p>
                <p className="text">
                  최대&nbsp;
                  <span className="highlight">
                    {`${subsidyGuideData.lastMaximumSubsidy.toLocaleString(
                      'ko-KR',
                    )}원`}
                  </span>
                  이었습니다.
                </p>
              </div>
              {mobile ? (
                <Notice pt={30}>
                  {/* 보조금은 &apos;전기자동차충전사업자&apos;로 등록된
                  <br />
                  사업자만 신청 가능합니다.
                  <br /> */}
                  <br />
                  &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고,
                  <br />
                  파트너와 보조금에 대해 상의해보세요!
                </Notice>
              ) : (
                <Notice pt={60}>
                  보조금은 &apos;전기자동차충전사업자&apos;로 등록된 사업자만
                  신청 가능합니다.
                  <br />
                  &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고,
                  파트너와 보조금에 대해 상의해보세요!
                </Notice>
              )}
            </LastYearSubsidyGuide>
          )}
        </Container>
        <Btn onClick={onClickButton}>홈으로</Btn>
      </Wrapper>
      <WebFooter />
    </Body>
  );
};

export default SubsidyResultGuide;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    width: 100%;
    padding: 0;
    min-height: auto;
  }
`;
const Wrapper = styled.div`
  margin: 0 auto;
  @media (max-width: 899.25pt) {
    width: 100%;
    min-height: 100vh;
    padding: 0;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Container = styled.div`
  @media (max-width: 899.25pt) {
    width: 100%;
    padding-left: 15pt;
    padding-right: 15pt;
    padding-bottom: 33pt;
  }
`;
const SubsidyResult = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  text-align: center;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  width: 100%;
  @media (min-width: 900pt) {
    font-size: 19.5pt;
    font-weight: 700;
    line-height: 28.5pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
  .accent {
    font-family: 'Spoqa Han Sans Neo';
    color: ${colors.main};
    font-size: 18pt;
    font-weight: 700;
    line-height: 24pt;
    letter-spacing: -0.02em;
    text-align: center;
    @media (min-width: 900pt) {
      font-size: 19.5pt;
      font-weight: 700;
      line-height: 28.5pt;
      letter-spacing: -0.02em;
      text-align: center;
    }
  }
`;
const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4.5pt;
  width: 100%;
  .box {
    padding-top: 45pt;
    width: 100%;
  }
  .name {
    background: ${colors.lightWhite};
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    font-family: 'Spoqa Han Sans Neo';
    border-radius: 8px;
    padding: 12pt 0;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: center;
      padding: 13.5pt 0;
    }
  }
  .price {
    position: relative;
    font-family: 'Spoqa Han Sans Neo';
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
    @media (min-width: 900pt) {
      font-size: 13.5pt;
      font-weight: 700;
      line-height: 15pt;
      letter-spacing: -0.02em;
      text-align: center;
      padding: 37.5pt 23.25pt;
    }
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
    /* margin: 0 15pt; */
  }
`;
const Notice = styled.p<{ pt: number }>`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  padding-top: ${({ pt }) => pt}pt;
  width: 100%;
  @media (min-width: 899.25pt) {
    font-size: 12pt;
    font-weight: 500;
    line-height: 21pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;
const Btn = styled.div`
  display: none;
  color: ${colors.lightWhite};
  width: 100%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  /* margin-top: 33pt; */
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
  /* padding: 0 15pt; */

  .alert {
    position: relative;
    /* margin-top: 46.5pt; */
    width: 33pt;
    height: 33pt;
  }
  .main {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    margin: 19.5pt 54pt 15pt 54pt;
    width: 100%;
  }
  .notice {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 500;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};

    white-space: nowrap;
    /* margin: 0 48.75pt; */
  }
  .subsidyButton {
    font-family: 'Spoqa Han Sans Neo';
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
    @media (min-width: 900pt) {
      font-size: 9pt;
      font-weight: 700;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .Announcement {
    background: ${colors.lightWhite};
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 6pt;
    padding: 18pt 0;
    width: 345pt;
    height: 75pt;
    margin: 36pt 15pt 0 15pt;
  }
  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 600;
    font-size: 10.5pt;
    /* line-height: 32px; */
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    text-align: 20px;
    white-space: pre-wrap;
  }
  .highlight {
    font-family: 'Spoqa Han Sans Neo';
    font-weight: 700;
    font-size: 18pt;
    line-height: 15pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main1};
  }

  @media (max-width: 899.25pt) {
    .Announcement {
      font-weight: 700;
      font-size: 19.5pt;
      line-height: 28.5pt;
      text-align: center;
      letter-spacing: -0.02em;
      color: ${colors.main2};
      width: 100%;
      height: auto;
    }
    .alert {
      width: 41.25pt;
      height: 41.25pt;
      margin-top: 37.5pt;
    }
    .notice {
      white-space: pre-wrap;
    }
    .text {
      font-weight: 500;
      font-size: 12pt;
      line-height: 15pt;
      white-space: nowrap;
    }
    .highlight {
    }
    .br {
      display: none;
    }
    .subsidyButton {
      font-family: 'Spoqa Han Sans Neo';
      font-weight: 700;
      font-size: 9pt;
      line-height: 12pt;
      letter-spacing: -0.02em;
      padding: 9pt 12pt;
    }
  }
`;
