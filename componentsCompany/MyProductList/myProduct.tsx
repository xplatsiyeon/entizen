import styled from '@emotion/styled';
import { Button, css } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import colors from 'styles/colors';
import CompanyHeader from './\bHeader';
import tempCar from 'public/images/temp-car.jpg';
import temp from 'public/mypage/temp-img.svg';
import fileImg from 'public/mypage/file-icon.svg';
import TwoBtn from './TwoBtn';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useRouter } from 'next/router';

type Props = {};

const MyProduct = (props: Props) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

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
  const exitHandle = () => {
    setModalOpen(false);
  };
  const modalRightBtnControll = () => {
    router.push('/company/myProductList');
  };

  const clickDelete = () => {
    setModalOpen(true);
  };
  const clickEdit = () => {
    router.push('/company/addProduct');
  };
  return (
    <>
      {modalOpen && (
        <TwoBtnModal
          text={'삭제하시겠습니까?'}
          leftBtnText={'취소'}
          rightBtnText={'확인'}
          leftBtnColor={'#222222'}
          rightBtnColor={'#F75015'}
          exit={exitHandle}
          leftBtnControl={exitHandle}
          rightBtnControl={modalRightBtnControll}
        />
      )}
      {/* 헤더 */}
      <CompanyHeader back={true} title={'LECS-007ADE'} />
      {/* 바디 */}
      <Wrapper>
        <List>
          <Item>
            <span className="name">모델명</span>
            <span className="value">LECS-007ADE</span>
          </Item>
          <Item>
            <span className="name">충전기 종류</span>
            <span className="value">7kW 충전기 (공용)</span>
          </Item>
          <Item>
            <span className="name">충전 채널</span>
            <span className="value">싱글</span>
          </Item>
          <Item>
            <span className="name">충전 방식</span>
            <span className="value">
              AC5핀
              <br />
              Socket
            </span>
          </Item>
          <Item>
            <span className="name">제조사</span>
            <span className="value">LS ELECTRIC</span>
          </Item>
          <Item>
            <span className="name">특장점</span>
            <span className="value">-</span>
          </Item>
          <Section grid={true}>
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
            </GridImg>
          </Section>
          <Section>
            <Subtitle>충전기 카탈로그</Subtitle>
            <FileBtn onClick={DownloadFile}>
              <Image src={fileImg} alt="file-icon" />
              Charge Point 카탈로그_7 KW
            </FileBtn>
          </Section>
        </List>
        <TwoBtn handleRightBtn={clickDelete} handleLeftBtn={clickEdit} />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  padding-top: 60pt;
  @media (max-width: 899pt) {
    padding-top: 21pt;
  }
`;

const Title = styled.h1`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  flex: 1;

  @media (max-width: 899pt) {
    margin-top: 0pt;
    padding: 0 15pt;
  }
`;

const Section = styled.section<{ grid?: boolean; pb?: number }>`
  padding-top: 12pt;

  @media (max-width: 899pt) {
    /* padding: 18pt 15pt; */
  }
`;
const List = styled.ul`
  /* padding: 30pt 0 51pt; */
  gap: 12pt;
  @media (max-width: 899pt) {
    padding-left: 15pt;
    padding-right: 15pt;
  }
`;
const Item = styled.li`
  display: flex;
  :not(:nth-of-type(1)) {
    padding-top: 12pt;
  }
  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    flex: 1;
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
  }

  @media (max-width: 899pt) {
    justify-content: space-between;
    .name {
      flex: none;
    }
    .value {
      flex: none;
      text-align: right;
    }
  }
`;
const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  flex: 1;
`;
const GridImg = styled.div`
  display: flex;
  padding-top: 9pt;
  gap: 6pt;
`;
const GridItem = styled.div`
  background-color: blue;
  position: relative;
  border-radius: 6pt;
  width: 81pt;
  height: 97.5pt;
`;
const FileBtn = styled(Button)`
  display: flex;
  gap: 3pt;
  margin-top: 9pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 8px;
`;
export default MyProduct;
