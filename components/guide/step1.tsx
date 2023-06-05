import styled from '@emotion/styled';
import colors from 'styles/colors';
import ElectricCar from 'public/guide/ElectricCar.svg';
import Convenience from 'public/guide/Convenience.svg';
import Cafe from 'public/guide/Cafe.svg';
import Personal from 'public/guide/Personal.svg';
import Etc from 'public/guide/Etc.svg';
import ElectricCarOn from 'public/guide/ElectricCar-on.svg';
import ConvenienceOn from 'public/guide/Convenience-on.svg';
import CafeOn from 'public/guide/Cafe-on.svg';
import PersonalOn from 'public/guide/Personal-on.svg';
import EtcOn from 'public/guide/Etc-on.svg';
import Image from 'next/image';

interface Purpose {
  id: number;
  name: string;
  text: string;
  subtitle?: string;
  img: string;
  onImg: string;
}
interface Props {
  clicked: number;
  handlePurposeOnClick: (x: number) => void;
}
const purpose: Purpose[] = [
  {
    id: 0,
    name: 'ElectricCar',
    text: '전기차 충전 사업',
    subtitle: '(주유소, 휴게소 등)',
    img: ElectricCar,
    onImg: ElectricCarOn,
  },
  {
    id: 1,
    name: 'Convenience',
    text: '편의, 복지 제공',
    subtitle: '(아파트, 직장 등)',
    img: Convenience,
    onImg: ConvenienceOn,
  },
  {
    id: 2,
    name: 'Cafe',
    text: '모객 효과',
    subtitle: '(카페, 쇼핑몰 등)',
    img: Cafe,
    onImg: CafeOn,
  },
  {
    id: 3,
    name: 'Personal',
    text: '개인 용도',
    subtitle: '(단독주택 등)',
    img: Personal,
    onImg: PersonalOn,
  },
  {
    id: 4,
    name: 'Etc',
    text: '기타',
    img: Etc,
    onImg: EtcOn,
  },
];

const Step1 = ({ clicked, handlePurposeOnClick }: Props) => {
  return (
    <>
      <Step>STEP 1</Step>
      <Text>충전기 설치 목적을 선택해주세요.</Text>
      <Intersection>
        {purpose.map((item, index) => (
          <GridItem
            clicked={clicked.toString()}
            index={index.toString()}
            key={item.id}
            onClick={() => handlePurposeOnClick(index)}
          >
            <Image
              src={index === clicked ? item.onImg : item.img}
              alt="electricCar"
            />
            <p>
              {item.text} <br />
              {item.subtitle}
            </p>
          </GridItem>
        ))}
      </Intersection>
    </>
  );
};

export default Step1;

const Step = styled.h3`
  font-family: 'Spoqa Han Sans Neo';
  /* padding-top: 25.5pt; */
  font-weight: 500;
  font-size: 15pt;
  line-height: 21pt;
  letter-spacing: -0.02em;
  color: ${colors.main};
`;
const Text = styled.p`
  font-family: 'Spoqa Han Sans Neo';
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
`;
const GridItem = styled.div<{ index: string; clicked: string }>`
  font-family: 'Spoqa Han Sans Neo';
  border-radius: 8px;
  font-weight: 400;
  font-size: 12pt;
  line-height: 18pt;
  text-align: center;
  letter-spacing: -0.02em;
  padding: 15.75pt 0 9.75pt 0;
  border: 0.75pt;
  border-style: solid;
  border-color: ${({ index, clicked }) =>
    index === clicked ? `${colors.main}` : `${colors.lightGray2}`};
  color: ${({ index, clicked }) =>
    index === clicked ? `${colors.main}` : `${colors.lightGray2}`};
  cursor: pointer;
`;
