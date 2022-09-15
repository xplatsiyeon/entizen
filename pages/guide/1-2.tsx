import styled from '@emotion/styled';
import { Box, color, style } from '@mui/system';
import Image from 'next/image';
import colors from 'styles/colors';
import BackImg from 'public/images/back-btn.svg';
import Home from 'public/images/home.svg';
import ElectricCar from 'public/guide/ElectricCar.svg';
import Convenience from 'public/guide/Convenience.svg';
import Cafe from 'public/guide/Cafe.svg';
import Personal from 'public/guide/Personal.svg';
import Etc from 'public/guide/Etc.svg';
import PlusCircle from 'public/guide/PlusCircle.svg';
import CaretDown from 'public/guide/CaretDown.svg';

const guide1_2 = () => {
  return (
    <Wrapper>
      <Header>
        <div className="back-img">
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={BackImg}
            alt="btn"
          />
        </div>
        <span className="text">보조금 가이드</span>
        <div className="setting-img">
          <Image
            style={{
              cursor: 'pointer',
              width: '18pt',
              height: '18pt',
            }}
            src={Home}
            alt="home"
          />
        </div>
      </Header>
      <Step>STEP 1</Step>
      <Text>충전기 설치 목적을 선택해주세요.</Text>
      <Intersection>
        <div className="grid-item">
          <Image src={ElectricCar} alt="electricCar" />
          <p>
            전기차 충전 사업 <br />
            (주유소, 휴게소 등)
          </p>
        </div>
        <div className="grid-item">
          <Image src={Convenience} alt="Convenience" />
          <p>
            전기차 충전 사업 <br />
            (주유소, 휴게소 등)
          </p>
        </div>
        <div className="grid-item">
          <Image src={Cafe} alt="Cafe" />
          <p>
            전기차 충전 사업 <br />
            (주유소, 휴게소 등)
          </p>
        </div>
        <div className="grid-item">
          <Image src={Personal} alt="Personal" />
          <p>
            전기차 충전 사업 <br />
            (주유소, 휴게소 등)
          </p>
        </div>
        <div className="grid-item">
          <Image src={Etc} alt="Etc" />
          <p>
            전기차 충전 사업 <br />
            (주유소, 휴게소 등)
          </p>
        </div>
      </Intersection>
      <Step2>STEP 2</Step2>
      <Text>
        보조금 최대 수령을 위해 <br /> 아래 항목을 입력해주세요.
      </Text>
      <QuantityBox>
        <span className="name">충전기 종류 및 수량 선택</span>
        <Image src={PlusCircle} alt="PlusCircle" />
      </QuantityBox>
      <SelectContainer>
        <SelectBox>
          <label className="item-label">충전기 종류</label>
          <Image src={CaretDown} alt="caret-down" />
        </SelectBox>
      </SelectContainer>
      <SelectContainer>
        <SelectBox>
          <label className="item-label">타입</label>
          <Image src={CaretDown} alt="caret-down" />
        </SelectBox>
        <SelectBox>
          <label className="item-label">채널</label>
          <Image src={CaretDown} alt="caret-down" />
        </SelectBox>
        <SelectBox>
          <label className="item-label">수량</label>
          <Image src={CaretDown} alt="caret-down" />
        </SelectBox>
      </SelectContainer>
      <Label>충전기 설치 지역</Label>
      <SelectContainer>
        <SelectBox>
          <label className="item-label">선택</label>
          <Image src={CaretDown} alt="caret-down" />
        </SelectBox>
        <SelectBox>
          <label className="item-label">선택</label>
          <Image src={CaretDown} alt="caret-down" />
        </SelectBox>
      </SelectContainer>
      <span></span>
    </Wrapper>
  );
};

export default guide1_2;

const Wrapper = styled.div`
  padding-bottom: 50pt;
  padding-left: 15pt;
  padding-right: 15pt;
`;
const Header = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36pt;
  padding: 9pt 0;
  padding: 0 15pt;
  .back-img {
    position: absolute;
    left: 7pt;
    padding: 5px;
  }
  .text {
    font-weight: 700;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .setting-img {
    position: absolute;
    right: 7pt;
    padding: 5px;
  }
`;
const Step = styled.h3`
  padding-top: 25.5pt;
  font-weight: 500;
  font-size: 15pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main};
`;
const Text = styled.p`
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  letter-spacing: -0.02em;
  padding-top: 7.5pt;
  color: ${colors.main2};
`;
const Intersection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 11.25pt;
  padding-top: 30pt;
  .grid-item {
    border: 1px solid ${colors.gray};
    border-radius: 8px;
    font-weight: 400;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
    padding: 15.75pt 0 9.75pt 0;
  }
`;
const Step2 = styled.h3`
  padding-top: 45pt;
  font-weight: 500;
  font-size: 15pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main};
`;
const QuantityBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30pt;
  .name {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const SelectBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 13.5pt 11.25pt 13.5pt 12.75pt;
  border: 1px solid #e2e5ed;
  border-radius: 8px;
  margin-top: 9pt;
  .item-label {
    font-weight: 400;
    font-size: 12pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray3};
  }
`;
const SelectContainer = styled.div`
  display: flex;
  gap: 8.25pt;
  /* gap: 14px; */
`;
const Label = styled.div`
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
  margin-top: 33pt;
`;
