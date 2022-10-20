import styled from '@emotion/styled';
import { Collapse, List, ListItemButton, ListItemText } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react';
import colors from 'styles/colors';
import CenterBox from './\bCenterBox';
import RightArrow from 'public/images/black-right-arrow.svg';
import CommunicationIcon from 'public/images/communication-icon.svg';
import TopBox from './TopBox';
import BottomBox from './BottomBox';
import { useRouter } from 'next/router';

type Props = {};

// 본체
const SentQuoatationFirst = (props: Props) => {
  const router = useRouter();

  // 상단 열고 닫기
  const [open, setOpen] = useState<boolean>(false);

  // 안쓰이나 ?
  const [text, setText] = useState<string>('');

  // 상단 열리고 닫히고
  const handleClick = () => setOpen(!open);
  return (
    <>
      <CustomerRequestContent>고객 요청 내용</CustomerRequestContent>
      <TopBox handleClick={handleClick} open={open} setOpen={setOpen} />
      <CenterBox />
      <BottomBox />
      <BtnBox>
        {/*가견적 수정하기*/}
        <EditBtn onClick={() => router.push('/')}>가견적 수정하기</EditBtn>
      </BtnBox>
    </>
  );
};

//          onClick={() =>
//            /*route.push('/chatting/1')*/ alert('2차 작업 범위입니다')
//            }
//        >
//          <div>
//           <Image src={CommunicationIcon} alt="right-arrow" />
//          </div>
//          고객과 소통하기
//         <div>
// //           <Image src={RightArrow} alt="right-arrow" />
//         </div>
//       </Button>

const CustomerRequestContent = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${colors.main};
  margin-top: 21pt;
`;

const Wrapper = styled.div`
  display: block;
  box-shadow: 0px 3pt 7.5pt rgba(137, 163, 201, 0.4);
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 15pt;
  border-top: 1px solid #e2e5ed;
  @media (max-width: 899pt) {
    display: flex;
    flex-direction: column;
  }
`;

const ItemButton = styled(ListItemButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  & div {
    margin: 0;
  }
`;

const StoreName = styled(ListItemText)`
  padding-top: 16.5pt;
  padding-bottom: 16.5pt;
  margin-top: 4.5pt;
  & div {
    margin-top: 12pt;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
  }
  & div > h1 {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  & div > img {
    display: flex;
    align-items: center;
  }
  & p {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;

const ArrowImg = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 6.5pt;
  width: 18pt;
  height: 18pt;
`;

const Contents = styled.div`
  padding-top: 19.5pt;
  padding-bottom: 18pt;
  border-bottom: 1px solid #e9eaee;
  .text-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :not(:nth-of-type(1)) {
      padding-top: 12pt;
    }

    .emailText {
      font-family: Spoqa Han Sans Neo;
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: right;
    }
  }

  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
  }
  .text {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .img-box {
    padding-top: 42pt;
    padding-bottom: 24pt;
    text-align: center;
  }
`;

const Partner = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
  padding-bottom: 24pt;
`;

const EditBtn = styled.div`
  margin-top: 27pt;
  padding-top: 15pt;
  text-align: center;
  padding-bottom: 15pt;
  border: 1px solid ${colors.main};
  color: ${colors.main};
  border-radius: 6pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
`;

const BtnBox = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  padding-bottom: 73.5pt;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-top: 42pt; */
  margin: 42pt auto 0pt auto;
  padding: 10.5pt 12pt;
  border-radius: 21.75pt;
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  background: #f3f4f7;
  color: ${colors.main2};
`;

export default SentQuoatationFirst;
