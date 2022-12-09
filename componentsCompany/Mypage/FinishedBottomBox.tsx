import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';
import DoubleArrow from 'public/mypage/CaretDoubleDown.svg';
import colors from 'styles/colors';
import fileImg from 'public/mypage/file-icon.svg';
import { Button } from '@mui/material';
import { HistoryProjectsDetail } from 'QueryComponents/CompanyQuery';
import { hyphenFn } from 'utils/calculatePackage';
import AsCompGetReview from 'componentsCompany/AS/component/AsCompGetReview';

type Props = {
  data: HistoryProjectsDetail;
};

const FinishedBottomBox = ({ data }: Props) => {
  return (
    <>
      <Wrapper>
        <ImageBox>
          <Image src={DoubleArrow} alt="doubleArrow" layout="fill" />
        </ImageBox>
        <BiggerText>고객 정보</BiggerText>
        <Contents>
          <div className="text-box">
            <span className="name">이름</span>
            <span className="text">{data?.userMember?.name}</span>
          </div>
          <div className="text-box">
            <span className="name">연락처</span>
            <span className="phone">
              {hyphenFn(data?.userMember?.phone.toString())}
            </span>
          </div>
        </Contents>
        <BiggerText className="catalog">첨부 파일</BiggerText>
        {data?.finalQuotation?.finalQuotationChargers?.map((el, idx) =>
          el?.finalQuotationChargerFiles
            ?.filter((e) => e.productFileType === 'CATALOG')
            .concat(data?.finalQuotation?.finalQuotationDetailFiles as any)
            .map((file, fileIdx) => (
              <FileDownloadBtn key={fileIdx}>
                <FileDownload download={file.originalName} href={file.url}>
                  <Image src={fileImg} alt="file-icon" layout="intrinsic" />
                  <FileName>{file.originalName}</FileName>
                </FileDownload>
              </FileDownloadBtn>
            )),
        )}
        <ReviewBox>
          <AsCompGetReview review={data?.projectReview} isProject={true} />
        </ReviewBox>
      </Wrapper>
      <BtnBox></BtnBox>
    </>
  );
};
const Wrapper = styled.div`
  padding-left: 15pt;
  padding-right: 15pt;
  margin-top: 21pt;
  position: relative;
  .catalog {
    margin-top: 18pt;
    margin-bottom: 15pt;
  }
  .review {
    border-top: 1px solid #e9eaee;
    margin-top: 6pt;
    padding-top: 18pt;
  }
`;
const ImageBox = styled.div`
  width: 24pt;
  height: 24pt;
  margin: 0 auto;
  position: relative;
`;
const ReviewBox = styled.div`
  padding-bottom: 87pt;
`;
const BiggerText = styled.div`
  margin-top: 37.5pt;
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: 0em;
  text-align: left;
`;
const BtnBox = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding-left: 15pt;
  padding-right: 15pt;
  width: 100%;
  gap: 6pt;
  bottom: 30pt;
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

  .phone {
    text-decoration: underline;
    color: ${colors.main};
  }
`;
const FileDownloadBtn = styled(Button)`
  margin: 0 15pt 6pt 0;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  border-radius: 6pt;
  display: block;
`;
const FileDownload = styled.a`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 3pt;
  color: ${colors.gray2};
`;

const FileName = styled.div`
  display: block;
  width: 150pt;
  font-weight: 400;
  padding-top: 2pt;
  white-space: nowrap;
  font-size: 10.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.dark2};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export default FinishedBottomBox;
