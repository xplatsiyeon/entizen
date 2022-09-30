import styled from '@emotion/styled';
import colors from 'styles/colors';
import GuideHeader from 'components/guide/header';

const Guide1_2_4 = () => {
  return (
    <Wrapper>
      <GuideHeader title={'보조금 가이드'} />
      <SubsidyResult>
        <p>
          <span className="accent">윤세아</span>님이
          <br /> 신청 가능한 보조금은 <br />
          최대
          <span className="accent">4,500만원</span> 입니다
        </p>
      </SubsidyResult>
      <ResultContainer>
        {[1, 2, 3].map((_, index) => (
          <div className="box" key={index}>
            <div className="name">환경부</div>
            <div className="price">4,500만원</div>
          </div>
        ))}
      </ResultContainer>
      <Notice>
        보조금은 &apos;전기자동차충전사업자&apos;로 등록된 <br />
        사업자만 신청 가능합니다.
        <br />
        <br />
        &apos;간편견적&apos;을 통해 나만의 구독상품을 선택하고, <br />
        파트너와 보조금에 대해 상의해보세요!
      </Notice>
      <Btn> 보조금 확인하기</Btn>
    </Wrapper>
  );
};

export default Guide1_2_4;

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
  }
  .name {
    background: ${colors.lightWhite};
    box-shadow: 0px 0px 10px rgba(137, 163, 201, 0.2);
    border-radius: 8px;
    padding: 12pt 25.875pt;
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .price {
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
`;
