import styled from '@emotion/styled';
import CommunicationBox from 'components/CommunicationBox';
import { useState } from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import Image from 'next/image';
import { ChargingStations } from 'QueryComponents/UserQuery';
import { hyphenFn } from 'utils/calculatePackage';
import Carousel from '../projects/Carousel';
import colors from 'styles/colors';
import { Button } from '@mui/material';

interface Props {
  data: ChargingStations;
}

const PlaceInfo = ({ data }: Props) => {
  const [idx, setIdx] = useState<number>(1);

  const handleNum = () => {
    if (idx === 1) {
      setIdx(2);
    } else {
      setIdx(1);
    }
  };

  return (
    <Wrapper>
      <DownArrowBox>
        <Image src={DoubleArrow} alt="double-arrow" />
      </DownArrowBox>

      {/* 데이터 하드코딩*/}
      <Contents>
        <Partner>파트너 정보</Partner>
        <div className="text-box">
          <span className="name">회사명</span>
          <span className="text">
            {data?.companyMember?.companyMemberAdditionalInfo?.companyName}
          </span>
        </div>
        <div className="text-box">
          <span className="name">담당자</span>
          <span className="text">{data?.companyMember?.name}</span>
        </div>
        <div className="text-box">
          <span className="name">이메일</span>
          <span className="text emailText">
            {data?.companyMember?.companyMemberAdditionalInfo?.managerEmail}
          </span>
        </div>
        <div className="text-box">
          <span className="name">연락처</span>
          <span className="text phone">
            {hyphenFn(data?.companyMember?.phone)}
          </span>
        </div>
      </Contents>

      <FileBox>
        <FinishedPhotoText>첨부 파일</FinishedPhotoText>
        {/* {data?.finalQuotation?.finalQuotationChargers?.map(
          (item, index) => (
            <React.Fragment key={item.}>
              {item.map((file, index) => (
                <FileDownloadBtn key={file.chargerProductFileIdx}>
                  <FileDownload
                    // onClick={DownloadFile}
                    download={file.originalName}
                    href={file.url}
                  >
                    <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                    {file.originalName}
                  </FileDownload>
                </FileDownloadBtn>
              ))}
            </React.Fragment>
          ),
        )} */}
      </FileBox>

      <>
        <FinishedPhotoText>완료현장 사진</FinishedPhotoText>

        {/* 사진이 들어갈 공간*/}
        <FinishedPhotoBox>
          <Carousel file={data?.projectCompletionFiles} />
          <Index onClick={handleNum}>{idx}/2</Index>
        </FinishedPhotoBox>
      </>

      <Wrap>
        <CommunicationBox
          text="파트너와 소통하기"
          clickHandler={() => alert('개발중입니다.')}
        />
      </Wrap>
    </Wrapper>
  );
};

export default PlaceInfo;

const Wrapper = styled.div`
  margin-top: 42pt;
`;
const DownArrowBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 21pt;
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
`;

const FileBox = styled.div`
  padding-bottom: 18pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
`;
const FinishedPhotoText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 10.5pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: left;
  margin-top: 39pt;
`;
const FinishedPhotoBox = styled.div`
  width: 100%;
  height: 91.5pt;
  border-bottom: 0.75pt solid ${colors.lightGray};
  margin-top: 12pt;
  border-radius: 6pt;
  position: relative;
`;

const Index = styled.div`
  width: 12pt;
  padding: 1.5pt 4.5pt;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 7.5pt;
  color: white;
  position: absolute;
  bottom: 9pt;
  right: 6pt;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 7.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
`;

const Wrap = styled.div`
  margin-top: 60pt;
  display: flex;
  justify-content: center;
  padding-bottom: 135pt;
`;

const FileDownloadBtn = styled(Button)`
  margin: 15pt 15pt 6pt 15pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 8px;
`;

const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
`;
