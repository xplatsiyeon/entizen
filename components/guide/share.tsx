import BgImg from 'public/guide/share-background.svg';
import styled from '@emotion/styled';
import Image from 'next/image';
import colors from 'styles/colors';
const Share = () => {
  return (
    <Wrapper>
      <ImgBox>
        <Image src={BgImg} alt="banner" />
      </ImgBox>
      <ContentsBox>
        <Label>1. 수익지분: 0%</Label>
        <Contents>
          <p>
            충전기 설치비 최저! <br />
            충전사업 수익은 CaaS 사업자 소유
          </p>
          <label>추전대상:</label>
          <ul className="list" style={{ listStyleType: 'disc' }}>
            <li>설치 목적이 편의, 복지 등일 경우</li>
            <li>수익 Simul 결과가 안좋을 경우</li>
            <li>회사, 아파트, 오피스텔 등</li>
          </ul>
        </Contents>
        <Label>2. 수익지분: 1~99%</Label>
        <Contents>
          <label>추전대상:</label>
          <ul className="list" style={{ listStyleType: 'disc' }}>
            <li>본인 투자금이 부담스러울 경우</li>
            <li>수익 Simul 결과가 만족스럽지 못할 경우</li>
            <li>카페,세차장,쇼핑몰,영화관 등</li>
          </ul>
        </Contents>
        <Label>3. 수익지분: 100%</Label>
        <Contents>
          <p>
            충전기 구입 및 설치 모두 본인 부담 <br />
            하지만, 충전사업 수익은 모두 본인 소유!!
          </p>
          <label>추전대상:</label>
          <ul className="list" style={{ listStyleType: 'disc' }}>
            <li>설치 목적이 전기차 충전사업일 경우</li>
            <li>수익 Simul 결과가 만족스러울 경우</li>
            <li>주유소, 충전소, 휴게소 등</li>
          </ul>
        </Contents>
        <Notice>
          * 홈 충전기는 수익지분과 무관한 상품입니다. <br />
        </Notice>
      </ContentsBox>
    </Wrapper>
  );
};

export default Share;

const Wrapper = styled.div`
  padding-bottom: 180.75pt;
`;
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ContentsBox = styled.div`
  padding-top: 7.5pt;
`;
const Label = styled.label`
  display: block;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;

  color: ${colors.main2};

  margin-top: 27pt;
`;
const Contents = styled.div`
  padding-top: 12pt;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};

  .list {
    list-style-type: disc;
    padding-left: 15pt;
  }
`;
const Notice = styled.p`
  font-weight: 400;
  font-size: 9pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  padding-top: 27pt;
  color: ${colors.gray2};
`;
