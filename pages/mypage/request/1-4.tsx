import MypageHeader from 'components/mypage/request/header';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import colors from 'styles/colors';
import temp from 'public/mypage/temp-img.svg';
import tempCar from 'public/images/temp-car.jpg';
import styled from '@emotion/styled';
import Image from 'next/image';
import { Button } from '@mui/material';
import fileImg from 'public/mypage/file-icon.svg';
import TwoButton from 'components/mypage/request/TwoButton';
import RequestModal from 'components/Modal/RequestModal';

const Mypage1_4 = ({ data }: any) => {
  const [isModal, setModal] = useState(false);
  const route = useRouter();
  const handleOnClick = () => route.back();

  // 파일 다운로드 함수
  const DownloadFile = useCallback(() => {
    let fileName = 'Charge Point 카탈로그_7 KW';
    let content = 'Charge Point 카탈로그_7 KW 테스트';
    const blob = new Blob([content], {
      type: 'text/plain',
    });
    const url = window.URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    element.remove();
    window.URL.revokeObjectURL(url);
  }, []);
  // 모달 컨트롤
  const onClcikModal = () => setModal((prev) => !prev);
  const rightControl = () => route.push('/mypage/request/1-5');
  return (
    <>
      {isModal && (
        <RequestModal leftControl={onClcikModal} rightControl={rightControl} />
      )}
      <MypageHeader
        title="상세내용"
        exitBtn={true}
        handleOnClick={handleOnClick}
      />
      <Body>
        <Image src={temp} alt="icon" />
        <Title>Charge Point</Title>
        <List>
          <Item>
            <span className="name">월 구독료</span>
            <span className="value">195,000 원</span>
          </Item>
          <Item>
            <span className="name">수익지분</span>
            <span className="value">70 %</span>
          </Item>
          <Item>
            <span className="name">공사기간</span>
            <span className="value">21 일</span>
          </Item>
          <Item>
            <span className="name">충전요금</span>
            <span className="value">250 원 / kW</span>
          </Item>
          <Item>
            <span className="name">충전기 제조사</span>
            <span className="value">LS ELECTRIC</span>
          </Item>
        </List>
        <Section>
          <Subtitle>특장점</Subtitle>
          <Label>구독 상품</Label>
          <FeaturesList>
            <li>QR인증, RFID 인증을 이용한 편리한 결제 시스템</li>
            <li>앱을 통한 충전기 사용현황 확인 및 사용 예약</li>
            <li>24시간 콜센터 운영</li>
          </FeaturesList>
          <Label>7 kW 충전기 (공용)</Label>
          <FeaturesList>
            <li>LS ELECTRIC 충전기</li>
            <li>수려한 디자인</li>
          </FeaturesList>
        </Section>
        <Section>
          <Subtitle>충전기 이미지</Subtitle>
          <GridImg>
            <GridItem>
              <Image src={tempCar} alt="img" layout="fill" />
            </GridItem>
            <GridItem>
              <Image src={tempCar} alt="img" layout="fill" />
            </GridItem>
            <GridItem>
              <Image src={tempCar} alt="img" layout="fill" />
            </GridItem>
            <GridItem>
              <Image src={tempCar} alt="img" layout="fill" />
            </GridItem>
          </GridImg>
        </Section>
        <Section>
          <Subtitle>충전기 카탈로그</Subtitle>

          <FileBtn onClick={DownloadFile}>
            <Image src={fileImg} alt="file-icon" />
            Charge Point 카탈로그_7 KW
          </FileBtn>
        </Section>
        <TwoButton onClcikModal={onClcikModal} />
      </Body>
    </>
  );
};

export default Mypage1_4;

const Body = styled.div`
  padding: 21pt 15pt;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 15pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Section = styled.section`
  padding: 18pt 0;
  border-bottom: 0.75pt solid ${colors.lightGray};
  :nth-last-of-type(1) {
    border-bottom: none;
    padding-bottom: 101.25pt;
  }
`;
const List = styled.ul`
  padding-top: 30pt;
  padding-bottom: 18pt;
  gap: 12pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
`;
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  :not(:nth-of-type(1)) {
    padding-top: 12pt;
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const Subtitle = styled.h2`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Label = styled.h3`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  :nth-of-type(1) {
    padding-top: 15pt;
  }
  :nth-of-type(2) {
    padding-top: 24pt;
  }
`;
const FeaturesList = styled.ol`
  padding-top: 6pt;
  list-style-type: decimal;
  list-style-position: inside;
  & li {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    :not(:nth-of-type(1)) {
      padding-top: 2pt;
    }
  }
`;
const GridImg = styled.div`
  display: grid;
  overflow-x: scroll;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 15pt;
  gap: 6pt;
`;
const GridItem = styled.div`
  background-color: blue;
  position: relative;
  border-radius: 6pt;
  width: 120pt;
  height: 144pt;
`;
const FileBtn = styled(Button)`
  display: flex;
  gap: 3pt;
  margin-top: 15pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 8px;
`;
