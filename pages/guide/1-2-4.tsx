import styled from '@emotion/styled';
import colors from 'styles/colors';
import GuideHeader from 'components/guide/header';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import WebFooter from 'web-components/WebFooter';
import WebHeader from 'web-components/WebHeader';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

const Guide1_2_4 = () => {
  const router = useRouter();
  const { subsidyGuideData } = useSelector((state: RootState) => state);
  const changeMoneyUnit = (num: any): string => {
    if (num === 0) {
      return '0';
    }

    return num
      .toString()
      .slice(0, -3)
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    console.log('보조금 확인');
    console.log(subsidyGuideData);
  }, [subsidyGuideData]);
  return (
    <Body>
      <WebHeader num={3} now={'guide'} />
      <Wrapper>
        <GuideHeader
          title={'보조금 가이드'}
          leftOnClick={() => router.back()}
          rightOnClick={() => router.push('/')}
        />
        <SubsidyResult>
          <p>
            <span className="accent">윤세영</span>님이
            <br /> 신청 가능한 보조금은 <br />
            최대&nbsp;
            <span className="accent">
              {`${changeMoneyUnit(subsidyGuideData.maxApplyPrice)}만원`}
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
                subsidyGuideData.ministryOfEnvironmentApplyPrice,
              )}만원`}
            </div>
          </div>

          {subsidyGuideData.canDuplicateApply ? (
            <>
              {/* 한국에너지공단 */}
              <div className="box">
                <div className="name overlap">한국에너지공단</div>
                <div className="price overlap">
                  {`${changeMoneyUnit(
                    subsidyGuideData.koreaEnergyAgencyApplyPrice,
                  )}만원`}
                  <div className="badge">중복 신청 가능</div>
                </div>
              </div>
              {/* 지자체 */}
              <div className="box">
                <div className="name overlap">{`${subsidyGuideData.region1} ${subsidyGuideData.region2}`}</div>
                <div className="price overlap">
                  {`${changeMoneyUnit(
                    subsidyGuideData.localGovernmentApplyPrice,
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
                    subsidyGuideData.koreaEnergyAgencyApplyPrice,
                  )}만원`}
                </div>
              </div>
              {/* 지자체 */}
              <div className="box">
                <div className="name">안양시청</div>
                <div className="price">
                  {`${changeMoneyUnit(
                    subsidyGuideData.localGovernmentApplyPrice,
                  )}만원`}
                </div>
              </div>
            </>
          )}
        </ResultContainer>
        <Notice>
          보조금은 &apos;전기자동차충전사업자&apos;로 등록된 <br />
          사업자만 신청 가능합니다.
          <br />
          <br />
          &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고, <br />
          파트너와 보조금에 대해 상의해보세요!
        </Notice>
        <Btn onClick={() => router.push('/')}>홈으로</Btn>
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
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100vh;
  }
`;
const Wrapper = styled.div`
  padding-bottom: 100pt;
  padding-left: 15pt;
  padding-right: 15pt;
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
`;
const Notice = styled.p`
  font-weight: 500;
  font-size: 9pt;
  line-height: 12pt;
  text-align: center;
  letter-spacing: -0.02em;
  color: ${colors.lightGray2};
  padding-top: 72pt;
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
  @media (max-width: 899pt) {
    display: block;
  }
`;
